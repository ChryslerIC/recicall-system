import fs from 'node:fs/promises'
import path from 'node:path'
import { createServer } from 'vite'

const root = process.cwd()
const dataDir = path.join(root, 'evaluation', 'data')
const resultsDir = path.join(root, 'evaluation', 'results')

const parseCsv = (text) => {
  const rows = text
    .trim()
    .split(/\r?\n/)
    .map((line) => line.split(',').map((value) => value.trim()))
  const headers = rows.shift() || []

  return rows.map((row) =>
    Object.fromEntries(headers.map((header, index) => [header, row[index] || ''])),
  )
}

const writeCsv = async (fileName, rows) => {
  const headers = Object.keys(rows[0] || {})
  const escape = (value) => {
    const text = String(value ?? '')
    return /[",\n]/.test(text) ? `"${text.replaceAll('"', '""')}"` : text
  }

  const output = [headers.join(','), ...rows.map((row) => headers.map((header) => escape(row[header])).join(','))]
  await fs.writeFile(path.join(resultsDir, fileName), `${output.join('\n')}\n`, 'utf8')
}

const round = (value, digits = 2) => {
  const factor = 10 ** digits
  return Math.round(value * factor) / factor
}

const average = (values) => (values.length ? values.reduce((sum, value) => sum + value, 0) / values.length : 0)

const buildSeatLayout = (students) => {
  const layout = { left: [], right: [] }

  students.forEach((student) => {
    const side = student.seat_side === 'right' ? 'right' : 'left'
    const row = Number(student.seat_row)
    const index = Number(student.seat_index)
    layout[side][row] ||= []
    layout[side][row][index] = student.student_id
  })

  return layout
}

const toEvent = (row) => ({
  id: `${row.session_id}-${row.student_id}-${row.event_type}`,
  sessionId: row.session_id,
  sessionLabel: `Session ${row.session_number}`,
  studentId: row.student_id,
  eventType: row.event_type,
  points: Number(row.points) || 0,
  createdAt: new Date(`${row.session_date}T09:00:00Z`),
})

const createClassroom = (students, events, sessionHistory) => ({
  enrolledStudents: students.map((student) => ({
    id: student.student_id,
    displayName: student.student_name,
  })),
  students: students.length,
  participationEvents: events,
  sessionHistory,
  seatLayout: buildSeatLayout(students),
})

const getMetricSummary = (students) => {
  const counts = students.map((student) => student.sessions)
  const highest = Math.max(...counts, 0)
  const lowest = Math.min(...counts, highest)

  return {
    fairness_score: buildFairnessScore(counts),
    selection_gap: highest - lowest,
    participation_coverage: students.length
      ? Math.round((students.filter((student) => student.sessions > 0).length / students.length) * 100)
      : 0,
    session_counts: counts,
  }
}

const buildFairnessScore = (values) => {
  if (!values.length) return 100
  const mean = average(values)
  if (!mean) return 100

  const totalDifference = values.reduce(
    (total, left) => total + values.reduce((rowTotal, right) => rowTotal + Math.abs(left - right), 0),
    0,
  )
  const gini = totalDifference / (2 * values.length * values.length * mean)
  return Math.round(Math.min(Math.max((1 - gini) * 100, 0), 100))
}

const main = async () => {
  await fs.mkdir(resultsDir, { recursive: true })

  const [studentText, eventText, labelText] = await Promise.all([
    fs.readFile(path.join(dataDir, 'students.csv'), 'utf8'),
    fs.readFile(path.join(dataDir, 'participation_events.csv'), 'utf8'),
    fs.readFile(path.join(dataDir, 'teacher_labels.csv'), 'utf8'),
  ])

  const students = parseCsv(studentText)
  const eventRows = parseCsv(eventText)
  const labels = parseCsv(labelText)
  const labelsBySession = new Map(labels.map((label) => [label.session_id, label]))
  const sessions = [...new Map(eventRows.map((row) => [row.session_id, row])).values()]
    .sort((left, right) => Number(left.session_number) - Number(right.session_number))

  const vite = await createServer({ server: { middlewareMode: true }, appType: 'custom', logLevel: 'error' })
  const { buildPriorityQueueRecommendation, buildClassAnalytics } = await vite.ssrLoadModule('/src/services/analyticsService.js')

  const historicalEvents = []
  const sessionHistory = []
  const selectionRows = []
  let top1Correct = 0
  let top3Correct = 0
  let formulaChecks = 0
  let formulaErrors = 0
  let capApplied = 0
  const selectedWaits = []

  for (const session of sessions) {
    const classroom = createClassroom(students, historicalEvents, sessionHistory)
    const recommendation = buildPriorityQueueRecommendation(classroom)
    const label = labelsBySession.get(session.session_id)
    const selected = recommendation.selectedStudent
    const top3 = recommendation.queue.slice(0, 3).map((student) => student.id)
    const expected = label?.teacher_expected_student_id || ''
    const expectedCandidate = recommendation.queue.find((student) => student.id === expected)
    const isTop1Correct = selected?.id === expected
    const isTop3Correct = top3.includes(expected)

    if (isTop1Correct) top1Correct += 1
    if (isTop3Correct) top3Correct += 1
    const priorParticipationSessions = eventRows
      .filter(
        (row) =>
          row.event_type === 'participation' &&
          row.student_id === selected?.id &&
          Number(row.session_number) < Number(session.session_number),
      )
      .map((row) => Number(row.session_number))
    const lastParticipationSession = Math.max(...priorParticipationSessions, 0)
    const trueWaitSessions = lastParticipationSession
      ? Number(session.session_number) - lastParticipationSession
      : Math.max(Number(session.session_number) - 1, 0)

    if (selected) selectedWaits.push(trueWaitSessions)

    recommendation.queue.forEach((candidate) => {
      const componentTotal = candidate.priorityBreakdown.reduce((sum, factor) => sum + factor.value, 0)
      const rawMatches = Math.abs(componentTotal - candidate.priorityRawScore) < 0.01
      if (rawMatches) formulaChecks += 1
      else formulaErrors += 1
      if (candidate.priorityCapApplied) capApplied += 1
    })

    selectionRows.push({
      session_id: session.session_id,
      session_number: session.session_number,
      expected_student_id: expected,
      expected_student_name: expectedCandidate?.name || '',
      algorithm_selected_id: selected?.id || '',
      algorithm_selected_name: selected?.name || '',
      algorithm_priority_score: selected?.priorityScore ?? '',
      expected_queue_position: expectedCandidate?.queuePosition || '',
      top_1_correct: isTop1Correct ? 'YES' : 'NO',
      top_3_correct: isTop3Correct ? 'YES' : 'NO',
      true_wait_sessions: trueWaitSessions,
      algorithm_wait_value: selected?.sessionsSinceLastParticipation ?? '',
      formula_errors_in_queue: formulaErrors,
      capped_scores_in_queue: recommendation.queue.filter((candidate) => candidate.priorityCapApplied).length,
      review_note: label?.review_note || '',
    })

    const sessionEvents = eventRows
      .filter((row) => row.session_id === session.session_id)
      .map(toEvent)
    historicalEvents.push(...sessionEvents)
    sessionHistory.push({ id: session.session_id, sessionNumber: Number(session.session_number) })
  }

  const historicalAnalytics = buildClassAnalytics(
    createClassroom(students, historicalEvents, sessionHistory),
  )

  const replayEvents = []
  const replayHistory = []
  const replayRows = []
  for (const session of sessions) {
    const recommendation = buildPriorityQueueRecommendation(
      createClassroom(students, replayEvents, replayHistory),
    )
    const selected = recommendation.selectedStudent
    if (!selected) continue

    replayRows.push({
      session_id: session.session_id,
      session_number: session.session_number,
      selected_student_id: selected.id,
      selected_student_name: selected.name,
      priority_score: selected.priorityScore,
      queue_position: selected.queuePosition,
    })
    replayEvents.push({
      studentId: selected.id,
      points: 3,
      createdAt: new Date(`${session.session_date}T09:00:00Z`),
    })
    replayHistory.push({ id: session.session_id, sessionNumber: Number(session.session_number) })
  }

  const replayAnalytics = buildClassAnalytics(createClassroom(students, replayEvents, replayHistory))
  const roundRobinCounts = students.map((student, index) => Math.floor(sessions.length / students.length) + (index < sessions.length % students.length ? 1 : 0))
  const replayMetric = getMetricSummary(replayAnalytics.students)
  const roundRobinMetric = getMetricSummary(students.map((student, index) => ({
    ...student,
    sessions: roundRobinCounts[index],
  })))

  await writeCsv('selection_results.csv', selectionRows)
  await writeCsv('replay_results.csv', replayRows)
  await writeCsv('summary.csv', [
    {
      dataset: 'historical_teacher_labels',
      sessions: sessions.length,
      top_1_accuracy_percent: round((top1Correct / sessions.length) * 100),
      top_3_accuracy_percent: round((top3Correct / sessions.length) * 100),
      average_selected_wait_sessions: round(average(selectedWaits)),
      formula_checks_passed: formulaChecks,
      formula_errors: formulaErrors,
      capped_candidate_scores: capApplied,
      fairness_score: historicalAnalytics.fairnessScore,
      selection_gap: historicalAnalytics.selectionGap,
      participation_coverage_percent: historicalAnalytics.coverageRate,
    },
    {
      dataset: 'algorithm_replay',
      sessions: sessions.length,
      top_1_accuracy_percent: '',
      top_3_accuracy_percent: '',
      average_selected_wait_sessions: '',
      formula_checks_passed: '',
      formula_errors: '',
      capped_candidate_scores: '',
      fairness_score: replayMetric.fairness_score,
      selection_gap: replayMetric.selection_gap,
      participation_coverage_percent: replayMetric.participation_coverage,
    },
    {
      dataset: 'round_robin_baseline',
      sessions: sessions.length,
      top_1_accuracy_percent: '',
      top_3_accuracy_percent: '',
      average_selected_wait_sessions: '',
      formula_checks_passed: '',
      formula_errors: '',
      capped_candidate_scores: '',
      fairness_score: roundRobinMetric.fairness_score,
      selection_gap: roundRobinMetric.selection_gap,
      participation_coverage_percent: roundRobinMetric.participation_coverage,
    },
  ])

  await vite.close()
  console.log(`Evaluation complete. Results written to ${path.relative(root, resultsDir)}.`)
}

main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})

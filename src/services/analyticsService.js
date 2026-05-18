import { resolveStudentAvatar } from '../utils/studentAvatarOptions'

const toNumber = (value, fallback = 0) => {
  const numericValue = Number(value)
  return Number.isFinite(numericValue) ? numericValue : fallback
}

const clamp = (value, min, max) => Math.min(Math.max(value, min), max)

const getStudentName = (student, index) =>
  student?.displayName || student?.name || student?.email || `Student ${index + 1}`

const getStudentPoints = (student) =>
  toNumber(student?.totalPoints, toNumber(student?.latestPoints, toNumber(student?.points, 0)))

const getStudentSessions = (student) =>
  toNumber(student?.participatedSessions, getStudentPoints(student) > 0 ? 1 : 0)

const getRiskLevel = (score) => {
  if (score >= 70) return 'Low'
  if (score >= 38) return 'Moderate'
  return 'High'
}

const getRiskColor = (riskLevel) => {
  if (riskLevel === 'Low') return 'text-[#1188f8]'
  if (riskLevel === 'Moderate') return 'text-[#4fb817]'
  return 'text-[#b81717]'
}

const getRecommendation = ({ points, sessions, score }) => {
  if (score >= 70) return 'Keep them in the rotation as a peer model.'
  if (sessions > 0) return 'Ask a lighter follow-up question next session.'
  if (points > 0) return 'Call once early to keep momentum visible.'
  return 'Prioritize for the next cold call or QR scan.'
}

const toDate = (value) => {
  if (!value) return null
  if (typeof value.toDate === 'function') return value.toDate()
  if (typeof value.seconds === 'number') return new Date(value.seconds * 1000)
  return null
}

const formatShortDate = (value, fallbackIndex = 0) => {
  const date = toDate(value)
  if (!date) return `Session ${fallbackIndex + 1}`

  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
  })
}

const getTimestamp = (value) => {
  const date = toDate(value)
  return date ? date.getTime() : null
}

const isAbsenceEvent = (event = {}) => event?.eventType === 'absence'

const getParticipationOnlyEvents = (events = []) =>
  (Array.isArray(events) ? events : []).filter((event) => !isAbsenceEvent(event))

const getAbsenceOnlyEvents = (events = []) =>
  (Array.isArray(events) ? events : []).filter((event) => isAbsenceEvent(event))

const getGroupedParticipationEvents = (events = []) => {
  const buckets = []
  const bucketMap = new Map()

  events.forEach((event, index) => {
    const date = toDate(event.createdAt)
    const bucketKey = date ? date.toISOString().slice(0, 10) : `session-${index}`

    if (!bucketMap.has(bucketKey)) {
      const bucket = {
        label: formatShortDate(event.createdAt, index),
        participants: new Set(),
        points: 0,
        events: [],
      }

      bucketMap.set(bucketKey, bucket)
      buckets.push(bucket)
    }

    const bucket = bucketMap.get(bucketKey)
    bucket.points += toNumber(event.points)
    if (event.studentId) bucket.participants.add(event.studentId)
    bucket.events.push(event)
  })

  return buckets.map((bucket) => ({
    label: bucket.label,
    participants: bucket.participants.size,
    points: bucket.points,
    events: bucket.events,
  }))
}

const getLastParticipationMap = (events = []) => {
  const map = new Map()

  events.forEach((event, index) => {
    if (!event.studentId) return
    map.set(event.studentId, {
      event,
      index,
    })
  })

  return map
}

const calculateFairnessScore = (students = []) => {
  const values = students.map((student) => Math.max(student.sessions || 0, 0))

  if (!values.length) return 100

  const mean = values.reduce((sum, value) => sum + value, 0) / values.length
  if (mean === 0) return 100

  let totalDifference = 0
  values.forEach((leftValue) => {
    values.forEach((rightValue) => {
      totalDifference += Math.abs(leftValue - rightValue)
    })
  })

  const giniCoefficient = totalDifference / (2 * values.length * values.length * mean)
  return Math.round(clamp((1 - giniCoefficient) * 100, 0, 100))
}

const getFairnessLabel = (score) => {
  if (score >= 82) return 'Balanced'
  if (score >= 62) return 'Monitoring'
  return 'Uneven'
}

const getRecentWindowMetrics = (events = [], days = 7) => {
  const now = Date.now()
  const windowStart = now - days * 24 * 60 * 60 * 1000
  const recentEvents = events.filter((event) => {
    const timestamp = getTimestamp(event.createdAt)
    return typeof timestamp === 'number' && timestamp >= windowStart
  })

  return {
    events: recentEvents.length,
    participants: new Set(recentEvents.map((event) => event.studentId).filter(Boolean)).size,
  }
}

const WEEKDAY_LABELS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

const formatHourLabel = (hour) => {
  if (!Number.isInteger(hour) || hour < 0 || hour > 23) return 'N/A'

  const suffix = hour >= 12 ? 'PM' : 'AM'
  const normalizedHour = hour % 12 || 12
  return `${normalizedHour}:00 ${suffix}`
}

const createEmptyTimingMetric = (label) => ({
  label,
  events: 0,
  participants: 0,
  points: 0,
})

const getTimingInsights = (events = []) => {
  const dayMap = new Map()
  const hourMap = new Map()

  events.forEach((event) => {
    const date = toDate(event.createdAt)
    if (!date) return

    const weekday = date.getDay()
    const hour = date.getHours()

    if (!dayMap.has(weekday)) {
      dayMap.set(weekday, {
        label: WEEKDAY_LABELS[weekday] || `Day ${weekday + 1}`,
        events: 0,
        participants: new Set(),
        points: 0,
      })
    }

    if (!hourMap.has(hour)) {
      hourMap.set(hour, {
        label: formatHourLabel(hour),
        events: 0,
        participants: new Set(),
        points: 0,
      })
    }

    const dayBucket = dayMap.get(weekday)
    dayBucket.events += 1
    dayBucket.points += toNumber(event.points)
    if (event.studentId) dayBucket.participants.add(event.studentId)

    const hourBucket = hourMap.get(hour)
    hourBucket.events += 1
    hourBucket.points += toNumber(event.points)
    if (event.studentId) hourBucket.participants.add(event.studentId)
  })

  const dayEntries = [...dayMap.values()].map((entry) => ({
    label: entry.label,
    events: entry.events,
    participants: entry.participants.size,
    points: entry.points,
  }))
  const hourEntries = [...hourMap.values()].map((entry) => ({
    label: entry.label,
    events: entry.events,
    participants: entry.participants.size,
    points: entry.points,
  }))

  const sortByActivity = (left, right) => {
    if (right.events !== left.events) return right.events - left.events
    if (right.points !== left.points) return right.points - left.points
    return left.label.localeCompare(right.label)
  }

  const sortByLowActivity = (left, right) => {
    if (left.events !== right.events) return left.events - right.events
    if (left.points !== right.points) return left.points - right.points
    return left.label.localeCompare(right.label)
  }

  return {
    peakDay: dayEntries.length ? [...dayEntries].sort(sortByActivity)[0] : createEmptyTimingMetric('N/A'),
    quietDay: dayEntries.length ? [...dayEntries].sort(sortByLowActivity)[0] : createEmptyTimingMetric('N/A'),
    peakHour: hourEntries.length ? [...hourEntries].sort(sortByActivity)[0] : createEmptyTimingMetric('N/A'),
    quietHour: hourEntries.length ? [...hourEntries].sort(sortByLowActivity)[0] : createEmptyTimingMetric('N/A'),
  }
}

const getLowEngagementSessions = (groupedEvents = []) =>
  [...groupedEvents]
    .sort((left, right) => {
      if (left.participants !== right.participants) return left.participants - right.participants
      if (left.points !== right.points) return left.points - right.points
      return left.label.localeCompare(right.label)
    })
    .slice(0, 4)
    .map((session, index) => ({
      id: `${session.label}-${index}`,
      label: session.label,
      participants: session.participants,
      points: session.points,
    }))

const ensureSeriesLength = (series, minLength, factory) => {
  if (series.length >= minLength) return series.slice(-minLength)

  const missing = minLength - series.length
  return [
    ...Array.from({ length: missing }, (_, index) => factory(index)),
    ...series,
  ]
}

const toSeatRows = (rows = []) =>
  (Array.isArray(rows) ? rows : [])
    .map((row) => {
      if (Array.isArray(row)) return row
      if (row && Array.isArray(row.seats)) return row.seats
      return []
    })
    .filter((row) => row.length > 0)

const getSeatEnvironmentLabel = ({ rowDepth, edgeDistance }) => {
  const depthLabel = rowDepth >= 0.67 ? 'Back' : rowDepth >= 0.34 ? 'Middle' : 'Front'
  const laneLabel = edgeDistance >= 0.67 ? 'Edge' : edgeDistance >= 0.34 ? 'Wing' : 'Center'

  return `${depthLabel} ${laneLabel}`
}

export const buildSeatEnvironmentMap = (classroom = {}) => {
  const leftRows = toSeatRows(classroom?.seatLayout?.left)
  const rightRows = toSeatRows(classroom?.seatLayout?.right)
  const totalRows = Math.max(leftRows.length, rightRows.length, 1)
  const environmentMap = new Map()

  const registerRows = (rows, side) => {
    rows.forEach((row, rowIndex) => {
      const seatCount = Math.max(row.length, 1)
      const centerIndex = (seatCount - 1) / 2

      row.forEach((studentId, seatIndex) => {
        if (!studentId) return

        const rowDepth = totalRows === 1 ? 0 : rowIndex / (totalRows - 1)
        const edgeDistance =
          seatCount === 1 ? 0 : Math.abs(seatIndex - centerIndex) / (centerIndex || 1)
        const environmentScore = Math.round(
          clamp(34 + rowDepth * 42 + edgeDistance * 24, 0, 100),
        )
        const priorityBoost = Math.round(clamp(rowDepth * 16 + edgeDistance * 10, 0, 24))

        environmentMap.set(studentId, {
          studentId,
          side,
          rowIndex,
          seatIndex,
          rowLength: seatCount,
          rowDepth,
          edgeDistance,
          environmentScore,
          priorityBoost,
          zoneLabel: getSeatEnvironmentLabel({ rowDepth, edgeDistance }),
        })
      })
    })
  }

  registerRows(leftRows, 'left')
  registerRows(rightRows, 'right')

  return environmentMap
}

const comparePriorityCandidates = (left, right) => {
  if (right.priorityScore !== left.priorityScore) {
    return right.priorityScore - left.priorityScore
  }

  if (right.sessionsSinceLastParticipation !== left.sessionsSinceLastParticipation) {
    return right.sessionsSinceLastParticipation - left.sessionsSinceLastParticipation
  }

  return left.name.localeCompare(right.name)
}

const enqueuePriorityCandidate = (queue, candidate) => {
  const insertIndex = queue.findIndex((queuedCandidate) => comparePriorityCandidates(candidate, queuedCandidate) < 0)

  if (insertIndex === -1) {
    queue.push(candidate)
    return
  }

  queue.splice(insertIndex, 0, candidate)
}

const buildStudentPredictions = (classroom = {}) => {
  const enrolledStudents = classroom.enrolledStudents || []

  return enrolledStudents.map((student, index) => {
    const points = getStudentPoints(student)
    const sessions = getStudentSessions(student)
    const score = clamp(points * 14 + sessions * 18, 0, 100)
    const riskLevel = getRiskLevel(score)

    return {
      id: student.studentId || student.id || `student-${index}`,
      name: getStudentName(student, index),
      email: student.email || student.gradeLevel || 'Joined student',
      studentNumber: student.studentNumber,
      photoURL: student.photoURL,
      avatarKey: student.avatarKey,
      avatarSrc: resolveStudentAvatar(student.avatarKey, student.photoURL),
      gradeLevel: student.gradeLevel,
      points,
      sessions,
      score,
      riskLevel,
      riskColor: getRiskColor(riskLevel),
      recommendation: getRecommendation({ points, sessions, score }),
    }
  })
}

export const buildClassAnalytics = (classroom = {}) => {
  const studentPredictions = buildStudentPredictions(classroom)
  const totalStudents = toNumber(classroom.students, studentPredictions.length)
  const activeStudents = studentPredictions.filter((student) => student.points > 0 || student.sessions > 0).length
  const atRiskStudents = studentPredictions.filter((student) => student.riskLevel === 'High').length
  const totalPoints = studentPredictions.reduce((sum, student) => sum + student.points, 0)
  const averageScore = totalStudents
    ? Math.round(studentPredictions.reduce((sum, student) => sum + student.score, 0) / totalStudents)
    : 0
  const participationRate = totalStudents ? Math.round((activeStudents / totalStudents) * 100) : 0
  const predictedNextParticipants = totalStudents
    ? clamp(Math.round(activeStudents + Math.max(1, atRiskStudents * 0.35)), 0, totalStudents)
    : 0
  const averagePoints = totalStudents ? Math.round((totalPoints / totalStudents) * 10) / 10 : 0

  const sortedByRisk = [...studentPredictions].sort((left, right) => {
    if (left.score !== right.score) return left.score - right.score
    return left.name.localeCompare(right.name)
  })

  const strongestStudents = [...studentPredictions]
    .sort((left, right) => right.score - left.score)
    .slice(0, 5)

  const participationEvents = getParticipationOnlyEvents(classroom.participationEvents || [])
  const trackedSessionCount = Array.isArray(classroom.sessionHistory) && classroom.sessionHistory.length
    ? classroom.sessionHistory.length
    : 0
  const groupedEvents = getGroupedParticipationEvents(participationEvents)
  const lastParticipationMap = getLastParticipationMap(participationEvents)
  const sessionTrend = ensureSeriesLength(
    groupedEvents.slice(-6),
    6,
    (index) => ({
      label: `S${index + 1}`,
      participants: 0,
      points: 0,
      events: [],
    }),
  )
  const neverCalledStudents = studentPredictions
    .filter((student) => student.sessions === 0)
    .sort((left, right) => left.name.localeCompare(right.name))
  const leastActiveStudents = [...studentPredictions]
    .sort((left, right) => {
      if (left.sessions !== right.sessions) return left.sessions - right.sessions
      if (left.points !== right.points) return left.points - right.points
      return left.name.localeCompare(right.name)
    })
    .slice(0, 5)
  const mostActiveStudents = [...studentPredictions]
    .sort((left, right) => {
      if (right.sessions !== left.sessions) return right.sessions - left.sessions
      if (right.points !== left.points) return right.points - left.points
      return left.name.localeCompare(right.name)
    })
    .slice(0, 5)
  const waitingStudents = studentPredictions
    .map((student) => {
      const lastParticipation = lastParticipationMap.get(student.id)
      const sessionsSinceLastParticipation = lastParticipation
        ? Math.max(groupedEvents.length - (lastParticipation.index + 1), 0)
        : Math.max(groupedEvents.length, 0)

      return {
        ...student,
        sessionsSinceLastParticipation,
      }
    })
    .sort((left, right) => {
      if (right.sessionsSinceLastParticipation !== left.sessionsSinceLastParticipation) {
        return right.sessionsSinceLastParticipation - left.sessionsSinceLastParticipation
      }
      if (left.sessions !== right.sessions) return left.sessions - right.sessions
      return left.name.localeCompare(right.name)
    })
    .slice(0, 5)
  const fairnessScore = calculateFairnessScore(studentPredictions)
  const highestSessionCount = Math.max(...studentPredictions.map((student) => student.sessions), 0)
  const lowestSessionCount = Math.min(...studentPredictions.map((student) => student.sessions), highestSessionCount)
  const weeklyFrequency = getRecentWindowMetrics(participationEvents, 7)
  const monthlyFrequency = getRecentWindowMetrics(participationEvents, 30)
  const timingInsights = getTimingInsights(participationEvents)
  const coverageRate = totalStudents
    ? Math.round(((totalStudents - neverCalledStudents.length) / totalStudents) * 100)
    : 0
  const studentIndex = new Map(studentPredictions.map((student) => [student.id, student]))

  return {
    totalStudents,
    activeStudents,
    atRiskStudents,
    averageScore,
    participationRate,
    predictedNextParticipants,
    averagePoints,
    totalPoints,
    totalSessions: trackedSessionCount || groupedEvents.length,
    priorityStudents: sortedByRisk.slice(0, 4),
    strongestStudents,
    students: studentPredictions,
    statusLabel: averageScore >= 70 ? 'Healthy' : averageScore >= 38 ? 'Needs Attention' : 'Needs Baseline',
    confidenceLabel: activeStudents >= 5 ? 'High confidence' : activeStudents >= 2 ? 'Medium confidence' : 'Low confidence',
    fairnessScore,
    fairnessLabel: getFairnessLabel(fairnessScore),
    coverageRate,
    neverCalledStudents,
    leastActiveStudents,
    mostActiveStudents,
    waitingStudents,
    selectionGap: Math.max(highestSessionCount - lowestSessionCount, 0),
    weeklyFrequency,
    monthlyFrequency,
    timingInsights,
    lowEngagementSessions: getLowEngagementSessions(groupedEvents),
    sessionTrend,
    riskBreakdown: {
      low: studentPredictions.filter((student) => student.riskLevel === 'Low').length,
      moderate: studentPredictions.filter((student) => student.riskLevel === 'Moderate').length,
      high: studentPredictions.filter((student) => student.riskLevel === 'High').length,
    },
    topPointsBreakdown: strongestStudents.map((student) => ({
      label: student.name,
      value: student.points,
      score: student.score,
    })),
    recentHighlights: participationEvents
      .slice(-5)
      .reverse()
      .map((event, index) => {
        const matchedStudent = studentIndex.get(event.studentId) || null

        return {
          id: event.id || `event-${index}`,
          studentId: event.studentId,
          name: event.displayName || 'Joined student',
          points: toNumber(event.points),
          label: formatShortDate(event.createdAt, index),
          avatarKey: event.avatarKey || matchedStudent?.avatarKey,
          photoURL: event.photoURL || matchedStudent?.photoURL,
          avatarSrc: resolveStudentAvatar(
            event.avatarKey || matchedStudent?.avatarKey,
            event.photoURL || matchedStudent?.photoURL,
          ),
        }
      }),
  }
}

export const buildPriorityQueueRecommendation = (classroom = {}, excludedStudentIds = []) => {
  const analytics = buildClassAnalytics(classroom)
  const participationEvents = getParticipationOnlyEvents(classroom.participationEvents || [])
  const absenceEvents = getAbsenceOnlyEvents(classroom.participationEvents || [])
  const groupedEvents = getGroupedParticipationEvents(participationEvents)
  const lastParticipationMap = getLastParticipationMap(participationEvents)
  const seatEnvironmentMap = buildSeatEnvironmentMap(classroom)
  const excludedSet = new Set(excludedStudentIds.filter(Boolean))
  const totalSessions = Math.max(analytics.totalSessions, groupedEvents.length, 1)
  const absenceCountMap = new Map()

  absenceEvents.forEach((event) => {
    if (!event.studentId) return
    absenceCountMap.set(event.studentId, (absenceCountMap.get(event.studentId) || 0) + 1)
  })

  const candidates = analytics.students.map((student) => {
    const lastParticipation = lastParticipationMap.get(student.id)
    const seatEnvironment = seatEnvironmentMap.get(student.id) || null
    const absenceCount = absenceCountMap.get(student.id) || 0
    const sessionsSinceLastParticipation = lastParticipation
      ? Math.max(groupedEvents.length - (lastParticipation.index + 1), 0)
      : totalSessions

    const normalizedNeed = clamp(100 - student.score, 0, 100)
    const inactivityBoost = clamp(sessionsSinceLastParticipation * 18, 0, 45)
    const zeroParticipationBoost = student.sessions === 0 ? 28 : 0
    const seatEnvironmentBoost = seatEnvironment?.priorityBoost || 0
    const absenceBoost = clamp(absenceCount * 10, 0, 24)
    const priorityScore = clamp(
      normalizedNeed * 0.52 +
        inactivityBoost +
        zeroParticipationBoost +
        absenceBoost +
        seatEnvironmentBoost,
      0,
      100,
    )

    const reasons = []
    if (student.sessions === 0) reasons.push('No participation yet')
    if (sessionsSinceLastParticipation >= 2) reasons.push(`${sessionsSinceLastParticipation} sessions since last turn`)
    if (student.score < analytics.averageScore) reasons.push('Below class engagement average')
    if (absenceCount > 0) {
      reasons.push(absenceCount === 1 ? 'Missed one called turn due to absence' : `Missed ${absenceCount} called turns due to absence`)
    }
    if (seatEnvironment && seatEnvironmentBoost >= 8) {
      reasons.push(`Seat environment: ${seatEnvironment.zoneLabel}`)
    }
    if (!reasons.length) reasons.push('Balanced queue rotation candidate')

    return {
      ...student,
      priorityScore,
      seatEnvironmentBoost,
      absenceBoost,
      absenceCount,
      seatEnvironmentScore: seatEnvironment?.environmentScore || 0,
      seatZoneLabel: seatEnvironment?.zoneLabel || 'Seat not assigned',
      sessionsSinceLastParticipation,
      reasons,
    }
  })

  const priorityQueue = []
  candidates
    .filter((candidate) => !excludedSet.has(candidate.id))
    .forEach((candidate) => {
    enqueuePriorityCandidate(priorityQueue, candidate)
    })

  const rankedCandidates = priorityQueue.map((candidate, index) => ({
    ...candidate,
    queuePosition: index + 1,
  }))

  const selectedStudent = rankedCandidates[0] || null

  return {
    selectedStudent,
    alternatives: rankedCandidates.slice(1, 4),
    candidateCount: rankedCandidates.length,
    queue: rankedCandidates,
  }
}

export const buildNextStudentRecommendation = (...args) =>
  buildPriorityQueueRecommendation(...args)

export const buildStudentAnalytics = (classroom = {}, studentId = '') => {
  const classAnalytics = buildClassAnalytics(classroom)
  const student =
    classAnalytics.students.find((item) => item.id === studentId) || {
      id: studentId,
      name: 'You',
      email: 'Joined student',
      points: 0,
      sessions: 0,
      score: 0,
      riskLevel: 'High',
      riskColor: getRiskColor('High'),
      recommendation: 'Join one participation round to start your engagement history.',
    }

  const studentRank =
    [...classAnalytics.students]
      .sort((left, right) => right.score - left.score)
      .findIndex((item) => item.id === student.id) + 1 || 0

  const topScore = classAnalytics.strongestStudents[0]?.score || 0
  const studentEvents = (classroom.participationEvents || []).filter((event) => event.studentId === student.id)
  const groupedStudentEvents = getGroupedParticipationEvents(studentEvents)
  const personalTrend = ensureSeriesLength(
    groupedStudentEvents.slice(-6).map((entry) => ({
      label: entry.label,
      points: entry.points,
      sessions: entry.participants ? 1 : 0,
    })),
    6,
    (index) => ({
      label: `S${index + 1}`,
      points: 0,
      sessions: 0,
    }),
  )

  const totalTrackedSessions = Math.max(classAnalytics.totalSessions, 1)
  const attendedSessions = student.sessions
  const missedSessions = Math.max(totalTrackedSessions - attendedSessions, 0)
  const percentile = classAnalytics.totalStudents
    ? Math.round(((classAnalytics.totalStudents - Math.max(studentRank - 1, 0)) / classAnalytics.totalStudents) * 100)
    : 0

  return {
    ...student,
    classAverageScore: classAnalytics.averageScore,
    classAveragePoints: classAnalytics.averagePoints,
    classTopScore: topScore,
    totalTrackedSessions,
    attendedSessions,
    missedSessions,
    studentRank,
    percentile,
    standingLabel: percentile >= 75 ? 'Top Quartile' : percentile >= 45 ? 'Middle Band' : 'Needs Visibility',
    personalTrend,
    comparisonBreakdown: [
      { label: 'You', value: student.score },
      { label: 'Class Avg', value: classAnalytics.averageScore },
      { label: 'Top Score', value: topScore },
    ],
    sessionMix: {
      attended: attendedSessions,
      missed: missedSessions,
    },
    recentEvents: studentEvents
      .slice(-4)
      .reverse()
      .map((event, index) => ({
        id: event.id || `student-event-${index}`,
        points: toNumber(event.points),
        label: formatShortDate(event.createdAt, index),
      })),
  }
}

export const toParticipationDate = (value) => {
  if (!value) return null
  if (value instanceof Date) return value
  if (typeof value.toDate === 'function') return value.toDate()
  if (typeof value.seconds === 'number') return new Date(value.seconds * 1000)

  const parsedDate = new Date(value)
  return Number.isNaN(parsedDate.getTime()) ? null : parsedDate
}

export const getParticipationDateKey = (value) => {
  const date = toParticipationDate(value)
  if (!date) return ''

  const year = date.getFullYear()
  const month = `${date.getMonth() + 1}`.padStart(2, '0')
  const day = `${date.getDate()}`.padStart(2, '0')
  return `${year}-${month}-${day}`
}

export const formatParticipationDate = (value, options = {}) => {
  const date = toParticipationDate(value)
  if (!date) return 'No date recorded'

  return date.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
    ...options,
  })
}

export const filterParticipationEventsByDate = (
  events = [],
  { startDate = '', endDate = '' } = {},
) => {
  const start = startDate ? new Date(`${startDate}T00:00:00`) : null
  const end = endDate ? new Date(`${endDate}T23:59:59.999`) : null

  return events.filter((event) => {
    const date = toParticipationDate(event.createdAt)
    if (!date) return false
    if (start && date < start) return false
    if (end && date > end) return false
    return true
  })
}

export const buildParticipationDateRangeLabel = ({
  startDate = '',
  endDate = '',
} = {}) => {
  if (startDate && endDate) {
    return `${formatParticipationDate(startDate)} to ${formatParticipationDate(endDate)}`
  }

  if (startDate) {
    return `From ${formatParticipationDate(startDate)}`
  }

  if (endDate) {
    return `Until ${formatParticipationDate(endDate)}`
  }

  return 'All recorded dates'
}

const addWrappedText = (doc, text, x, y, maxWidth, lineHeight = 6.5) => {
  const lines = doc.splitTextToSize(String(text ?? ''), maxWidth)
  lines.forEach((line, index) => {
    doc.text(line, x, y + index * lineHeight)
  })

  return y + Math.max(lines.length, 1) * lineHeight
}

const addWrappedList = (doc, entries, x, y, maxWidth, lineHeight = 5.2) => {
  const safeEntries = Array.isArray(entries) && entries.length ? entries : ['None recorded']
  let cursorY = y

  safeEntries.forEach((entry) => {
    const lines = doc.splitTextToSize(String(entry ?? ''), maxWidth)
    lines.forEach((line, index) => {
      doc.text(line, x, cursorY + index * lineHeight)
    })
    cursorY += Math.max(lines.length, 1) * lineHeight
  })

  return cursorY
}

const drawCompactTable = (doc, {
  x,
  y,
  width,
  columns = [],
  rows = [],
  headerFill = [238, 246, 255],
  headerText = [17, 136, 248],
  bodyText = [24, 24, 27],
}) => {
  const columnWidths = columns.map((column) => width * (column.widthRatio || 1))
  const headerHeight = 8
  let cursorY = y

  doc.setFillColor(...headerFill)
  doc.roundedRect(x, cursorY, width, headerHeight, 3, 3, 'F')
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(8)
  doc.setTextColor(...headerText)

  let cursorX = x
  columns.forEach((column, index) => {
    doc.text(String(column.label || '').toUpperCase(), cursorX + 2, cursorY + 5)
    if (index > 0) {
      doc.setDrawColor(217, 221, 227)
      doc.line(cursorX, cursorY, cursorX, cursorY + headerHeight)
    }
    cursorX += columnWidths[index]
  })

  cursorY += headerHeight

  rows.forEach((row) => {
    const rowLinesByColumn = columns.map((column, index) =>
      doc.splitTextToSize(String(row[column.key] ?? ''), columnWidths[index] - 4),
    )
    const rowHeight = Math.max(
      ...rowLinesByColumn.map((lines) => Math.max(lines.length, 1) * 4.5 + 4),
      9,
    )

    doc.setDrawColor(232, 236, 242)
    doc.rect(x, cursorY, width, rowHeight)

    let rowX = x
    columns.forEach((column, index) => {
      if (index > 0) {
        doc.line(rowX, cursorY, rowX, cursorY + rowHeight)
      }
      doc.setFont(column.fontWeight === 'bold' ? 'helvetica' : 'helvetica', column.fontWeight === 'bold' ? 'bold' : 'normal')
      doc.setFontSize(9)
      doc.setTextColor(...bodyText)
      rowLinesByColumn[index].forEach((line, lineIndex) => {
        doc.text(line, rowX + 2, cursorY + 5 + lineIndex * 4.5)
      })
      rowX += columnWidths[index]
    })

    cursorY += rowHeight
  })

  return cursorY
}

const loadJsPdf = async () => {
  const { jsPDF } = await import('jspdf')
  return jsPDF
}

const loadHtml2Canvas = async () => {
  const module = await import('html2canvas')
  return module.default
}

export const downloadParticipationPdfReport = async ({
  fileName = 'participation-report.pdf',
  title = 'Participation Report',
  subtitle = '',
  generatedFor = '',
  summaryItems = [],
  columns = [],
  rows = [],
}) => {
  if (typeof window === 'undefined') return
  const jsPDF = await loadJsPdf()

  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  })

  const pageWidth = doc.internal.pageSize.getWidth()
  const pageHeight = doc.internal.pageSize.getHeight()
  const margin = 16
  let cursorY = 18

  const drawHeader = () => {
    doc.setFillColor(17, 136, 248)
    doc.roundedRect(margin, 12, pageWidth - margin * 2, 30, 8, 8, 'F')
    doc.setTextColor(255, 255, 255)
    doc.setFont('helvetica', 'bold')
    doc.setFontSize(20)
    doc.text(title, margin + 8, 24)
    doc.setFont('helvetica', 'normal')
    doc.setFontSize(10)
    if (subtitle) doc.text(subtitle, margin + 8, 31)
    doc.text(
      `Generated ${new Date().toLocaleString('en-US')}${generatedFor ? ` • ${generatedFor}` : ''}`,
      margin + 8,
      37,
    )
    doc.setTextColor(24, 24, 27)
    cursorY = 52
  }

  const ensureSpace = (neededHeight = 12) => {
    if (cursorY + neededHeight <= pageHeight - margin) return
    doc.addPage()
    drawHeader()
  }

  drawHeader()

  if (summaryItems.length) {
    const cardWidth = (pageWidth - margin * 2 - 8) / 2
    summaryItems.forEach((item, index) => {
      if (index % 2 === 0) {
        ensureSpace(22)
      }

      const x = margin + (index % 2) * (cardWidth + 8)
      const y = cursorY
      doc.setFillColor(246, 250, 255)
      doc.setDrawColor(217, 221, 227)
      doc.roundedRect(x, y, cardWidth, 18, 5, 5, 'FD')
      doc.setTextColor(95, 95, 103)
      doc.setFont('helvetica', 'bold')
      doc.setFontSize(8)
      doc.text(String(item.label || '').toUpperCase(), x + 5, y + 6)
      doc.setTextColor(24, 24, 27)
      doc.setFont('helvetica', 'bold')
      doc.setFontSize(12)
      addWrappedText(doc, item.value, x + 5, y + 12, cardWidth - 10, 5)

      if (index % 2 === 1 || index === summaryItems.length - 1) {
        cursorY += 22
      }
    })
    cursorY += 2
  }

  if (!rows.length) {
    ensureSpace(12)
    doc.setFont('helvetica', 'normal')
    doc.setFontSize(11)
    doc.text('No participation records matched the selected filter.', margin, cursorY)
    doc.save(fileName)
    return
  }

  const colCount = Math.max(columns.length, 1)
  const tableWidth = pageWidth - margin * 2
  const colWidth = tableWidth / colCount

  const drawTableHeader = () => {
    ensureSpace(12)
    doc.setFillColor(238, 246, 255)
    doc.rect(margin, cursorY, tableWidth, 10, 'F')
    doc.setTextColor(17, 136, 248)
    doc.setFont('helvetica', 'bold')
    doc.setFontSize(8)
    columns.forEach((column, index) => {
      doc.text(String(column.label || '').toUpperCase(), margin + index * colWidth + 2, cursorY + 6)
    })
    cursorY += 10
    doc.setTextColor(24, 24, 27)
  }

  drawTableHeader()

  rows.forEach((row) => {
    const rowHeights = columns.map((column) => {
      const lines = doc.splitTextToSize(String(row[column.key] ?? ''), colWidth - 4)
      return Math.max(lines.length, 1) * 5.5 + 4
    })
    const rowHeight = Math.max(...rowHeights, 10)

    if (cursorY + rowHeight > pageHeight - margin) {
      doc.addPage()
      drawHeader()
      drawTableHeader()
    }

    doc.setDrawColor(232, 236, 242)
    doc.rect(margin, cursorY, tableWidth, rowHeight)
    columns.forEach((column, index) => {
      const x = margin + index * colWidth
      if (index > 0) {
        doc.line(x, cursorY, x, cursorY + rowHeight)
      }
      doc.setFont('helvetica', 'normal')
      doc.setFontSize(9)
      addWrappedText(doc, row[column.key], x + 2, cursorY + 5, colWidth - 4, 4.5)
    })
    cursorY += rowHeight
  })

  doc.save(fileName)
}

export const downloadSessionRecordsPdfReport = async ({
  fileName = 'session-records-report.pdf',
  title = 'Session Records Report',
  subtitle = '',
  generatedFor = '',
  summaryItems = [],
  sessions = [],
}) => {
  if (typeof window === 'undefined') return
  const jsPDF = await loadJsPdf()

  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  })

  const pageWidth = doc.internal.pageSize.getWidth()
  const pageHeight = doc.internal.pageSize.getHeight()
  const margin = 16
  const contentWidth = pageWidth - margin * 2
  const labelWidth = 38
  const listWidth = contentWidth - labelWidth - 8
  let cursorY = 18

  const drawHeader = () => {
    doc.setFillColor(17, 136, 248)
    doc.roundedRect(margin, 12, pageWidth - margin * 2, 30, 8, 8, 'F')
    doc.setTextColor(255, 255, 255)
    doc.setFont('helvetica', 'bold')
    doc.setFontSize(20)
    doc.text(title, margin + 8, 24)
    doc.setFont('helvetica', 'normal')
    doc.setFontSize(10)
    if (subtitle) doc.text(subtitle, margin + 8, 31)
    doc.text(`Generated ${new Date().toLocaleString('en-US')}${generatedFor ? ` - ${generatedFor}` : ''}`, margin + 8, 37)
    doc.setTextColor(24, 24, 27)
    cursorY = 52
  }

  const ensureSpace = (neededHeight = 12) => {
    if (cursorY + neededHeight <= pageHeight - margin) return
    doc.addPage()
    drawHeader()
  }

  const drawMetaLine = (label, value) => {
    if (!value) return
    ensureSpace(8)
    doc.setFont('helvetica', 'bold')
    doc.setFontSize(10)
    doc.setTextColor(95, 95, 103)
    doc.text(`${label}:`, margin, cursorY)
    doc.setFont('helvetica', 'normal')
    doc.setTextColor(24, 24, 27)
    addWrappedText(doc, value, margin + 22, cursorY, contentWidth - 22, 4.8)
    cursorY += 6
  }

  const drawSectionList = (label, entries, accent = [17, 136, 248]) => {
    const safeEntries = Array.isArray(entries) && entries.length ? entries : ['None recorded']
    const estimatedHeight = Math.max(safeEntries.length, 1) * 5.2 + 8
    ensureSpace(Math.max(estimatedHeight, 14))
    doc.setFont('helvetica', 'bold')
    doc.setFontSize(10)
    doc.setTextColor(...accent)
    doc.text(label.toUpperCase(), margin, cursorY)
    doc.setFont('helvetica', 'normal')
    doc.setFontSize(9)
    doc.setTextColor(24, 24, 27)
    cursorY = addWrappedList(doc, safeEntries, margin + labelWidth, cursorY, listWidth, 4.8) + 1.5
  }

  const drawRecitedSection = (rows = []) => {
    const safeRows = Array.isArray(rows) && rows.length ? rows : [{ studentName: 'No recorded recitations', score: '-', turns: '-' }]
    const estimatedHeight = safeRows.length * 9 + 18
    ensureSpace(Math.max(estimatedHeight, 18))
    doc.setFont('helvetica', 'bold')
    doc.setFontSize(10)
    doc.setTextColor(17, 136, 248)
    doc.text('RECITED', margin, cursorY)
    cursorY += 4
    cursorY = drawCompactTable(doc, {
      x: margin,
      y: cursorY,
      width: contentWidth,
      columns: [
        { key: 'studentName', label: 'Student', widthRatio: 0.58, fontWeight: 'bold' },
        { key: 'score', label: 'Score', widthRatio: 0.2 },
        { key: 'turns', label: 'Turns', widthRatio: 0.22 },
      ],
      rows: safeRows,
    }) + 3
  }

  const drawRecordingSheet = (rows = []) => {
    const safeRows = Array.isArray(rows) && rows.length
      ? rows
      : [{ studentName: 'No students recorded', studentNumber: '-', status: '-', score: '-', turns: '-' }]
    const estimatedHeight = safeRows.length * 9 + 18
    ensureSpace(Math.max(estimatedHeight, 18))
    doc.setFont('helvetica', 'bold')
    doc.setFontSize(10)
    doc.setTextColor(17, 136, 248)
    doc.text('SESSION RECORDING SHEET', margin, cursorY)
    cursorY += 4
    cursorY = drawCompactTable(doc, {
      x: margin,
      y: cursorY,
      width: contentWidth,
      columns: [
        { key: 'studentName', label: 'Student', widthRatio: 0.34, fontWeight: 'bold' },
        { key: 'studentNumber', label: 'Student No.', widthRatio: 0.18 },
        { key: 'status', label: 'Status', widthRatio: 0.24 },
        { key: 'score', label: 'Score', widthRatio: 0.12 },
        { key: 'turns', label: 'Turns', widthRatio: 0.12 },
      ],
      rows: safeRows,
    }) + 3
  }

  drawHeader()

  if (summaryItems.length) {
    const cardWidth = (pageWidth - margin * 2 - 8) / 2
    summaryItems.forEach((item, index) => {
      if (index % 2 === 0) ensureSpace(22)

      const x = margin + (index % 2) * (cardWidth + 8)
      const y = cursorY
      doc.setFillColor(246, 250, 255)
      doc.setDrawColor(217, 221, 227)
      doc.roundedRect(x, y, cardWidth, 18, 5, 5, 'FD')
      doc.setTextColor(95, 95, 103)
      doc.setFont('helvetica', 'bold')
      doc.setFontSize(8)
      doc.text(String(item.label || '').toUpperCase(), x + 5, y + 6)
      doc.setTextColor(24, 24, 27)
      doc.setFont('helvetica', 'bold')
      doc.setFontSize(12)
      addWrappedText(doc, item.value, x + 5, y + 12, cardWidth - 10, 5)

      if (index % 2 === 1 || index === summaryItems.length - 1) {
        cursorY += 22
      }
    })
    cursorY += 2
  }

  if (!sessions.length) {
    ensureSpace(12)
    doc.setFont('helvetica', 'normal')
    doc.setFontSize(11)
    doc.text('No session records matched the selected filter.', margin, cursorY)
    doc.save(fileName)
    return
  }

  sessions.forEach((session, index) => {
    ensureSpace(26)

    if (index > 0) {
      doc.setDrawColor(224, 229, 235)
      doc.line(margin, cursorY, pageWidth - margin, cursorY)
      cursorY += 8
    }

    doc.setFont('helvetica', 'bold')
    doc.setFontSize(16)
    doc.setTextColor(17, 136, 248)
    doc.text(session.title || `Session ${index + 1}`, margin, cursorY)
    cursorY += 7

    drawMetaLine('Date', session.date)
    drawMetaLine('Topic', session.topic || 'No topic recorded')
    drawMetaLine('Time', `${session.started || 'No start time'}${session.ended ? ` to ${session.ended}` : ''}`)
    drawMetaLine(
      'Summary',
      `Recited: ${session.recitationSummary?.recitedCount ?? 0} | Picked but absent: ${session.recitationSummary?.absentCount ?? 0} | Did not recite: ${session.recitationSummary?.notRecitedCount ?? 0}`,
    )
    drawMetaLine(
      'Points',
      `${session.pointsLabel || session.points || 0} total points | Average score: ${session.averageScoreLabel || 0}`,
    )
    cursorY += 1

    drawRecordingSheet(session.sessionRosterRows)
    drawRecitedSection(session.recitedStudentRows)
    drawSectionList('Picked But Absent', session.absentStudentEntries, [182, 106, 0])
    drawSectionList('Did Not Recite', session.notRecitedStudentEntries, [209, 17, 17])
    cursorY += 4
  })

  doc.save(fileName)
}

export const downloadElementAsPdf = async ({
  element,
  fileName = 'document.pdf',
  orientation = 'landscape',
  format = 'a4',
  margin = 10,
  backgroundColor = '#ffffff',
  scale = 2,
  targetWidth,
  targetHeight,
}) => {
  if (!element || typeof window === 'undefined') return
  const [html2canvas, jsPDF] = await Promise.all([loadHtml2Canvas(), loadJsPdf()])

  const canvas = await html2canvas(element, {
    scale,
    useCORS: true,
    backgroundColor,
  })

  const imageData = canvas.toDataURL('image/png')
  const doc = new jsPDF({
    orientation,
    unit: 'mm',
    format,
  })

  const pageWidth = doc.internal.pageSize.getWidth()
  const pageHeight = doc.internal.pageSize.getHeight()
  const maxWidth = Number.isFinite(targetWidth) ? Math.min(targetWidth, pageWidth - margin * 2) : pageWidth - margin * 2
  const maxHeight = Number.isFinite(targetHeight) ? Math.min(targetHeight, pageHeight - margin * 2) : pageHeight - margin * 2
  const imageRatio = canvas.width / canvas.height

  let renderWidth = maxWidth
  let renderHeight = renderWidth / imageRatio

  if (renderHeight > maxHeight) {
    renderHeight = maxHeight
    renderWidth = renderHeight * imageRatio
  }

  const x = (pageWidth - renderWidth) / 2
  const y = (pageHeight - renderHeight) / 2

  doc.addImage(imageData, 'PNG', x, y, renderWidth, renderHeight, undefined, 'FAST')
  doc.save(fileName)
}

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

export const downloadElementAsPdf = async ({
  element,
  fileName = 'document.pdf',
  orientation = 'landscape',
  format = 'a4',
  margin = 10,
  backgroundColor = '#ffffff',
}) => {
  if (!element || typeof window === 'undefined') return
  const [html2canvas, jsPDF] = await Promise.all([loadHtml2Canvas(), loadJsPdf()])

  const canvas = await html2canvas(element, {
    scale: 2,
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
  const maxWidth = pageWidth - margin * 2
  const maxHeight = pageHeight - margin * 2
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

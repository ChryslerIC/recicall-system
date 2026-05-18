const mathKeywords = [
  'math',
  'mathematics',
  'algebra',
  'geometry',
  'calculus',
  'statistics',
  'trigonometry',
  'quantitative',
  'accounting',
  'business math',
]

const scienceKeywords = [
  'science',
  'biology',
  'chemistry',
  'physics',
  'earth',
  'astronomy',
  'environmental',
  'robotics',
  'stem',
  'laboratory',
  'lab',
]

const literatureArtsKeywords = [
  'english',
  'language',
  'reading',
  'literature',
  'writing',
  'filipino',
  'communication',
  'speech',
  'history',
  'social',
  'araling',
  'panlipunan',
  'humanities',
  'music',
  'arts',
  'art',
  'design',
  'theater',
  'thesis',
]

export const classThemeCatalog = {
  'focus-flow': {
    id: 'focus-flow',
    label: 'Focus Flow',
    shortLabel: 'Focus Flow',
    gradient: 'linear-gradient(135deg, rgb(16, 102, 214) 0%, rgb(36, 90, 194) 46%, rgb(25, 60, 144) 100%)',
    accent: '#93c5fd',
    surface: '#eff6ff',
    glow: 'rgba(147,197,253,0.34)',
    decoration: 'focus-flow',
    engagementFallback: 'High',
  },
  'wonder-mode': {
    id: 'wonder-mode',
    label: 'Wonder Mode',
    shortLabel: 'Wonder Mode',
    gradient: 'linear-gradient(135deg, rgb(21, 163, 74) 0%, rgb(45, 212, 191) 44%, rgb(8, 145, 178) 100%)',
    accent: '#6ee7b7',
    surface: '#ecfdf5',
    glow: 'rgba(110,231,183,0.32)',
    decoration: 'wonder-mode',
    engagementFallback: 'Moderate',
  },
  'creative-spark': {
    id: 'creative-spark',
    label: 'Creative Spark',
    shortLabel: 'Creative Spark',
    gradient: 'linear-gradient(135deg, rgb(245, 129, 0) 0%, rgb(249, 115, 22) 38%, rgb(225, 29, 72) 100%)',
    accent: '#fdba74',
    surface: '#fff7ed',
    glow: 'rgba(251,191,36,0.28)',
    decoration: 'creative-spark',
    engagementFallback: 'Low',
  },
}

const themeKeywordMap = {
  'focus-flow': mathKeywords,
  'wonder-mode': scienceKeywords,
  'creative-spark': literatureArtsKeywords,
}

const legacyThemeIdMap = {
  blue: 'focus-flow',
  green: 'wonder-mode',
  yellow: 'creative-spark',
  math: 'focus-flow',
  science: 'wonder-mode',
  'literature-arts': 'creative-spark',
}

export const classThemeOptions = Object.values(classThemeCatalog)

export const normalizeClassThemeId = (value = '') => {
  const normalizedValue = String(value || '')
    .trim()
    .toLowerCase()
    .replace(/_/g, '-')

  if (classThemeCatalog[normalizedValue]) {
    return normalizedValue
  }

  if (legacyThemeIdMap[normalizedValue]) {
    return legacyThemeIdMap[normalizedValue]
  }

  return ''
}

const subjectIncludesKeyword = (subject = '', keyword = '') =>
  subject.includes(keyword) || subject.replace(/[^a-z0-9]+/g, ' ').includes(keyword)

export const inferSubjectThemeId = (subject = '') => {
  const normalizedSubject = String(subject || '').trim().toLowerCase()

  if (!normalizedSubject) {
    return 'creative-spark'
  }

  if (themeKeywordMap['focus-flow'].some((keyword) => subjectIncludesKeyword(normalizedSubject, keyword))) {
    return 'focus-flow'
  }

  if (themeKeywordMap['wonder-mode'].some((keyword) => subjectIncludesKeyword(normalizedSubject, keyword))) {
    return 'wonder-mode'
  }

  if (
    themeKeywordMap['creative-spark'].some((keyword) =>
      subjectIncludesKeyword(normalizedSubject, keyword),
    )
  ) {
    return 'creative-spark'
  }

  return 'creative-spark'
}

export const resolveClassThemeId = ({ subject = '', gradientId = '' } = {}) => {
  const normalizedThemeId = normalizeClassThemeId(gradientId)

  if (normalizedThemeId && !legacyThemeIdMap[String(gradientId || '').trim().toLowerCase()]) {
    return normalizedThemeId
  }

  if (String(subject || '').trim()) {
    return inferSubjectThemeId(subject)
  }

  return normalizedThemeId || 'creative-spark'
}

export const getClassTheme = (classLike = {}) => {
  const themeId = resolveClassThemeId(classLike)
  return classThemeCatalog[themeId] || classThemeCatalog['creative-spark']
}

export const decorateClassWithTheme = (classLike = {}) => {
  const theme = getClassTheme(classLike)

  return {
    ...classLike,
    gradientId: theme.id,
    gradient: theme.gradient,
    themeLabel: theme.label,
    themeShortLabel: theme.shortLabel,
    themeAccent: theme.accent,
    themeSurface: theme.surface,
    themeGlow: theme.glow,
    themeDecoration: theme.decoration,
  }
}

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
  math: {
    id: 'math',
    label: 'Math',
    shortLabel: 'Math',
    gradient: 'linear-gradient(135deg, rgb(22, 101, 216) 0%, rgb(29, 78, 216) 42%, rgb(30, 64, 175) 100%)',
    accent: '#93c5fd',
    surface: '#eff6ff',
    glow: 'rgba(147,197,253,0.34)',
    decoration: 'math',
    engagementFallback: 'High',
  },
  science: {
    id: 'science',
    label: 'Science',
    shortLabel: 'Science',
    gradient: 'linear-gradient(135deg, rgb(5, 150, 105) 0%, rgb(13, 148, 136) 44%, rgb(6, 95, 70) 100%)',
    accent: '#6ee7b7',
    surface: '#ecfdf5',
    glow: 'rgba(110,231,183,0.32)',
    decoration: 'science',
    engagementFallback: 'Moderate',
  },
  'literature-arts': {
    id: 'literature-arts',
    label: 'Literature & Arts',
    shortLabel: 'Lit & Arts',
    gradient: 'linear-gradient(135deg, rgb(217, 119, 6) 0%, rgb(234, 88, 12) 44%, rgb(190, 24, 93) 100%)',
    accent: '#fdba74',
    surface: '#fff7ed',
    glow: 'rgba(251,191,36,0.28)',
    decoration: 'literature-arts',
    engagementFallback: 'Low',
  },
}

const themeKeywordMap = {
  math: mathKeywords,
  science: scienceKeywords,
  'literature-arts': literatureArtsKeywords,
}

const legacyThemeIdMap = {
  blue: 'math',
  green: 'science',
  yellow: 'literature-arts',
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
    return 'literature-arts'
  }

  if (themeKeywordMap.math.some((keyword) => subjectIncludesKeyword(normalizedSubject, keyword))) {
    return 'math'
  }

  if (themeKeywordMap.science.some((keyword) => subjectIncludesKeyword(normalizedSubject, keyword))) {
    return 'science'
  }

  if (
    themeKeywordMap['literature-arts'].some((keyword) =>
      subjectIncludesKeyword(normalizedSubject, keyword),
    )
  ) {
    return 'literature-arts'
  }

  return 'literature-arts'
}

export const resolveClassThemeId = ({ subject = '', gradientId = '' } = {}) => {
  const normalizedThemeId = normalizeClassThemeId(gradientId)

  if (normalizedThemeId && !legacyThemeIdMap[String(gradientId || '').trim().toLowerCase()]) {
    return normalizedThemeId
  }

  if (String(subject || '').trim()) {
    return inferSubjectThemeId(subject)
  }

  return normalizedThemeId || 'literature-arts'
}

export const getClassTheme = (classLike = {}) => {
  const themeId = resolveClassThemeId(classLike)
  return classThemeCatalog[themeId] || classThemeCatalog['literature-arts']
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

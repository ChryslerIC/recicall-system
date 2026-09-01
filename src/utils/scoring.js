const clamp = (value, min, max) => Math.min(Math.max(value, min), max)

export const QUICK_SCORE_OPTIONS = [1, 3, 5]
export const MAX_POINTS_PER_TURN = 5
export const SCORE_QUALITY_WEIGHT = 60
export const SCORE_CONSISTENCY_WEIGHT = 40

export const SCORE_MODE_GUIDE = [
  { points: 1, label: 'Light response' },
  { points: 3, label: 'Solid response' },
  { points: 5, label: 'Strong response' },
]

export const formatScoreValue = (value) => {
  const safeValue = Math.round(Number(value || 0) * 10) / 10
  return Number.isInteger(safeValue) ? `${safeValue}` : safeValue.toFixed(1)
}

export const parseCustomScoreValue = (value) => {
  const normalized = String(value ?? '').trim()
  if (!normalized) return null

  const numericValue = Number(normalized)
  if (!Number.isFinite(numericValue) || numericValue <= 0) {
    return null
  }

  return Math.round(numericValue * 10) / 10
}

export const calculateParticipationScore = ({
  points = 0,
  sessions = 0,
  trackedSessions = 0,
} = {}) => {
  const safePoints = Math.max(Number(points) || 0, 0)
  const safeSessions = Math.max(Number(sessions) || 0, 0)
  const safeTrackedSessions = Math.max(Number(trackedSessions) || 0, 1)

  const averagePointsPerTurn = safeSessions ? safePoints / safeSessions : 0
  const qualityRatio = clamp(averagePointsPerTurn / MAX_POINTS_PER_TURN, 0, 1)
  const consistencyRatio = clamp(safeSessions / safeTrackedSessions, 0, 1)

  return Math.round(
    clamp(
      qualityRatio * SCORE_QUALITY_WEIGHT + consistencyRatio * SCORE_CONSISTENCY_WEIGHT,
      0,
      100,
    ),
  )
}

export const PARTICIPATION_SCORE_EXPLANATION =
  'Participation score = average points per turn (60%) + joined class sessions (40%).'

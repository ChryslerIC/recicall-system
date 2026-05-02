const makeFilterStyle = (filter) => ({ filter })

export const inactiveNavIconStyle = makeFilterStyle(
  'brightness(0) saturate(100%) invert(48%) sepia(0%) saturate(0%) hue-rotate(180deg) brightness(96%) contrast(89%)',
)

export const activeNavIconStyle = makeFilterStyle(
  'brightness(0) saturate(100%) invert(48%) sepia(84%) saturate(2918%) hue-rotate(191deg) brightness(100%) contrast(95%)',
)

export const navIconStyle = (isActive) => (isActive ? activeNavIconStyle : inactiveNavIconStyle)

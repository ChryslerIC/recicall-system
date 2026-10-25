const normalizeNamePart = (value) => String(value || '').trim().replace(/\s+/g, ' ')

const surnameParticles = new Set([
  'da',
  'das',
  'de',
  'del',
  'dela',
  'den',
  'der',
  'di',
  'dos',
  'du',
  'la',
  'las',
  'le',
  'los',
  'san',
  'santa',
  'st',
  'van',
  'von',
])

export const splitStudentName = (profile = {}, displayName = profile.displayName || '') => {
  const firstName = normalizeNamePart(profile.firstName)
  const lastName = normalizeNamePart(profile.lastName)

  if (firstName || lastName) {
    return {
      firstName: firstName || normalizeNamePart(displayName),
      lastName,
    }
  }

  const parts = normalizeNamePart(displayName).split(' ').filter(Boolean)
  if (parts.length <= 1) {
    return { firstName: parts[0] || '', lastName: '' }
  }

  let surnameStart = parts.length - 1
  while (surnameStart > 0 && surnameParticles.has(parts[surnameStart - 1].toLocaleLowerCase())) {
    surnameStart -= 1
  }

  return {
    firstName: parts.slice(0, surnameStart).join(' '),
    lastName: parts.slice(surnameStart).join(' '),
  }
}

import defaultAvatar from '../assets/avatars/DefaultAvatar.png'
import avatar1 from '../assets/avatars/Avatar1.png'
import avatar2 from '../assets/avatars/Avatar2.png'
import avatar3 from '../assets/avatars/Avatar3.png'
import avatar4 from '../assets/avatars/Avatar4.png'

export const defaultStudentAvatarKey = 'default'

export const studentAvatarOptions = [
  { key: defaultStudentAvatarKey, label: 'Default', src: defaultAvatar },
  { key: 'avatar-1', label: 'Avatar 1', src: avatar1 },
  { key: 'avatar-2', label: 'Avatar 2', src: avatar2 },
  { key: 'avatar-3', label: 'Avatar 3', src: avatar3 },
  { key: 'avatar-4', label: 'Avatar 4', src: avatar4 },
]

export const sanitizeStudentAvatarKey = (avatarKey) =>
  studentAvatarOptions.some((option) => option.key === avatarKey)
    ? avatarKey
    : defaultStudentAvatarKey

export const resolveStudentAvatar = (avatarKey, fallbackPhotoURL = '') => {
  const matchedOption = studentAvatarOptions.find((option) => option.key === avatarKey)

  if (matchedOption) {
    return matchedOption.src
  }

  return fallbackPhotoURL || defaultAvatar
}

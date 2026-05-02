import defaultTeacherAvatar from '../assets/icons/recicall-profile.svg'
import teacherAvatar1 from '../assets/teacher-avatars/teacher-avatar-1.png'
import teacherAvatar2 from '../assets/teacher-avatars/teacher-avatar-2.png'
import teacherAvatar3 from '../assets/teacher-avatars/teacher-avatar-3.png'
import teacherAvatar4 from '../assets/teacher-avatars/teacher-avatar-4.png'
import teacherAvatar5 from '../assets/teacher-avatars/teacher-avatar-5.png'
import teacherAvatar6 from '../assets/teacher-avatars/teacher-avatar-6.png'

export const defaultTeacherAvatarKey = 'default'

export const teacherAvatarOptions = [
  { key: defaultTeacherAvatarKey, label: 'Default', src: defaultTeacherAvatar },
  { key: 'teacher-avatar-1', label: 'Avatar 1', src: teacherAvatar1 },
  { key: 'teacher-avatar-2', label: 'Avatar 2', src: teacherAvatar2 },
  { key: 'teacher-avatar-3', label: 'Avatar 3', src: teacherAvatar3 },
  { key: 'teacher-avatar-4', label: 'Avatar 4', src: teacherAvatar4 },
  { key: 'teacher-avatar-5', label: 'Avatar 5', src: teacherAvatar5 },
  { key: 'teacher-avatar-6', label: 'Avatar 6', src: teacherAvatar6 },
]

export const sanitizeTeacherAvatarKey = (avatarKey, { allowEmpty = false } = {}) => {
  if (allowEmpty && avatarKey === '') {
    return ''
  }

  return teacherAvatarOptions.some((option) => option.key === avatarKey)
    ? avatarKey
    : defaultTeacherAvatarKey
}

export const resolveTeacherAvatar = (avatarKey, fallbackPhotoURL = '') => {
  const matchedOption = teacherAvatarOptions.find((option) => option.key === avatarKey)

  if (matchedOption) {
    return matchedOption.src
  }

  return fallbackPhotoURL || defaultTeacherAvatar
}

const CLOUDINARY_CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME || ''
const CLOUDINARY_UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET || ''
const CLOUDINARY_UPLOAD_FOLDER =
  import.meta.env.VITE_CLOUDINARY_UPLOAD_FOLDER || 'recicall/profile-photos'

const MAX_PROFILE_IMAGE_SIZE_BYTES = 5 * 1024 * 1024

const assertCloudinaryConfig = () => {
  if (!CLOUDINARY_CLOUD_NAME || !CLOUDINARY_UPLOAD_PRESET) {
    throw new Error(
      'Cloudinary is not configured yet. Add VITE_CLOUDINARY_CLOUD_NAME and VITE_CLOUDINARY_UPLOAD_PRESET to your environment variables.',
    )
  }
}

const assertProfileImageFile = (file) => {
  if (!file) {
    throw new Error('No profile image file was provided.')
  }

  if (!String(file.type || '').startsWith('image/')) {
    throw new Error('Only image files can be uploaded as a profile photo.')
  }

  if (Number(file.size || 0) > MAX_PROFILE_IMAGE_SIZE_BYTES) {
    throw new Error('Profile photos must be 5 MB or smaller.')
  }
}

export const uploadProfilePhotoToCloudinary = async (file, { userId = '' } = {}) => {
  assertCloudinaryConfig()
  assertProfileImageFile(file)

  const formData = new FormData()
  formData.append('file', file)
  formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET)
  formData.append('folder', CLOUDINARY_UPLOAD_FOLDER)

  if (userId) {
    formData.append('tags', `recicall,profile-photo,${userId}`)
    formData.append('context', `app=recicall|owner=${userId}`)
  }

  const response = await fetch(
    `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`,
    {
      method: 'POST',
      body: formData,
    },
  )

  const result = await response.json().catch(() => ({}))

  if (!response.ok) {
    throw new Error(
      result?.error?.message || 'Cloudinary upload failed. Please try again.',
    )
  }

  return {
    photoURL: result.secure_url || result.url || '',
    cloudinaryPublicId: result.public_id || '',
    assetId: result.asset_id || '',
    format: result.format || '',
  }
}

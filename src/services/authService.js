import {
  createUserWithEmailAndPassword,
  deleteUser,
  GoogleAuthProvider,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from 'firebase/auth'
import { auth } from '../config/firebase'
import { uploadProfilePhotoToCloudinary } from './cloudinaryService'

const googleProvider = new GoogleAuthProvider()

export const loginUser = (email, password) => {
  return signInWithEmailAndPassword(auth, email, password)
}

export const registerUser = (email, password) => {
  return createUserWithEmailAndPassword(auth, email, password)
}

export const requestPasswordReset = (email) => {
  return sendPasswordResetEmail(auth, email)
}

export const requestCurrentUserPasswordReset = () => {
  const email = auth.currentUser?.email
  if (!email) {
    throw new Error('No email address is available for this account.')
  }

  return sendPasswordResetEmail(auth, email)
}

export const signInWithGoogle = () => {
  return signInWithPopup(auth, googleProvider)
}

export const logoutUser = () => {
  return signOut(auth)
}

export const assertRecentAuthentication = (maxAgeMs = 5 * 60 * 1000) => {
  const user = auth.currentUser
  if (!user) {
    const error = new Error('No authenticated user found.')
    error.code = 'auth/no-current-user'
    throw error
  }

  const lastSignInTime = user.metadata?.lastSignInTime
  const lastSignInMs = lastSignInTime ? new Date(lastSignInTime).getTime() : 0

  if (!lastSignInMs || Number.isNaN(lastSignInMs) || Date.now() - lastSignInMs > maxAgeMs) {
    const error = new Error('Recent login required before account deletion.')
    error.code = 'auth/requires-recent-login'
    throw error
  }
}

export const deleteCurrentUserAccount = async () => {
  const user = auth.currentUser
  if (!user) {
    throw new Error('No authenticated user found.')
  }

  await deleteUser(user)
}

const withTimeout = (promise, timeoutMs, message) => {
  let timerId

  const timeoutPromise = new Promise((_, reject) => {
    timerId = window.setTimeout(() => {
      reject(new Error(message))
    }, timeoutMs)
  })

  return Promise.race([promise, timeoutPromise]).finally(() => {
    window.clearTimeout(timerId)
  })
}

export const updateCurrentUserAccount = async ({ displayName, photoFile, photoURL } = {}) => {
  const user = auth.currentUser
  if (!user) {
    throw new Error('No authenticated user found.')
  }

  let nextPhotoURL = typeof photoURL === 'string' ? photoURL : undefined
  let photoUploadError = ''
  let cloudinaryPublicId = ''
  let cloudinaryAssetId = ''
  let cloudinaryFormat = ''

  if (photoFile) {
    try {
      const uploadResult = await withTimeout(
        uploadProfilePhotoToCloudinary(photoFile, { userId: user.uid }),
        20000,
        'Profile photo upload timed out. Please try again.',
      )
      nextPhotoURL = uploadResult.photoURL
      cloudinaryPublicId = uploadResult.cloudinaryPublicId
      cloudinaryAssetId = uploadResult.assetId
      cloudinaryFormat = uploadResult.format
    } catch (error) {
      photoUploadError = error?.message || 'Unable to upload profile photo right now.'
    }
  }

  const updatePayload = {
    displayName: displayName ?? user.displayName ?? '',
  }

  if (typeof nextPhotoURL === 'string') {
    updatePayload.photoURL = nextPhotoURL
  }

  await withTimeout(
    updateProfile(user, updatePayload),
    10000,
    'Profile update timed out. Please try again.',
  )

  return {
    displayName: user.displayName || displayName || '',
    photoURL: typeof nextPhotoURL === 'string' ? nextPhotoURL : '',
    cloudinaryPublicId,
    cloudinaryAssetId,
    cloudinaryFormat,
    photoUploadError,
  }
}

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
import { getDownloadURL, ref as storageRef, uploadBytes } from 'firebase/storage'
import { auth, storage } from '../config/firebase'

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

  if (photoFile) {
    try {
      const profilePhotoRef = storageRef(storage, `profile-photos/${user.uid}/${Date.now()}-${photoFile.name}`)
      await withTimeout(
        uploadBytes(profilePhotoRef, photoFile),
        15000,
        'Profile photo upload timed out. Please try again.',
      )
      const uploadedPhotoURL = await withTimeout(
        getDownloadURL(profilePhotoRef),
        10000,
        'Unable to retrieve the uploaded profile photo. Please try again.',
      )
      nextPhotoURL = uploadedPhotoURL
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
    photoUploadError,
  }
}

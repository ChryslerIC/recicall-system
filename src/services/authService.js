import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
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

export const signInWithGoogle = () => {
  return signInWithPopup(auth, googleProvider)
}

export const logoutUser = () => {
  return signOut(auth)
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

export const updateCurrentUserAccount = async ({ displayName, photoFile }) => {
  const user = auth.currentUser
  if (!user) {
    throw new Error('No authenticated user found.')
  }

  let photoURL = user.photoURL || ''
  let photoUploadError = ''

  if (photoFile) {
    try {
      const profilePhotoRef = storageRef(storage, `profile-photos/${user.uid}/${Date.now()}-${photoFile.name}`)
      await withTimeout(
        uploadBytes(profilePhotoRef, photoFile),
        15000,
        'Profile photo upload timed out. Please try again.',
      )
      photoURL = await withTimeout(
        getDownloadURL(profilePhotoRef),
        10000,
        'Unable to retrieve the uploaded profile photo. Please try again.',
      )
    } catch (error) {
      photoUploadError = error?.message || 'Unable to upload profile photo right now.'
    }
  }

  await withTimeout(
    updateProfile(user, {
      displayName: displayName ?? user.displayName ?? '',
      photoURL,
    }),
    10000,
    'Profile update timed out. Please try again.',
  )

  return {
    displayName: user.displayName || displayName || '',
    photoURL: user.photoURL || photoURL || '',
    photoUploadError,
  }
}

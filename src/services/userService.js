import { doc, getDoc, setDoc } from 'firebase/firestore'
import { db } from '../config/firebase'

export const getUserById = async (uid) => {
  const userRef = doc(db, 'users', uid)
  const userSnap = await getDoc(userRef)

  if (userSnap.exists()) {
    return userSnap.data()
  } else {
    return null
  }
}

export const createUserProfile = async (uid, userData) => {
  const userRef = doc(db, 'users', uid)
  await setDoc(userRef, userData)
}

export const upsertUserProfile = async (uid, userData) => {
  const userRef = doc(db, 'users', uid)
  await setDoc(userRef, userData, { merge: true })
}

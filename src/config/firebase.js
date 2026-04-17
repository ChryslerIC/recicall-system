import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
  apiKey: 'AIzaSyBB-nYYCMoEw4_Hl9XR_7qdeQqXOj8zSIY',
  authDomain: 'recicall-433b9.firebaseapp.com',
  projectId: 'recicall-433b9',
  storageBucket: 'recicall-433b9.firebasestorage.app',
  messagingSenderId: '946251414432',
  appId: '1:946251414432:web:17de8d862f0be04f7a82c5',
}

const app = initializeApp(firebaseConfig)

export const auth = getAuth(app)
export const db = getFirestore(app)
export const storage = getStorage(app)
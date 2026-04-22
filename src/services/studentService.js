import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  serverTimestamp,
  setDoc,
} from 'firebase/firestore'
import { db } from '../config/firebase'

const studentClassesCollection = (studentId) => collection(db, 'users', studentId, 'enrolledClasses')
const teacherClassStudentRef = (teacherId, classId, studentId) =>
  doc(db, 'users', teacherId, 'classes', classId, 'students', studentId)
const removeUndefinedValues = (value) =>
  Object.fromEntries(Object.entries(value).filter(([, entryValue]) => entryValue !== undefined))

export const getStudentClasses = async (studentId) => {
  const snapshot = await getDocs(studentClassesCollection(studentId))
  return snapshot.docs.map((classDoc) => ({
    id: classDoc.id,
    ...classDoc.data(),
  }))
}

export const findTeacherClassByJoinCode = async (joinCode) => {
  const normalizedCode = joinCode.trim().toUpperCase()
  const usersSnapshot = await getDocs(collection(db, 'users'))

  for (const teacherDoc of usersSnapshot.docs) {
    const classesSnapshot = await getDocs(collection(db, 'users', teacherDoc.id, 'classes'))
    const classDoc = classesSnapshot.docs.find((item) => {
      const data = item.data()
      return String(data.joinCode || '').trim().toUpperCase() === normalizedCode && !data.archived
    })

    if (classDoc) {
      return {
        id: classDoc.id,
        teacherId: teacherDoc.id,
        ...classDoc.data(),
      }
    }
  }

  return null
}

export const enrollStudentInClass = async (studentId, classData, studentProfile = {}) => {
  const classRef = doc(db, 'users', studentId, 'enrolledClasses', classData.id)
  const existingClass = await getDoc(classRef)

  const mirroredStudentPayload = removeUndefinedValues({
    studentId,
    displayName: studentProfile.displayName,
    gradeLevel: studentProfile.gradeLevel,
    photoURL: studentProfile.photoURL,
    email: studentProfile.email,
    joinedAt: serverTimestamp(),
  })

  if (existingClass.exists()) {
    const existingClassData = existingClass.data()
    const teacherId = existingClassData.teacherId || classData.teacherId

    if (teacherId) {
      await setDoc(
        teacherClassStudentRef(teacherId, classData.id, studentId),
        mirroredStudentPayload,
        { merge: true },
      )
    }

    return { alreadyJoined: true }
  }

  await setDoc(
    classRef,
    removeUndefinedValues({
      ...classData,
      joinedAt: serverTimestamp(),
    }),
  )

  await setDoc(
    teacherClassStudentRef(classData.teacherId, classData.id, studentId),
    mirroredStudentPayload,
  )

  return { alreadyJoined: false }
}

export const leaveStudentClass = async (studentId, classId) => {
  const classRef = doc(db, 'users', studentId, 'enrolledClasses', classId)
  const existingClass = await getDoc(classRef)

  if (existingClass.exists()) {
    const classData = existingClass.data()
    if (classData.teacherId) {
      await deleteDoc(teacherClassStudentRef(classData.teacherId, classId, studentId))
    }
  }

  await deleteDoc(classRef)
}

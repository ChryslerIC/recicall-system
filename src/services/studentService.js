import {
  collection,
  collectionGroup,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  limit,
  query,
  serverTimestamp,
  setDoc,
  where,
} from 'firebase/firestore'
import { db } from '../config/firebase'

const studentClassesCollection = (studentId) => collection(db, 'users', studentId, 'enrolledClasses')
const teacherClassRef = (teacherId, classId) => doc(db, 'users', teacherId, 'classes', classId)
const teacherClassStudentsCollection = (teacherId, classId) =>
  collection(db, 'users', teacherId, 'classes', classId, 'students')
const teacherClassParticipationCollection = (teacherId, classId) =>
  collection(db, 'users', teacherId, 'classes', classId, 'participationEvents')
const teacherClassStudentRef = (teacherId, classId, studentId) =>
  doc(db, 'users', teacherId, 'classes', classId, 'students', studentId)
const removeUndefinedValues = (value) =>
  Object.fromEntries(Object.entries(value).filter(([, entryValue]) => entryValue !== undefined))

const sortParticipationEvents = (events = []) =>
  [...events].sort((left, right) => {
    const leftTime = left.createdAt?.seconds || 0
    const rightTime = right.createdAt?.seconds || 0
    return leftTime - rightTime
  })

export const getStudentClasses = async (studentId) => {
  const snapshot = await getDocs(studentClassesCollection(studentId))
  return snapshot.docs.map((classDoc) => ({
    id: classDoc.id,
    ...classDoc.data(),
  }))
}

export const getStudentClassroomView = async (teacherId, classId) => {
  const classSnapshot = await getDoc(teacherClassRef(teacherId, classId))

  if (!classSnapshot.exists()) {
    return null
  }

  const [studentsSnapshot, participationSnapshot] = await Promise.all([
    getDocs(teacherClassStudentsCollection(teacherId, classId)),
    getDocs(teacherClassParticipationCollection(teacherId, classId)),
  ])

  const enrolledStudents = studentsSnapshot.docs.map((studentDoc) => ({
    id: studentDoc.id,
    ...studentDoc.data(),
  }))

  const participationEvents = sortParticipationEvents(
    participationSnapshot.docs.map((eventDoc) => ({
      id: eventDoc.id,
      ...eventDoc.data(),
    })),
  )

  return {
    id: classSnapshot.id,
    ...classSnapshot.data(),
    enrolledStudents,
    participationEvents,
    students: enrolledStudents.length,
  }
}

export const findTeacherClassByJoinCode = async (joinCode) => {
  const normalizedCode = joinCode.trim().toUpperCase()
  const classesSnapshot = await getDocs(
    query(collectionGroup(db, 'classes'), where('joinCode', '==', normalizedCode), limit(1)),
  )
  const classDoc = classesSnapshot.docs.find((item) => !item.data().archived)

  if (!classDoc) {
    return null
  }

  return {
    id: classDoc.id,
    teacherId: classDoc.ref.parent.parent?.id || '',
    ...classDoc.data(),
  }
}

export const enrollStudentInClass = async (studentId, classData, studentProfile = {}) => {
  const classRef = doc(db, 'users', studentId, 'enrolledClasses', classData.id)
  const existingClass = await getDoc(classRef)

  const mirroredStudentPayload = removeUndefinedValues({
    studentId,
    displayName: studentProfile.displayName,
    gradeLevel: studentProfile.gradeLevel,
    photoURL: studentProfile.photoURL,
    avatarKey: studentProfile.avatarKey,
    email: studentProfile.email,
    studentNumber: studentProfile.studentNumber,
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

export const syncStudentProfileAcrossClasses = async (studentId, studentProfile = {}) => {
  const enrolledClassesSnapshot = await getDocs(studentClassesCollection(studentId))
  const mirroredStudentPayload = removeUndefinedValues({
    studentId,
    displayName: studentProfile.displayName,
    gradeLevel: studentProfile.gradeLevel,
    photoURL: studentProfile.photoURL,
    avatarKey: studentProfile.avatarKey,
    email: studentProfile.email,
    studentNumber: studentProfile.studentNumber,
    updatedAt: serverTimestamp(),
  })

  await Promise.all(
    enrolledClassesSnapshot.docs.map(async (classDoc) => {
      const classData = classDoc.data()
      if (!classData.teacherId) return

      await setDoc(
        teacherClassStudentRef(classData.teacherId, classDoc.id, studentId),
        mirroredStudentPayload,
        { merge: true },
      )
    }),
  )
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

export const deleteStudentAccountData = async (studentId) => {
  const enrolledClassesSnapshot = await getDocs(studentClassesCollection(studentId))

  await Promise.all(
    enrolledClassesSnapshot.docs.map(async (classDoc) => {
      const classData = classDoc.data()

      if (classData.teacherId) {
        await deleteDoc(teacherClassStudentRef(classData.teacherId, classDoc.id, studentId))
      }

      await deleteDoc(classDoc.ref)
    }),
  )
}

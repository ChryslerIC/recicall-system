import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  increment,
  serverTimestamp,
  setDoc,
  updateDoc,
} from 'firebase/firestore'
import { db } from '../config/firebase'

const teacherClassesCollection = (teacherId) => collection(db, 'users', teacherId, 'classes')
const teacherClassStudentsCollection = (teacherId, classId) => collection(db, 'users', teacherId, 'classes', classId, 'students')
const teacherClassStudentRef = (teacherId, classId, studentId) =>
  doc(db, 'users', teacherId, 'classes', classId, 'students', studentId)
const teacherClassParticipationCollection = (teacherId, classId) =>
  collection(db, 'users', teacherId, 'classes', classId, 'participationEvents')
const createJoinCode = () => Math.random().toString(36).slice(2, 8).toUpperCase()
const removeUndefinedValues = (value) =>
  Object.fromEntries(Object.entries(value).filter(([, entryValue]) => entryValue !== undefined))

const getEnrolledStudentsForTeacherClass = async (teacherId, classId) => {
  const mirroredStudentsSnapshot = await getDocs(teacherClassStudentsCollection(teacherId, classId))
  const mirroredStudents = mirroredStudentsSnapshot.docs.map((studentDoc) => ({
    id: studentDoc.id,
    ...studentDoc.data(),
  }))

  if (mirroredStudents.length > 0) {
    return mirroredStudents
  }

  const usersSnapshot = await getDocs(collection(db, 'users'))
  const enrolledStudents = []

  for (const userDoc of usersSnapshot.docs) {
    const enrolledClassesSnapshot = await getDocs(collection(db, 'users', userDoc.id, 'enrolledClasses'))
    const matchedClass = enrolledClassesSnapshot.docs.find(
      (classDoc) => classDoc.id === classId && classDoc.data().teacherId === teacherId,
    )

    if (!matchedClass) continue

    const userData = userDoc.data()
    enrolledStudents.push({
      id: userDoc.id,
      studentId: userDoc.id,
      displayName: userData.displayName,
      photoURL: userData.photoURL,
      avatarKey: userData.avatarKey,
      email: userData.email,
      gradeLevel: userData.gradeLevel,
      joinedAt: matchedClass.data().joinedAt,
    })
  }

  return enrolledStudents
}

const getParticipationEventsForTeacherClass = async (teacherId, classId) => {
  const snapshot = await getDocs(teacherClassParticipationCollection(teacherId, classId))

  return snapshot.docs
    .map((eventDoc) => ({
      id: eventDoc.id,
      ...eventDoc.data(),
    }))
    .sort((left, right) => {
      const leftTime = left.createdAt?.seconds || 0
      const rightTime = right.createdAt?.seconds || 0
      return leftTime - rightTime
    })
}

const sortClasses = (classes) =>
  [...classes].sort((left, right) => {
    if (left.sortOrder !== right.sortOrder) {
      return (left.sortOrder || 0) - (right.sortOrder || 0)
    }

    const leftTime = left.createdAt?.seconds || 0
    const rightTime = right.createdAt?.seconds || 0
    return leftTime - rightTime
  })

export const getTeacherClasses = async (teacherId, { archived = false } = {}) => {
  const snapshot = await getDocs(teacherClassesCollection(teacherId))
  const classes = await Promise.all(
    snapshot.docs.map(async (classDoc) => {
      const enrolledStudents = await getEnrolledStudentsForTeacherClass(teacherId, classDoc.id)

      return {
        id: classDoc.id,
        ...classDoc.data(),
        enrolledStudents,
        students: enrolledStudents.length,
      }
    }),
  )

  return sortClasses(classes.filter((classItem) => Boolean(classItem.archived) === archived))
}

export const getTeacherClassById = async (teacherId, classId) => {
  const classRef = doc(db, 'users', teacherId, 'classes', classId)
  const snapshot = await getDoc(classRef)

  if (!snapshot.exists()) {
    return null
  }

  const [enrolledStudents, participationEvents] = await Promise.all([
    getEnrolledStudentsForTeacherClass(teacherId, classId),
    getParticipationEventsForTeacherClass(teacherId, classId),
  ])

  return {
    id: snapshot.id,
    ...snapshot.data(),
    enrolledStudents,
    participationEvents,
    students: enrolledStudents.length,
  }
}

export const createTeacherClass = async (teacherId, classData) => {
  const payload = {
    ...classData,
    archived: false,
    joinCode: classData.joinCode || createJoinCode(),
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  }

  const classRef = await addDoc(teacherClassesCollection(teacherId), payload)
  return classRef.id
}

export const updateTeacherClass = async (teacherId, classId, classData) => {
  const classRef = doc(db, 'users', teacherId, 'classes', classId)
  await updateDoc(classRef, {
    ...classData,
    updatedAt: serverTimestamp(),
  })
}

export const archiveTeacherClass = async (teacherId, classId) => {
  const classRef = doc(db, 'users', teacherId, 'classes', classId)
  await updateDoc(classRef, {
    archived: true,
    archivedAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  })
}

export const restoreTeacherClass = async (teacherId, classId) => {
  const classRef = doc(db, 'users', teacherId, 'classes', classId)
  await updateDoc(classRef, {
    archived: false,
    archivedAt: null,
    updatedAt: serverTimestamp(),
  })
}

export const permanentlyDeleteTeacherClass = async (teacherId, classId) => {
  const classRef = doc(db, 'users', teacherId, 'classes', classId)
  await deleteDoc(classRef)
}

export const recordStudentParticipation = async (teacherId, classId, studentPayload, points) => {
  const studentId = studentPayload.studentId || studentPayload.id

  if (!teacherId || !classId || !studentId) {
    throw new Error('Missing teacher, class, or student information.')
  }

  const safePoints = Number(points) || 0
  const payload = removeUndefinedValues({
    studentId,
    displayName: studentPayload.displayName,
    email: studentPayload.email,
    studentNumber: studentPayload.studentNumber,
    photoURL: studentPayload.photoURL,
    avatarKey: studentPayload.avatarKey,
    latestPoints: safePoints,
    totalPoints: increment(safePoints),
    participatedSessions: increment(1),
    lastParticipationAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  })

  await setDoc(teacherClassStudentRef(teacherId, classId, studentId), payload, { merge: true })

  await addDoc(teacherClassParticipationCollection(teacherId, classId), removeUndefinedValues({
    studentId,
    displayName: studentPayload.displayName,
    studentNumber: studentPayload.studentNumber,
    photoURL: studentPayload.photoURL,
    avatarKey: studentPayload.avatarKey,
    points: safePoints,
    createdAt: serverTimestamp(),
  }))
}

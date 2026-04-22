import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  serverTimestamp,
  updateDoc,
} from 'firebase/firestore'
import { db } from '../config/firebase'

const teacherClassesCollection = (teacherId) => collection(db, 'users', teacherId, 'classes')
const teacherClassStudentsCollection = (teacherId, classId) => collection(db, 'users', teacherId, 'classes', classId, 'students')
const createJoinCode = () => Math.random().toString(36).slice(2, 8).toUpperCase()

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
      email: userData.email,
      gradeLevel: userData.gradeLevel,
      joinedAt: matchedClass.data().joinedAt,
    })
  }

  return enrolledStudents
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

  const enrolledStudents = await getEnrolledStudentsForTeacherClass(teacherId, classId)

  return {
    id: snapshot.id,
    ...snapshot.data(),
    enrolledStudents,
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

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
  Timestamp,
  updateDoc,
} from 'firebase/firestore'
import { db } from '../config/firebase'

const teacherClassesCollection = (teacherId) => collection(db, 'users', teacherId, 'classes')
const teacherClassStudentsCollection = (teacherId, classId) => collection(db, 'users', teacherId, 'classes', classId, 'students')
const teacherClassStudentRef = (teacherId, classId, studentId) =>
  doc(db, 'users', teacherId, 'classes', classId, 'students', studentId)
const studentEnrolledClassRef = (studentId, classId) =>
  doc(db, 'users', studentId, 'enrolledClasses', classId)
const teacherClassParticipationCollection = (teacherId, classId) =>
  collection(db, 'users', teacherId, 'classes', classId, 'participationEvents')
const createJoinCode = () => Math.random().toString(36).slice(2, 8).toUpperCase()
const removeUndefinedValues = (value) =>
  Object.fromEntries(Object.entries(value).filter(([, entryValue]) => entryValue !== undefined))
const sanitizeSessionRosterSnapshot = (rosterSnapshot = []) =>
  Array.isArray(rosterSnapshot)
    ? rosterSnapshot.map((student, index) =>
        removeUndefinedValues({
          id: student.id || student.studentId || `student-${index}`,
          studentId: student.studentId || student.id || `student-${index}`,
          displayName: student.displayName || student.name || student.email || `Student ${index + 1}`,
          email: student.email || '',
          studentNumber: student.studentNumber || '',
          avatarKey: student.avatarKey || '',
          photoURL: student.photoURL || '',
          gradeLevel: student.gradeLevel || '',
        }),
      )
    : []
const getStudentEnrollmentForTeacherClass = async (teacherId, classId, studentId) => {
  const enrollmentSnapshot = await getDoc(studentEnrolledClassRef(studentId, classId))

  if (!enrollmentSnapshot.exists()) {
    return null
  }

  const enrollmentData = enrollmentSnapshot.data()
  return enrollmentData.teacherId === teacherId ? enrollmentData : null
}

const getEnrolledStudentsForTeacherClass = async (teacherId, classId) => {
  const mirroredStudentsSnapshot = await getDocs(teacherClassStudentsCollection(teacherId, classId))
  const mirroredStudents = await Promise.all(
    mirroredStudentsSnapshot.docs.map(async (studentDoc) => {
      const enrollmentData = await getStudentEnrollmentForTeacherClass(teacherId, classId, studentDoc.id)
      if (!enrollmentData) return null

      return {
        id: studentDoc.id,
        ...studentDoc.data(),
      }
    }),
  )

  return mirroredStudents.filter(Boolean)
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

const getClassEngagementLabel = ({ studentsCount = 0, participationEvents = [] } = {}) => {
  const participationOnlyEvents = (Array.isArray(participationEvents) ? participationEvents : []).filter(
    (event) => event?.eventType !== 'absence',
  )

  if (!participationOnlyEvents.length) {
    return 'No activity yet'
  }

  const safeStudentCount = Math.max(Number(studentsCount) || 0, 1)
  const activeStudents = new Set(
    participationOnlyEvents.map((event) => event?.studentId).filter(Boolean),
  ).size
  const sessionKeys = new Set(
    participationOnlyEvents
      .map((event, index) => event?.sessionId || event?.sessionLabel || event?.createdAt?.seconds || `event-${index}`)
      .filter(Boolean),
  ).size

  const activeStudentRatio = activeStudents / safeStudentCount
  const participationDensity = participationOnlyEvents.length / safeStudentCount

  if (activeStudentRatio >= 0.75 || participationDensity >= 1 || sessionKeys >= 4) {
    return 'High'
  }

  if (activeStudentRatio >= 0.35 || participationDensity >= 0.4 || sessionKeys >= 2) {
    return 'Moderate'
  }

  return 'Low'
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
      const participationEvents = await getParticipationEventsForTeacherClass(teacherId, classDoc.id)

      return {
        id: classDoc.id,
        ...classDoc.data(),
        students: enrolledStudents.length,
        engagement: getClassEngagementLabel({
          studentsCount: enrolledStudents.length,
          participationEvents,
        }),
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
    engagement: getClassEngagementLabel({
      studentsCount: enrolledStudents.length,
      participationEvents,
    }),
  }
}

export const createTeacherClass = async (teacherId, classData) => {
  const { students: _ignoredStudents, ...restClassData } = classData
  const payload = {
    ...restClassData,
    archived: false,
    joinCode: restClassData.joinCode || createJoinCode(),
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  }

  const classRef = await addDoc(teacherClassesCollection(teacherId), payload)
  return classRef.id
}

export const updateTeacherClass = async (teacherId, classId, classData) => {
  const { students: _ignoredStudents, ...restClassData } = classData
  const classRef = doc(db, 'users', teacherId, 'classes', classId)
  await updateDoc(classRef, {
    ...restClassData,
    updatedAt: serverTimestamp(),
  })
}

export const updateTeacherClassStudentFeedback = async (
  teacherId,
  classId,
  studentId,
  teacherFeedback = '',
) => {
  if (!teacherId || !classId || !studentId) {
    throw new Error('Missing teacher, class, or student information.')
  }

  const normalizedFeedback = String(teacherFeedback || '').trim()

  await setDoc(
    teacherClassStudentRef(teacherId, classId, studentId),
    {
      studentId,
      teacherFeedback: normalizedFeedback,
      teacherFeedbackUpdatedAt: normalizedFeedback ? serverTimestamp() : null,
      updatedAt: serverTimestamp(),
    },
    { merge: true },
  )
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

export const deleteTeacherAccountData = async (teacherId) => {
  const classesSnapshot = await getDocs(teacherClassesCollection(teacherId))

  await Promise.all(
    classesSnapshot.docs.map(async (classDoc) => {
      const classId = classDoc.id
      const [studentsSnapshot, participationSnapshot] = await Promise.all([
        getDocs(teacherClassStudentsCollection(teacherId, classId)),
        getDocs(teacherClassParticipationCollection(teacherId, classId)),
      ])

      await Promise.all(
        studentsSnapshot.docs.map(async (studentDoc) => {
          await deleteDoc(studentEnrolledClassRef(studentDoc.id, classId))
          await deleteDoc(studentDoc.ref)
        }),
      )

      await Promise.all(
        participationSnapshot.docs.map((eventDoc) => deleteDoc(eventDoc.ref)),
      )

      await deleteDoc(classDoc.ref)
    }),
  )
}

export const recordStudentParticipation = async (teacherId, classId, studentPayload, points, options = {}) => {
  const studentId = studentPayload.studentId || studentPayload.id

  if (!teacherId || !classId || !studentId) {
    throw new Error('Missing teacher, class, or student information.')
  }

  const enrollmentData = await getStudentEnrollmentForTeacherClass(teacherId, classId, studentId)
  if (!enrollmentData) {
    throw new Error('This student is not enrolled in this class. Ask them to join using the class code first.')
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
    eventType: 'participation',
    points: safePoints,
    sessionId: options.sessionId || '',
    sessionName: options.sessionName || '',
    sessionTopic: options.sessionTopic || '',
    createdAt: serverTimestamp(),
  }))
}

export const recordTeacherClassAbsence = async (teacherId, classId, studentPayload, options = {}) => {
  const studentId = studentPayload.studentId || studentPayload.id

  if (!teacherId || !classId || !studentId) {
    throw new Error('Missing teacher, class, or student information.')
  }

  const enrollmentData = await getStudentEnrollmentForTeacherClass(teacherId, classId, studentId)
  if (!enrollmentData) {
    throw new Error('This student is not enrolled in this class. Ask them to join using the class code first.')
  }

  await addDoc(teacherClassParticipationCollection(teacherId, classId), removeUndefinedValues({
    studentId,
    displayName: studentPayload.displayName,
    studentNumber: studentPayload.studentNumber,
    photoURL: studentPayload.photoURL,
    avatarKey: studentPayload.avatarKey,
    eventType: 'absence',
    absenceReason: options.absenceReason || 'called-absent',
    calledByQueue: options.calledByQueue ?? true,
    points: 0,
    sessionId: options.sessionId || '',
    sessionName: options.sessionName || '',
    sessionTopic: options.sessionTopic || '',
    createdAt: serverTimestamp(),
  }))
}

export const startTeacherClassSession = async (teacherId, classId, sessionData = {}) => {
  const classRef = doc(db, 'users', teacherId, 'classes', classId)
  const startedAt = Timestamp.now()

  const activeSession = removeUndefinedValues({
    id: `session-${startedAt.toMillis()}`,
    startedAt,
    name: String(sessionData.name || '').trim(),
    topic: String(sessionData.topic || '').trim(),
    rosterSnapshot: sanitizeSessionRosterSnapshot(sessionData.rosterSnapshot),
  })

  await updateDoc(classRef, {
    activeSession,
    updatedAt: serverTimestamp(),
  })

  return activeSession
}

export const endTeacherClassSession = async (
  teacherId,
  classId,
  sessionHistory = [],
  activeSession = null,
  _sessionSummary = {},
) => {
  if (!activeSession) return null

  const classRef = doc(db, 'users', teacherId, 'classes', classId)
  const endedAt = Timestamp.now()
  const completedSession = removeUndefinedValues({
    ...activeSession,
    endedAt,
  })

  await updateDoc(classRef, {
    activeSession: null,
    sessionHistory: [...(Array.isArray(sessionHistory) ? sessionHistory : []), completedSession],
    updatedAt: serverTimestamp(),
  })

  return completedSession
}

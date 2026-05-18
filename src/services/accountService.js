import {
  assertRecentAuthentication,
  deleteCurrentUserAccount,
} from './authService'
import { deleteStudentAccountData } from './studentService'
import { deleteTeacherAccountData } from './teacherService'
import { deleteUserProfile } from './userService'

export const deleteTeacherAccount = async (teacherId) => {
  assertRecentAuthentication()
  await deleteTeacherAccountData(teacherId)
  await deleteUserProfile(teacherId)
  await deleteCurrentUserAccount()
}

export const deleteStudentAccount = async (studentId) => {
  assertRecentAuthentication()
  await deleteStudentAccountData(studentId)
  await deleteUserProfile(studentId)
  await deleteCurrentUserAccount()
}

export const getDeleteAccountErrorMessage = (error, accountLabel = 'account') => {
  if (error?.code === 'auth/requires-recent-login') {
    return `For security, please log out, log back in, and try deleting your ${accountLabel} again right away.`
  }

  if (error?.code === 'auth/network-request-failed') {
    return `We could not delete your ${accountLabel} because the network request failed. Please try again.`
  }

  if (error?.code === 'permission-denied' || error?.code === 'firestore/permission-denied') {
    return `We could not delete your ${accountLabel} because the app does not have permission to remove all related class records yet.`
  }

  return `We could not delete your ${accountLabel} right now. Please try again.`
}

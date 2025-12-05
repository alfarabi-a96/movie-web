import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile, type User } from 'firebase/auth'
import { auth } from '../../clients/firestore/firestoreClient'
import { errorMap } from '../../utils/helper'
import type { UserCredentials } from '../../types'

// Login user
export const loginUser = async (email: string, password: string) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    )
    return userCredential.user
  } catch (error) {
    throw errorMap(error)
  }
}

// Login user with Google
export const loginUserByGoogle = async () => {
  const provider = new GoogleAuthProvider();
  try {
      const userCredential = await signInWithPopup(auth, provider);
    return userCredential.user
  } catch (error) {
    throw errorMap(error)
  }
}

// Sign up user
export const signUpUser = async (credential: UserCredentials) => {
  const { email, password } = credential
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    return user
  } catch (error) {
    throw errorMap(error)
  }
}

export const updateUser = async (user: User, name: string) => {
  try {
    await updateProfile(user, {
      displayName: name,
    });
  } catch (error) {
    throw errorMap(error)
  }
}

// Logout user
export const logoutUser = async () => {
  await signOut(auth)
}
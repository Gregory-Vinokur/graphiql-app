import { firebaseApp } from './firebase.config';
import {
  User,
  getAuth,
  signInWithEmailAndPassword,
  signOut,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  AuthError,
} from 'firebase/auth';

const auth = getAuth(firebaseApp);

export async function signIn(email: string, password: string) {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (e) {
    const error = e as AuthError;
    return error.code;
  }
}

export function Logout() {
  signOut(auth)
    .then(function () {
      localStorage.removeItem('token');
      localStorage.removeItem('remainingTime');
    })
    .catch(function (error: Error) {
      console.error('Sign out error:', error);
    });
}

export function checkAuthStatus(listener: (user: User | null) => void) {
  onAuthStateChanged(auth, (user) => listener(user));
}

export async function signUp(email: string, password: string) {
  try {
    await createUserWithEmailAndPassword(auth, email, password);
  } catch (e) {
    const error = e as AuthError;
    return error.code;
  }
}

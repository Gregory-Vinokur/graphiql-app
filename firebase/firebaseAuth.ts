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

export function signUp(email: string, password: string) {
  createUserWithEmailAndPassword(auth, email, password).catch(function (error) {
    if (error.code === 'auth/weak-password') {
      console.log('Weak password entered!');
    } else {
      console.error('Error signing up:', error);
    }
  });
}

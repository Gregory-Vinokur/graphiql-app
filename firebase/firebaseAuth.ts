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
    let message = '';
    const error = e as AuthError;
    if (error.code === 'auth/wrong-password') {
      message = 'Wrong password entered!';
    }
    if (error.code === 'auth/user-not-found' || error.code === 'auth/invalid-email') {
      message = 'Wrong user!';
    }
    if (error.code === 'auth/too-many-requests') {
      message = 'Too many requests! Try again later!';
    }
    return message;
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

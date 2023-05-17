import { firebaseApp } from './firebase.config';
import {
  User,
  getAuth,
  signInWithEmailAndPassword,
  signOut,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
} from 'firebase/auth';

const auth = getAuth(firebaseApp);

export function signIn(email: string, password: string) {
  signInWithEmailAndPassword(auth, email, password).catch(function (error) {
    if (error.code === 'auth/wrong-password') {
      console.log('Wrong password entered!');
    }
    if (error.code === 'auth/user-not-found' || error.code === 'auth/invalid-email') {
      console.log('Wrong user!');
    }
    if (error.code === 'auth/too-many-requests') {
      console.log('Too many requests!');
    } else {
      console.error(error.code);
    }
  });
}

export function Logout() {
  signOut(auth)
    .then(function () {
      localStorage.removeItem('token');
      localStorage.removeItem('remainingTime');
      console.log('Sign out successful!');
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

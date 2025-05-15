import { Injectable } from '@angular/core';
import {from, Observable} from 'rxjs';

import {
  Auth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signInWithPopup,
  signOut,
  GoogleAuthProvider,
  UserCredential
} from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {


  constructor(private auth:Auth) { }

  signIn(params: SignIn): Observable<UserCredential> {
    return from(signInWithEmailAndPassword(this.auth, params.email, params.password));
  }

  signUp(params: SignIn): Observable<UserCredential> {
    return from(createUserWithEmailAndPassword(this.auth, params.email, params.password));
  }

  forgetPass(email: string): Observable<void> {
    return from(sendPasswordResetEmail(this.auth, email));
  }

  googleSignUp(): Observable<UserCredential> {
    const provider = new GoogleAuthProvider();
    return from(signInWithPopup(this.auth, provider));
  }

  googleSignOut(): Observable<void> {
    return from(signOut(this.auth));
  }

}
export interface SignIn {
  email: string;
  password: string;
}

import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  constructor(private afAuth: AngularFireAuth, private router: Router) {}

  async signUp(email: string, password: string, confirmPassword: string) {
    if (password !== confirmPassword) {
      throw new Error('Las contraseñas no coinciden');
    }
  
    try {
      const result = await this.afAuth.createUserWithEmailAndPassword(
        email,
        password
      );
      console.log(result);
      return result;
    } catch (error) {
      console.dir(error);
      throw error;
    }
  }
  
  async signIn(email: string, password: string) {
    try {
      const result = await this.afAuth.signInWithEmailAndPassword(email, password);
      console.log(result);
      return result;
    } catch (error) {
      throw error;
    }
  }
  
  async signOut() {
    await this.afAuth.signOut();
    this.router.navigate(['/login']);
  }

}

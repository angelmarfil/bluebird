import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage {
  email!: string;
  password!: string;
  confirmPassword!: string;
  errorMessage!: string;

  constructor(
    private router: Router,
    private authService: AuthService
  ) { }

  async signUp() {

    if (!this.email || !this.password || !this.confirmPassword) {
      this.errorMessage = 'Debe ingresar todos los campos';
      return;
    }

    if (this.password !== this.confirmPassword) {
      this.errorMessage = 'Las contraseñas no coinciden';
      return;
    }

    try {
      const result = await this.authService.signUp(
        this.email,
        this.password,
        this.confirmPassword
      );
      this.router.navigate(['/login']);
    } catch (err: any) {
      console.dir(err);
      if (err.code === 'auth/email-already-in-use') {
        this.errorMessage = 'El correo electrónico ya está en uso';
      } else if (err.code === 'auth/invalid-email') {
        this.errorMessage = 'El correo electrónico no es válido';
      } else if (err.code === 'auth/operation-not-allowed') {
        this.errorMessage =
          'La operación no está permitida. Contacte al administrador';
      } else if (err.code === 'auth/weak-password') {
        this.errorMessage =
          'La contraseña no es segura. Intente otra contraseña';
      } else if (err.message === 'Las contraseñas no coinciden') {
        this.errorMessage = err.message;
      }
    }
  }

}

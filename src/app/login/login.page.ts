import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { NavController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  email!: string;
  password!: string;
  errorMessage!: string;

  constructor(private afAuth: AngularFireAuth, private navController: NavController, private authService: AuthService, private router: Router) { }

  ngOnInit() {
  }

  async signIn() {
    if (this.email && this.password) {
      try {
        await this.authService.signIn(this.email, this.password);
        // Usuario autenticado correctamente
        this.router.navigate(['/tabs/tab1']);
      } catch (error: any) {
        // Error al autenticar al usuario
        console.log(error.code); // imprime el código de error en la consola
        if (error.code === 'auth/wrong-password') {
          this.errorMessage = 'La contraseña es incorrecta.';
        } else if (error.code === 'auth/user-not-found') {
          this.errorMessage = 'No se encontró ninguna cuenta con este correo electrónico.';
        } else if (error.code === 'auth/invalid-email') {
          this.errorMessage = 'El correo electrónico ingresado no es válido.';
        } else if (error.code === 'auth/too-many-requests') {
          this.errorMessage = 'Se ha alcanzado el límite de solicitudes para esta cuenta. Intente más tarde.';
        } else if (error.code === 'auth/network-request-failed') {
          this.errorMessage = 'No se pudo establecer la conexión a Internet. Verifique su conexión y vuelva a intentarlo.';
        } else {
          this.errorMessage = 'Ha ocurrido un error inesperado. Inténtalo de nuevo más tarde.';
        }
      }
    } else {
      this.errorMessage = "Por favor, complete todos los campos.";
    }
  }
  
  

  goToSignUp() {
    this.navController.navigateForward('/signup');
  }
  
}

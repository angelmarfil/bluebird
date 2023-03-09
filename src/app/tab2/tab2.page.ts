import { Component } from '@angular/core';
import { RTDBService } from '../services/RTDB.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  isToggled1!: boolean;
  isToggled2!: boolean;
  isToggled3!: boolean;
  isToggled4!: boolean;
  isToggled5!: boolean;

  constructor(private firebaseService: RTDBService, private authService: AuthService) { }

  loaded: boolean = false;

  ngOnInit() {

    this.loaded = false;

    this.firebaseService.getData('/sensores/ultrasonicoAves').subscribe((data: any) => {
      this.isToggled1 = data;
    });

    this.firebaseService.getData('/sensores/ultrasonicoNivel').subscribe((data: any) => {
      this.isToggled2 = data;
    });

    this.firebaseService.getData('/sensores/turbidez').subscribe((data: any) => {
      this.isToggled3 = data;
    });

    this.firebaseService.getData('/actuadores/bombaEntrada').subscribe((data: any) => {
      this.isToggled4 = data;
    });

    this.firebaseService.getData('/sensores/bombaSalida').subscribe((data: any) => {
      this.isToggled5 = data;
    });

    setTimeout(() => {
      this.loaded = true;
    }, 1000);
  }

  sendDataToFirebase(toggle: boolean, path: string) {
    this.firebaseService.sendBooleanData(toggle, path).then(() => {
      console.log('Valor booleano enviado correctamente');
    }).catch((error) => {
      console.log('Error al enviar valor booleano: ', error);
    });
  }

  async signOut() {
    await this.authService.signOut();
  }

}
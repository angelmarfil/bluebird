import { Component } from '@angular/core';
import { RTDBService } from '../services/RTDB.service';
import { Pipe, PipeTransform } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  nivelAgua!: number;
  contaminacionAgua!: number;
  presenciaAves!: boolean;
  wifiSSID!: string;

  constructor(private firebaseService: RTDBService, private authService: AuthService) {}

  loaded: boolean = false;

  ngOnInit() {

    this.loaded = false;

    this.firebaseService.getData('datos/nivelAgua').subscribe((data: any) => {
      this.nivelAgua = data;
    });

    this.firebaseService.getData('datos/contaminacionAgua').subscribe((data: any) => {
      this.contaminacionAgua = data;
    });

    this.firebaseService.getData('datos/presenciaAves').subscribe((data: any) => {
      this.presenciaAves = data;
    });

    this.firebaseService.getData('wifi/ssid').subscribe((data: any) => {
      this.wifiSSID = data;
    });

    setTimeout(() => {
      this.loaded = true;
    }, 2000);
  }

  async signOut() {
    await this.authService.signOut();
  }

}

@Pipe({ name: 'textoContaminacion' })
export class TextoContaminacionPipe implements PipeTransform {
  transform(valor: number): string {
    if (valor >= 32) {
      return 'Sucio';

    } else if (valor >= 16) {
      return 'Turbio';   

    } else {
      return 'Limpio';
    }
  }
}

@Pipe({ name: 'textoNivel' })
export class TextoNivelPipe implements PipeTransform {
  transform(valor: number): string {
    if (valor >= 32) {
      return 'Lleno';

    } else if (valor >= 16) {
      return 'Medio';   

    } else {
      return 'Vacio';
    }
  }
}

@Pipe({ name: 'textoAves' })
export class TextoAvesPipe implements PipeTransform {
  transform(valor: boolean): string {
    if (valor === true) {
      return 'Presentes';
    } else {
      return 'Ausentes';
    }
  }
}

import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';

@Injectable({
    providedIn: 'root'
})

export class RTDBService {

    constructor(private db: AngularFireDatabase) { }

    getData(path: string) {
        return this.db.object(path).valueChanges();
    }

    sendBooleanData(value: boolean, path: string) {
        return this.db.object(path).set(value);
    }

}
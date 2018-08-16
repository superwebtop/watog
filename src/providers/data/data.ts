import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { Injectable } from '@angular/core';

//import { AlertController } from 'ionic-angular';

/*
  Generated class for the DataProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class DataProvider {
  private db: SQLiteObject;
  //private alertCtrl: AlertController

  constructor(public sqlite: SQLite) {
    //this.getData();
  }

  private getData(): void {
    this.sqlite.create({
      name: 'data.db',
      location: 'default'
    })
      .then((db: SQLiteObject) => {
        this.db = db;
      })
      .catch(e => console.log(e));
  }

  private createTable(db): void{
    this.db.executeSql(`
      CREATE TABLE `uers` (
      	`id`	INTEGER PRIMARY KEY AUTOINCREMENT UNIQUE,
      	`Firstname`	TEXT NOT NULL,
      	`Password`	TEXT NOT NULL,
      	`Email`	NUMERIC NOT NULL,
      	`Country`	INTEGER NOT NULL,
      	`Hospital`	INTEGER,
      	`Phone`	INTEGER NOT NULL UNIQUE
      );
    `)
      .then(() => console.log('Executed SQL'))
      .catch(e => console.log(e));

  }

}

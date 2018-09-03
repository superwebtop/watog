import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RegisterOneOfThreePage } from '../register-one-of-three/register-one-of-three';
import { RegisterThreeOfThreePage } from '../register-three-of-three/register-three-of-three';
import {Auth, User, resFile} from "../../types";
import {DataProvider, RestProvider} from '../../providers';
import { CameraProvider } from '../../providers/camera/camera';

/**
 * Generated class for the RegisterTwoOfThreePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-register-two-of-three',
  templateUrl: 'register-two-of-three.html',
})
export class RegisterTwoOfThreePage {
  public image_url: any;
  public image_local: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public restProvider: RestProvider, public dataProvider: DataProvider, public cam : CameraProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterTwoOfThreePage');
  }

  goToRegister(){
    this.navCtrl.push(RegisterOneOfThreePage);
  }

  TakeaPicture(){
    this.cam.selectImage(1, 0).then(resp => {
      this.image_local = "data:image/jpeg;base64," + resp;
      alert("picture saved")
    }, err => {
      alert("error with select of picture")
      console.log("param not send")
    });
  }

  navToGallery() {
    this.cam.selectImage(0, 0).then(resp => {
      this.image_local = "data:image/jpeg;base64," + resp;
      alert("picture saved")
    }, err => {
      alert("error with select of picture")
      console.log("param not send")
    });
  }

  sendDoc(){
    if(this.image_local){
      this.restProvider.sendProofPhoto(this.image_local).then((user: User) => {
        const profile_user:User = user;
        this.dataProvider.saveUser(profile_user);
        this.navCtrl.push(RegisterThreeOfThreePage);
      }).catch((error) => {
        alert("Send file to server error!")
      })
    }
    else{
      alert("Please selected proof of your status")
    }
  }
}

import { Component } from '@angular/core';
import {AlertController, IonicPage, NavController, NavParams} from 'ionic-angular';
import { RegisterOneOfThreePage } from '../register-one-of-three/register-one-of-three';
import { CameraProvider } from '../../providers/camera/camera';
import { resFile} from "../../types";
import {  RestProvider } from '../../providers';
import {EditProfilePage} from "../edit-profile/edit-profile";



@IonicPage()
@Component({
  selector: 'page-upload-cover-photo',
  templateUrl: 'upload-cover-photo.html',
})
export class UploadCoverPhotoPage {
  public image_base64: any;
  public image_choose: any;
  public image_url: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController, public cam : CameraProvider, public restProvider: RestProvider) {
    this.image_base64 = "assets/imgs/appareil.png";
    this.image_choose = "assets/imgs/on_your_computer.png";
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UploadCoverPhotoPage');
  }

  gotToProfile(){
    this.navCtrl.push( EditProfilePage, {image_url: this.image_url });
  }

  TakeaPicture(){
    let myCam = this.cam.selectImage(1, 0).then(resp => {
      return this.image_url = "data:image/jpeg;base64," + resp;
    }, err => {
      console.log("error send param, picture of profile not selected")
    });
    myCam.then(data => {
      this.uploadPhoto(data)
    })
    /*this.cam.selectImage(1, 0).then(resp => {
      this.image_url = "data:image/jpeg;base64," + resp;
      this.restProvider.sendFile(this.image_url).then((res_file: resFile) => {
        this.image_url = res_file.url;
        this.navCtrl.push( EditProfilePage, {image_url: this.image_url });
      }).catch((error) => {
        alert("Send file to server error!");
        alert(JSON.stringify(error))
      })
    }, err => {
    });*/
  }

  navToGallery() {
    let myCam = this.cam.selectImage(1, 0).then(resp => {
      return this.image_url = "data:image/jpeg;base64," + resp;
    }, err => {
      console.log("error send param, picture of profile not selected")
    });
    myCam.then(data => {
      this.uploadPhoto(data)
    })
    /*this.cam.selectImage(0, 0).then(resp => {
      this.image_url = "data:image/jpeg;base64," + resp;
      this.restProvider.sendFile(this.image_url).then((res_file: resFile) => {
        this.image_url = res_file.url;
        this.navCtrl.push( EditProfilePage, {image_url: this.image_url });
      }).catch((error) => {
        alert("Send file to server error!");
        alert(JSON.stringify(error))
      })
    }, err => {
    });*/

  }


  uploadPhoto(img) {
    //console.log('ionViewDidLoad ContestSubmitPage');
    const strImage = img;
    this.restProvider.sendFile(img)
      .then((res_file: resFile) => {
        this.image_url = res_file.url;
        this.navCtrl.push(EditProfilePage, {image_url: this.image_url});
      })
      .catch(err => {
        /*let alert = this.alertCtrl.create({
          title: 'Failed to upload',
          subTitle: 'Failed to upload photo',
          buttons: [
            { text: 'Cancel', handler: () =>{
                this.gotToProfile()
              }},
            { text: 'Retry', handler: () => {
                this.uploadPhoto(img)
              }}]
        });
        alert.present();*/
      });
  }
}

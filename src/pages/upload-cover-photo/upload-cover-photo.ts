import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RegisterOneOfThreePage } from '../register-one-of-three/register-one-of-three';
import { CameraProvider } from '../../providers/camera/camera';
import {Auth, resFile} from "../../types";
import {DashboardPage} from "../dashboard/dashboard";
import { DataProvider, RestProvider } from '../../providers';
import { FileOpener } from '@ionic-native/file-opener';


@IonicPage()
@Component({
  selector: 'page-upload-cover-photo',
  templateUrl: 'upload-cover-photo.html',
})
export class UploadCoverPhotoPage {
  public base64Image: any;
  public chooseImg: any;
  public image: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public cam : CameraProvider, public restProvider: RestProvider, public dataProvider: DataProvider, private fileOpener: FileOpener) {
    this.base64Image = "../../assets/imgs/appareil.png";
    this.chooseImg = "../../assets/imgs/on_your_computer.png";
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UploadCoverPhotoPage');
  }

  gotToRegister(){
    this.navCtrl.push(RegisterOneOfThreePage, {image: this.image, from: 'picture_cover'});
  }

  TakeaPicture(){
    this.cam.photo(this.base64Image).then((imageData) => {

      this.base64Image = 'data:image/jpeg;base64,' +imageData;

      this.restProvider.sendFile(this.base64Image).then((res_file: resFile) => {
        console.info('Send File Response:', res_file)
        // Save file
        //this.dataProvider.saveFile(this.base64Image, res_file.url);
        this.image = res_file.url;

      }).catch((error) => {
        alert(error);
      })

      //alert(this.base64Image);

    })
    .catch(err => console.log(err));
  }

  navToGallery(){
    this.cam.choosePicture()
      .then((results) => {

        for (var i = 0; i < results.length; i++) {
          this.chooseImg = results[i];
        }

        this.restProvider.sendFile(this.chooseImg).then((res_file: resFile) => {
          console.info('Send File Response:', res_file)
          // Save file
          //this.dataProvider.saveFile(this.base64Image, res_file.url);
          this.image = res_file.url;

        }).catch((error) => {
          alert(error);
        })
      },(err) => {
          alert("Error"+ err)
      })
      .catch(err => console.log(err));
  }
}

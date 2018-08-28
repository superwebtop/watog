import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DashboardPage } from '../dashboard/dashboard';
import { ProfilePage } from '../profile/profile';
import { LoginPage } from '../login/login';
import { SettingsPage } from '../settings/settings';
import { ContestSubmitedPage } from '../contest-submited/contest-submited';
import { DataProvider } from '../../providers/data/data';
import { CameraProvider } from '../../providers/camera/camera';
import { resFile } from "../../types";
import {  RestProvider } from '../../providers';


/**
 * Generated class for the ContestSubmitPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-contest-submit',
  templateUrl: 'contest-submit.html',
})
export class ContestSubmitPage {
  public photo: any = {
    base64Image: "",
    description: ""
  }
  public image_url: any;
  public image_local: string = null;

  public submit = {
    category_id: null,
    picture: "",
    description:""
  }

  constructor(public navCtrl: NavController, public navParams: NavParams, public cam : CameraProvider, public dataProvider:DataProvider, public restProvider: RestProvider) {
    this.submit.category_id = this.navParams.data.id;
    console.log(this.submit)
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ContestSubmitPage');
  }

  logForm(){
    console.log(this.photo.description);
    this.restProvider.postADoc(this.submit).then(data => console.log(data));
  }

  goToDashboard(){
    this.navCtrl.push(DashboardPage);
  }

  goToProfilePage(){
    this.navCtrl.push(ProfilePage);
  }

  goToSettingsPage(){
    this.navCtrl.push(SettingsPage);
  }

  goToContestSubmited(){
    if(this.image_local){
      this.submit.picture = this.image_local;
      this.navCtrl.push(ContestSubmitedPage);
    }
    else{
      alert("please selected a picture");
    }
  }

  goBack(){
    this.navCtrl.pop();
  }

  logout(){
    this.dataProvider.clearProfile();
    this.navCtrl.push(LoginPage);
  }

  TakeaPicture(){
    this.cam.selectImage(1, 0).then(resp => {
      this.image_local = "data:image/jpeg;base64," + resp;
      alert("picture saved")
    }, err => {
      alert("error send parm, pictures of profile camera not save")
    });
  }

  navToGallery() {
    this.cam.selectImage(0, 0).then(resp => {
      this.image_local = "data:image/jpeg;base64," + resp;
      alert("picture saved")
    }, err => {
      alert("error send param, picture of profile not selected")
    });
  }

}

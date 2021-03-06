import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import {DocumentViewer, DocumentViewerOptions} from '@ionic-native/document-viewer';
import {File} from "@ionic-native/file";
import { DashboardPage } from '../dashboard/dashboard';
import { ProfilePage } from '../profile/profile';
import { SettingsPage } from '../settings/settings';
import { ContestSubmitPage } from '../contest-submit/contest-submit';
import { LoginPage } from '../login/login';
import { UploadWatogLogoPage } from "../upload-watog-logo/upload-watog-logo";
import { ModalLogout } from '../modal-logout/modal-logout';
import { ParticipatePage } from "../participate/participate"
import { DataProvider } from '../../providers/data/data';




/**
 * Generated class for the BestGroupPhotoWithTheWatogLogoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-best-group-photo-with-the-watog-logo',
  templateUrl: 'best-group-photo-with-the-watog-logo.html',
})
export class BestGroupPhotoWithTheWatogLogoPage {
  public passParam: any;
  public watog_logo_image: string = "assets/imgs/WATOG-quadri_logo_seul.png";

  constructor(public navCtrl: NavController, public navParams: NavParams, public dataProvider: DataProvider, private document: DocumentViewer, private file: File, public modalCtrl: ModalController) {
    this.passParam = this.navParams.data
    if(this.passParam.image_url){
      this.watog_logo_image = this.passParam.image_url;
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BestGroupPhotoWithTheWatogLogoPage');
  }

  uploadWatogLogo(){
    this.navCtrl.push(UploadWatogLogoPage, {from: "BestGroupPhotoWithTheWatogLogoPage"});
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

  goToContestSubmit(){
    this.navCtrl.push(ContestSubmitPage, { id: this.passParam.id , from: this.passParam.from });
  }

  goBack(){
    this.navCtrl.push(ParticipatePage);
  }

  logout(){
    let profileModal = this.modalCtrl.create( ModalLogout );
    profileModal.present();
  }

}

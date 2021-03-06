import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { DashboardPage } from '../dashboard/dashboard';
import { ProfilePage } from '../profile/profile';
import { SettingsPage } from '../settings/settings';
import { ContestSubmitPage } from '../contest-submit/contest-submit';
import { LoginPage } from '../login/login';
import { DataProvider } from '../../providers/data/data';
import {DocumentViewer, DocumentViewerOptions} from "@ionic-native/document-viewer";
import {File} from "@ionic-native/file";
import { FileOpener } from '@ionic-native/file-opener';
import { ModalLogout } from '../modal-logout/modal-logout';

/**
 * Generated class for the BestSurgicalImagePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-best-surgical-image',
  templateUrl: 'best-surgical-image.html',
})
export class BestSurgicalImagePage {
  public passParam: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public dataProvider: DataProvider, private document: DocumentViewer, private file: File, private fileOpener: FileOpener, public modalCtrl: ModalController) {
    this.passParam = this.navParams.data
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BestSurgicalImagePage');
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
    this.navCtrl.pop();
  }

  readLocalPdf(){
    const options: DocumentViewerOptions = {
      title: 'My PDF',
      openWith: { enabled: true }
    }
    const filePath = this.file.applicationDirectory + 'www/assets/docs/watog_contest_consent.pdf'
    this.document.viewDocument(filePath, 'application/pdf', options);

  }

  goNext(){
    var consent = <HTMLInputElement> document.getElementById("consentCertified");
    if(consent.checked == true){
      this.goToContestSubmit();
    } else {
      document.getElementById("certifyConsent").style.backgroundColor = "#e40046";
    }
  }

  logout(){
    let profileModal = this.modalCtrl.create( ModalLogout );
    profileModal.present();
  }

}

import { Component, isDevMode } from '@angular/core';

import { IonicPage, NavController, NavParams, AlertController, ModalController } from 'ionic-angular';
import { DashboardPage } from '../dashboard/dashboard';
import { ProfilePage } from '../profile/profile';
import { LoginPage } from '../login/login';
import { SettingsPage } from '../settings/settings';
import { ContestSubmitedPage } from '../contest-submited/contest-submited';
import { DataProvider } from '../../providers/data/data';
import { CameraProvider } from '../../providers/camera/camera';
import { RestProvider } from '../../providers';
import { Auth, resFile } from "../../types";
import { ModalLogout } from '../modal-logout/modal-logout';

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
  public backPage: any;
  public photo: any = {
    base64Image: '',
    description: ''
  }
  public image_url: any;
  public image_local: string = null;
  public spam: boolean = true;

  public submit = {
    category_id: null,
    picture: '',
    description: ''
  }

  public state = {
    isUploading: false,
    isPosting: false
  }

  public file_name: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController, public cam: CameraProvider, public dataProvider: DataProvider, public restProvider: RestProvider, public modalCtrl: ModalController) {
    const { id } = this.navParams.data
    this.submit.category_id = this.navParams.data.id;
    //this.dataProvider.setVariable("category_id_up", this.navParams.data.id)
    //console.log("ma cat: ", this.submit.category_id)

    // Check if photo was already posted
    this.restProvider.countPost('?category_id=' + id + '&user_id=' + DataProvider.auth.id).then(count => {
      if (count > 0) {
        /*this.goBack()*/
        this.presentAlert('', 'Loading multiple pictures for one single category is not allowed!')
      }
    })
  }

  ionViewDidLoad() { }

  presentAlert(title, subTitle) {
    let alert = this.alertCtrl.create({
      title,
      subTitle,
      buttons: ['Dismiss']
    });
    alert.present();
  }

  onSubmit() {

    if (!this.submit.picture) {
      let alert = this.alertCtrl.create({
        title: 'No photo uploaded',
        subTitle: 'Please upload a photo first',
        buttons: ['Dismiss']
      });
      alert.present();
      //return;
    }
    //alert(JSON.stringify(this.submit))
    this.state.isPosting = true;
    this.restProvider.postADoc(this.submit).then((data) => {
      //console.info('Posted:', data)
      this.state.isPosting = false;
      this.navCtrl.push(ContestSubmitedPage);
    }).catch(err => {
      console.error(err)
      this.state.isPosting = false;
      if (this.spam) {
        let alert = this.alertCtrl.create({
          title: 'Failed to upload',
          subTitle: 'Failed to upload photo',
          buttons: [
            {
              text: 'Cancel', handler: () => {
                this.closeLocalImage()
              }
            }]
        });
        alert.present();
        this.spam = false;
      }
    });
  }

  goToDashboard() {
    this.navCtrl.push(DashboardPage);
  }

  goToProfilePage() {
    this.navCtrl.push(ProfilePage);
  }

  goToSettingsPage() {
    this.navCtrl.push(SettingsPage);
  }

  uploadPhoto(img) {
    this.state.isUploading = true;
    setTimeout(() => { this.state.isUploading = false; }, 3000);
    const strImage = this.image_local;
    this.restProvider.sendFile(this.image_local)
      .then((res_file: resFile) => {
        this.state.isUploading = false;
        if (this.image_local === strImage) {
          this.submit.picture = res_file.url
        }
      })
      .catch(err => {
        this.state.isUploading = false;
      });
  }

  goBack() {
    this.navCtrl.pop();
  }

  logout() {
    let profileModal = this.modalCtrl.create(ModalLogout);
    profileModal.present();
  }

  TakeaPicture() {
    let myCam = this.cam.selectImage(1, 0).then(resp => {
      return this.image_local = "data:image/jpeg;base64," + resp;
    }, err => {
    });
    myCam.then(data => {
      this.uploadPhoto(data)
    })
  }

  navToGallery() {
    let myCam = this.cam.selectImage(0, 0).then(resp => {
      return this.image_local = "data:image/jpeg;base64," + resp;
    }, err => {
      console.log("error send param, picture of profile not selected")
    });
    myCam.then(data => {
      this.uploadPhoto(data)
    })
  }

  closeLocalImage() {
    this.state.isUploading = false;
    this.image_local = ''
    this.submit.picture = ''
  }
}
/***

if (isDevMode) {
  const input = document.createElement('input');
  input.type = 'file';
  input.accept = 'image/png, image/jpeg';
  input.multiple = false;
  input.click();
  const self = this;
  input.onchange = function(e) {
    const file = input.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      self.image_local = reader.result.toString();
      self.uploadPhoto();
    };
    reader.onerror = (error) => {
      console.error(error);
      alert('Failed to open file!')
    };
  };
} else {

if (isDevMode) {
  const input = document.createElement('input');
  input.type = 'file';
  input.click();

} else {

**/
/*    this.cam.selectImage(0, 0).then(resp => {
      this.image_url = "data:image/jpeg;base64," + resp;
      this.restProvider.sendFile(this.image_url).then((res_file: resFile) => {
        this.image_url = res_file.url;
        this.profile_selected = true;
        this.navCtrl.push(RegisterOneOfThreePage, {image_url: this.image_url,  profile_selected: this.profile_selected });
      }).catch((error) => {
        alert("Send file to server error!");
      })
    }, err => {
    });*/

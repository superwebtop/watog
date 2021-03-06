import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { DashboardPage } from '../dashboard/dashboard';
import { ProfilePage } from '../profile/profile';
import { SettingsPage } from '../settings/settings';
import { LoginPage } from '../login/login';

import { DataProvider } from '../../providers/data/data';
import { RestProvider } from '../../providers/rest/rest';
import { User, Auth } from '../../types';
import { ModalLogout } from '../modal-logout/modal-logout';
/**
 * Generated class for the SelectionPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-selection',
  templateUrl: 'selection.html',
})
export class SelectionPage {
  public userInfo: any;
  public imageInfo: any = [];
  public currentUser: any;
  public vote: any = {
    commend: true
  }

  constructor(public navCtrl: NavController, public navParams: NavParams, public dataProvider: DataProvider, public restProvider: RestProvider, public modalCtrl: ModalController) {
    const params = this.navParams.data.user;
    this.currentUser = params;
  }

  ionViewDidLoad() {
    console.log(DataProvider.searchedUsers)
    let cat1 = this.restProvider.queryPost("?user_id=" + this.currentUser.id + "&limit=1000");

    Promise.all([cat1]).then(data => {
        console.log("ma promise: ", data)
        for (let element in data){
          for(let all in data[element]){
            this.imageInfo.push(data[element][all]);
          }
        }
        console.log(this.imageInfo)
    })
    .catch(err => {
      console.log("Error", err)
    })
  }


  getUser(user){
    console.log(user)
  }

  voteUp(img){
    this.vote.commend = true;
    this.Voted(img.id)
  }

  voteDown(img){
    this.vote.commend = false;
    this.Voted(img.id)
  }

  Voted(id: number){
    console.log("vote: ", this.vote)
    this.restProvider.votePost(id, this.vote.commend).then(data => {
      this.navCtrl.push(SelectionPage, { user: this.currentUser })
    })
    .catch( err => {
      console.error('Failed to vote:', err)
    })
  }

  goToDashboard(){
    this.navCtrl.push(DashboardPage);
  }

  goToProfilePage(){
    this.navCtrl.push(LoginPage);
  }

  goToSettingsPage(){
    this.navCtrl.push(SettingsPage);
  }

  logout(){
    let profileModal = this.modalCtrl.create( ModalLogout );
    profileModal.present();
  }

}

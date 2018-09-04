import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams,  AlertController, Content } from 'ionic-angular';
import { DashboardPage } from '../dashboard/dashboard';
import { ProfilePage } from '../profile/profile';
import { SettingsPage } from '../settings/settings';
import { LoginPage } from '../login/login';
import { ProfilesLoadPage } from '../profiles-load/profiles-load';
import { DataProvider } from '../../providers/data/data';
import { RestProvider } from '../../providers/rest/rest';
import { User, Auth } from '../../types';

/**
 * Generated class for the VoteRandomPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-vote-random',
  templateUrl: 'vote-random.html',
})
export class VoteRandomPage {
  @ViewChild(Content) content: Content;
  public allUser: any =  [];
  public str: string = "";
  public description: string = "";
  public vote: any = {
    commend: true
  }
  public report: any = {
    type: "",
    description: ""
  }
  showBack: boolean = true;
  previousScroll: number = 0;

  constructor(public navCtrl: NavController, public navParams: NavParams,public alertCtrl: AlertController, public dataProvider: DataProvider, public restProvider: RestProvider) {
    console.log(DataProvider.searchedUsers)
  }

  ngAfterViewInit() {
    this.content.ionScroll.subscribe((event) => {
      console.log(event);
      if (event.scrollTop > this.previousScroll) {
        this.showBack = false;
        console.log(false);
      } else {
        this.showBack = true;
        console.log(true);
      }
      this.previousScroll = event.scrollTop;
    });
  }

  ionViewDidLoad() {
    //let cat1 = this.restProvider.getAllPost("?limit=1");
    //let cat2 = this.restProvider.getAllPost("?category_id=2");
    //let cat3 = this.restProvider.getAllPost("?category_id=3");
    //let cat4 = this.restProvider.getAllPost("?category_id=4");
    //let cat5 = this.restProvider.getAllPost("?category_id=5&limit");

    this.getData();
  }

  getData() {
    Promise.all([this.restProvider.getAllPost("?limit=100000")]).then(data => {
      this.allUser = []; //Needed for updates
      console.log("ma promise: ", data)
      for (let element in data){
        for(let all in data[element]){
          this.allUser.push(data[element][all]);
        }
      }
      console.log(this.allUser)
    });
  }

  reported(img){
    let alert = this.alertCtrl.create({
      title: 'Spam',
      subTitle: 'Dou you really want report this picture ?',
      buttons: [
        { text: 'Spam', handler: () =>{
          this.vote.type = 'spam'
        }},
        { text: 'violence', handler: () => {
          this.vote.type = 'violence'
        }},
        { text: 'sex', handler: () => {
          this.vote.type = 'sex'
        }},
        { text: 'other', handler: () => {
          this.vote.type = 'other'
        }}]
    });
    alert.present();
    console.log(this.vote)
    this.vote.description = this.description;
    this.Voted(img.id)
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
    //this.vote check to user ng
    const makeVote = "/"+ id +"/vote"
    console.log("vote: ", this.vote)
    this.restProvider.Voted(this.vote, makeVote).then(data => {
      this.getData();
      //this.navCtrl.push(VoteRandomPage)
    })
    .catch( err => {
      console.log("You have already voted")
    })
  }

  goToSearch(user){
    console.log(user)
    this.navCtrl.push(ProfilesLoadPage , {user: user, from: 'randomUser'});
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

  goBack() {
    this.navCtrl.pop();
  }

  logout(){
    this.dataProvider.clearProfile();
    this.navCtrl.push(LoginPage);
  }

}

import { Injectable } from '@angular/core';
import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, UrlSerializer} from 'ionic-angular';
import { countries } from '../../models/model';
import { LoginPage } from '../login/login';
import { UploadCoverPhotoPage } from '../upload-cover-photo/upload-cover-photo';
import { UploadProfilePhotoPage } from '../upload-profile-photo/upload-profile-photo';
import {HttpClient,  HttpHeaders} from '@angular/common/http';
import { server_url } from '../../environments/environment'
import { RegisterTwoOfThreePage } from '../register-two-of-three/register-two-of-three';
import {DashboardPage} from "../dashboard/dashboard";
import {Auth, User} from "../../types";
import { DataProvider, RestProvider } from '../../providers';



@IonicPage()
@Component({
  selector: 'page-register-one-of-three',
  templateUrl: 'register-one-of-three.html',
})


export class RegisterOneOfThreePage {
  public user:User;
  public image = {
    from: "",
    image_link: ""
  }

  countries : any[] = countries;
  server_url: any = server_url;
  profile_image: string = "../../assets/imgs/rio.jpg";
  //
  constructor(public navCtrl: NavController, public navParams: NavParams, private http: HttpClient, public restProvider: RestProvider, public dataProvider: DataProvider) {
    const params = this.navParams.data;
    if(params.image_link){
      this.image = params;
      if(this.image.from == 'picture_profile'){
        this.profile_image = this.image.image_link;
      }else if(this.image.from == 'picture_cover'){

      }else{
        alert('Image from Unknown Page')
      }
    }

  }

  /** Request Http **/

  logForm(){

    const httpHeaders = new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8',
      'Access-Control-Allow-Origin': '*'
    });
    try{
      this.http.post(this.server_url+'/users', JSON.stringify(this.todo), {headers: httpHeaders}).subscribe(data => {
        console.log(data);
        if((typeof data) == "object"){
          if(status == "true"){
            alert('true');
          }else{
            alert('false');
          }
        }
        else{
          console.log("data is not define");
        }
      })
    } catch (e){console.log("http.post returned :" + e);}


    console.log('Signup Form Data:', this.user)

    const { email, password } = this.user;
    if (email && password) {
      this.restProvider.signUp(this.user).then((auth: Auth) => {
        console.info('Login Response:', auth)
        // Save profil
        this.dataProvider.saveProfile(auth);
        this.navCtrl.push(DashboardPage)
      }).catch((error) => {
        alert('Invalid email or password');
      })
    } else {
      alert('Please enter email and password');
    }

  }

  /** Navigation **/

  goToLogin(){
    this.navCtrl.push(LoginPage);
  }

  goToRegisterTwoOfThree(){
    this.navCtrl.push(RegisterTwoOfThreePage);
  }

  navToUploadCoverPhoto(){
    this.navCtrl.push(UploadCoverPhotoPage);
  }

  navToUploadProfilePhoto(){
    this.navCtrl.push(UploadProfilePhotoPage);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterOneOfThreePage');
  }

  /*Methods for the html dom modification */
  openMenu(){
    document.getElementById('qualificationInputMenu').style.bottom = '0';
  }

  closeMenu(){
    document.getElementById('qualificationInputMenu').style.bottom = '-100vh';
  }

  selectQualification(qualification){
    document.getElementById('qualificationInput').innerHTML = qualification;
    this.closeMenu();
  }

  specifyQualification(){
    alert('test');
  }

  saveOtherSpeciality() {
    if(this.todo.other_speciality != '') {
      this.selectQualification(this.todo.other_speciality);
      var btnClose = document.getElementById("btn-modal-close") as any;
      btnClose.click();
    }
  }

  cancelOtherSpeciality() {
    this.selectQualification('Select qualification');
    this.todo.other_speciality = "";
  }
}

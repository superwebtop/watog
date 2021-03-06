import { Component } from '@angular/core';
import { AlertController, IonicPage, NavController, NavParams, ModalController, LoadingController } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';

import { Country } from "../../types";
import { countries } from '../../models/model';
import { ModalQualification } from '../modal-qualification/modal-qualification';

import { ChatRoomPage } from '../chat-room/chat-room';
import { ChatService } from '../../providers';

@IonicPage()
@Component({
  selector: 'page-room-create',
  templateUrl: 'room-create.html',
})
export class RoomCreatePage {
  
  validations_form: FormGroup;
  countries: Country[];
  country: Country[];
  job : any;  
  jobList : any=[
    {id:1, name: "Trainee or resident in OB/GYN"}, 
    {id:2, name: "Fellow or Young OB/GYN (Less than 10 years after entering OB/GYN residency"}, 
    {id:3, name: "Confirmed OB/GYN (More than 10 years after entering OB/GYN residency"}, 
    {id:4, name: "Medical Student (Not OB/GYN yet)"}, 
    {id:5, name: "Medical Doctor, Other Speciality"}, 
    {id:6, name: "Mid Wife"}, 
    {id:7, name: "Other: Please specify"}];
  topics : any=[
    {id:1, name: "Classical Surgery"}, 
    {id:2, name: "Laparoscopy"}, 
    {id:3, name: "Robotic"}, 
    {id:4, name: "Obstetrics"}, 
    {id:5, name: "Neonats"}, 
    {id:6, name: "Fertility"}, 
    {id:7, name: "Ultrasound"}, 
    {id:8, name: "Fetal Medicine"}, 
    {id:9, name: "MRI"}, 
    {id:10, name: "Simulation"}];
  topic: any;
  promise: any;
  userList: Array<any> = [];
  _tempuserList: Array<any> = [];  
  roomMemberList: Array<any> = [];
  isMembers = false;
  search: '';
  memberLimit: '';

  avatar: any;
  title: '';
  description: '';

  constructor(public navCtrl: NavController, 
    public navParams: NavParams, 
    public formBuilder: FormBuilder, 
    public modalCtrl: ModalController,
    public chatService: ChatService, 
    public loadingCtrl: LoadingController, 
    public alertCtrl: AlertController) {

    this.title = navParams.get("title");
    this.description = navParams.get("description");
    this.avatar = navParams.get("avatar");

    this.countries = [
      new Country(countries[0].code, countries[0].name)
    ]
    for (var i = 1; i < countries.length; i++) {
      const County = new Country(countries[i].code, countries[i].name)
      this.countries.push(County);
    }
  }

  ionViewWillLoad(){
    let country = new FormControl('', Validators.required);
    let topic = new FormControl('', Validators.required);
    let job = new FormControl('', Validators.required);
    this.validations_form = this.formBuilder.group({
      country: country,
      topic : topic,
      search : [''],
      memberLimit : [''],
      job: job,
    });
  }
  ionViewDidLoad() {
    // get User Data
    const loader = this.loadingCtrl.create({ content: "Please wait..." });
    loader.present();
    this.chatService.getUserList()
    .then((res: any) => {
      for( var i = 0 ; i < res.length ; i++){
        let element = res[i];
        let _member = {};
        _member["index"] = i;
        _member["user_id"] = element.id;
        _member["avatar"] = element.picture_profile;
        _member["username"] = element.first_name+" "+element.last_name;
        _member["country"] = element.country;
        this.userList.push(_member);
        this._tempuserList.push(_member);
      }
        loader.dismiss();
    }).catch(err => {
      loader.dismiss();
      console.log(err)
    })
  }

  addMember(_contact){
    this.roomMemberList.push(_contact)
    this.roomMemberList.sort(function (a, b) {
      return a.index - b.index;
    });

    for(var i= 0 ; i < this.userList.length; i++){
      if(this.userList[i].index === _contact.index){
        this.userList.splice(i, 1)
      }
    }
    this.userList.sort(function (a, b) {
      return a.index - b.index;
    });
    
    if (this.roomMemberList.length > 0){
      this.isMembers = true
    }
  }

  removeMember(_member){
    this.userList.push(_member);
    this.userList.sort(function (a, b) {
      return a.index - b.index;
    });
    for(var i= 0 ; i < this.roomMemberList.length; i++){
      if(this.roomMemberList[i].index === _member.index){
        this.roomMemberList.splice(i, 1)
      }
    }
    this.roomMemberList.sort(function (a, b) {
      return a.index - b.index;
    });

    if (this.roomMemberList.length == 0){
      this.isMembers = false
    }
  }
  onSearch(){
    let searchTerm = this.search;
    this.userList = this._tempuserList.filter((item) => {
        return item.username.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1;
    }); 
  }

  goBack() {
    this.navCtrl.pop();
  }

  next(){
   
    let _memberList = [];
    this.roomMemberList.forEach(element => {
      _memberList.push(element.user_id)
    });
    let _countryName = "";
    for(var i = 0 ; i < this.country.length ; i++){
      if(i == 0 ){
        _countryName = this.country[i].name
      }
      else{
        _countryName += ", "+this.country[i].name
      }
    }
    
    let _jobList = "";
    for(var i = 0 ; i < this.job.length ; i++){
      if(i == 0 ){
        _jobList = this.job[i].name
      }
      else{
        _jobList += ", "+this.job[i].name
      }
    }
   
    if(_memberList.length == 0){
      let _alert = this.alertCtrl.create({
        title: '',
        subTitle: 'You must add one member',
        buttons: ['OK']
      });
      _alert.present();
      return;
    }
    else if ((_memberList.length > parseInt(this.memberLimit)) && this.memberLimit){
      let _alert = this.alertCtrl.create({
        title: '',
        subTitle: 'You can`t add more member. Please increase member limit or remove member.',
        buttons: ['OK']
      });
      _alert.present();
      return;
    }
    
    let params = {};
    params["category_id"] = 1;
    params["title"] = this.title;
    params["description"] = this.description;
    params["countries"] = _countryName;
    params["topics"] = this.topic.name;
    params["jobs"] = _jobList;
    
    params["members"] = _memberList;

    console.log(" creating room param =>", params);
    if(this.memberLimit)
      params["member_count_limit"] = parseInt(this.memberLimit);

    
    const loader = this.loadingCtrl.create({ content: "Please wait..." });
    loader.present();
    
    if (this.avatar) {
      this.chatService.sendFile(this.avatar).then((data: any) => {
        let _url = data.url;
        params["avatar"] = _url;
        this.chatService.createRoom(params)
          .then((res: any) => {
              loader.dismiss();
              this.navCtrl.push(ChatRoomPage);
          }).catch(err => {
            loader.dismiss();
            console.log(err)
          })

      }).catch((error) => {
        alert("server error!")
      })
    }
    else {     
      params["avatar"] = this.avatar;
      this.chatService.createRoom(params)
      .then((res: any) => {
          console.log("response =>", res);
          loader.dismiss();
          this.navCtrl.push(ChatRoomPage);
      }).catch(err => {
        loader.dismiss();
        console.log(err)
      })  
    }   
    
  }

  validation_messages = {    
    'job': [
      { type: 'required', message: 'Job is required.' }
    ],
    'topic': [
      { type: 'required', message: 'Topic is required.' }
    ],
    'country': [
      { type: 'required', message: 'Country is required.' }
    ],
  };
}

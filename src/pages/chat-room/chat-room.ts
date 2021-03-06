import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Events, ViewController } from 'ionic-angular';

import {MyRoomListPage} from '../my-room-list/my-room-list'
import {PublicRoomListPage} from '../public-room-list/public-room-list'
import {DashboardPage} from '../dashboard/dashboard'
import { SocketsProvider} from "../../providers/sockets/sockets";

@IonicPage()
@Component({
  selector: 'page-chat-room',
  templateUrl: 'chat-room.html',
})
export class ChatRoomPage {

  @ViewChild("tabBar") tabRef: any;
  myroomTab: any;
  publicTab: any;
  tabParams : any;

  constructor(
    public navCtrl: NavController,
    public viewController: ViewController,
    public navParams: NavParams,
    public events: Events
  ) {
    this.tabParams = {parentSelector : this.navCtrl};
    this.myroomTab = MyRoomListPage;
    this.publicTab = PublicRoomListPage;
  }

  ionViewDidEnter() {
    this.events.publish('main-chat-dashboard');
  }

  ionViewDidLeave(){
   // this.socketProvider.logoutFromSocket();
  }

  goBack() {
    const prevView = this.navCtrl.getPrevious(this.viewController);
    if (prevView && prevView.name === 'RoomCreatePage') {
      this.navCtrl.remove(this.viewController.index);
      this.navCtrl.push(DashboardPage);
    }
    else{
      this.navCtrl.pop();
    }    
  }
}

import { Component, ElementRef, ViewChild } from '@angular/core';
<<<<<<< HEAD
import { Events, Content, IonicPage, NavController, NavParams, ModalController, LoadingController, AlertController } from 'ionic-angular';
import { ChatService, SocketsProvider} from "../../providers/";
=======
import { Events, Content, IonicPage, NavController, NavParams, ModalController, LoadingController } from 'ionic-angular';
import { ChatService, SocketsProvider } from "../../providers/";
>>>>>>> 00cedd86b81e61f7bc4b3b61b3f57a63604f0fd5
import { Contact, Message, Auth } from '../../types';
import { ReportModalPage } from '../report-modal/report-modal';
import { RoomInfoPage } from '../room-info/room-info';
import { ContactListPage } from '../contact-list/contact-list';

@IonicPage()
@Component({
  selector: 'page-chat',
  templateUrl: 'chat.html',
})
export class ChatPage {
  @ViewChild(Content) content: Content;
  @ViewChild('chat_input') messageInput: ElementRef;

  msgList: Message[] = [];
  sender: Contact;
  toUser: Contact;
  editorMsg = '';
  showEmojiPicker = false;
  isSearch = false;
  roomData: any = [];
  room_id: '';
  totalUsers = 0;
  promise: any;
  isScrollLoading: boolean = false;
  currentPageIndex: number = 1;
<<<<<<< HEAD
  stepMessage: number= 20;
  isCreator : boolean = false;
  member_count_limit : any ='';

  constructor(public navCtrl: NavController, 
      public navParams: NavParams,
      private chatService: ChatService,
      private events: Events,
      public loadingCtrl: LoadingController,
      private socketProvider: SocketsProvider,
      public modalCtrl: ModalController,
      public alertCtrl: AlertController
    ) {    
      const res = [ window.localStorage.getItem('authorization'),  window.localStorage.getItem('user')]
      
      const auth = JSON.parse(res[1]);
      const roomData = navParams.get("roomInfo");
      console.log("chat room data == > ", roomData)
      if(auth.id ==  roomData.User.id){
        this.isCreator = true;
      }
      this.member_count_limit = roomData.member_count_limit;
      this.sender={
        id : auth.id,
        name : auth.first_name+" "+auth.last_name,
        avatar : auth.picture_profile
      }      

      this.room_id = roomData.id;
=======
  stepMessage: number = 20;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private chatService: ChatService,
    private events: Events,
    public loadingCtrl: LoadingController,
    private socketProvider: SocketsProvider,
    public modalCtrl: ModalController
  ) {
    const res = [window.localStorage.getItem('authorization'), window.localStorage.getItem('user')]

    const auth = JSON.parse(res[1]);

    this.sender = {
      id: auth.id,
      name: auth.first_name + " " + auth.last_name,
      avatar: auth.picture_profile
    }

    this.room_id = navParams.get("roomInfo").id;
  }

  ngOnInit(): void {
    this.chatService.checkReadMessage(this.room_id)
      .then((res: any) => {
        console.log(res);
      }).catch(err => {
        console.log("err", err)
      })

  }

  ionViewDidLoad() {
    let _param = "limit=" + this.stepMessage + "&direction=DESC";

    const loader = this.loadingCtrl.create({ content: "Please wait..." });
    loader.present();

    this.promise = Promise.all([this.chatService.getRoomInfo(this.room_id), this.chatService.getMsgList(this.room_id, _param)]);
    this.promise.then(data => {
      console.log("chat ===> ", data)
      this.roomData = data[0];
      this.msgList = data[1]
      this.msgList.sort(function (a: any, b: any) {
        return a.time - b.time;
      });

      this.totalUsers = this.roomData.Members.length;
      loader.dismiss();
      this.scrollToBottom();
    }).catch(err => {
      loader.dismiss();
      console.log("err", err)
    })
  }

  ionViewDidEnter() {
    // Subscribe to received  new message events
    console.log("scrollTop", this.content.scrollTop)
    this.events.subscribe('chat:received', msg => {
      this.pushNewMsg(msg);
    })
>>>>>>> 00cedd86b81e61f7bc4b3b61b3f57a63604f0fd5
  }

  ionViewWillLeave() {
    // unsubscribe
    this.events.unsubscribe('chat:received');
  }
<<<<<<< HEAD
  onPageScroll(){
    let message_count = this.roomData.message_count;
    let _pages = Math.ceil(message_count / this.stepMessage);
    
    if(_pages > this.currentPageIndex && this.content.scrollTop < 10){
      this.isScrollLoading = true;
      this.currentPageIndex++;
      let step = this.stepMessage * this.currentPageIndex;
      let _param = "limit="+step+"&direction=DESC";
      this.chatService.getMsgList(this.room_id, _param).then((data: any) =>{
=======

  onPageScroll() {

    if (this.content.scrollTop < 10) {
      this.isScrollLoading = true;
      this.currentPageIndex++;
      // let d = new Date().getTime();
      // let endDate = new Date(d-(86400000*this.currentPageIndex*this.stepDate));
      // let startDate = new Date((d-(86400000*(this.currentPageIndex+1)*this.stepDate)));

      // let _endDate = new Date(endDate.getFullYear(), endDate.getMonth(), endDate.getDate(),endDate.getHours(), endDate.getMinutes(), endDate.getSeconds()).toISOString();
      // let _startdate = new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate(), startDate.getHours(), startDate.getMinutes(), startDate.getSeconds()).toISOString();
      let step = this.stepMessage * this.currentPageIndex;
      let _param = "limit=" + step + "&direction=DESC";
      console.log("scroll To Bottom 0 => ", this.content.scrollHeight)
      this.chatService.getMsgList(this.room_id, _param).then((data: any) => {
>>>>>>> 00cedd86b81e61f7bc4b3b61b3f57a63604f0fd5
        console.log("chat ===> ", data)
        data.sort(function (a, b) {
          return a.time - b.time;
        });
        this.msgList = data;
        this.content.scrollToBottom(this.content.scrollTop)
        this.isScrollLoading = false;
      }).catch(err => {
        console.log("err", err)
      })
    }
  }

<<<<<<< HEAD
  ionViewDidEnter() {
    // Subscribe to received  new message events
    console.log("scrollTop", this.content.scrollTop)
    this.events.subscribe('chat:received', msg => {
      this.pushNewMsg(msg);
    })
    
    this.events.subscribe('add:member', data => {
      console.log(" add member data => ", data)
      this.roomData.Members.push(data)
      this.totalUsers = this.roomData.Members.length;      
    })
    
    this.events.subscribe('remove:member', data => {
      console.log(" remove member data => ", data)
      let temp : any=[];
      temp = this.roomData.Members.filter((item) => {
        if(item.id != data.id)
          return item;
      }); 
      
      this.roomData.Members = temp;
      this.totalUsers = this.roomData.Members.length;      
    })
  }

=======
>>>>>>> 00cedd86b81e61f7bc4b3b61b3f57a63604f0fd5
  onFocus() {
    this.showEmojiPicker = false;
    this.content.resize();
    this.scrollToBottom();
  }

  switchEmojiPicker() {
    this.showEmojiPicker = !this.showEmojiPicker;
    if (!this.showEmojiPicker) {
      this.focus();
    } else {
      this.setTextareaScroll();
    }
    this.content.resize();
    this.scrollToBottom();
  }
  /**
   * @name sendMsg
   */
  sendMsg() {
    if (!this.editorMsg.trim()) return;

    // Mock message
    let _newMsg: Message = {
      messageId: Date.now().toString(),
      userId: this.sender.id,
      userName: this.sender.name,
      userAvatar: this.sender.avatar,
      time: Date.now(),
      message: this.editorMsg
    };

    let newMsg = {
      text: this.editorMsg,
      room_id: this.roomData.id
    }

    this.pushNewMsg(_newMsg);
    this.editorMsg = '';

    if (!this.showEmojiPicker) {
      this.focus();
    }

    this.socketProvider.sendMsg(newMsg);
  }

  /**
   * @name pushNewMsg
   * @param msg
   */
  pushNewMsg(msg: any) {
    this.msgList.push(msg);
    this.scrollToBottom();
  }

  getMsgIndexById(id: string) {
    return this.msgList.findIndex(e => e.messageId === id)
  }

  scrollToBottom() {
    setTimeout(() => {
      if (this.content.scrollToBottom) {
        this.content.scrollToBottom();
      }
    }, 400)
  }

  private focus() {
    if (this.messageInput && this.messageInput.nativeElement) {
      this.messageInput.nativeElement.focus();
    }
  }

  private setTextareaScroll() {
    const textarea = this.messageInput.nativeElement;
    textarea.scrollTop = textarea.scrollHeight;
  }

<<<<<<< HEAD
  ionViewDidLoad() {
    
    let _param = "limit="+this.stepMessage+"&direction=DESC";
    
    const loader = this.loadingCtrl.create({ content: "Please wait..." });
    loader.present();

    this.promise = Promise.all([this.chatService.getRoomInfo(this.room_id), this.chatService.getMsgList(this.room_id, _param)]);
    this.promise.then(data =>{
      console.log("chat ===> ", data)
      let temp : any=[];
      temp = data[0].Members.filter((item) => {
        if(!item.removed)
          return item;
      }); 
      data[0].Members = temp;
      this.roomData = data[0];
      this.msgList = data[1]
      this.msgList.sort(function (a:any, b:any) {        
        return a.time-b.time;
      });

      this.totalUsers = this.roomData.Members.length;
      this.member_count_limit = this.roomData.member_count_limit;
      loader.dismiss();
      this.scrollToBottom();
    }).catch(err => {
      loader.dismiss();
      console.log("err", err)
    })
  }
=======
>>>>>>> 00cedd86b81e61f7bc4b3b61b3f57a63604f0fd5
  // toolbar funtion
  attachFile() {

  }
<<<<<<< HEAD
  addUser(){
    if( !this.isCreator ){
      let _alert = this.alertCtrl.create({
        title: '',
        subTitle: 'The room creator can only add the member',
        buttons: ['OK']
      });
      _alert.present();
      return;
    }
=======
  addUser() {
>>>>>>> 00cedd86b81e61f7bc4b3b61b3f57a63604f0fd5

    if(this.member_count_limit && this.member_count_limit <= this.totalUsers){
      let _alert = this.alertCtrl.create({
        title: '',
        subTitle: 'The count of members was limited. ',
        buttons: ['OK']
      });
      _alert.present();
      return;
    }
    this.navCtrl.push(ContactListPage, {roomData : this.roomData})
  }
  searchMessage() {
    this.isSearch = true;
  }
  closeSearchBar() {
    this.isSearch = false;
  }

  goBack() {
    this.navCtrl.pop();
  }

  // right side menu funtion
  archiveMessage() {

  }

  roomInfo() {
    this.navCtrl.push(RoomInfoPage, { roomData: this.roomData });
  }

  report() {
    let reportModal = this.modalCtrl.create(ReportModalPage);
    reportModal.onDidDismiss(data => {
      console.log("report modal=>", data)
    });
    reportModal.present();
  }
}

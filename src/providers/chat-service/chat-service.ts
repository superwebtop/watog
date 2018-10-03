import { Injectable } from '@angular/core';
import { Events } from 'ionic-angular';
import { map } from 'rxjs/operators/map';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs/Observable";

import { Contact, Message } from '../../types';

@Injectable()
export class ChatService {
  _data: any={
    "array":[
      {
        "messageId":"1",
        "userId":"140000198202211138",
        "userName":"Luff",
        "userImgUrl":"./assets/user.jpg",
        "toUserId":"210000198410281948",
        "toUserName":"Hancock",
        "userAvatar":"./assets/to-user.jpg",
        "time":1488349800000,
        "message":"A good programmer is someone who always looks both ways before crossing a one-way street. ",
        "status":"success"
  
      },
      {
        "messageId":"2",
        "userId":"210000198410281948",
        "userName":"Hancock",
        "userImgUrl":"./assets/to-user.jpg",
        "toUserId":"140000198202211138",
        "toUserName":"Luff",
        "userAvatar":"./assets/user.jpg",
        "time":1491034800000,
        "message":"Don’t worry if it doesn't work right. If everything did, you’d be out of a job.",
        "status":"success"
      },
      {
        "messageId":"3",
        "userId":"140000198202211138",
        "userName":"Luff",
        "userImgUrl":"./assets/user.jpg",
        "toUserId":"210000198410281948",
        "toUserName":"Hancock",
        "userAvatar":"./assets/to-user.jpg",
        "time":1491034920000,
        "message":"Most of you are familiar with the virtues of a programmer. There are three, of course: laziness, impatience, and hubris.",
        "status":"success"
      },
      {
        "messageId":"4",
        "userId":"210000198410281948",
        "userName":"Hancock",
        "userImgUrl":"./assets/to-user.jpg",
        "toUserId":"140000198202211138",
        "toUserName":"Luff",
        "userAvatar":"./assets/user.jpg",
        "time":1491036720000,
        "message":"One man’s crappy software is another man’s full time job.",
        "status":"success"
      },
      {
        "messageId":"5",
        "userId":"210000198410281948",
        "userName":"Hancock",
        "userImgUrl":"./assets/to-user.jpg",
        "toUserId":"140000198202211138",
        "toUserName":"Luff",
        "userAvatar":"./assets/user.jpg",
        "time":1491108720000,
        "message":"Programming is 10% science, 20% ingenuity, and 70% getting the ingenuity to work with the science.",
        "status":"success"
      },
      {
        "messageId":"6",
        "userId":"140000198202211138",
        "userName":"Luff",
        "userImgUrl":"./assets/user.jpg",
        "toUserId":"210000198410281948",
        "toUserName":"Hancock",
        "userAvatar":"./assets/to-user.jpg",
        "time":1491231120000,
        "message":"If at first you don’t succeed, call it version 1.0",
        "status":"success"
      },
      {
        "messageId":"7",
        "userId":"140000198202211138",
        "userName":"Luff",
        "userImgUrl":"./assets/user.jpg",
        "toUserId":"210000198410281948",
        "toUserName":"Hancock",
        "userAvatar":"./assets/to-user.jpg",
        "time":1491231150000,
        "message":"The <textarea> tag defines a multi-line text input control.\nA text area can hold an unlimited number of characters, and the text renders in a fixed-width font (usually Courier).\nThe size of a text area can be specified by the cols and rows attributes, or even better; through CSS' height and width properties.",
        "status":"success"
      }
    ]
  };

  constructor(private http: HttpClient,
              private events: Events) {
                console.log('Hello ChatService Provider Provider');
  }

  public mockNewMsg(msg) {
    
    const mockMsg: Message = {
      messageId: Date.now().toString(),
      userId: 210000198410281948,
      userName: 'Hancock',
      userAvatar: './assets/imgs/image_group_avatar.png',
      toUserId: 140000198202211138,
      time: Date.now(),
      message: msg.message,
      status: 'success'
    };

    setTimeout(() => {
      this.events.publish('chat:received', mockMsg, Date.now())
    }, Math.random() * 1800)
  }

  public  getMsgList(): Observable<Message[]> {
    // const msgListUrl = './assets/mock/msg-list.json';
    // const msgListUrl:any= [];
    return this.http.get<any>(this._data)
    .pipe(map(response => response.array));
  }

  public sendMsg(msg: Message) {
    return new Promise(resolve => setTimeout(() => resolve(msg), Math.random() * 1000))
    .then(() => this.mockNewMsg(msg));
  }

  public getUserInfo(): Promise<Contact> {
    const userInfo: Contact = {
      id: 140000198202211138,
      name: 'Luff',
      avatar: './assets/imgs/image_avatar.png'
    };
    return new Promise(resolve => resolve(userInfo));
  }

}
import { ActivatedRoute } from '@angular/router';
import { ChatMessage } from '../../entity/Chat-message';
import { ChatService } from '../../Services/chat.service';
import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent  implements OnInit {

  messageInput: string= '';
  userId: string = '';
  messageList: any[]=[];

  constructor(private chatService: ChatService,
    private route: ActivatedRoute
    ){
  }

  ngOnInit():void{
    this.userId = this.route.snapshot.params["userId"];
    this.chatService.joinRoom("ABC");
    console.log('*** UserId: '+this.userId);
    this.listenerMessage();
  }
 
  sendMessage(){
    console.log('**send UserId: '+this.userId);
    const chatMessage={
      message: this.messageInput,
      user: this.userId
    } as ChatMessage
    this.chatService.sendMessage("ABC", chatMessage);
    this.messageInput='';
  }

  listenerMessage(){
    this.chatService.getMessageSubject().subscribe((messages: any)=>{
      this.messageList=messages.map((item: any)=>({
        ...item,
        message_side: item.user === this.userId ? 'sender': 'receiver' 
      }))
    });
  }

}

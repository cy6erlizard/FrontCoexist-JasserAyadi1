import { ChatMessage } from '../entity/Chat-message';
import { Injectable } from '@angular/core';
import { Stomp } from '@stomp/stompjs';
import { BehaviorSubject } from 'rxjs';
import * as SockJS from 'sockjs-client';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  private stompClient: any
  private messageSubject: BehaviorSubject<ChatMessage[]> = new BehaviorSubject<ChatMessage[]>([]);

  constructor() {
    this.initConnectionSocket();
  }

  initConnectionSocket() {
    const url = '//localhost:8000/chat-socket';
    const socket = new SockJS(url);
    const webSocket = Stomp.over(socket);

    // Assign the Stomp client
    this.stompClient = webSocket;

    // Handle connection errors
    webSocket.debug = () => {}; // Disable debug messages

    // Optional: Set up error handling
    webSocket.onWebSocketError = (error: any) => {
      console.error('WebSocket Error:', error);
    };
  }

  joinRoom(roomId: string) {
    this.stompClient.connect({}, () => {
      this.stompClient.subscribe(`/topic/${roomId}`, (messages: any) => {
        const messageContent = JSON.parse(messages.body);
        const currentMessage = this.messageSubject.getValue();
        currentMessage.push(messageContent);
        this.messageSubject.next(currentMessage);
      });
    });
  }

  sendMessage(roomId: string, chatMessage: ChatMessage) {
    this.stompClient.send(`/app/chat/${roomId}`, {}, JSON.stringify(chatMessage));
  }

  getMessageSubject() {
    return this.messageSubject.asObservable();
  }
}

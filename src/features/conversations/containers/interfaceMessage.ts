import { MyPhoto } from "../../../interface/mainInterface";

interface Message {
    type: 'text' | 'image' | 'video'; 
    data: string;                    
  }
  
export interface Content {
    message: Message;
    userId: string;
    sendDate: Date;
    viewDate: Date | null;
  }
  
export interface DataUser {
    userID: string;
    avt: MyPhoto;
    name: string; 
  }
  
export interface CardConversationAPI {
    _id: string;
    _user: string[];
    content: Content | null;
    dataUser: DataUser[];
  }

export interface UserMessage{
    userID: string;
    avt: string;
    name: string;
}

export interface ConversationAPI {
    _id: string;
    _user: string[];
    content: Content[];
    dataUser: DataUser[];
}
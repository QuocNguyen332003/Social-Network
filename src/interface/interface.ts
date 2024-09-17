// User Interface
export interface User {
    _id: string;
    account: {
      email: string;
      password: string;
    };
    firstName: string;
    lastName: string;
    displayName: string;
    userName: string;
    details?: {
      phoneNumber?: string;
      address?: string;
      gender?: boolean;
      birthDate?: Date;
    };
    friends: Array<{
      userId: string;
      addDate: string;
    }>;
    status: string;
    avt: string[];
    collections: Array<{
      _id: string;
      name: string;
      items: string[];
      createdAt: Date;
      updatedAt: Date;
      _destroy: Date;
    }>;
    groups: string[];
    backGround: string[];
    aboutMe: string,
    createDate: string;
    hobbies: string[];
    listArticle: string[];
    createdAt: Date;
    updatedAt: Date;
    _destroy: Date;
}
  
  
  // Conversation Interface
export interface Conversation {
    _id: string;
    _user: {
      user1: string;
      user2: string;
    };
    content: Array<{
      userId: string;
      message: {
        type: 'text' | 'image' | 'video';
        data: string;
      };
      sendDate: Date;
    }>;
}
  
  // AddFriends Interface
export interface AddFriends {
    senderId: string;
    receiverId: string;
    status: 'accepted' | 'pending' | 'rejected';
    createdAt: Date;
    acceptedAt?: Date;
}
  
  // Notification Interface
export interface Notification {
    _id: string;
    senderId: string;
    receiverId: string;
    message: string;
    status: 'read' | 'unread';
    readAt?: Date;
    createdAt: Date;
    _destroy?: Date;
}
  
  // Hobbies Interface
export interface Hobby {
    _id: string;
    name: string;
    createdAt: Date;
    updatedAt: Date;
    _destroy?: Date;
}
  
  // MyPhoto Interface
  export interface MyPhoto {
    _id: string;
    name: string;
    idAuthor: string;
    type: 'img' | 'video';
    link: string;
    createdAt: Date;
    updatedAt: Date;
    _destroy?: Date;
}
  

// Interact Interface
export interface Emoticon {
    typeEmoticons: string;
    _iduser: string;
  }
  
  export interface Comment {
    _iduser: string;
    content: string;
    img: string[];
    replyComment: Array<Comment>; // Đệ quy: bình luận có thể có các bình luận con
    emoticons: Array<Emoticon>;
    createdAt: Date;
    updatedAt: Date;
    _destroy?: Date;
  }
  
  export interface Interact {
    _id: string;
    emoticons: Array<Emoticon>;
    comment: Array<Comment>;
  }
  
  
    // Article Interface
export interface Article {
    _id: string;
    isShare: boolean
    idHandler: string | null;
    handleDate: Date | null;
    groupID: string | null;
    content: string;
    listPhoto: string[];
    scope: string;
    interact: Interact;
    createdAt: Date;
    updatedAt: Date;
    _destroy: Date;
}
  // Group Interface
  export interface Group {
    _id: string;
    groupName: string;
    type: 'public' | 'private';
    idAdmin: string;
    introduction: string;
    avt: string;
    backGround: string;
    members: {
      count: number;
      listUsers: Array<{
        idUser: string;
        joinDate: string;
      }>;
    };
    article: {
      count: number;
      listArticle: Array<{
        idArticle: string;
        state: string;
      }>;
    };
    rule: string[];
    Administrators: Array<{
      idUser: string;
      joinDate: string;
    }>;
    hobbies: string[];
    createdAt: Date;
    updatedAt: Date;
    _destroy: Date;
}
  
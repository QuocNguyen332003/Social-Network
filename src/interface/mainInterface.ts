export interface UserDataDisplay {
    _id: string;
    avt: string[];
    name: string;
}

export interface Collection {
    _id: string;
    name: string;
    items: string[];
    createdAt: Date;
    updatedAt: Date | null;
    _destroy: Date | null;
}

export interface Account{
    warningLevel: 0 | 1 | 2 | 3;
    email: string;
    password: string;
}

export interface Details{
    phoneNumber: string;
    address: string;
    gender: boolean;
    birthDate: Date;
}

export interface Friends{
    idUser: string;
    addDate: string;
}

export interface User {
    _id: string;
    account: Account;
    firstName: string;
    lastName: string;
    displayName: string;
    userName: string;
    details: Details;
    friends: Array<Friends>;
    status: string;
    avt: string[]; // Doi id Photo
    collections: Array<Collection>;
    groups: string[];
    backGround: string[]; // Doi id Photo
    aboutMe: string;
    hobbies: string[];
    listArticle: string[];
    createdAt: Date;
    updatedAt: Date | null;
    _destroy: Date | null;
    follow: string[];
    //option: {};
  }
    
    // Conversation Interface
  export interface Conversation {
      _id: string;
      _user: string[];
      content: Array<{
        userId: string;
        message: {
          type: 'text' | 'image' | 'video';
          data: string;
        };
        sendDate: Date;
        viewDate: Date | null;
      }>;
  }
    
    // AddFriends Interface
  export interface AddFriends {
      senderId: string;
      receiverId: string;
      status: 'accepted' | 'pending' | 'rejected';
      message: string;
      createdAt: Date;
      acceptedAt: Date | null;
  }
    
    // Notification Interface
  export interface Notification {
      _id: string;
      senderId: User;
      receiverId: User;
      message: string;
      status: 'read' | 'unread';
      readAt?:  Date | null;
      createdAt: Date;
      _destroy?: Date | null;
  }
    
    // Hobbies Interface
  export interface Hobby {
      _id: string;
      name: string;
      createdAt: Date;
      updatedAt: Date;
      _destroy: Date | null;
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
  _id: string;
  _iduser: User | string; // Chấp nhận cả User hoặc string (userId)
  content: string;
  totalLikes: number;
  img: string[];
  replyComment: Array<Comment>; // Đệ quy: bình luận có thể có các bình luận con
  emoticons: Array<Emoticon>;
  createdAt: Date;
  updatedAt:Date | null;
  _destroy?: Date | null;
}
    
export interface Interact {
  _id: string;
  emoticons: Array<Emoticon>;
  comment: Array<Comment>;
}
    
export interface Report{
    _idReporter: string;
    reason: string;
    reportDate: Date;
    status: string // Trạng thái của báo cáo (đang chờ xử lý, đã xử lý, bị từ chối) = pending, processed, rejected
  }
// Article Interface
export interface Article {
  _id: string;
  sharedPostId: string | null; // Mã bài viết gốc được chia sẻ (nếu có)
  idHandler: string | null;
  handleDate: Date | null;
  reports: Array<Report>;
  groupID: string | null;
  content: string;
  hashTag: string[];
  listPhoto: string[];
  scope: string;
  interact: Interact;
  createdAt: Date;
  updatedAt: Date;
  _destroy: Date | null;

  //Dưới đây là những thứ không nằm trong database (thêm để tránh bị lỗi)
  totalLikes: 0,
  totalComments: number; // 
}

export interface Member{
    count: number;
    listUsers: Array<{
      idUser: string;
      state: 'accepted' | 'pending' | 'rejected';
      joinDate: string;
    }>;
}
export interface ArticleGroup{
    count: number;
    listArticle: Array<{
      idArticle: string;
      state: string;
    }>;
}
export interface Administrators{
    idUser: string;
    state: 'accepted' | 'pending' | 'rejected';
    joinDate: string;
  }
// Group Interface
export interface Group {
  _id: string;
  warningLevel: 0 | 1 | 2 | 3,
  groupName: string;
  type: 'public' | 'private';
  idAdmin: string;
  introduction: string;
  avt: string;
  backGround: string;
  members: Member;
  article: ArticleGroup;
  rule: string[];
  Administrators: Array<Administrators>;
  hobbies: string[];
  createdAt: Date;
  updatedAt: Date;
  _destroy: Date;
}
    
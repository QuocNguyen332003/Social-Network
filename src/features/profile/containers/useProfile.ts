import {useEffect, useState } from "react"
import { User } from "../../../interface/interface";

export const useProfile = () => {
    const [myUser, setMyUser] = useState<User | null>(null);

    useEffect(()=> {
      const url = window.location.pathname;
      const parts = url.split("/"); // ["", "profile", "u123"]
      const userId = parts[2]; // "u123"
      
      const dataUser = user.find((item) => item._id === userId) ?? null;
      setMyUser(dataUser);
    }, []);

    const changeAvt = (newAvt: string) => {
      if (myUser != null){
        const updateUser = {
          ...myUser,
          avt: [...myUser.avt, newAvt], // Thêm newAvt vào cuối mảng avt
        };
        setMyUser(updateUser);
      }
    }

    const changeBackground = (newbg: string) => {
      if (myUser != null){
        const updateUser = {
          ...myUser,
          backGround: [...myUser.backGround, newbg],
        };
        setMyUser(updateUser);
      }
    }
    const changeName = (dataInput: string[]) => {
      if (myUser != null){
        const updateUser = {
          ...myUser,
          firstName: dataInput[0], 
          lastName: dataInput[1],
        };
        setMyUser(updateUser);
      }
    }

    const changeUserName = (dataInput: string[]) => {
      if (myUser != null){
        const updateUser = {
          ...myUser,
          userName: dataInput[0],
        };
        setMyUser(updateUser);
      }
    }

    const changeEmail = (dataInput: string[]) => {
      if (myUser != null){
        const updateUser = {
          ...myUser,
          account: {
            warningLevel: myUser.account.warningLevel,
            email: dataInput[0],
            password: myUser.account.password
          },
        };
        setMyUser(updateUser);
      }
    }

    const changePassword = (dataInput: string[]) => {
      if (myUser != null && dataInput[0] == myUser.account.password && dataInput[0] == dataInput[1]){
        const updateUser = {
          ...myUser,
          account: {
            warningLevel: myUser.account.warningLevel,
            email: myUser.account.email,
            password: dataInput[2]
          },
        };
        setMyUser(updateUser);
      }
    }

    const changeAboutMe = (dataInput: string[]) => {
      if (myUser != null){
        const updateUser = {
          ...myUser,
          aboutMe: dataInput[0]
        };
        setMyUser(updateUser);
      }
    }
    const changePhoneNumber = (dataInput: string[]) => {
      if (myUser != null){
        const updateUser = {
          ...myUser,
          details: {
            ...myUser.details,
            phoneNumber: dataInput[0],
          }
        };
        setMyUser(updateUser);
      }
    }
    const changeAddress= (dataInput: string[]) => {
      if (myUser != null){
        const updateUser = {
          ...myUser,
          details: {
            ...myUser.details,
            address: dataInput[0],
          }
        };
        setMyUser(updateUser);
      }
    }

    const changeBirthday= (dataInput: Date) => {
      if (myUser != null){
        const updateUser = {
          ...myUser,
          details: {
            ...myUser.details,
            birthDate: dataInput,
          }
        };
        setMyUser(updateUser);
      }
    }
    const changeGender= (dataInput: boolean) => {
      if (myUser != null){
        const updateUser = {
          ...myUser,
          details: {
            ...myUser.details,
            gender: dataInput,
          }
        };
        setMyUser(updateUser);
      }
    }
    return {
        myUser,
        changeAvt,
        changeBackground,
        changeName,
        changeUserName,
        changeEmail,
        changePassword,
        changeAboutMe,
        changePhoneNumber,
        changeAddress,
        changeBirthday,
        changeGender,

    }
}

const user: User[] = [
  {
    _id: "u123",
    account: {
      warningLevel: 0,
      email: "user123@example.com",
      password: "hashed_password"
    },
    firstName: "John",
    lastName: "Doe",
    displayName: "JohnDoe123",
    userName: "john_doe_123",
    friends: [
      {
        userId: "u456",
        addDate: "2024-09-15"
      },
      {
        userId: "u789",
        addDate: "2024-08-30"
      }
    ],
    avt: ["/src/assets/data-test/avt1.png"],
    backGround: ["/src/assets/data-test/avt3.jpg"],
    status: "Online",
    createDate: "2024-01-01",
    details: {
      phoneNumber: "123-456-7890",
      address: "123 Main St, Springfield",
      gender: true,
      birthDate: new Date("1990-06-15")
    },
    collections: [
      {
        _id: "col123",
        name: "My Collection",
        items: ["item1", "item2", "item3"],
        createdAt: new Date("2024-02-01"),
        updatedAt: new Date("2024-08-01"),
        _destroy: new Date("2024-12-31")
      }
    ],
    groups: ["group1", "group2"],
    hobbies: ["reading", "coding", "traveling"],
    listArticle: ["article1", "article2", "article3"],
    aboutMe: 'Hello',
    createdAt: new Date("2024-01-01"),
    updatedAt: new Date("2024-09-01"),
    _destroy: new Date("2025-01-01")
  },
  {
    _id: "user001",
    account: {
      warningLevel: 0,
      email: "user123@example.com",
      password: "hashed_password"
    },
    firstName: "Nguyễn Văn",
    lastName: "A",
    displayName: "JohnDoe123",
    userName: "@VanA",
    friends: [
      {
        userId: "u456",
        addDate: "2024-09-15"
      },
      {
        userId: "u789",
        addDate: "2024-08-30"
      }
    ],
    avt: ["/src/assets/data-test/avt1.png"],
    backGround: ["/src/assets/data-test/avt3.jpg"],
    status: "Online",
    createDate: "2024-01-01",
    details: {
      phoneNumber: "123-456-7890",
      address: "123 Main St, Springfield",
      gender: true,
      birthDate: new Date("1990-06-15")
    },
    collections: [
      {
        _id: "col123",
        name: "My Collection",
        items: ["item1", "item2", "item3"],
        createdAt: new Date("2024-02-01"),
        updatedAt: new Date("2024-08-01"),
        _destroy: new Date("2024-12-31")
      }
    ],
    groups: ["group1", "group2"],
    hobbies: ["reading", "coding", "traveling"],
    listArticle: ["article1", "article2", "article3"],
    aboutMe: 'Hello',
    createdAt: new Date("2024-01-01"),
    updatedAt: new Date("2024-09-01"),
    _destroy: new Date("2025-01-01")
  },
  {
    _id: "user002",
    account: {
      warningLevel: 0,
      email: "user123@example.com",
      password: "hashed_password"
    },
    firstName: "Trần",
    lastName: "Thị B",
    displayName: "JohnDoe123",
    userName: "john_doe_123",
    friends: [
      {
        userId: "u456",
        addDate: "2024-09-15"
      },
      {
        userId: "u789",
        addDate: "2024-08-30"
      }
    ],
    avt: ["/src/assets/data-test/avt1.png"],
    backGround: ["/src/assets/data-test/avt3.jpg"],
    status: "Online",
    createDate: "2024-01-01",
    details: {
      phoneNumber: "123-456-7890",
      address: "123 Main St, Springfield",
      gender: true,
      birthDate: new Date("1990-06-15")
    },
    collections: [
      {
        _id: "col123",
        name: "My Collection",
        items: ["item1", "item2", "item3"],
        createdAt: new Date("2024-02-01"),
        updatedAt: new Date("2024-08-01"),
        _destroy: new Date("2024-12-31")
      }
    ],
    groups: ["group1", "group2"],
    hobbies: ["reading", "coding", "traveling"],
    listArticle: ["article1", "article2", "article3"],
    aboutMe: 'Hello',
    createdAt: new Date("2024-01-01"),
    updatedAt: new Date("2024-09-01"),
    _destroy: new Date("2025-01-01")
  },
  {
    _id: "user003",
    account: {
      warningLevel: 0,
      email: "user123@example.com",
      password: "hashed_password"
    },
    firstName: "Lê",
    lastName: "Quốc C",
    displayName: "JohnDoe123",
    userName: "john_doe_123",
    friends: [
      {
        userId: "u456",
        addDate: "2024-09-15"
      },
      {
        userId: "u789",
        addDate: "2024-08-30"
      }
    ],
    avt: ["/src/assets/data-test/avt1.png"],
    backGround: ["/src/assets/data-test/avt3.jpg"],
    status: "Online",
    createDate: "2024-01-01",
    details: {
      phoneNumber: "123-456-7890",
      address: "123 Main St, Springfield",
      gender: true,
      birthDate: new Date("1990-06-15")
    },
    collections: [
      {
        _id: "col123",
        name: "My Collection",
        items: ["item1", "item2", "item3"],
        createdAt: new Date("2024-02-01"),
        updatedAt: new Date("2024-08-01"),
        _destroy: new Date("2024-12-31")
      }
    ],
    groups: ["group1", "group2"],
    hobbies: ["reading", "coding", "traveling"],
    listArticle: ["article1", "article2", "article3"],
    aboutMe: 'Hello',
    createdAt: new Date("2024-01-01"),
    updatedAt: new Date("2024-09-01"),
    _destroy: new Date("2025-01-01")
  },
  {
    _id: "user004",
    account: {
      warningLevel: 0,
      email: "user123@example.com",
      password: "hashed_password"
    },
    firstName: "Phạm Văn",
    lastName: "D",
    displayName: "JohnDoe123",
    userName: "john_doe_123",
    friends: [
      {
        userId: "u456",
        addDate: "2024-09-15"
      },
      {
        userId: "u789",
        addDate: "2024-08-30"
      }
    ],
    avt: ["/src/assets/data-test/avt1.png"],
    backGround: ["/src/assets/data-test/avt3.jpg"],
    status: "Online",
    createDate: "2024-01-01",
    details: {
      phoneNumber: "123-456-7890",
      address: "123 Main St, Springfield",
      gender: true,
      birthDate: new Date("1990-06-15")
    },
    collections: [
      {
        _id: "col123",
        name: "My Collection",
        items: ["item1", "item2", "item3"],
        createdAt: new Date("2024-02-01"),
        updatedAt: new Date("2024-08-01"),
        _destroy: new Date("2024-12-31")
      }
    ],
    groups: ["group1", "group2"],
    hobbies: ["reading", "coding", "traveling"],
    listArticle: ["article1", "article2", "article3"],
    aboutMe: 'Hello',
    createdAt: new Date("2024-01-01"),
    updatedAt: new Date("2024-09-01"),
    _destroy: new Date("2025-01-01")
  },
  {
    _id: "user005",
    account: {
      warningLevel: 0,
      email: "user123@example.com",
      password: "hashed_password"
    },
    firstName: "Đặng Minh",
    lastName: "E",
    displayName: "JohnDoe123",
    userName: "john_doe_123",
    friends: [
      {
        userId: "u456",
        addDate: "2024-09-15"
      },
      {
        userId: "u789",
        addDate: "2024-08-30"
      }
    ],
    avt: ["/src/assets/data-test/avt1.png"],
    backGround: ["/src/assets/data-test/avt3.jpg"],
    status: "Online",
    createDate: "2024-01-01",
    details: {
      phoneNumber: "123-456-7890",
      address: "123 Main St, Springfield",
      gender: true,
      birthDate: new Date("1990-06-15")
    },
    collections: [
      {
        _id: "col123",
        name: "My Collection",
        items: ["item1", "item2", "item3"],
        createdAt: new Date("2024-02-01"),
        updatedAt: new Date("2024-08-01"),
        _destroy: new Date("2024-12-31")
      }
    ],
    groups: ["group1", "group2"],
    hobbies: ["reading", "coding", "traveling"],
    listArticle: ["article1", "article2", "article3"],
    aboutMe: 'Hello',
    createdAt: new Date("2024-01-01"),
    updatedAt: new Date("2024-09-01"),
    _destroy: new Date("2025-01-01")
  },
]
  

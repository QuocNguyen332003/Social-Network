import {useState } from "react"

export interface DataChatListProps {
    userID: string;
    avt: string;
    name: string;
    sendDate: Date;
    isRead: boolean; // true nếu đã đọc
    lastMessage: {
        sender: boolean; // true: gửi cho bạn bè, false bạn bè gửi
        message: string | null;
    }
}

export const useChatList = () => {
    const [data, setData] = useState<DataChatListProps[]>(chatList);

    const readMessage = (userID: string) => {
        const updatedChatList = chatList.map((chat) => {
            if (chat.userID === userID) {
              return {
                ...chat,
                isRead: true
              };
            }
            return chat;
          });
        setData(updatedChatList);
    }

    const sendMessage = (userID: String, message: string) => {
        const updatedChatList = chatList.map((chat) => {
            if (chat.userID === userID) {
              return {
                ...chat,
                lastMessage: {
                    sender: true,
                    message: message
                }
              };
            }
            return chat;
          });
        setData(updatedChatList);
    }

    return {
        data,
        readMessage,
        sendMessage
    }
}


const chatList: DataChatListProps[] = [
    {
      userID: "u123",
      avt: "/src/assets/data-test/avt1.png",
      name: "John Doe",
      sendDate: new Date("2024-09-10T10:30:00"),
      isRead: true,
      lastMessage: {
        sender: true,
        message: "Hey, how's it going?"
      }
    },
    {
      userID: "u456",
      avt: "/src/assets/data-test/avt2.jpg",
      name: "Jane Smith",
      sendDate: new Date("2024-09-09T14:45:00"),
      isRead: false,
      lastMessage: {
        sender: false,
        message: "I'm good, thanks for asking!"
      }
    },
    {
      userID: "u789",
      avt: "/src/assets/data-test/avt3.jpg",
      name: "Emily Johnson",
      sendDate: new Date("2024-09-08T09:20:00"),
      isRead: true,
      lastMessage: {
        sender: true,
        message: "Let's meet at 5 PM."
      }
    },
    {
      userID: "u321",
      avt: "/src/assets/data-test/avt4.jpeg",
      name: "Michael Brown",
      sendDate: new Date("2024-09-07T12:30:00"),
      isRead: false,
      lastMessage: {
        sender: false,
        message: "Sure, I'll be there!"
      }
    },
    {
      userID: "u654",
      avt: "/src/assets/data-test/avt1.png",
      name: "Sophia Davis",
      sendDate: new Date("2024-09-06T16:10:00"),
      isRead: true,
      lastMessage: {
        sender: true,
        message: "Don't forget to bring the documents."
      }
    }
  ];
  
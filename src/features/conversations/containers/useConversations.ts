import {useState } from "react"
export interface DataMessageProps {
    userID: string;
    avt: string;
    name: string;
    sendDate: Date;
    isRead: boolean; // true nếu đã đọc
    conversation: {
        date: Date;
        type: string;
        data: string;
        isSend: boolean; // true bạn gửi đến bạn bè
    }[]
}

export const useConversations = () => {
    const [allMessages, setAllMessages] = useState<DataMessageProps[]>([
        {
          userID: "u123",
          avt: "/src/assets/data-test/avt1.png",
          name: "John Doe",
          sendDate: new Date("2024-09-10T10:30:00"),
          isRead: true,
          conversation: [
            {
              date: new Date("2024-09-10T10:30:00"),
              type: "text",
              data: "Hey, how are you?",
              isSend: true
            },
            {
              date: new Date("2024-09-10T10:35:00"),
              type: "text",
              data: "I'm doing great, thanks! How about you?",
              isSend: false
            },
            {
              date: new Date("2024-09-10T10:40:00"),
              type: "text",
              data: "I'm fine too, let's catch up later.",
              isSend: true
            }
          ]
        },
        {
          userID: "u456",
          avt: "/src/assets/data-test/avt2.jpg",
          name: "Jane Smith",
          sendDate: new Date("2024-09-09T14:45:00"),
          isRead: false,
          conversation: [
            {
              date: new Date("2024-09-09T14:45:00"),
              type: "image",
              data: "/src/assets/data-test/avt2.jpg",
              isSend: false
            },
            {
              date: new Date("2024-09-09T14:50:00"),
              type: "text",
              data: "Check out this picture I took!",
              isSend: false
            },
            {
              date: new Date("2024-09-09T14:55:00"),
              type: "text",
              data: "Wow, that's amazing!",
              isSend: true
            }
          ]
        },
        {
          userID: "u789",
          avt: "/src/assets/data-test/avt3.jpg",
          name: "Emily Johnson",
          sendDate: new Date("2024-09-08T09:20:00"),
          isRead: true,
          conversation: [
            {
              date: new Date("2024-09-08T09:20:00"),
              type: "text",
              data: "Let's meet at 5 PM.",
              isSend: true
            },
            {
              date: new Date("2024-09-08T09:25:00"),
              type: "text",
              data: "Sounds good, see you then.",
              isSend: false
            }
          ]
        },
        {
          userID: "u321",
          avt: "/src/assets/data-test/avt4.jpeg",
          name: "Michael Brown",
          sendDate: new Date("2024-09-07T12:30:00"),
          isRead: false,
          conversation: [
            {
              date: new Date("2024-09-07T12:30:00"),
              type: "text",
              data: "I'll bring the documents.",
              isSend: false
            },
            {
              date: new Date("2024-09-07T12:35:00"),
              type: "text",
              data: "Great, see you at the meeting.",
              isSend: true
            }
          ]
        },
        {
          userID: "u654",
          avt: "/src/assets/data-test/avt1.png",
          name: "Sophia Davis",
          sendDate: new Date("2024-09-06T16:10:00"),
          isRead: true,
          conversation: [
            {
              date: new Date("2024-09-06T16:10:00"),
              type: "video",
              data: "/src/assets/video-test/TestVideo.mp4",
              isSend: true
            },
            {
              date: new Date("2024-09-06T16:15:00"),
              type: "text",
              data: "Here's the video you asked for.",
              isSend: true
            },
            {
              date: new Date("2024-09-06T16:20:00"),
              type: "text",
              data: "Thanks, I'll watch it now.",
              isSend: false
            }
          ]
        }
      ]);
    const [dataConversation, setDataConversation] = useState<DataMessageProps>(allMessages[0]);
    

    const chooseFriendChat = (userID: string) => {
      const newUserChat = allMessages.find((item) => item.userID === userID) || {
        userID: userID,
        avt: "",
        name: "",
        sendDate: new Date(),
        isRead: false, // true nếu đã đọc
        conversation: []
      };
      setDataConversation(newUserChat);
    }

    const addNewMessage = (type: string, data: string, userID: string) => {
      const newAllMessages = allMessages.map((item) => {
        if (item.userID === userID) {
          return {
            ...item,
            sendDate: new Date(),
            conversation: [
              ...item.conversation, 
              {
                date: new Date(),
                type: type, 
                data: data, 
                isSend: true
              }
            ]
          };
        }
        return item;
      })
      setAllMessages(newAllMessages);

      const updatedConversation = newAllMessages.find(item => item.userID === userID);
      if (updatedConversation) {
        setDataConversation(updatedConversation);
      }
    }
    return {
        dataConversation,
        chooseFriendChat,
        addNewMessage,
    }
}
  
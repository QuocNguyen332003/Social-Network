import {useState } from "react"
import FriendProps from "../../components/FriendProps";

const friendsData: FriendProps[] = [
    {
      userID: "user001",
      addDate: new Date('2023-01-15'),
      avt: "/src/assets/data-test/avt1.png",
      name: "Nguyễn Văn A",
      aboutMe: "A passionate software developer from Hanoi."
    },
    {
      userID: "user002",
      addDate: new Date('2023-02-20'),
      avt: "/src/assets/images/avt.png",
      name: "Trần Thị B",
      aboutMe: "A creative designer who loves painting and photography."
    },
    {
      userID: "user003",
      addDate: new Date('2023-03-05'),
      avt: "/src/assets/images/avt.png",
      name: "Lê Quốc C",
      aboutMe: "A digital marketer who enjoys content creation and social media strategies."
    },
    {
      userID: "user004",
      addDate: new Date('2023-04-10'),
      avt: "/src/assets/images/avt.png",
      name: "Phạm Văn D",
      aboutMe: "A business analyst with a passion for data and automation."
    },
    {
      userID: "user005",
      addDate: new Date('2023-05-22'),
      avt: "/src/assets/images/avt.png",
      name: "Đặng Minh E",
      aboutMe: "A project manager with a love for Agile methodologies and teamwork."
    }
  ];
  

export const useRequestFriend = () => {
    const [data, setData] = useState<FriendProps[]>(friendsData);

    const SendAddFriend = (userID: String) => {
        const updatedData = data.filter(friend => friend.userID !== userID);
        setData(updatedData)
    }

    return {
        data,
        SendAddFriend,
    }
}

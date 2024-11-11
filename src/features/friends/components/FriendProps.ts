import { MyPhoto } from "../../../interface/mainInterface";

export default interface FriendProps {
    _id?: string;
    idUser: string;
    addDate?: Date;
    avt: MyPhoto;
    name: string;
    aboutMe: string;
}
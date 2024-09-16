import { Box } from "@mui/material";
import CustomButton from "./CustomButton";

interface BoxButtonProps {
    FuncButton: Array<() => void>
}

export const BoxButtonRequest = ({FuncButton} : BoxButtonProps) => {
    const refuseFriend = () => {
        FuncButton[0]()
    }
    const AcceptFriend = () => {
        FuncButton[1]()
    }
    return (
        <Box sx={{
            width: '350px',
            display: 'flex', justifyContent: 'space-between'
        }}>
            <CustomButton title={"Từ chối"} clickButton={refuseFriend}/>
            <CustomButton title={"Đồng ý"} clickButton={AcceptFriend}/>
        </Box>
    )
}
export const BoxButtonSuggest = ({FuncButton} : BoxButtonProps) => {
    const AddFriend = () => {
        FuncButton[0]()
    }
    return (
        <Box sx={{
            width: '350px',
            display: 'flex', justifyContent: 'flex-end'
        }}>
            <CustomButton title={"Gửi lời mời"} clickButton={AddFriend}/>
        </Box>
    )
}
export const BoxButtonAllFriends: React.FC<BoxButtonProps> = ({ FuncButton }) => {
    const deleteFriend = () => {
        console.log("pass")
        FuncButton[0]()
    }
    const viewPersonalPage = () => {
        FuncButton[1]()
    }
    return (
        <Box sx={{
            width: '350px',
            display: 'flex', justifyContent: 'space-between'
        }}>
            <CustomButton title={"Xóa bạn"} clickButton={deleteFriend} />
            <CustomButton title={"Xem trang cá nhân"} clickButton={viewPersonalPage}/>
        </Box>
    )
}

export const BoxButtonMyRequest = ({FuncButton} : BoxButtonProps) => {
    const Recall = () => {
        FuncButton[0]()
    }
    return (
        <Box sx={{
            width: '350px',
            display: 'flex', justifyContent: 'flex-end'
        }}>
            <CustomButton title={"Thu hồi kết bạn"} clickButton={Recall}/>
        </Box>
    )
}
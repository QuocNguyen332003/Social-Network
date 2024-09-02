import { Box } from "@mui/material";
import CustomButton from "./CustomButton";

export function BoxButtonRequest() {
    return (
        <Box sx={{
            width: '350px',
            display: 'flex', justifyContent: 'space-between'
        }}>
            <CustomButton title={"Từ chối"}/>
            <CustomButton title={"Đồng ý"}/>
        </Box>
    )
}
export function BoxButtonSuggest() {
    return (
        <Box sx={{
            width: '350px',
            display: 'flex', justifyContent: 'flex-end'
        }}>
            <CustomButton title={"Gửi lời mời"}/>
        </Box>
    )
}
export function BoxButtonAllFriends() {
    return (
        <Box sx={{
            width: '350px',
            display: 'flex', justifyContent: 'space-between'
        }}>
            <CustomButton title={"Xóa bạn"}/>
            <CustomButton title={"Xem trang cá nhân"}/>
        </Box>
    )
}
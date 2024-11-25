import { Box, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, Switch, Typography } from "@mui/material";
import { UserSetting } from "../../../interface/interface";

interface SettingUserProps {
    data: UserSetting;
    setData: (value: UserSetting) => void;
}
const SettingUser = ({data, setData}: SettingUserProps) => {

    const handleChangeProfileVisibility = (value: string) => {
        setData({
            ...data,
            profileVisibility: value
        })
    }

    const handleChangeAllowMessages = (value: boolean) => {
        setData({
            ...data,
            allowMessagesFromStrangers: value
        })
    }
    return (
        <Box>
            {/* Cài đặt trang cá nhân */}
            <Box sx={{ marginBottom: 3 }}>
                <FormControl component="fieldset">
                    <FormLabel component="legend" sx={{fontSize: 20, fontWeight: '500', color: 'black'}}>Cài đặt trang cá nhân</FormLabel>
                    <RadioGroup
                        value={data.profileVisibility}
                        onChange={(e) => handleChangeProfileVisibility(e.target.value)}
                    >
                        <FormControlLabel
                            value="public"
                            control={<Radio />}
                            label="Công khai"
                        />
                        <FormControlLabel
                            value="friends"
                            control={<Radio />}
                            label="Chỉ bạn bè"
                        />
                        <FormControlLabel
                            value="private"
                            control={<Radio />}
                            label="Chỉ mình tôi"
                        />
                    </RadioGroup>
                </FormControl>
            </Box>

            {/* Cài đặt nhắn tin */}
            <Box>
                <Typography variant="h6" gutterBottom>
                    Cài đặt nhắn tin
                </Typography>
                <FormControlLabel
                    control={
                        <Switch
                            checked={data.allowMessagesFromStrangers}
                            onChange={(e) => handleChangeAllowMessages(e.target.checked)}
                        />
                    }
                    label="Cho phép nhận tin nhắn từ người lạ"
                />
            </Box>
        </Box>
    );
};

export default SettingUser;

import { Box} from "@mui/material";
import CollectionCard from "../../../../shared/components/collection-card/CollectionCard";

const ProfileCollection = () => {
  const dataTestImg = [
    {link: "/src/assets/images/avt.png"},{link: "/src/assets/images/avt.png"},{link: "/src/assets/images/avt.png"},
    {link: "/src/assets/images/background-login.png"},{link: "/src/assets/images/avt.png"},{link: "/src/assets/images/avt.png"},
    {link: "/src/assets/images/test.png"},{link: "/src/assets/images/avt.png"},{link: "/src/assets/images/avt.png"},
    {link: "/src/assets/images/avt.png"},{link: "/src/assets/images/avt.png"},{link: "/src/assets/images/avt.png"},
    {link: "/src/assets/images/avt.png"},{link: "/src/assets/images/avt.png"},{link: "/src/assets/images/avt.png"},
    {link: "/src/assets/images/avt.png"},{link: "/src/assets/images/avt.png"},{link: "/src/assets/images/avt.png"},
    {link: "/src/assets/images/avt.png"},{link: "/src/assets/images/avt.png"},{link: "/src/assets/images/avt.png"},
    {link: "/src/assets/images/avt.png"},{link: "/src/assets/images/avt.png"},{link: "/src/assets/images/avt.png"},
  ]
const dataTestVideo = [
    {link: "/src/assets/video-test/TestVideo.mp4"},{link: "/src/assets/video-test/TestVideo.mp4"},{link: "/src/assets/video-test/TestVideo.mp4"},
    {link: "/src/assets/video-test/TestVideo.mp4"},{link: "/src/assets/video-test/TestVideo.mp4"},{link: "/src/assets/video-test/TestVideo.mp4"},
    {link: "/src/assets/video-test/TestVideo.mp4"},{link: "/src/assets/video-test/TestVideo.mp4"},{link: "/src/assets/video-test/TestVideo.mp4"},
    {link: "/src/assets/video-test/TestVideo.mp4"},{link: "/src/assets/video-test/TestVideo.mp4"},{link: "/src/assets/video-test/TestVideo.mp4"},
    {link: "/src/assets/video-test/TestVideo.mp4"},{link: "/src/assets/video-test/TestVideo.mp4"},{link: "/src/assets/video-test/TestVideo.mp4"},
    {link: "/src/assets/video-test/TestVideo.mp4"},{link: "/src/assets/video-test/TestVideo.mp4"},{link: "/src/assets/video-test/TestVideo.mp4"},
    {link: "/src/assets/video-test/TestVideo.mp4"},{link: "/src/assets/video-test/TestVideo.mp4"},{link: "/src/assets/video-test/TestVideo.mp4"},
  ]

  return (
    <Box sx={{
      backgroundColor: '#e9e9e9',
      padding: '20px'
    }}>
      <CollectionCard title={"Ảnh"} type={"img"} data={dataTestImg} id={'collection-image'}/>
      <CollectionCard title={"Video"} type={"video"} data={dataTestVideo} id={'collection-video'}/>
      
    </Box>
  );
};

export default ProfileCollection;

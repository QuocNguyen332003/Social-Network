import { Box } from "@mui/material";
import CollectionCard from "../../components/CollectionCard";
import Album from "../../components/Album";
import { useCollectionContext } from "../../useCollection";

const Collections = () => {
    const { currCollection, setCurrCollection } = useCollectionContext();
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
      const dataAlbum = [
        { label: "SG",
          data: [
            {
              type: 'Video',
              content: 'Có nhiều cô gái liều mang kiếm tiền là để chứng minh rằng không có ai bên cạnh, mình vẫn có thể sống tốt.',
              collection: 'SG',
              media: '/src/assets/images/avt.png',
              savedBy: 'Chúng Ta Của Hiện Tại',
            },
            {
              type: 'Link',
              content: 'Saritasa',
              collection: 'SG',
              media: '/src/assets/images/avt.png',
              savedBy: 'Khoa Công nghệ Thông tin - Trường ĐH SPKT Tp.HCM',
            },
            {
              type: 'Post',
              content: 'MỘT SỐ LỆNH GIT CƠ BẢN',
              collection: 'SG',
              media: '/src/assets/images/avt.png',
              savedBy: 'Cuộc Đời Anh IT',
            },
            {
              type: 'Link',
              content: 'Saritasa',
              collection: 'SG',
              media: '/src/assets/images/avt.png',
              savedBy: 'Khoa Công nghệ Thông tin - Trường ĐH SPKT Tp.HCM',
            },
            {
              type: 'Post',
              content: 'MỘT SỐ LỆNH GIT CƠ BẢN',
              collection: 'SG',
              media: '/src/assets/images/avt.png',
              savedBy: 'Cuộc Đời Anh IT',
            },
            {
              type: 'Post',
              content: 'MỘT SỐ LỆNH GIT',
              collection: 'SG',
              media: '/src/assets/images/avt.png',
              savedBy: 'Cuộc Đời Anh IT',
            },
          ]
        },
        { label: "TV & Phim Ảnh",
          data: [
            {
              type: 'Video',
              content: 'Có nhiều cô gái liều mang kiếm tiền là để chứng minh rằng không có ai bên cạnh, mình vẫn có thể sống tốt.',
              collection: 'TV & Phim Ảnh',
              media: '/src/assets/images/avt.png',
              savedBy: 'Chúng Ta Của Hiện Tại',
            },
            {
              type: 'Link',
              content: 'Saritasa',
              collection: 'TV & Phim Ảnh',
              media: '/src/assets/images/avt.png',
              savedBy: 'Khoa Công nghệ Thông tin - Trường ĐH SPKT Tp.HCM',
            },
            {
              type: 'Post',
              content: 'MỘT SỐ LỆNH GIT CƠ BẢN',
              collection: 'TV & Phim Ảnh',
              media: '/src/assets/images/avt.png',
              savedBy: 'Cuộc Đời Anh IT',
            },
          ]
        }
      ];
  return (
    <Box 
      sx={{ 
        padding: '16px', 
        height: '85vh', 
        overflowY: 'scroll',
        scrollbarWidth: 'none',
            '&::-webkit-scrollbar': {
              display: 'none',
        },
        backgroundColor: '#e9e9e9',
      }}
      
    >
      <CollectionCard title={"Ảnh"} type={"img"} data={dataTestImg} id={'collection-image'}/>
      <CollectionCard title={"Video"} type={"video"} data={dataTestVideo} id={'collection-video'}/>
      <Album title={"Album"} collections={dataAlbum} currCollection={currCollection} setCurrCollection={setCurrCollection}/>
    </Box>
  );
}

export default Collections;

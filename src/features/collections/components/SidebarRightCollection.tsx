import { Add } from "@mui/icons-material";
import { Avatar, Box, Button, List, ListItem, ListItemText, Typography } from "@mui/material"
import CropOriginalIcon from '@mui/icons-material/CropOriginal';
import SlowMotionVideoIcon from '@mui/icons-material/SlowMotionVideo';
import { CollectionContextType } from "../useCollection";

const SidebarRightCollections = ({setCurrCollection}: CollectionContextType) => {
  const collections = ['SG', 'TV & Phim ảnh'];
  const categorys = [
    { label: 'Hình ảnh', icon: <CropOriginalIcon />, id: 'collection-image' },
    { label: 'Video', icon: <SlowMotionVideoIcon />, id: 'collection-video' },
    // Thêm các danh mục khác nếu cần
  ]

  const handleScroll = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

    return(
    <Box sx={{padding: '10px'}}>
      <Typography
        variant="subtitle1"
        color="gray"
        sx={{
          fontWeight: 'bold',
          fontSize: { xs: '0.9rem', sm: '1rem' },
        }}
      >
        Danh mục
      </Typography>

      <List sx={{ gap: 1, display: 'flex', flexDirection: 'column' }}>
        {categorys.map((category, index) => (
          <ListItem
            button
            key={index}
            onClick={() => handleScroll(category.id)}
            sx={{
              borderRadius: 2,
              backgroundColor: '#f5f5f5',
              padding: { xs: 1, sm: 1.5 },
              display: 'flex',
              alignItems: 'center',
              gap: 2, // Giảm khoảng cách giữa Avatar và Text
            }}
          >
            {category.icon}
            <ListItemText
              primary={category.label}
              sx={{
                color: '#424242',
                fontSize: { xs: '0.9rem', sm: '1rem' },
              }}
            />
          </ListItem>
        ))} 
      </List>
      <Typography
        variant="subtitle1"
        color="gray"
        sx={{
          fontWeight: 'bold',
          fontSize: { xs: '0.9rem', sm: '1rem' },
        }}
      >
        Bộ sưu tập của tôi
      </Typography>
      <List sx={{ gap: 1, display: 'flex', flexDirection: 'column' }}> {/* Flex direction để xếp các item dọc */}
        {collections.map((collection, index) => (
          <ListItem
            button
            key={index}
            onClick={() => {handleScroll("album"); setCurrCollection(index)}}
            sx={{
              borderRadius: 2,
              backgroundColor: '#f5f5f5',
              padding: { xs: 1, sm: 1.5 },
              display: 'flex',
              alignItems: 'center',
              gap: 2, // Giảm khoảng cách giữa Avatar và Text
            }}
          >
            <Avatar
              alt={collection}
              src={`/static/images/${collection.toLowerCase()}.jpg`}
              sx={{
                width: { xs: 24, sm: 32 },
                height: { xs: 24, sm: 32 },
              }}
            />
            <ListItemText
              primary={collection}
              sx={{
                color: '#424242',
                fontSize: { xs: '0.9rem', sm: '1rem' },
              }}
            />
          </ListItem>
        ))}
      </List>

      {/* Create new collection button */}
      <Button
        variant="contained"
        sx={{
          width: '100%',
          padding: { xs: 1, sm: 1.5 },
          borderRadius: 3,
          backgroundColor: '#1e88e5',
          fontSize: { xs: '0.9rem', sm: '1rem' },
          ':hover': { backgroundColor: '#1565c0' },
          marginTop: 'auto', // Đẩy nút xuống dưới cùng
        }}
        startIcon={<Add />}
      >
        Tạo bộ sưu tập mới
      </Button>
    </Box>
    )
}

export default SidebarRightCollections;
import React, { useState } from 'react';
import { Box, Typography, Grid, Button, IconButton, Menu, MenuItem } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert'; // Icon ba dấu chấm
import { groups, users } from '../../../components/GroupListData'; // Import dữ liệu từ file chứa mock data
import { useNavigate } from 'react-router-dom'; // Dùng để điều hướng

const YourGroups: React.FC = () => {
  const navigate = useNavigate();

  // Giả sử bạn sử dụng người dùng đầu tiên trong danh sách
  const currentUser = users[0]; // Có thể thay bằng logic lấy người dùng hiện tại

  // Lọc các nhóm mà người dùng đã tham gia
  const [joinedGroups, setJoinedGroups] = useState(groups.filter(group => currentUser.groups.includes(group._id)));

  // Trạng thái cho menu sắp xếp
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  // Mở menu khi nhấn vào nút ba dấu chấm
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  // Đóng menu
  const handleClose = () => {
    setAnchorEl(null);
  };

  // Hàm xử lý điều hướng khi nhấn "Xem nhóm"
  const handleViewGroup = (group: typeof groups[0]) => {
    navigate(`/group/${group._id}`, { state: { group } }); // Pass the selected group data via state
  };

  // Hàm xử lý sắp xếp theo tên nhóm
  const handleSortGroups = () => {
    const sortedGroups = [...joinedGroups].sort((a, b) => a.groupName.localeCompare(b.groupName));
    setJoinedGroups(sortedGroups);
  };

  return (
    <Box
      sx={{
        width: '100%',
        padding: 2,
        maxWidth: '100%', // Đảm bảo container không vượt quá màn hình
        overflowX: 'hidden', // Ngăn tràn ngang
        overflowY: 'auto', // Cho phép cuộn dọc
        height: '100vh', // Đặt chiều cao toàn màn hình
        boxSizing: 'border-box' // Đảm bảo padding không ảnh hưởng đến kích thước
      }}
    >
      {/* Tiêu đề và nút sắp xếp */}
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h6" sx={{ fontWeight: 'bold', fontSize: '1.2rem', flexGrow: 1 }}> {/* Kích thước tiêu đề lớn hơn một chút */}
          Tất cả các nhóm bạn đã tham gia ({joinedGroups.length})
        </Typography>
        <Box>
          <Typography 
            variant="body2" 
            sx={{ 
              color: '#1976d2', 
              cursor: 'pointer', 
              fontSize: '0.875rem', 
              whiteSpace: 'nowrap',  // Đảm bảo chữ không bị cắt ngang
              ml: 2,                 // Tạo khoảng cách giữa tiêu đề và "Sắp xếp"
            }} 
            onClick={handleSortGroups}
          >
            Sắp xếp
          </Typography>
        </Box>
      </Box>

      {/* Grid chứa các thẻ nhóm */}
      <Grid container spacing={3} sx={{ maxWidth: '100%' }}> {/* Đảm bảo grid không vượt quá màn hình */}
        {joinedGroups.map(group => (
          <Grid item xs={12} sm={6} md={6} key={group._id}>
            <Box
              display="flex"
              flexDirection="column"
              justifyContent="space-between"
              alignItems="flex-start"
              sx={{
                border: '1px solid #e0e0e0',
                borderRadius: '12px', // Bo góc mềm mại hơn
                padding: '16px', // Tăng padding để làm thẻ rộng rãi hơn
                backgroundColor: '#fff',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.05)', // Hiệu ứng đổ bóng nhẹ
                transition: 'transform 0.2s', // Hiệu ứng hover
                '&:hover': {
                  transform: 'translateY(-4px)', // Hiệu ứng nâng lên khi hover
                  boxShadow: '0 8px 16px rgba(0, 0, 0, 0.1)',
                },
                maxWidth: '100%', // Đảm bảo thẻ không vượt quá màn hình
                overflow: 'hidden', // Giảm thiểu tràn nội dung
              }}
            >
              <Box display="flex" alignItems="center" mb={2} sx={{ width: '100%' }}> {/* Đảm bảo ảnh và text không vượt quá */}
                {/* Hình ảnh đại diện của nhóm */}
                <img
                  src={group.avt}
                  alt={group.groupName}
                  style={{
                    width: '100%',  // Đảm bảo hình ảnh không vượt quá khung chứa
                    maxWidth: 120,   // Kích thước tối đa cho hình ảnh
                    height: 120,
                    borderRadius: '8px',
                    marginRight: '12px',
                    flexShrink: 0, // Không cho phép hình ảnh co lại khi kích thước container thay đổi
                  }}
                />
                <Box sx={{ flexGrow: 1 }}>
                  <Typography variant="subtitle1" sx={{ fontWeight: 'bold', lineHeight: 1.3, fontSize: '1rem', color: '#333', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {group.groupName}
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#555' }}>
                    Lần truy cập gần đây: 1 giờ trước {/* Có thể thay bằng dữ liệu động */}
                  </Typography>
                </Box>
              </Box>

              <Box display="flex" justifyContent="space-between" alignItems="center" width="100%">
                <Button
                  variant="contained"
                  sx={{
                    backgroundColor: '#1976d2', // Màu xanh theo yêu cầu
                    color: '#fff',
                    borderRadius: '8px',
                    textTransform: 'none',
                    padding: '8px 16px',
                    fontWeight: 'bold',
                    width: 'calc(100% - 48px)', // Giảm kích thước nút để tránh bị vượt qua viền thẻ
                    '&:hover': {
                      backgroundColor: '#1565c0',
                    },
                  }}
                  onClick={() => handleViewGroup(group)}
                >
                  Xem nhóm
                </Button>

                {/* Nút ba dấu chấm */}
                <IconButton onClick={handleClick} sx={{ marginLeft: '8px', flexShrink: 0 }}> {/* Đảm bảo nút không bị co lại */}
                  <MoreVertIcon />
                </IconButton>

                {/* Menu của nút ba dấu chấm */}
                <Menu
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleClose}
                  PaperProps={{
                    style: {
                      maxHeight: 48 * 4.5,
                      width: '20ch',
                    },
                  }}
                >
                  <MenuItem onClick={() => console.log('Rời nhóm')}>Rời nhóm</MenuItem>
                  <MenuItem onClick={() => console.log('Chỉnh sửa nhóm')}>Chỉnh sửa nhóm</MenuItem>
                </Menu>
              </Box>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default YourGroups;

import React from 'react';
import { Box, Typography, Grid, Button, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close'; // Icon đóng
import { groups, users } from '../../../components/GroupListData.tsx'; // Import dữ liệu từ file chứa mock data

const ExploreGroups: React.FC = () => {
  // Lấy người dùng đầu tiên trong danh sách mock để làm ví dụ
  const currentUser = users[0];

  // Lọc các nhóm mà người dùng chưa tham gia
  const notJoinedGroups = groups.filter(group => !currentUser.groups.includes(group._id));

  return (
    <Box sx={{ width: '100%', padding: 2, overflowX: 'hidden', boxSizing: 'border-box' }}> {/* Ngăn tràn ngang */}
      <Box sx={{ marginBottom: 4 }}>
        {/* Sửa Typography để giống với YourGroups */}
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
          <Typography variant="h6" sx={{ fontWeight: 'bold', fontSize: '1.2rem', flexGrow: 1 }}>
            Nhóm chưa tham gia
          </Typography>
        </Box>

        {notJoinedGroups.length > 0 ? (
          <Grid container spacing={2} sx={{ maxWidth: '100%', overflowX: 'hidden', boxSizing: 'border-box' }}> {/* Đảm bảo Grid không tràn ngang */}
            {notJoinedGroups.map(group => (
              <Grid item xs={12} sm={6} md={4} key={group._id}>
                <Box
                  sx={{
                    position: 'relative',
                    border: '1px solid #e0e0e0',
                    borderRadius: '8px',
                    padding: 2,
                    backgroundColor: '#fff',
                    boxShadow: '0 1px 2px rgba(0, 0, 0, 0.1)',
                    maxWidth: '100%', // Đảm bảo Box không tràn
                    overflow: 'hidden', // Ngăn tràn nội dung bên trong
                    boxSizing: 'border-box', // Đảm bảo padding không gây tràn
                  }}
                >
                  {/* Hình ảnh nhóm */}
                  <img
                    src={group.avt}
                    alt={group.groupName}
                    style={{
                      width: '100%',   // Đảm bảo hình ảnh không vượt quá khung chứa
                      height: '180px',
                      objectFit: 'cover',
                      borderRadius: '8px',
                    }}
                  />

                  {/* Thông tin nhóm */}
                  <Box sx={{ mt: 2 }}>
                    <Typography variant="h6" fontWeight="bold">
                      {group.groupName}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {group.members.count} thành viên • {group.article.count}+ bài viết mỗi ngày
                    </Typography>

                    <Button
                      variant="contained"
                      color="primary"
                      fullWidth
                      sx={{ marginTop: 2 }}
                      onClick={() => console.log(`Tham gia nhóm ${group.groupName}`)}
                    >
                      Tham gia nhóm
                    </Button>
                  </Box>

                  {/* Icon đóng */}
                  <IconButton
                    sx={{
                      position: 'absolute',
                      top: '8px',
                      right: '8px',
                      backgroundColor: '#fff',
                      borderRadius: '50%',
                      padding: '4px',
                      boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
                    }}
                    onClick={() => console.log(`Đóng nhóm ${group.groupName}`)}
                  >
                    <CloseIcon />
                  </IconButton>
                </Box>
              </Grid>
            ))}
          </Grid>
        ) : (
          <Typography variant="body1" color="text.secondary">
            Không có nhóm nào để tham gia.
          </Typography>
        )}
      </Box>
    </Box>
  );
};

export default ExploreGroups;

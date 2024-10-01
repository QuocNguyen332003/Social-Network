import React from 'react';
import { Menu, MenuItem } from '@mui/material';
import { Bookmark, Report, Delete, Edit } from '@mui/icons-material';

interface PostMenuProps {
  anchorEl: null | HTMLElement;
  open: boolean;
  handleClose: () => void;
  handleSavePost: () => void;
  handleOpenEditDialog: () => void;
  handleOpenReportDialog: () => void;
  handleDeletePost: () => void;
  isOwner: boolean; // Kiểm tra người dùng hiện tại có phải chủ sở hữu bài viết không
}

const PostMenu: React.FC<PostMenuProps> = ({
  anchorEl,
  open,
  handleClose,
  handleSavePost,
  handleOpenEditDialog,
  handleOpenReportDialog,
  handleDeletePost,
  isOwner,
}) => {
  return (
    <Menu
      anchorEl={anchorEl}
      open={open}
      onClose={handleClose}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      PaperProps={{
        sx: {
          boxShadow: '0 4px 12px rgba(0,0,0,0.1)', // Bóng mờ mềm mại
          borderRadius: 2, // Đường bo tròn đẹp
          minWidth: 200, // Đảm bảo chiều rộng của menu
          fontFamily: '"Roboto", sans-serif', // Font chữ tùy chỉnh cho toàn bộ menu
        }
      }}
    >
      {/* Mục lưu bài viết */}
      <MenuItem
        onClick={handleSavePost}
        sx={{
          fontSize: '14px', // Kích thước font chữ
          fontWeight: 500, // Trọng lượng chữ (bold nhẹ)
          '&:hover': {
            backgroundColor: '#f0f0f0', // Đổi màu nền khi di chuột qua
          },
        }}
      >
        <Bookmark fontSize="small" sx={{ marginRight: 1, color: '#1E90FF' }} /> {/* Biểu tượng Bookmark */}
        Lưu bài viết
      </MenuItem>

      {/* Mục báo cáo bài viết */}
      <MenuItem
        onClick={handleOpenReportDialog}
        sx={{
          fontSize: '14px',
          fontWeight: 500,
          '&:hover': {
            backgroundColor: '#f0f0f0',
          },
        }}
      >
        <Report fontSize="small" sx={{ marginRight: 1, color: '#f39c12' }} /> {/* Biểu tượng Report */}
        Báo cáo bài viết
      </MenuItem>

      {isOwner && (
        <>
          <MenuItem onClick={handleOpenEditDialog} 
          sx={{
          fontSize: '14px',
          fontWeight: 500,
          '&:hover': {
            backgroundColor: '#f0f0f0',
          },
        }}>
            <Edit fontSize="small" sx={{ marginRight: 1, color: '#3498db' }} />
            Chỉnh sửa bài viết
          </MenuItem>
          <MenuItem onClick={handleDeletePost} 
          sx={{
          fontSize: '14px',
          fontWeight: 500,
          '&:hover': {
            backgroundColor: '#f0f0f0',
          },
        }}>
            <Delete fontSize="small" sx={{ marginRight: 1, color: '#d32f2f'  }} />
            Xóa bài viết
          </MenuItem>
        </>
      )}
    </Menu>
  );
};

export default PostMenu;

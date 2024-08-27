import React from 'react';
import { List, ListItem, ListItemIcon, ListItemText, Typography } from '@mui/material';
import VideoLibraryIcon from '@mui/icons-material/VideoLibrary';
import PeopleIcon from '@mui/icons-material/People';
import GroupIcon from '@mui/icons-material/Group';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import LiveTvIcon from '@mui/icons-material/LiveTv';
import CollectionsIcon from '@mui/icons-material/Collections';
import ChatIcon from '@mui/icons-material/Chat';

const SidebarLeft = () => {
  return (
    <div style={{ padding: '16px', borderRight: '1px solid #e0e0e0' }}>
      <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
        Truy cập nhanh
      </Typography>
      <List>
        <ListItem button>
          <ListItemIcon>
            <VideoLibraryIcon color="primary" />
          </ListItemIcon>
          <ListItemText primary="Video" />
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <PeopleIcon sx={{ color: '#8b9dc3' }} />
          </ListItemIcon>
          <ListItemText primary="Bạn bè" />
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <GroupIcon sx={{ color: '#8b9dc3' }} />
          </ListItemIcon>
          <ListItemText primary="Nhóm" />
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <BookmarkIcon sx={{ color: '#d88d3c' }} />
          </ListItemIcon>
          <ListItemText primary="Đã Lưu" />
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <LiveTvIcon sx={{ color: '#c92a2a' }} />
          </ListItemIcon>
          <ListItemText primary="Phát trực tiếp" />
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <CollectionsIcon sx={{ color: '#37b24d' }} />
          </ListItemIcon>
          <ListItemText primary="Bộ sưu tập" />
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <ChatIcon sx={{ color: '#8b9dc3' }} />
          </ListItemIcon>
          <ListItemText primary="Message" />
        </ListItem>
      </List>
    </div>
  );
};

export default SidebarLeft;

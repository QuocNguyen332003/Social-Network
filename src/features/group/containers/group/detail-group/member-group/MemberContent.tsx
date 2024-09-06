import React from 'react';
import { Box, Typography, Button, Avatar, List, ListItem, ListItemAvatar, ListItemText, Divider } from '@mui/material';

const members = [
  { name: 'Jada Jackson', username: '@Jadajackson', joined: '335 days ago', avatar: '/static/images/avatar/1.jpg' },
  { name: 'Craig Saris', username: '@CraigSaris', joined: '335 days ago', avatar: '/static/images/avatar/2.jpg' },
  { name: 'Jaxson Lipshutz', username: '@JaxsonLipshutz', joined: '335 days ago', avatar: '/static/images/avatar/3.jpg' },
  { name: 'Abram Donin', username: '@AbramDonin', joined: '335 days ago', avatar: '/static/images/avatar/4.jpg' },
  { name: 'Cheyenne Botosh', username: '@CheyenneBotosh', joined: '335 days ago', avatar: '/static/images/avatar/5.jpg' },
  { name: 'Jada Jackson', username: '@Jadajackson', joined: '335 days ago', avatar: '/static/images/avatar/1.jpg' },
  { name: 'Craig Saris', username: '@CraigSaris', joined: '335 days ago', avatar: '/static/images/avatar/2.jpg' },
  { name: 'Jaxson Lipshutz', username: '@JaxsonLipshutz', joined: '335 days ago', avatar: '/static/images/avatar/3.jpg' },
  { name: 'Abram Donin', username: '@AbramDonin', joined: '335 days ago', avatar: '/static/images/avatar/4.jpg' },
  { name: 'Cheyenne Botosh', username: '@CheyenneBotosh', joined: '335 days ago', avatar: '/static/images/avatar/5.jpg' },  
];

const MemberContent: React.FC = () => {
  return (
    <Box sx={{ padding: 2, backgroundColor: 'white', height: '60vh',
      overflowY: 'auto', 
      scrollbarWidth: 'none',
      '&::-webkit-scrollbar': {
        display: 'none',
      } }}>
      <List>
        {members.map((member, index) => (
          <React.Fragment key={index}>
            <ListItem sx={{ paddingLeft: 0 }}>
              <ListItemAvatar>
                <Avatar src={member.avatar} />
              </ListItemAvatar>
              <ListItemText
                primary={member.name}
                secondary={
                  <>
                    <Typography component="span" variant="body2" color="textPrimary">
                      {member.username}
                    </Typography>
                    {' — Joined ' + member.joined}
                  </>
                }
              />
              <Button variant="outlined" color="error">
                Remove
              </Button>
            </ListItem>
            {index < members.length - 1 && <Divider />} {/* Đường gạch dưới phân biệt */}
          </React.Fragment>
        ))}
      </List>
    </Box>
  );
};

export default MemberContent;

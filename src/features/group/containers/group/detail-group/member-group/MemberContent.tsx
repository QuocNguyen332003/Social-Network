import React from 'react';
import { Box, Avatar, Button, List, ListItem, ListItemAvatar, ListItemText, Typography, Divider } from '@mui/material';
import { useOutletContext } from 'react-router-dom';
import {Group} from '../../../../../../interface/interface.ts'


const MemberContent: React.FC = () => {
  const { group } = useOutletContext<{ group: Group }>();

  console.log('Group data in MemberContent: ', group); // Debug
  
  return (
    <Box sx={{
      padding: 2,
      backgroundColor: 'white',
      height: '60vh',
      overflowY: 'auto',
      scrollbarWidth: 'none',
      '&::-webkit-scrollbar': {
        display: 'none',
      }
    }}>
      <List>
        {group.members.listUsers.map((member, index) => (
          <React.Fragment key={index}>
            <ListItem sx={{ paddingLeft: 0 }}>
              <ListItemAvatar>
                <Avatar src={`/static/images/avatar/${index + 1}.jpg`} />
              </ListItemAvatar>
              <ListItemText
                primary={member.idUser}
                secondary={
                  <Typography component="span" variant="body2" color="textPrimary">
                    Joined {new Date(member.joinDate).toDateString()}
                  </Typography>
                }
              />
              <Button variant="outlined" color="error">
                Remove
              </Button>
            </ListItem>
            {index < group.members.listUsers.length - 1 && <Divider />}
          </React.Fragment>
        ))}
      </List>
    </Box>
  );
};


export default MemberContent;

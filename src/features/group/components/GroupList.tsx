import React from 'react';
import { Box, Typography, Divider } from '@mui/material';
import GroupCard from './GroupCard'; 

interface UserProps {
  _id: string;
  account: {
    email: string;
    password: string;
  };
  firstName: string;
  lastName: string;
  displayName: string;
  username: string;
  friends: { userID: string; addDate: Date }[];
  status: 'online' | 'offline';
  avt: string[]; // Avatar images
  collections: {
    _id: string;
    name: string;
    items: string[]; // Array of ObjectId references to posts
    createdAt: Date;
    updatedAt: Date;
    _destroy?: Date;
  }[];
  groups: string[]; // List of group IDs that the user has joined
  backGround: string[]; // Background images
  createdAt: Date;
  updatedAt: Date;
  _destroy?: Date;
}

interface GroupProps {
  _id: string;
  groupName: string;
  type: 'public' | 'private';
  idAdmin: string;
  introduction: string;
  avt: string; // Avatar image of the group
  backGround: string; // Background image of the group
  members: {
    count: number;
    listUsers: { idUser: string; joinDate: Date }[];
  };
  articles: {
    count: number;
    listArticle: { idArticle: string; state: string }[];
  };
  rule: string[];
  Administrators: { idUser: string; joinDate: Date }[];
  createdAt: Date;
  updatedAt: Date;
  _destroy?: Date;
}

// Dữ liệu người dùng
const user: UserProps = {
  _id: 'userId1',
  account: {
    email: 'user@example.com',
    password: 'password',
  },
  firstName: 'John',
  lastName: 'Doe',
  displayName: 'JohnD',
  username: 'johndoe',
  friends: [],
  status: 'online',
  avt: ['avatar1.jpg'],
  collections: [],
  groups: ['groupId1', 'groupId2'], // Các group ID mà người dùng đã tham gia
  backGround: ['background1.jpg'],
  createdAt: new Date(),
  updatedAt: new Date(),
};

// Dữ liệu nhóm
const groups: GroupProps[] = [
  {
    _id: 'groupId1',
    groupName: 'Cat Lovers',
    type: 'public',
    idAdmin: 'adminId1',
    introduction: 'A group for cat lovers',
    avt: 'path_to_avatar.jpg',
    backGround: 'path_to_background.jpg',
    members: { 
      count: 100, 
      listUsers: [
        { idUser: 'userId1', joinDate: new Date('2023-01-01') },
        { idUser: 'userId2', joinDate: new Date('2023-02-15') },
        { idUser: 'userId3', joinDate: new Date('2023-03-10') },
      ] 
    },
    articles: { count: 10, listArticle: [] },
    rule: ['No spam', 'Be kind'],
    Administrators: [
      { idUser: 'adminId1', joinDate: new Date('2023-01-15') },
      { idUser: 'adminId2', joinDate: new Date('2023-02-10') }
    ],
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    _id: 'groupId3',
    groupName: 'Tech Enthusiasts',
    type: 'public',
    idAdmin: 'adminId2',
    introduction: 'Technology and Gadgets',
    avt: 'path_to_avatar.jpg',
    backGround: 'path_to_background.jpg',
    members: { 
      count: 150, 
      listUsers: [
        { idUser: 'userId4', joinDate: new Date('2023-03-05') },
        { idUser: 'userId5', joinDate: new Date('2023-03-20') },
        { idUser: 'userId6', joinDate: new Date('2023-04-01') },
      ] 
    },
    articles: { count: 20, listArticle: [] },
    rule: ['No spam', 'Respect others'],
    Administrators: [
      { idUser: 'adminId2', joinDate: new Date('2023-03-05') },
      { idUser: 'adminId3', joinDate: new Date('2023-04-12') }
    ],
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    _id: 'groupId2',
    groupName: 'Cat Lovers-1',
    type: 'public',
    idAdmin: 'adminId1',
    introduction: 'A group for cat lovers',
    avt: 'path_to_avatar.jpg',
    backGround: 'path_to_background.jpg',
    members: { 
      count: 105, 
      listUsers: [
        { idUser: 'userId7', joinDate: new Date('2023-05-01') },
        { idUser: 'userId8', joinDate: new Date('2023-06-10') },
        { idUser: 'userId9', joinDate: new Date('2023-07-22') },
      ] 
    },
    articles: { count: 15, listArticle: [] },
    rule: ['No spam', 'Be kind'],
    Administrators: [
      { idUser: 'adminId1', joinDate: new Date('2023-05-18') },
      { idUser: 'adminId4', joinDate: new Date('2023-06-20') }
    ],
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    _id: 'groupId4',
    groupName: 'Tech Enthusiasts',
    type: 'public',
    idAdmin: 'adminId2',
    introduction: 'Technology and Gadgets',
    avt: 'path_to_avatar.jpg',
    backGround: 'path_to_background.jpg',
    members: { 
      count: 150, 
      listUsers: [
        { idUser: 'userId10', joinDate: new Date('2023-08-01') },
        { idUser: 'userId11', joinDate: new Date('2023-09-15') },
        { idUser: 'userId12', joinDate: new Date('2023-10-05') },
      ] 
    },
    articles: { count: 20, listArticle: [] },
    rule: ['No spam', 'Respect others'],
    Administrators: [
      { idUser: 'adminId2', joinDate: new Date('2023-07-10') },
      { idUser: 'adminId5', joinDate: new Date('2023-08-22') }
    ],
    createdAt: new Date(),
    updatedAt: new Date(),
  }
];



const GroupList: React.FC = () => {

  // Tách các nhóm đã tham gia và chưa tham gia dựa trên user.groups
  const joinedGroups = groups.filter(group => user.groups.includes(group._id));
  const notJoinedGroups = groups.filter(group => !user.groups.includes(group._id));


  return (
    <Box sx={{ width: '100%' }}>
      {/* Phần "Nhóm đã tham gia" */}
      <Box sx={{ marginBottom: 4 }}>
        <Typography
          variant="h5"
          sx={{
            fontWeight: 'bold',
            color: '#1976d2',
            marginBottom: 2,
            borderBottom: '2px solid #1976d2',
            paddingBottom: 2,
            marginLeft: 2,
            marginRight: 2,
          }}
        >
          Nhóm đã tham gia
        </Typography>

        {joinedGroups.length > 0 ? (
          joinedGroups.map(group => (
            <Box key={group._id} sx={{ marginBottom: 2 }}>
              <GroupCard
                group={group}
                userGroups={user.groups}
              />
            </Box>
          ))
        ) : (
          <Typography variant="body1" color="text.secondary">
            Bạn chưa tham gia nhóm nào.
          </Typography>
        )}
      </Box>

      {/* Đường kẻ tách biệt */}
      <Divider sx={{ marginY: 4 }} />

      {/* Phần "Nhóm chưa tham gia" */}
      <Box sx={{ marginBottom: 4 }}>
        <Typography
          variant="h5"
          sx={{
            fontWeight: 'bold',
            color: '#d32f2f',
            marginBottom: 2,
            borderBottom: '2px solid #d32f2f',
            paddingBottom: 1,
            marginLeft: 2,
            marginRight: 2,
          }}
        >
          Nhóm chưa tham gia
        </Typography>

        {notJoinedGroups.length > 0 ? (
          notJoinedGroups.map(group => (
            <Box key={group._id} sx={{ marginBottom: 2 }}>
              <GroupCard
                group={group}
                userGroups={user.groups}
              />
            </Box>
          ))
        ) : (
          <Typography variant="body1" color="text.secondary">
            Không có nhóm nào để tham gia.
          </Typography>
        )}
      </Box>
    </Box>
  );
};

export default GroupList;
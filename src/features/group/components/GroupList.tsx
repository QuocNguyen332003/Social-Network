import React from 'react';
import { Box, Typography, Divider } from '@mui/material';
import GroupCard from './GroupCard'; 
import {Group, User} from '../../../interface/interface'


export const user: User = {
  _id: 'user123',
  account: {
    warningLevel: 0,
    email: 'user@example.com',
    password: 'password123',
  },
  firstName: 'John',
  lastName: 'Doe',
  displayName: 'JohnD',
  userName: 'john.doe',
  friends: [
    { userId: 'friend1', addDate: '2023-05-01' },
    { userId: 'friend2', addDate: '2023-06-15' },
  ],
  avt: ['/src/assets/images/avt.png'],
  backGround: ['/src/assets/images/avt.png'],
  aboutMe: 'Hello Viet Nam',
  status: 'active',
  createDate: '2022-01-01',
  details: {
    phoneNumber: '123-456-7890',
    address: '123 Main St, City, Country',
    gender: true,
    birthDate: new Date('1990-01-01'),
  },
  collections: [
    {
      _id: 'collection1',
      name: 'Favorite Articles',
      items: ['article1', 'article2'],
      createdAt: new Date(),
      updatedAt: new Date(),
      _destroy:  new Date(),
    },
  ],
  groups: ['group123', 'group456'],
  hobbies: ['Reading', 'Gaming'],
  listArticle: ['article1', 'article2'],
  createdAt: new Date(),
  updatedAt: new Date(),
  _destroy: new Date(),
};


// Dữ liệu nhóm
export const groups: Group[] = [
  {
    _id: 'group123',
    groupName: 'Tech Enthusiasts',
    type: 'public',
    idAdmin: 'admin123',
    introduction: 'A group for technology lovers.',
    avt: '/src/assets/images/avt.png',
    backGround: '/src/assets/images/avt.png',
    members: {
      count: 10,
      listUsers: [
        { idUser: 'user123', joinDate: '2023-01-01' },
        { idUser: 'user456', joinDate: '2023-02-15' },
      ],
    },
    article: {
      count: 5,
      listArticle: [
        { idArticle: '1', state: 'pending' }, // Chờ duyệt
        { idArticle: '2', state: 'approved' }, // Đã duyệt
        { idArticle: '3', state: 'pending' }, // Chờ duyệt
      ],
    },
    rule: ['Be respectful', 'No spam'],
    Administrators: [
      { idUser: 'admin123', joinDate: '2023-01-01' },
    ],
    hobbies: ['Technology', 'Innovation'],
    createdAt: new Date(),
    updatedAt: new Date(),
    _destroy: new Date(),
  },
  {
    _id: 'group456',
    groupName: 'Book Lovers',
    type: 'private',
    idAdmin: 'admin456',
    introduction: 'A group for people who love reading.',
    avt: '/src/assets/images/avt.png',
    backGround: '/src/assets/images/avt.png',
    members: {
      count: 15,
      listUsers: [
        { idUser: 'user789', joinDate: '2023-03-01' },
      ],
    },
    article: {
      count: 1,
      listArticle: [
        { idArticle: '3', state: 'pending' },
      ],
    },
    rule: ['No spoilers', 'Be kind'],
    Administrators: [
      { idUser: 'admin456', joinDate: '2023-03-01' },
    ],
    hobbies: ['Reading', 'Writing'],
    createdAt: new Date(),
    updatedAt: new Date(),
    _destroy: new Date(),
  },
  {
    _id: 'group789',
    groupName: 'Fitness Fanatics',
    type: 'public',
    idAdmin: 'admin789',
    introduction: 'For people who love fitness and staying healthy.',
    avt: '/src/assets/images/avt.png',
    backGround: '/src/assets/images/avt.png',
    members: {
      count: 20,
      listUsers: [],
    },
    article: {
      count: 8,
      listArticle: [
        { idArticle: '1', state: 'published' },
      ],
    },
    rule: ['Respect others', 'No self-promotion'],
    Administrators: [
      { idUser: 'admin789', joinDate: '2023-05-01' },
    ],
    hobbies: ['Fitness', 'Nutrition'],
    createdAt: new Date(),
    updatedAt: new Date(),
    _destroy: new Date(),
  },
];
// Mock dữ liệu bài viết

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
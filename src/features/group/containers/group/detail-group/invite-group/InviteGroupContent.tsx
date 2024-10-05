/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useEffect } from 'react';
import {
  Box, Avatar, Button, List, ListItem, ListItemAvatar, ListItemText, Typography, Divider, TextField, Select, MenuItem, InputLabel, FormControl
} from '@mui/material';
import { useOutletContext } from 'react-router-dom';
import { Group, User } from '../../../../../../interface/interface.ts';

// Tạo dữ liệu giả lập cho người dùng gửi yêu cầu tham gia nhóm
const mockRequestUsers: User[] = [
  {
    _id: 'user456',
    account: {
      warningLevel: 0,
      email: 'jane.doe@example.com',
      password: 'password123'
    },
    firstName: 'Jane',
    lastName: 'Doe',
    displayName: 'Jane Doe',
    userName: 'janedoe',
    details: {
      phoneNumber: '0987654321',
      address: '456 Oak Street, Cityville',
      gender: false,
      birthDate: new Date('1997-04-15')
    },
    friends: [],
    status: 'pending',
    avt: ['https://randomuser.me/api/portraits/women/2.jpg'],
    collections: [],
    groups: [],
    backGround: [],
    aboutMe: 'A software engineer who loves reading and exploring nature.',
    createDate: new Date().toISOString(),
    hobbies: ['Cooking', 'Reading'],
    listArticle: [],
    createdAt: new Date(),
    updatedAt: new Date(),
    _destroy: new Date('2024-01-01')
  },
  {
    _id: 'user789',
    account: {
      warningLevel: 0,
      email: 'mike.smith@example.com',
      password: 'password456'
    },
    firstName: 'Mike',
    lastName: 'Smith',
    displayName: 'Mike Smith',
    userName: 'mikesmith',
    details: {
      phoneNumber: '0112233445',
      address: '789 Pine Street, Cityville',
      gender: true,
      birthDate: new Date('1995-09-12')
    },
    friends: [],
    status: 'pending',
    avt: ['https://randomuser.me/api/portraits/men/3.jpg'],
    collections: [],
    groups: [],
    backGround: [],
    aboutMe: 'A data scientist who enjoys playing video games and hiking.',
    createDate: new Date().toISOString(),
    hobbies: ['Gaming', 'Hiking'],
    listArticle: [],
    createdAt: new Date(),
    updatedAt: new Date(),
    _destroy: new Date('2024-01-01')
  }
];

const InviteGroupContent: React.FC = () => {
  const { group } = useOutletContext<{ group: Group }>(); // Nhận group từ Outlet context
  const [users, setUsers] = useState<User[]>(mockRequestUsers); // Sử dụng mảng chứa mockRequestUsers
  const [searchTerm, setSearchTerm] = useState<string>(''); // Lưu trữ từ khóa tìm kiếm
  const [sortCriteria, setSortCriteria] = useState<string>('name'); // Lưu tiêu chí sắp xếp
  const [filteredUsers, setFilteredUsers] = useState<User[]>(mockRequestUsers); // Lưu trữ danh sách người dùng đã lọc
  const [processedRequests, setProcessedRequests] = useState<{ [key: string]: string }>({}); // Lưu trạng thái đã xử lý của người dùng

  // Lọc người dùng theo từ khóa tìm kiếm
  useEffect(() => {
    const filtered = users.filter((user) =>
      user.displayName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.account.email.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredUsers(filtered);
  }, [searchTerm, users]);

  // Sắp xếp người dùng theo tiêu chí
  const handleSort = (criteria: string) => {
    const sortedUsers = [...filteredUsers].sort((a, b) => {
      if (criteria === 'name') return a.displayName.localeCompare(b.displayName);
      if (criteria === 'email') return a.account.email.localeCompare(b.account.email);
      if (criteria === 'createdAt') return a.createdAt > b.createdAt ? -1 : 1;
      return 0;
    });
    setFilteredUsers(sortedUsers);
  };

  useEffect(() => {
    handleSort(sortCriteria);
  }, [sortCriteria]);

  // Xử lý chấp nhận yêu cầu
  const handleAccept = (userId: string) => {
    setProcessedRequests((prev) => ({ ...prev, [userId]: 'accepted' }));
    alert(`Đã chấp nhận yêu cầu tham gia nhóm của người dùng ID: ${userId}!`);
  };

  // Xử lý từ chối yêu cầu
  const handleReject = (userId: string) => {
    setProcessedRequests((prev) => ({ ...prev, [userId]: 'rejected' }));
    alert(`Đã từ chối yêu cầu tham gia nhóm của người dùng ID: ${userId}.`);
  };

  return (
    <Box
      sx={{
        padding: 2,
        backgroundColor: '#e9e9e9',
        height: '80vh',
        overflowY: 'auto',
        scrollbarWidth: 'none',
        '&::-webkit-scrollbar': {
          display: 'none',
        },
      }}
    >
      {/* Header */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: 2 }}>
        <Typography variant="h5" fontWeight="bold">Yêu Cầu Tham Gia Nhóm</Typography>
        <Box>
          <TextField
            label="Tìm kiếm người dùng"
            variant="outlined"
            size="small"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            sx={{ marginRight: 1 }}
          />
          <FormControl size="small" sx={{ minWidth: 120 }}>
            <InputLabel id="sort-label">Sắp xếp theo</InputLabel>
            <Select
              labelId="sort-label"
              id="sort"
              value={sortCriteria}
              label="Sắp xếp theo"
              onChange={(e) => setSortCriteria(e.target.value)}
            >
              <MenuItem value="name">Tên</MenuItem>
              <MenuItem value="email">Email</MenuItem>
              <MenuItem value="createdAt">Ngày tạo</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </Box>

      {/* Danh sách người dùng */}
      <Box sx={{ padding: 2, backgroundColor: '#f9f9f9', borderRadius: '8px' }}>
        <List>
          {filteredUsers.map((user, index) => (
            <ListItem key={index} sx={{ borderBottom: '1px solid #e0e0e0' }}>
              <ListItemAvatar>
                <Avatar src={user.avt[0]} />
              </ListItemAvatar>
              <ListItemText
                primary={
                  <Typography variant="h6" fontWeight="bold">
                    {user.displayName}
                  </Typography>
                }
                secondary={`Email: ${user.account.email} | Sở Thích: ${user.hobbies.join(', ')}`}
              />
              {processedRequests[user._id] ? (
                <Typography
                  variant="body1"
                  sx={{ color: processedRequests[user._id] === 'accepted' ? '#1976d2' : 'red' }}
                >
                  {processedRequests[user._id] === 'accepted' ? 'Đã chấp nhận' : 'Đã từ chối'}
                </Typography>
              ) : (
                <>
                  <Button
                    variant="contained"
                    size="small"
                    sx={{ marginRight: 1 }}
                    onClick={() => handleAccept(user._id)}
                  >
                    Chấp Nhận
                  </Button>
                  <Button variant="outlined" color="error" size="small" onClick={() => handleReject(user._id)}>
                    Từ Chối
                  </Button>
                </>
              )}
            </ListItem>
          ))}
        </List>
      </Box>
    </Box>
  );
};

export default InviteGroupContent;

/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useEffect } from 'react';
import {
  Box, Avatar, Button, List, ListItem, ListItemAvatar, ListItemText, Typography, Divider, TextField, Select, MenuItem, InputLabel, FormControl
} from '@mui/material';
import { useOutletContext } from 'react-router-dom';
import { Group, User } from '../../../../../../interface/interface.ts';
import axios from 'axios';
import { toast } from 'react-toastify';

const InviteGroupContent: React.FC = () => {
  const { group } = useOutletContext<{ group: Group }>(); // Nhận group từ Outlet context
  const [users, setUsers] = useState<User[]>([]); // State chứa danh sách người dùng
  const [searchTerm, setSearchTerm] = useState<string>(''); // Từ khóa tìm kiếm
  const [sortCriteria, setSortCriteria] = useState<string>('name'); // Tiêu chí sắp xếp
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]); // Danh sách người dùng đã lọc
  const [processedRequests, setProcessedRequests] = useState<{ [key: string]: string }>({}); // Trạng thái đã xử lý

  // Gọi API để lấy danh sách yêu cầu tham gia nhóm
  useEffect(() => {
    const fetchRequestUsers = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/v1/group/${group._id}/requests`);
        setUsers(response.data.requests); // Cập nhật danh sách người dùng từ API
        setFilteredUsers(response.data.requests); // Cập nhật danh sách đã lọc
      } catch (error) {
        console.error('Error fetching request users:', error);
        toast.error('Có lỗi xảy ra khi lấy danh sách yêu cầu.');
      }
    };

    fetchRequestUsers();
  }, [group._id]);

  // Lọc người dùng theo từ khóa tìm kiếm
  useEffect(() => {
    const filtered = users.filter((user) =>
      user.idUser.displayName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.idUser.email.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredUsers(filtered);
  }, [searchTerm, users]);

  // Sắp xếp người dùng theo tiêu chí
  useEffect(() => {
    const sortedUsers = [...filteredUsers].sort((a, b) => {
      if (sortCriteria === 'name') return a.idUser.displayName.localeCompare(b.idUser.displayName);
      if (sortCriteria === 'email') return a.idUser.email.localeCompare(b.idUser.email);
      return 0;
    });
    setFilteredUsers(sortedUsers);
  }, [sortCriteria, filteredUsers]);

  // Xử lý chấp nhận yêu cầu
  const handleAccept = async (userId: string) => {
    try {
        const response = await axios.post(`http://localhost:3000/v1/group/${group._id}/invite/accept`, { userId });
        setProcessedRequests((prev) => ({ ...prev, [userId]: 'accepted' }));
        toast.success(`Đã chấp nhận yêu cầu tham gia nhóm của người dùng ID: ${userId}!`);
    } catch (error: any) {
        console.error('Error accepting invite:', error);
        toast.error(error.response?.data.message || 'Có lỗi xảy ra khi chấp nhận yêu cầu.');
    }
};


  // Xử lý từ chối yêu cầu
  const handleReject = async (userId: string) => {
    try {
      await axios.post(`http://localhost:3000/v1/group/${group._id}/invite/reject`, { userId });
      setProcessedRequests((prev) => ({ ...prev, [userId]: 'rejected' }));
      toast.success(`Đã từ chối yêu cầu tham gia nhóm của người dùng ID: ${userId}.`);
    } catch (error) {
      console.error('Error rejecting invite:', error);
      toast.error('Có lỗi xảy ra khi từ chối yêu cầu.');
    }
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
            </Select>
          </FormControl>
        </Box>
      </Box>

      {/* Danh sách người dùng */}
      <Box sx={{ padding: 2, backgroundColor: '#f9f9f9', borderRadius: '8px' }}>
      <List>
          {filteredUsers.map((request, index) => (
              <ListItem key={index} sx={{ borderBottom: '1px solid #e0e0e0' }}>
                  <ListItemAvatar>
                      <Avatar src={request.idUser.avt.length > 0 ? request.idUser.avt[0] : '/path/to/default/avatar.jpg'} />
                  </ListItemAvatar>
                  <ListItemText
                      primary={
                          <Typography variant="h6" fontWeight="bold">
                              {request.idUser.displayName}
                          </Typography>
                      }
                      secondary={`Tham gia vào: ${new Date(request.joinDate).toLocaleDateString()} | Trạng thái: ${request.state}`}
                  />
                  {processedRequests[request.idUser._id] ? (
                      <Typography
                          variant="body1"
                          sx={{ color: processedRequests[request.idUser._id] === 'accepted' ? '#1976d2' : 'red' }}
                      >
                          {processedRequests[request.idUser._id] === 'accepted' ? 'Đã chấp nhận' : 'Đã từ chối'}
                      </Typography>
                  ) : (
                      <>
                          <Button
                              variant="contained"
                              size="small"
                              sx={{ marginRight: 1 }}
                              onClick={() => handleAccept(request.idUser._id)} // Pass the userId correctly
                          >
                              Chấp Nhận
                          </Button>
                          <Button
                              variant="outlined"
                              color="error"
                              size="small"
                              onClick={() => handleReject(request.idUser._id)}
                          >
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

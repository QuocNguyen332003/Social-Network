import { List, ListItemText, Avatar, Box, Typography, ListItemButton, CircularProgress } from '@mui/material';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Contacts } from '../../../interface/contactsInterface';
import { io } from 'socket.io-client';
import { Content } from '../../../features/conversations/containers/interfaceMessage';

const socket = io('http://localhost:3000');

const SidebarRight = () => {
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);

  const token = sessionStorage.getItem('token');
  const currentUserId = sessionStorage.getItem('userId') || '';

  const [contacts, setContacts] = useState<Contacts[]>([]);
  const [unRead, setUnRead] = useState<Content[] | null>(null);

  useEffect(()=> {
    getNumberUnread();
    getDataFriend();
  }, [])

  useEffect(() => {
    if (contacts.length > 0) {
      socketStatusAllFriend();
    }
  }, [contacts]);

  useEffect(()=> {
    if (unRead !== null){
      socket.on(`unread-massages-${currentUserId}`, (data) => {
        setUnRead((prevUnRead) => {
          if (!data.newContent) return prevUnRead;
      
          // Tìm chỉ mục của phần tử có userId tương ứng trong prevUnRead
          const existingIndex = prevUnRead?.findIndex((item) => item.userId === data.newContent!.userId);
      
          if (existingIndex !== -1 && existingIndex !== undefined) {
            // Nếu phần tử đã tồn tại, tạo một mảng mới với nội dung cập nhật
            const updatedUnRead = prevUnRead ? [...prevUnRead] : [];
            updatedUnRead[existingIndex] = data.newContent;
            return updatedUnRead;
          } else {
            // Nếu không tồn tại, thêm newContent vào danh sách
            return prevUnRead ? [...prevUnRead, data.newContent] : [data.newContent];
          }
        });
      });
      socket.on(`read-massages-${currentUserId}`, (data: { userId: string }) => {
        setUnRead((prevUnRead) => {
          if (!prevUnRead) return prevUnRead;
          // Loại bỏ phần tử có userId trùng với data.userId
          const updatedUnRead = prevUnRead.filter((item) => item.userId !== data.userId);
          return updatedUnRead;
        });
      });
    }
  }), [unRead];

  const getNumberUnread = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/v1/messages/friends/unread/${currentUserId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Thêm token vào header
          },
        }
      );
      setUnRead(response.data.data);
    } catch (error) {
      console.error('Lỗi khi lấy bài viết:', error);
    } finally {
    }
  }
  
  const getDataFriend = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/v1/user/friends/${currentUserId}`, 
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const sortedData = response.data.friendData.sort((a: Contacts, b: Contacts) => {
        if (a.status === 'online' && b.status !== 'online') return -1; // 'online' lên trước
        if (a.status !== 'online' && b.status === 'online') return 1;  // Các trạng thái khác xuống sau
        return 0; // Không thay đổi vị trí nếu cả hai cùng trạng thái
      });
  
      setContacts(sortedData);
    } catch (error) {
      console.error('Lỗi khi lấy bài viết:', error);
      
    } finally {
      setIsLoading(false);
    }
  }

  const socketStatusAllFriend = () => {
    contacts.map((contact)=> {
      socketStatusUser(contact._id)
    })
  }

  const socketStatusUser = (userId: string) => {
    const statusListener = (data: { _id: string; status: string }) => {
      setContacts((prevContacts) => {
        // Cập nhật trạng thái của người dùng
        const updatedContacts = prevContacts.map((contact) =>
          contact._id === data._id ? { ...contact, status: data.status } : contact
        );

        // Sắp xếp lại danh sách theo trạng thái
        return updatedContacts.sort((a, b) => {
          if (a.status === 'online' && b.status !== 'online') return -1;
          if (a.status !== 'online' && b.status === 'online') return 1;
          return 0;
        });
      });
    };

    // Lắng nghe sự kiện từ socket
    socket.on(`status-user-${userId}`, statusListener);

    // Cleanup listener khi component unmount hoặc userId thay đổi
    return () => {
      socket.off(`status-user-${userId}`, statusListener);
    };
  };
  
  if (isLoading || unRead === null) return <CircularProgress/> 
  return (
    <Box sx={{ padding: '16px', borderLeft: '1px solid #e0e0e0', height: '85vh',
      overflowY: 'auto', // Kích hoạt cuộn theo chiều dọc
      scrollbarWidth: 'none', // Ẩn thanh cuộn trên Firefox
      '&::-webkit-scrollbar': { display: 'none' }, // Ẩn thanh cuộn trên Chrome, Safari, Edge
    }}>
      <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
        Người liên hệ
      </Typography>
      {contacts.length > 0 && 
      <List>
      {contacts.map((contact, index) => (
        <ListItemButton key={index}
        sx={{ mb: 1, position: 'relative' }}
        onClick={() => navigate(`/messages?friendID=${contact._id}`)}
      >
        <Avatar alt={contact.name} src={contact.avt && contact.avt.link ? contact.avt.link : '/default-avatar.png'}  />
        {contact.status === 'online' && (
          <Box
            sx={{
              width: 10,
              height: 10,
              backgroundColor: 'green',
              borderRadius: 50,
              border: '2px solid white',
              position: 'absolute',
              bottom: 5,
              left: 45,
            }}
          />
        )}
        <ListItemText primary={contact.name} sx={{ marginLeft: '16px' }} />
      
        {unRead.some(item => item.userId === contact._id) && (
          <Box
            sx={{
              width: 20,
              height: 20,
              backgroundColor: '#f84019',
              borderRadius: 50,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Typography color={'white'}>
              {unRead.filter(item => item.userId === contact._id).length}
            </Typography>
          </Box>
        )}
      </ListItemButton>      
      ))}
    </List>}
    </Box>
  );
};

export default SidebarRight;

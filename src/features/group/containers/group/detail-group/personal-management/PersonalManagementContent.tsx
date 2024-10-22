 
/* eslint-disable react-hooks/exhaustive-deps */
 
import { useState, useEffect } from 'react';
import Post from '../../../../../../shared/components/post/Post';
import { Box, Typography, List, ListItem, ListItemText, Button, Dialog, DialogContent, DialogActions, DialogTitle } from '@mui/material';
import { Article, Group, Comment, User } from '../../../../../../interface/interface';
import { useOutletContext } from 'react-router-dom';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';

const PersonalManagementContent = () => {
  // Get the group and setGroup function from OutletContext (passed from parent)
  const token = sessionStorage.getItem('token');
  const { group, role: parentRole } = useOutletContext<{ group: Group, role: 'owner' | 'admin' | 'member' | 'none' }>(); // Nhận role từ OutletContext
  const [posts, setPosts] = useState<Article[]>([]); // State lưu trữ danh sách bài viết
  const [isLoading, setIsLoading] = useState(false); // State cho trạng thái loading
  const [error, setError] = useState<string | null>(null); // State cho lỗi
  const [isLoadingRole, setIsLoadingRole] = useState(true);
  const [pendingInvites, setPendingInvites] = useState<User[]>([]); // State cho lời mời làm quản trị viên
  const [currentRole, setCurrentRole] = useState<'member' | 'admin' | 'owner' | 'none'>('none'); // Vai trò hiện tại của người dùng
  const [openInviteDialog, setOpenInviteDialog] = useState(false); // State để mở và đóng Dialog
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false); // State để mở/đóng Dialog xác nhận
  const currentUserId = sessionStorage.getItem('userId') || ''; // Lấy userId từ sessionStorages
  useEffect(() => {
    // Thiết lập vai trò từ parent ngay khi component được render
    if (parentRole) {
      setCurrentRole(parentRole);
      setIsLoadingRole(false); // Khi đã có vai trò, tắt trạng thái loading
    }
    fetchUserPosts();
    fetchPendingInvites();
  }, [parentRole]);
  // Gọi API lấy danh sách bài viết khi component render lần đầu
  const fetchUserPosts = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await axios.get(`http://localhost:3000/v1/group/${group._id}/user/${currentUserId}/articles`,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Thêm token vào header
          },
        }
      );
      setPosts(response.data.articles);
    } catch (error) {
      console.error('Lỗi khi lấy bài viết:', error);
      setError('Lỗi khi tải bài viết. Vui lòng thử lại sau.');
    } finally {
      setIsLoading(false);
    }
  };

  // Gọi API để lấy lời mời quản trị viên của người dùng hiện tại trong nhóm
  const fetchPendingInvites = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/v1/group/${group._id}/user/${currentUserId}/pending-invites`,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Thêm token vào header
          },
        }
      );
      setPendingInvites(response.data.pendingInvites);
    } catch (error) {
      console.error('Lỗi khi lấy lời mời:', error);
    }
  };
  

  const handleLikePost = async (postId: string) => {
    try {
      const response = await axios.post(`http://localhost:3000/v1/article/${postId}/like`, { userId: currentUserId },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Thêm token vào header
          },
        }
      );
      if (response.status === 200) {
        setPosts((prevPosts) =>
          prevPosts.map((post) => {
            if (post._id === postId) {
              const isLiked = post.interact.emoticons.some((emoticon) => emoticon._iduser === currentUserId && emoticon.typeEmoticons === 'like');
              const updatedEmoticons = isLiked
                ? post.interact.emoticons.filter((emoticon) => emoticon._iduser !== currentUserId)
                : [...post.interact.emoticons, { typeEmoticons: 'like', _iduser: currentUserId }];
              return { ...post, interact: { ...post.interact, emoticons: updatedEmoticons } };
            }
            return post;
          })
        );
      }
    } catch (error) {
      console.error('Lỗi khi like bài viết:', error);
    }
  };

  const handleAddComment = async (postId: string, newComment: Comment) => {
    try {
      const response = await axios.post(`http://localhost:3000/v1/article/${postId}/comments`, newComment,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Thêm token vào header
          },
        }
      );
      setPosts((prevPosts) =>
        prevPosts.map((post) =>
          post._id === postId
            ? { ...post, interact: { ...post.interact, comment: [...post.interact.comment, response.data] }, totalComments: post.totalComments + 1 }
            : post
        )
      );
    } catch (error) {
      console.error('Lỗi khi thêm comment:', error);
    }
  };

  const handleAddReply = async (postId: string, commentId: string, newReply: Comment) => {
    try {
      const response = await axios.post(`http://localhost:3000/v1/article/${postId}/comments/${commentId}/reply`, newReply,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Thêm token vào header
          },
        }
      );
      setPosts((prevPosts) =>
        prevPosts.map((post) => {
          if (post._id === postId) {
            const updatedComments = post.interact.comment.map((comment) => {
              if (comment._id === commentId) {
                return { ...comment, replyComment: [...comment.replyComment, response.data] };
              }
              return comment;
            });
            return { ...post, interact: { ...post.interact, comment: updatedComments }, totalComments: post.totalComments + 1 };
          }
          return post;
        })
      );
    } catch (error) {
      console.error('Error adding reply:', error);
    }
  };

  const handleReportPost = async (postId: string, reason: string) => {
    try {
      const response = await axios.post(`http://localhost:3000/v1/article/${postId}/report`, { userId: currentUserId, reason },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Thêm token vào header
          },
        }
      );
      console.log('Báo cáo thành công:', response.data);
    } catch (error) {
      console.error('Lỗi khi báo cáo bài viết:', error);
    }
  };

  const handleSavePost = async (postId: string) => {
    try {
      const response = await axios.post(`http://localhost:3000/v1/article/${postId}/save`, {
        userId: currentUserId,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`, // Thêm token vào header
        },
      });
      if (response.status === 200) {
        console.log('Lưu bài viết thành công!');
      }
    } catch (error) {
      console.error('Lỗi khi lưu bài viết:', error);
    }
  };

  const handleDeletePost = async (postId: string) => {
    try {
      const response = await axios.delete(`http://localhost:3000/v1/article/${postId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Thêm token vào header
          },
        }
      );
      if (response.status === 200) {
        setPosts((prevPosts) => prevPosts.filter((post) => post._id !== postId));
        toast.success('Xóa bài viết thành công!');
      }
    } catch (error) {
      console.error('Lỗi khi xóa bài viết:', error);
      toast.error('Có lỗi xảy ra khi xóa bài viết.');
    }
  };

  const handleEditPost = async (postId: string, updatedContent: string, updatedScope: string) => {
    try {
      const response = await axios.put(`http://localhost:3000/v1/article/${postId}/edit`, {
        content: updatedContent,
        scope: updatedScope
      },
      {
        headers: {
          Authorization: `Bearer ${token}`, // Thêm token vào header
        },
      });
      if (response.status === 200) {
        setPosts((prevPosts) =>
          prevPosts.map((post) =>
            post._id === postId ? { ...post, content: updatedContent, scope: updatedScope } : post
          )
        );
      }
    } catch (error) {
      console.error('Lỗi khi chỉnh sửa bài viết:', error);
    }
  };
  
  const handleLikeComment = async (postId: string, commentId: string) => {
    try {
      
      const response = await axios.post(`http://localhost:3000/v1/article/${postId}/comments/${commentId}/like`, { userId: currentUserId },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Thêm token vào header
          },
        }
      );
      if (response.status === 200) {
        setPosts((prevPosts) =>
          prevPosts.map((post) => {
            if (post._id === postId) {
              const updatedComments = post.interact.comment.map((comment) => {
                if (comment._id === commentId) {
                  const isLiked = comment.emoticons.some((emoticon) => emoticon._iduser === currentUserId);
                  const updatedEmoticons = isLiked
                    ? comment.emoticons.filter((emoticon) => emoticon._iduser !== currentUserId)
                    : [...comment.emoticons, { typeEmoticons: 'like', _iduser: currentUserId }];
                  return { ...comment, emoticons: updatedEmoticons };
                }
                return comment;
              });
              return { ...post, interact: { ...post.interact, comment: updatedComments } };
            }
            return post;
          })
        );
      }
    } catch (error) {
      console.error('Lỗi khi like bình luận:', error);
    }
  };

  const handleLikeReplyComment = async (postId: string, commentId: string, replyId: string) => {
    try {
      const response = await axios.post(
        `http://localhost:3000/v1/article/${postId}/comments/${commentId}/reply/${replyId}/like`,
        { userId: currentUserId },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Thêm token vào header
          },
        }
      );
  
      if (response.status === 200) {
        setPosts((prevPosts) =>
          prevPosts.map((post) => {
            if (post._id === postId) {
              return {
                ...post,
                interact: {
                  ...post.interact,
                  comment: post.interact.comment.map((comment) => {
                    if (comment._id === commentId) {
                      return {
                        ...comment,
                        replyComment: comment.replyComment.map((reply) =>
                          reply._id === replyId ? response.data.reply : reply
                        )
                      };
                    }
                    return comment;
                  })
                }
              };
            }
            return post;
          })
        );

      }
    } catch (error) {
      console.error('Lỗi khi like reply comment:', error);
    }
  };

  const handleSharePost = async (postId: string, shareContent: string, shareScope: string) => {
    try {
      const response = await axios.post(`http://localhost:3000/v1/article/${postId}/share`, {
        content: shareContent,
        scope: shareScope,
        userId: currentUserId,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`, // Thêm token vào header
        },
      });
      console.log('Bài viết đã được chia sẻ thành công:', response.data);
      // Cập nhật danh sách bài viết sau khi chia sẻ
      setPosts((prevPosts) => [response.data.post, ...prevPosts]);
    } catch (error) {
      console.error('Lỗi khi chia sẻ bài viết:', error);
    }
  };

  const handleAcceptInvite = async (inviteId: string) => {
    try {
      await axios.post(`http://localhost:3000/v1/group/${group._id}/invite/accept-admin`, { userId: inviteId },
        {
          headers: {
            Authorization: `Bearer ${token}`, 
          },
        }
      );
      fetchPendingInvites(); // Cập nhật lại lời mời sau khi chấp nhận
      toast.success('Chấp nhận lời mời thành công!');
    } catch (error) {
      console.error('Lỗi khi chấp nhận lời mời:', error);
      toast.error('Có lỗi xảy ra khi chấp nhận lời mời.');
    }
  };

  const handleRejectInvite = async (inviteId: string) => {
    try {
      await axios.post(`http://localhost:3000/v1/group/${group._id}/invite/reject-admin`, { userId: inviteId },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Thêm token vào header
          },
        }
      );
      fetchPendingInvites(); // Cập nhật lại lời mời sau khi từ chối
      toast.success('Từ chối lời mời thành công!');
    } catch (error) {
      console.error('Lỗi khi từ chối lời mời:', error);
      toast.error('Có lỗi xảy ra khi từ chối lời mời.');
    }
  };
  const handleRemoveAdminRole = () => {
    setOpenConfirmDialog(true); // Mở Dialog xác nhận
  };

  const handleConfirmRemoveAdminRole = async () => {
    try {
      const response = await axios.post(`http://localhost:3000/v1/group/${group._id}/remove-admin`, {
        userId: currentUserId,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`, 
        },
      });

      if (response.status === 200) {
        setCurrentRole('member'); // Đặt lại vai trò của người dùng thành 'member'
        toast.success('Bạn đã rời khỏi vai trò Quản trị viên.'); // Thông báo thành công
      }
    } catch (error) {
      console.error('Lỗi khi chuyển quyền thành viên:', error);
      toast.error('Đã xảy ra lỗi khi chuyển vai trò thành viên.');
    } finally {
      setOpenConfirmDialog(false); // Đóng dialog xác nhận
    }
  };

  return (
    <Box sx={{ padding: 2, height: '85vh', overflowY: 'auto' }}>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
  
      {/* Hiển thị trạng thái loading khi role chưa được tải */}
      {isLoadingRole ? (
        <Box display="flex" justifyContent="center" alignItems="center" height="100%">
          <Typography variant="h6">Đang tải...</Typography>
        </Box>
      ) : (
        <>
          {/* Thông tin vai trò của người dùng trong nhóm */}
          <Box
            sx={{
              marginBottom: 4,
              padding: 3,
              borderRadius: 3,
              backgroundColor: '#fff',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
            }}
          >
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography
                variant="h6"
                sx={{
                  color: '#ffffff',
                  fontWeight: 'bold',
                  padding: 1,
                  borderRadius: 1,
                  backgroundColor: '#1976d2',
                  display: 'inline-block',
                  marginBottom: 0,
                }}
              >
                {currentRole === 'owner'
                  ? 'Chủ nhóm'
                  : currentRole === 'admin'
                  ? 'Quản trị viên'
                  : currentRole === 'member'
                  ? 'Thành viên'
                  : 'Chưa có vai trò trong nhóm'}
              </Typography>
  
              {/* Nút "Xoá chức vụ" cho quản trị viên */}
              {currentRole === 'admin' && (
                <Button
                  variant="contained"
                  sx={{ backgroundColor: '#e57373', color: '#ffffff' }}
                  onClick={handleRemoveAdminRole}
                >
                  Xoá chức vụ
                </Button>
              )}
            </Box>
          </Box>
  
          {/* Dialog xác nhận bỏ vai trò quản trị viên */}
          <Dialog open={openConfirmDialog} onClose={() => setOpenConfirmDialog(false)} maxWidth="xs" fullWidth>
            <DialogTitle>Bạn có chắc chắn?</DialogTitle>
            <DialogContent>
              <Typography>Bạn có chắc chắn muốn không làm quản trị viên nữa không?</Typography>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setOpenConfirmDialog(false)} color="primary">
                Hủy
              </Button>
              <Button onClick={handleConfirmRemoveAdminRole} color="error">
                Đồng ý
              </Button>
            </DialogActions>
          </Dialog>
  
          {/* Hiển thị lời mời làm quản trị viên */}
          <Button variant="contained" color="primary" onClick={() => setOpenInviteDialog(true)} sx={{ marginBottom: 2 }}>
            Hiển thị lời mời làm quản trị viên
          </Button>
  
          {/* Dialog hiển thị lời mời làm quản trị viên */}
          <Dialog open={openInviteDialog} onClose={() => setOpenInviteDialog(false)} maxWidth="md" fullWidth>
            <DialogTitle sx={{ fontWeight: 'bold', textAlign: 'center', fontSize: '24px', color: '#1976d2' }}>
              Lời mời làm quản trị viên
            </DialogTitle>
            <DialogContent dividers>
              {pendingInvites.length > 0 ? (
                <List>
                  {pendingInvites.map((invite, index) => (
                    <ListItem key={index} sx={{ borderBottom: '1px solid #e0e0e0' }}>
                      <ListItemText
                        primary={<Typography variant="h6" sx={{ color: '#1976d2' }}>{invite.displayName} đã được mời làm quản trị viên</Typography>}
                        secondary={`Ngày mời: ${new Date(invite.joinDate).toLocaleDateString()}`}
                      />
                      <Button variant="contained" sx={{ backgroundColor: '#1976d2', color: '#ffffff' }} onClick={() => handleAcceptInvite(invite.idUser)}>
                        Chấp nhận
                      </Button>
                      <Button variant="outlined" sx={{ borderColor: '#1976d2', color: '#1976d2', marginLeft: 2 }} onClick={() => handleRejectInvite(invite.idUser)}>
                        Từ chối
                      </Button>
                    </ListItem>
                  ))}
                </List>
              ) : (
                <Typography variant="body1">Không có lời mời nào đang chờ.</Typography>
              )}
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setOpenInviteDialog(false)} color="primary">
                Đóng
              </Button>
            </DialogActions>
          </Dialog>
  
          {/* Hiển thị danh sách bài viết của người dùng */}
          <Typography variant="h5" fontWeight="bold" sx={{ color: '#1976d2', marginBottom: 2 }}>
            Bài viết của bạn
          </Typography>
          <Box>
            {isLoading ? (
              <p>Đang tải...</p>
            ) : error ? (
              <p>{error}</p>
            ) : posts.length > 0 ? (
              posts.map((post, index) => (
                <Post
                  key={index}
                  post={post}
                  onLikeComment={handleLikeComment}
                  onAddComment={handleAddComment}
                  onLikeReplyComment={handleLikeReplyComment}
                  onAddReply={handleAddReply}
                  onLikePost={handleLikePost}
                  onDeletePost={handleDeletePost}
                  onReportPost={handleReportPost}
                  onSavePost={handleSavePost}
                  onEditPost={handleEditPost}
                  currentUserId={currentUserId}
                  onSharePost={handleSharePost}
                />
              ))
            ) : (
              <p>Không có bài viết nào.</p>
            )}
          </Box>
        </>
      )}
    </Box>
  );
}
  

export default PersonalManagementContent;

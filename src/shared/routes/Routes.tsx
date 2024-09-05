import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Login from '../../features/user-authentication/containers/login/Login';
import Register from '../../features/user-authentication/containers/register/Register';
import Forgot from '../../features/user-authentication/containers/forgot/Forgot';
import NewFeeds from '../../features/new-feeds/containers/new-feeds/NewFeeds';
import Group from '../../features/group/containers/group/Group';
import MemberContent from '../../features/group/containers/group/detail-group/member-group/MemberContent';
import HomeContent from '../../features/group/containers/group/detail-group/home-group/HomeContent';
import RulesContent from '../../features/group/containers/group/detail-group/rules-group/RulesContent';
import ApprovalContent from '../../features/group/containers/approval-group/ApprovalContent';
import AdminContent from '../../features/group/containers/group/detail-group/admin-group/AdminContent';
import MainContent from '../../features/group/containers/group/detail-group/MainContent';
import Messages from '../../features/conversations/containers/Messages'
import AllFriends from '../../features/friends/containers/friends/AllFriends';
import FriendsRequest from '../../features/friends/containers/friends-request/FriendsRequest';
import FriendsSuggest from '../../features/friends/containers/friends-suggest/FriendsSuggest';
import SavedItems from '../../features/saved/containers/saved/SavedItems';

const Routes = () => {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Login />,
    },
    {
      path: '/login',
      element: <Login />,
    },
    {
      path: '/register',
      element: <Register />,
    },
    {
      path: '/forgot',
      element: <Forgot />,
    },
    {
      path: '/new-feeds',
      element: <NewFeeds />,
    },
    {
      path: '/groups',
      element: <Group />,
    },
    {
      path: '/saved',
      element: <SavedItems />,
    },
    {
      path: '/messages', 
      element: <Messages/> // Protect this route
    },
    {
      path: '/groups/:groupName',
      element: <MainContent />,
      children: [
        {
          path: '',
          element: <HomeContent />, // Default to the main content of the group (Trang chủ)
        },
        {
          path: 'members',
          element: <MemberContent />, // Component for "Thành viên"
        },
        {
          path: 'rules',
          element: <RulesContent />, // Component for "Quy định của nhóm"
        },
        {
          path: 'admins',
          element: <AdminContent />, // Component for "Duyệt Admin"
        },
        {
          path: 'pending',
          element: <ApprovalContent />, // Component for "Duyệt bài viết"
        },
        // Define other routes here for rules, admins, pending, etc.
      ],
    },
    {
      path: '/friends',
      children: [
        {
          path: '',
          element: <AllFriends/>,
        },
        {
          path: 'friends-request',
          element: <FriendsRequest />,
        },
        {
          path: 'friends-suggest',
          element: <FriendsSuggest />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};

export default Routes;

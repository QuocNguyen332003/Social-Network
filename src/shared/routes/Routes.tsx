import { RouterProvider, createBrowserRouter, useSearchParams } from 'react-router-dom';
import Login from '../../features/user-authentication/containers/login/Login';
import Register from '../../features/user-authentication/containers/register/Register';
import Forgot from '../../features/user-authentication/containers/forgot/Forgot';
import NewFeeds from '../../features/new-feeds/containers/new-feeds/NewFeeds';
import Messages from '../../features/conversations/containers/Messages'
import AllFriends from '../../features/friends/containers/friends/AllFriends';
import FriendsRequest from '../../features/friends/containers/friends-request/FriendsRequest';
import FriendsSuggest from '../../features/friends/containers/friends-suggest/FriendsSuggest';
import ProfilePost from '../../features/profile/containers/personal-page/ProfilePost';
import Profile from '../../features/profile/containers/Profile';
import ProfileEdit from '../../features/profile/containers/edit-profile/ProfileEdit';
import SavedItems from '../../features/saved/containers/saved/SavedItems';
import CollectionsMain from '../../features/collections/containers/CollectionsMain';
import Collections from '../../features/collections/containers/collection/Collection';
import DetailArticle from '../../features/collections/containers/article-collection/DetailArticle'
import DetailArticles from '../../features/new-feeds/containers/detail-article/DetailArticles';
import NewFeedsContent from '../../features/new-feeds/components/NewFeedsContent'
import MyFriendsRequest from '../../features/friends/containers/my-friend-request/MyFriendsRequest';
import NewGroup from '../../features/group/containers/group/NewGroup';
import ExploreGroups from '../../features/group/containers/group/explore-groups/ExploreGroups';
import YourGroups from '../../features/group/containers/group/your-groups/YourGroups';
import NewFeedGroup from '../../features/group/containers/group/new-feed-group/NewFeedGroup';
import DetailGroupContent from '../../features/group/containers/group/detail-group/DetailGroupContent'
import HomeGroupContent from '../../features/group/containers/group/detail-group/home-group/HomeGroupContent'
import RulesGroupContent from '../../features/group/containers/group/detail-group/rules-group/RulesGroupContent'
import MemberGroupContent from '../../features/group/containers/group/detail-group/member-group/MemberGroupContent'
import ApprovalGroupContent from '../../features/group/containers/group/detail-group/approval-group/ApprovalGroupContent'
import AdminGroupContent from '../../features/group/containers/group/detail-group/admin-group/AdminGroupContent'
import Hobby from '../../features/user-authentication/containers/register/Hobby';
import ProfileCollection from '../../features/profile/containers/personal-collection/ProfileCollection';
import InviteGroupContent from '../../features/group/containers/group/detail-group/invite-group/InviteGroupContent'
import PersonalManagementContent from '../../features/group/containers/group/detail-group/personal-management/PersonalManagementContent'
import InfoPersonal from '../../features/user-authentication/containers/register/InfoPersonal';
import InfoAccount from '../../features/user-authentication/containers/register/InfoAccount';
import AddAvtAndBackground from '../../features/user-authentication/containers/register/AddAvtAndBackground';
import { ProtectedRoute } from './ProtectedRoute';
const Routes = () => {

  function MessagesWrapper() {
    const [searchParams] = useSearchParams();
    const friendID = searchParams.get('friendID');
    return <Messages friendID={friendID || ""} />;
  }
  
  const router = createBrowserRouter([
    // Các route công khai (public)
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
      children: [
        {
          path: '',
          element: <InfoAccount />,
        },
        {
          path: 'fill-information',
          element: <InfoPersonal />,
        },
        {
          path: 'choose-interest',
          element: <Hobby />,
        },
      ],
    },
    {
      path: '/new-user/avt-background',
      element: <AddAvtAndBackground />,
    },
    {
      path: '/forgot',
      element: <Forgot />,
    },

    // Các route yêu cầu xác thực (protected)
    {
      path: '/new-feeds',
      element: <ProtectedRoute />, // Bảo vệ route bằng ProtectedRoute
      children: [
        {
          path: '',
          element: <NewFeeds />,
          children: [
            {
              path: '',
              element: <NewFeedsContent />,
            },
            {
              path: ':postId',
              element: <DetailArticles />,
            },
          ],
        },
      ],
    },
    {
      path: '/group',
      element: <ProtectedRoute />, // Bảo vệ route bằng ProtectedRoute
      children: [
        {
          path: '',
          element: <NewGroup />,
          children: [
            {
              path: '',
              element: <NewFeedGroup />,
            },
            {
              path: 'your-feed',
              element: <NewFeedGroup />,
            },
            {
              path: 'your-groups',
              element: <YourGroups />,
            },
            {
              path: 'explore-groups',
              element: <ExploreGroups />,
            },
            {
              path: ':id',
              element: <DetailGroupContent />,
              children: [
                {
                  path: '',
                  element: <HomeGroupContent />,
                },
                {
                  path: 'members',
                  element: <MemberGroupContent />,
                },
                {
                  path: 'invite-members',
                  element: <InviteGroupContent />,
                },
                {
                  path: 'rules',
                  element: <RulesGroupContent />,
                },
                {
                  path: 'admins',
                  element: <AdminGroupContent />,
                },
                {
                  path: 'pending',
                  element: <ApprovalGroupContent />,
                },
                {
                  path: 'personal-management',
                  element: <PersonalManagementContent />,
                },
              ],
            },
          ],
        },
      ],
    },
    {
      path: '/saved',
      element: <ProtectedRoute />, // Bảo vệ route bằng ProtectedRoute
      children: [
        {
          path: '',
          element: <SavedItems />,
        },
      ],
    },
    {
      path: '/messages',
      element: <ProtectedRoute />, // Bảo vệ route bằng ProtectedRoute
      children: [
        {
          path: '',
          element: <MessagesWrapper />,
        },
      ],
    },
    {
      path: '/friends',
      element: <ProtectedRoute />, // Bảo vệ route bằng ProtectedRoute
      children: [
        {
          path: '',
          element: <AllFriends />,
        },
        {
          path: 'friends-request',
          element: <FriendsRequest />,
        },
        {
          path: 'friends-suggest',
          element: <FriendsSuggest />,
        },
        {
          path: 'my-friends-request',
          element: <MyFriendsRequest />,
        },
      ],
    },
    {
      path: '/profile/:userID',
      element: <ProtectedRoute />, // Bảo vệ route bằng ProtectedRoute
      children: [
        {
          path: '',
          element: <Profile />,
          children: [
            {
              path: '',
              element: <ProfilePost />,
            },
            {
              path: 'personal-collection',
              element: <ProfileCollection />,
            },
          ],
        },
      ],
    },
    {
      path: '/edit-profile/:userID',
      element: <ProtectedRoute />, // Bảo vệ route bằng ProtectedRoute
      children: [
        {
          path: '',
          element: <ProfileEdit />,
        },
      ],
    },
    {
      path: '/collections',
      element: <ProtectedRoute />, // Bảo vệ route bằng ProtectedRoute
      children: [
        {
          path: '',
          element: <CollectionsMain />,
          children: [
            {
              path: '',
              element: <Collections />,
            },
            {
              path: 'article',
              element: <DetailArticle />,
            },
          ],
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};

export default Routes;
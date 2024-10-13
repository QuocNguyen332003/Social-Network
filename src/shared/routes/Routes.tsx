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
const Routes = () => {

  function MessagesWrapper() {
    const [searchParams] = useSearchParams();
    const userIDStart = searchParams.get('userIDStart');
    return <Messages userIDStart={userIDStart || ""} />;
  }
  
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
      path: '/choose-interest',
      element: <Hobby />,
    },
    {
      path: '/forgot',
      element: <Forgot />,
    }, 
    {
      path: '/new-feeds',
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
    {
      path: '/group/',
      element: <NewGroup />, // Default to the main content of the group (Trang chủ)
      children: [
        {
          path: '',
          element: <NewFeedGroup />, // Default to the main content of the group (Trang chủ)
        },
        {
          path: 'your-feed',
          element: <NewFeedGroup />, // Default to the main content of the group (Trang chủ)
        },
        {
          path: 'your-groups',
          element: <YourGroups />, // Default to the main content of the group (Trang chủ)
        },
        {
          path: 'explore-groups',
          element: <ExploreGroups />, // Default to the main content of the group (Trang chủ)
        },
        {
          path: ':id',
          element: <DetailGroupContent />,
          children: [
            {
              path: '',
              element: < HomeGroupContent/>, 
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
          ], // Default to the main content of the group (Trang chủ)
        },
      ],
    },
    
    {
      path: '/saved', 
      element: <SavedItems/> // Protect this route
    },
    {
      path: '/messages',
      element: <MessagesWrapper/>,
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
        {
          path: 'my-friends-request',
          element: <MyFriendsRequest />,
        },
      ],
    },
    {
      path: '/profile/:userID',
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
    {
      path: '/edit-profile/:userID',
      element: <ProfileEdit/>
    },
    {
      path: '/collections',
      element: <CollectionsMain/>,
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
  ]);

  return <RouterProvider router={router} />;
};

export default Routes;
import React from 'react';
import { useAppTheme } from '../context/ThemeControl';
import UserProfile from '../components/UserProfile';

const sampleUser = {
  displayName: 'Saad',
  emailAddress: 'saad@gmail.com',
  profileImage: 'https://randomuser.me/api/portraits/men/60.jpg',
};

const UserProfileScreen = () => {
  const { switchMode } = useAppTheme();

  return <UserProfile userInfo={sampleUser} onSwitchTheme={switchMode} />;
};

export default UserProfileScreen;

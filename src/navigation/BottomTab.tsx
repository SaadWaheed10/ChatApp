import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { BottomTabParamList } from './NavigationTypes';
import { useThemeColors } from '../constant/colors';
import UserProfileScreen from '../screens/UserProfileScreen';
import MessageListScreen from '../screens/MessageListScreen';

const Tab = createBottomTabNavigator<BottomTabParamList>();

const BottomTabs = () => {
  const themeColors = useThemeColors();
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: themeColors.main,
        tabBarInactiveTintColor: themeColors.dimmed,
        headerShown: false,
        tabBarStyle: {
          backgroundColor: themeColors.bgLight,
        },
      }}
    >
      <Tab.Screen
        name="Chats"
        options={{
          // eslint-disable-next-line react/no-unstable-nested-components
          tabBarIcon: ({ color, size }) => (
            <Feather name="message-circle" size={size} color={color} />
          ),
        }}
        component={MessageListScreen}
      />
      <Tab.Screen
        name="Profile"
        options={{
          // eslint-disable-next-line react/no-unstable-nested-components
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person-outline" size={size} color={color} />
          ),
        }}
        component={UserProfileScreen}
      />
    </Tab.Navigator>
  );
};

export default BottomTabs;

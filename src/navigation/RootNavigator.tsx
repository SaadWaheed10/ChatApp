// @ts-nocheck
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from './NavigationTypes';
import BottomTabs from './BottomTab';
import ChatScreen from '../screens/ChatScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();
const RootNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="BottomTabs" component={BottomTabs} />
      <Stack.Screen name="Chat" component={ChatScreen} />
    </Stack.Navigator>
  );
};

export default RootNavigator;

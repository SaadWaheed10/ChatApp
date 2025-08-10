import { NavigatorScreenParams } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

export type RootStackParamList = {
  Conversations: { conversationId: string };
  Chat: { conversationId: string };
  Profile: undefined;
  BottomTabs: NavigatorScreenParams<BottomTabParamList>;
};
export type AppScreenProps<T extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, T>;
export type BottomTabParamList = {
  Chats: undefined;
  Profile: undefined;
};

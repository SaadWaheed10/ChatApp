import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateChats } from '../store/chatSlice';
import { switchStar } from '../store/starredSlice';
import { AppState } from '../store/index';
import { RootStackParamList } from '../navigation/NavigationTypes';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import ChatList from '../components/ChatList';
import { chatData } from '../utils/mockChat';

type AppNavigation = NativeStackNavigationProp<RootStackParamList>;

const MessageListScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation<AppNavigation>();
  const [searchInput, setSearchInput] = useState('');
  const chats = useSelector((state: AppState) => state.chatData.chatList);
  const starredIds = useSelector(
    (state: AppState) => state.starredItems.starredIds,
  );

  useEffect(() => {
    if (chats.length === 0) {
      dispatch(updateChats(chatData));
    }
  }, [dispatch, chats]);

  const filteredChats = chats.filter(chat =>
    chat.name.toLowerCase().includes(searchInput.toLowerCase()),
  );

  const onChatSelect = (id: string) => {
    navigation.navigate('Chat', { conversationId: id });
    console.log('chat id in message list screen: ', id);
  };

  const onStarToggle = (chatId: string) => {
    dispatch(switchStar(chatId));
  };

  const onSearchUpdate = (text: string) => {
    setSearchInput(text);
  };

  return (
    <ChatList
      chats={filteredChats}
      starredChatIds={starredIds}
      searchText={searchInput}
      onChatSelect={onChatSelect}
      onStarToggle={onStarToggle}
      onSearchUpdate={onSearchUpdate}
    />
  );
};

export default MessageListScreen;

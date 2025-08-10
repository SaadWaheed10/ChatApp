import React, { useRef, useState, useCallback } from 'react';
import { FlatList, LayoutAnimation } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
// import { AppScreenProps } from '../navigation/NavigationTypes';
import { AppDispatch, AppState } from '../store/index';
import { postMessage } from '../store/chatSlice';
import ChatScreenComponent from '../components/ChatScreenComponent';

const ChatScreen = ({ route }: any) => {
  const { chatId } = route.params ?? {};
  const dispatch = useDispatch<AppDispatch>();
  const messageListRef = useRef<FlatList>(null);
  const [messageText, setMessageText] = useState('');

  const chat = useSelector((state: AppState) =>
    state.chatData.chatList.find((chatItem: any) => chatItem.id === chatId),
  );

  const handleMessageSend = useCallback(() => {
    if (!messageText.trim()) return;
    LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
    dispatch(postMessage({ chatId, content: messageText.trim() }));
    setMessageText('');
    setTimeout(() => {
      messageListRef.current?.scrollToEnd({ animated: true });
    }, 120);
  }, [messageText, dispatch, chatId]);

  if (!chat) return null;

  return (
    <ChatScreenComponent
      chatMessages={chat?.messages}
      messageText={messageText}
      listReference={messageListRef}
      chatInfo={chat}
      updateText={setMessageText}
      submitMessage={handleMessageSend}
    />
  );
};

export default ChatScreen;

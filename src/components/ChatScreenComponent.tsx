import React, { RefObject } from 'react';
import {
  View,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Chat, Message } from '../@types/Types';
import { useThemeColors, ThemePalette } from '../constant/colors';
import {
  scaleHorizontal,
  scaleVertical,
  dropShadowConfig,
} from '../utils/responsiveFunction';
import TextComponent from './TextComponent';
import ConversationHeader from './CoversationHeader';

interface ChatProps {
  chatMessages: Message[];
  messageText: string;
  listReference: RefObject<FlatList<any> | null>;
  chatInfo: Chat;
  updateText: (input: string) => void;
  submitMessage: () => void;
}

const ChatScreen = (props: ChatProps) => {
  const themeColors = useThemeColors();
  const chatStyles = createChatStyles(themeColors);

  return (
    <KeyboardAvoidingView
      style={chatStyles.wrapper}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={85}
    >
      <ConversationHeader
        displayName={props.chatInfo.name}
        profileImage={props.chatInfo.avatarUrl}
        isActive={props.chatInfo.isOnline}
        isComposing={props.chatInfo.isTyping}
      />

      <FlatList
        ref={props.listReference}
        data={props.chatMessages}
        onContentSizeChange={() =>
          props.listReference.current?.scrollToEnd({ animated: true })
        }
        keyExtractor={(msg, idx) => `${msg.id}-${idx}`}
        renderItem={({ item }) => (
          <View
            style={[
              chatStyles.msgContainer,
              item.sender === 'user' ? chatStyles.myMsg : chatStyles.theirMsg,
            ]}
          >
            <TextComponent
              textContent={item.text}
              textSize={14}
              textColor={
                item.sender === 'user'
                  ? themeColors.pureWhite
                  : themeColors.primaryText
              }
            />
          </View>
        )}
        contentContainerStyle={chatStyles.listPadding}
      />

      <View style={chatStyles.footer}>
        <View style={chatStyles.textBoxArea}>
          <TextInput
            style={chatStyles.messageInput}
            placeholder="Write your message..."
            value={props.messageText}
            onChangeText={props.updateText}
            placeholderTextColor={themeColors.secondaryText}
            returnKeyType="send"
            blurOnSubmit={false}
            onSubmitEditing={props.submitMessage}
          />
          <TouchableOpacity
            onPress={props.submitMessage}
            disabled={!props.messageText.trim()}
          >
            <Ionicons
              name="send"
              size={24}
              color={
                props.messageText.trim() ? themeColors.main : themeColors.dimmed
              }
            />
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

const createChatStyles = (theme: ThemePalette) =>
  StyleSheet.create({
    wrapper: {
      flex: 1,
      backgroundColor: theme.bgLight,
      paddingTop: scaleVertical(60),
    },
    listPadding: {
      padding: scaleHorizontal(15),
      flexGrow: 1,
    },
    msgContainer: {
      maxWidth: '80%',
      padding: scaleHorizontal(12),
      marginBottom: scaleVertical(12),
      borderRadius: scaleHorizontal(15),
    },
    myMsg: {
      backgroundColor: theme.main,
      alignSelf: 'flex-end',
      borderTopRightRadius: 0,
    },
    theirMsg: {
      backgroundColor: theme.divider,
      alignSelf: 'flex-start',
      borderTopLeftRadius: 0,
    },
    footer: {
      paddingHorizontal: scaleHorizontal(15),
      paddingVertical: scaleVertical(12),
      borderTopWidth: 1,
      borderColor: theme.divider,
      backgroundColor: theme.bgLight,
    },
    textBoxArea: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: theme.darkMode ? '#222222' : '#f9f9f9',
      paddingHorizontal: scaleHorizontal(10),
      paddingVertical: scaleVertical(10),
      borderRadius: scaleHorizontal(25),
      ...dropShadowConfig(3, theme.shade),
    },
    messageInput: {
      flex: 1,
      fontSize: 16,
      paddingRight: scaleHorizontal(12),
      color: theme.primaryText,
    },
  });

export default ChatScreen;

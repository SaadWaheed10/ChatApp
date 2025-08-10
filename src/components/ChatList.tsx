import React, { useCallback } from 'react';
import {
  View,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Image,
  TextInput,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { Chat } from '../@types/Types';
import {
  scaleHorizontal,
  scaleVertical,
  dropShadowConfig,
} from '../utils/responsiveFunction';
import TextComponent from './TextComponent';
import { ThemePalette, useThemeColors } from '../constant/colors';

interface ChatListProps {
  chats: Chat[];
  starredChatIds: string[];
  searchText: string;
  onChatSelect: (chatId: string) => void;
  onStarToggle: (chatId: string) => void;
  onSearchUpdate: (text: string) => void;
}

const ChatList = ({
  chats,
  starredChatIds,
  searchText,
  onChatSelect,
  onStarToggle,
  onSearchUpdate,
}: ChatListProps) => {
  const theme = useThemeColors();
  const styles = createStyles(theme);

  const renderChatItem = useCallback(
    ({ item }: { item: Chat }) => {
      const recentMessage =
        item.messages.length > 0
          ? item.messages[item.messages.length - 1].text
          : 'No messages available';

      const isStarred = starredChatIds.includes(item.id);

      return (
        <TouchableOpacity
          style={styles.chatItem}
          onPress={() => onChatSelect(item.id)}
        >
          <Image source={{ uri: item.avatarUrl }} style={styles.profileImage} />
          <View style={styles.chatDetails}>
            <TextComponent
              textContent={item.name}
              textSize={16}
              //   fontVariant="bold"
              textColor={theme.primaryText}
            />
            <TextComponent
              textContent={recentMessage}
              textSize={13}
              //   fontVariant="regular"
              textColor={theme.secondaryText}
              numberOfLines={1}
            />
          </View>
          <TouchableOpacity onPress={() => onStarToggle(item.id)}>
            <Icon
              name="star"
              size={20}
              color={isStarred ? theme.highlight : theme.dimmed}
            />
          </TouchableOpacity>
        </TouchableOpacity>
      );
    },
    [starredChatIds, onChatSelect, onStarToggle, theme],
  );

  const renderEmptyState = () => (
    <View style={styles.emptyState}>
      <TextComponent
        textContent={
          searchText ? 'No chats found for your search.' : 'No chats available.'
        }
        textSize={16}
        // fontVariant="regular"
        textColor={theme.secondaryText}
      />
    </View>
  );

  return (
    <View style={styles.wrapper}>
      <View style={styles.titleSection}>
        <TextComponent
          textContent="Messages"
          textSize={24}
          //   fontVariant="bold"
          textColor={theme.primaryText}
        />
      </View>
      <View style={styles.searchContainer}>
        <Icon name="search" size={18} color={theme.secondaryText} />
        <TextInput
          placeholder="Search chats"
          placeholderTextColor={theme.secondaryText}
          style={styles.searchField}
          value={searchText}
          onChangeText={onSearchUpdate}
        />
      </View>
      <FlatList
        data={chats}
        keyExtractor={item => item.id}
        renderItem={renderChatItem}
        contentContainerStyle={[
          styles.listContent,
          chats.length === 0 && styles.listContentCentered,
        ]}
        ListEmptyComponent={renderEmptyState}
      />
    </View>
  );
};

const createStyles = (theme: ThemePalette) =>
  StyleSheet.create({
    wrapper: {
      flex: 1,
      backgroundColor: theme.bgLight,
      paddingTop: scaleVertical(60),
    },
    listContent: {
      paddingHorizontal: scaleHorizontal(14),
      paddingTop: scaleVertical(10),
    },
    listContentCentered: {
      flexGrow: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    chatItem: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      backgroundColor: theme.bgLight,
      paddingVertical: scaleVertical(10),
      paddingHorizontal: scaleHorizontal(10),
      borderRadius: scaleVertical(8),
      ...dropShadowConfig(2, theme.shade),
    },
    chatDetails: {
      flex: 1,
      marginRight: scaleHorizontal(10),
    },
    profileImage: {
      width: scaleHorizontal(46),
      height: scaleHorizontal(46),
      borderRadius: scaleHorizontal(23),
      marginRight: scaleHorizontal(10),
    },
    titleSection: {
      paddingHorizontal: scaleHorizontal(14),
      paddingBottom: scaleVertical(10),
    },
    searchContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: theme.bgLight,
      borderRadius: scaleVertical(10),
      paddingHorizontal: scaleHorizontal(10),
      marginTop: scaleVertical(10),
      marginHorizontal: scaleHorizontal(14),
      marginBottom: scaleVertical(10),
      borderWidth: 1,
      borderColor: theme.divider,
      paddingVertical: scaleVertical(8),
    },
    searchField: {
      flex: 1,
      marginLeft: scaleHorizontal(6),
      fontSize: 14,
      color: theme.primaryText,
      padding: 0,
    },
    emptyState: {
      alignItems: 'center',
      justifyContent: 'center',
    },
  });

export default ChatList;

import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View, TouchableOpacity, Image, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import { ThemePalette, useThemeColors } from '../constant/colors';
import { scaleHorizontal } from '../utils/responsiveFunction';
import TextComponent from './TextComponent';

interface HeaderProps {
  displayName: string;
  profileImage?: string;
  isActive?: boolean;
  isComposing?: boolean;
}

const ConversationHeader = ({
  displayName,
  profileImage,
  isActive,
  isComposing,
}: HeaderProps) => {
  const theme = useThemeColors();
  const navigation = useNavigation();
  const styles = createStyles(theme);

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
      >
        <Icon name="chevron-back" size={24} color={theme.primaryText} />
      </TouchableOpacity>
      <View style={styles.content}>
        <Image
          source={{ uri: profileImage }}
          style={styles.profileImage}
          defaultSource={{ uri: 'https://via.placeholder.com/52' }}
        />
        <View>
          <TextComponent
            textContent={displayName}
            textSize={16}
            textColor={theme.primaryText}
          />
          <TextComponent
            textContent={
              isComposing ? 'Typing...' : isActive ? 'Active' : 'Inactive'
            }
            textSize={12}
            textColor={isActive ? theme.positive : theme.dimmed}
          />
        </View>
      </View>
    </View>
  );
};

const createStyles = (theme: ThemePalette) =>
  StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: scaleHorizontal(10),
      backgroundColor: theme.bgLight,
      borderBottomWidth: 1,
      borderColor: theme.divider,
    },
    content: {
      flexDirection: 'row',
      alignItems: 'center',
      marginLeft: scaleHorizontal(10),
    },
    profileImage: {
      width: scaleHorizontal(50),
      height: scaleHorizontal(50),
      borderRadius: scaleHorizontal(50),
      marginRight: scaleHorizontal(10),
    },
  });

export default ConversationHeader;

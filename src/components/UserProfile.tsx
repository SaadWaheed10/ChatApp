import React from 'react';
import { View, Image, StyleSheet, TouchableOpacity } from 'react-native';
import {
  scaleHorizontal,
  scaleVertical,
  dropShadowConfig,
} from '../utils/responsiveFunction';
import TextComponent from './TextComponent';
import { ThemePalette, useThemeColors } from '../constant/colors';

interface ProfileProps {
  userInfo: {
    displayName: string;
    emailAddress: string;
    profileImage?: string;
  };
  onSwitchTheme: () => void;
}

const UserProfile = ({ userInfo, onSwitchTheme }: ProfileProps) => {
  const theme = useThemeColors();
  const styles = createStyles(theme);

  return (
    <View style={styles.wrapper}>
      <View style={styles.headerSection}>
        {userInfo.profileImage && (
          <Image
            source={{ uri: userInfo.profileImage }}
            style={styles.userImage}
          />
        )}
      </View>

      <View style={styles.detailsSection}>
        <TextComponent
          textContent={userInfo.displayName}
          textSize={20}
          textColor={theme.primaryText}
        />

        <TextComponent
          textContent={userInfo.emailAddress}
          textSize={16}
          textColor={theme.secondaryText}
          style={styles.emailText}
        />

        <TouchableOpacity style={styles.themeButton} onPress={onSwitchTheme}>
          <TextComponent
            textContent="Switch Theme"
            textSize={16}
            textColor={theme.pureWhite}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const createStyles = (theme: ThemePalette) =>
  StyleSheet.create({
    wrapper: {
      flex: 1,
      backgroundColor: theme.bgLight,
    },
    headerSection: {
      backgroundColor: theme.main,
      height: scaleVertical(150),
      alignItems: 'center',
      justifyContent: 'flex-end',
      paddingBottom: scaleVertical(12),
    },
    userImage: {
      width: scaleHorizontal(95),
      height: scaleHorizontal(95),
      borderRadius: scaleHorizontal(47.5),
      borderWidth: 2,
      borderColor: theme.pureWhite,
    },
    detailsSection: {
      alignItems: 'center',
      paddingTop: scaleVertical(14),
      paddingHorizontal: scaleHorizontal(18),
    },
    emailText: {
      marginTop: scaleVertical(8),
      marginBottom: scaleVertical(20),
    },
    themeButton: {
      backgroundColor: theme.main,
      paddingVertical: scaleVertical(10),
      paddingHorizontal: scaleHorizontal(22),
      borderRadius: scaleHorizontal(10),
      ...dropShadowConfig(2, theme.shade),
    },
  });

export default UserProfile;

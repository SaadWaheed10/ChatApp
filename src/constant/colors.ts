import { useAppTheme } from '../context/ThemeControl';

const defaultTheme = {
  main: '#03579A',
  alternate: '#037BB8',
  highlight: '#00BFFF',
  bgLight: '#F0F4F8',
  pureWhite: '#FFFFFF',
  bgDeep: '#0E0E0E',
  primaryText: '#212123',
  secondaryText: '#556677',
  divider: '#CCD3DE',
  shade: '#B0B0B0',
  dimmed: '#8899A6',
  positive: '#2EBE4F',
  caution: '#FFA500',
  negative: '#FF4D4D',
};

const darkTheme = {
  main: '#2A7AFF',
  alternate: '#3AAFFF',
  highlight: '#66D1FF',
  bgLight: '#0E0E0E',
  pureWhite: '#FFFFFF',
  bgDeep: '#000000',
  primaryText: '#F0F0F0',
  secondaryText: '#D0D0D0',
  divider: '#444444',
  shade: '#1A1A1A',
  dimmed: '#999999',
  positive: '#3DD165',
  caution: '#FFCC00',
  negative: '#FF5C5C',
};

export const useThemeColors = () => {
  const { colorMode } = useAppTheme();
  const darkMode = colorMode === 'dark';
  const selectedPalette = darkMode ? darkTheme : defaultTheme;

  return {
    ...selectedPalette,
    darkMode,
  };
};

export type ThemePalette = ReturnType<typeof useThemeColors>;

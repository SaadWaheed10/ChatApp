import React, { createContext, useReducer, useContext, ReactNode } from 'react';
import { Appearance } from 'react-native';
import { MMKVLoader } from 'react-native-mmkv-storage';

const localStorage = new MMKVLoader().initialize();

type ColorScheme = 'light' | 'dark';

interface ThemeState {
  colorMode: ColorScheme;
}

type ThemeAction = { type: 'SWITCH_MODE' };

const AppThemeContext = createContext<{
  colorMode: ColorScheme;
  switchMode: () => void;
}>({
  colorMode: 'light',
  switchMode: () => {},
});

const themeReducer = (state: ThemeState, action: ThemeAction): ThemeState => {
  switch (action.type) {
    case 'SWITCH_MODE':
      const newMode = state.colorMode === 'light' ? 'dark' : 'light';
      localStorage.setString('colorMode', newMode);
      return { colorMode: newMode };
    default:
      return state;
  }
};

export const AppThemeProvider = ({ children }: { children: ReactNode }) => {
  const savedMode = localStorage.getString('colorMode') as ColorScheme | null;
  const systemMode = Appearance.getColorScheme() as ColorScheme | null;
  const defaultMode: ColorScheme = savedMode ?? systemMode ?? 'light';

  const [state, dispatch] = useReducer(themeReducer, {
    colorMode: defaultMode,
  });

  return (
    <AppThemeContext.Provider
      value={{
        colorMode: state.colorMode,
        switchMode: () => dispatch({ type: 'SWITCH_MODE' }),
      }}
    >
      {children}
    </AppThemeContext.Provider>
  );
};

export const useAppTheme = () => useContext(AppThemeContext);

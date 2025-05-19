import { DefaultTheme, DarkTheme } from "@react-navigation/native";

export const lightTheme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        background: '#F2F2F2',
        secondary:  '#E0E0E0',
        border:     '#d3d3d3',
        view:       '#FFFFFF',
        shadow:     '#000000',
        activeTab:  '#000000',
        inactiveTab:'#808080',
        tabBar:     '#ffffff',
        headerTint: '#1c1c1e',
        statusBar:  '#ffffff',
        secondaryText: '#555555'
    },
  };
  
  export const darkTheme = {
    ...DarkTheme,
    colors: {
        ...DarkTheme.colors,
        background: '#121212',
        secondary:  '#2C2C2E',
        border:     '#1C1C1E',
        view:       '#1C1C1E',
        shadow:     '#FFFFFF',
        activeTab:  '#0A84AA',
        inactiveTab:'#8E8E93',
        tabBar:     '#1c1c1e',
        headerTint: '#ffffff',
        statusBar:  '#1c1c1e',
        secondaryText: '#AAAAAA'
    },
  };
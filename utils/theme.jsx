import { DefaultTheme, DarkTheme } from "@react-navigation/native";

export const lightTheme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        background: '#F2F2F2',
        // card:       ' #ffffff',
        // text:       ' #121212',
        // primary:    ' #6200EE',
        border:     '#d3d3d3',
        view:       '#FFFFFF',
        shadow:     '#000000',
        activeTab:  '#000000',
        inactiveTab:'#808080',
        tabBar:     '#ffffff',
        headerTint: '#1c1c1e',
        statusBar:  '#ffffff',
    },
  };
  
  export const darkTheme = {
    ...DarkTheme,
    colors: {
        ...DarkTheme.colors,
        background: '#121212',
    //   text:       ' #E1E1E1',
    //   card:       ' #1c1c1e',
    //   primary:    ' #BB86FC',
        border:     '#1C1C1E',
        view:       '#1C1C1E',
        shadow:     '#FFFFFF',
        activeTab:  '#0A84AA',
        inactiveTab:'#8E8E93',
        tabBar:     '#1c1c1e',
        headerTint: '#ffffff',
        statusBar:  '#1c1c1e',
    },
  };
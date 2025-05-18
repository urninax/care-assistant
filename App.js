import { SharedContextProvider } from "./utils/shared-context";
import { ThemeProvider } from './utils/theme-context';
import RootNavigator from "./RootNavigator";
import { enableScreens } from 'react-native-screens'
import { ActionSheetProvider } from '@expo/react-native-action-sheet'

enableScreens()

export default function App() {
  return (
    <SharedContextProvider>
      <ThemeProvider>
        <ActionSheetProvider>
          <RootNavigator/>
        </ActionSheetProvider>
      </ThemeProvider>
    </SharedContextProvider>
  );
}

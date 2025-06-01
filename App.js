import { SharedContextProvider } from "./utils/shared-context";
import { ThemeProvider } from './utils/theme-context';
import RootNavigator from "./RootNavigator";
import { enableScreens } from 'react-native-screens'
import { ActionSheetProvider } from '@expo/react-native-action-sheet'
import { TaskProvider } from "./utils/task-context";
import { 
  useFonts, 
  Poppins_100Thin, 
  Poppins_200ExtraLight,
  Poppins_300Light,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_600SemiBold,
  Poppins_700Bold,
  Poppins_800ExtraBold,
  Poppins_900Black,
} from '@expo-google-fonts/poppins'

enableScreens()

export default function App() {
  const [fontsLoaded] = useFonts({
    Poppins_100Thin, 
    Poppins_200ExtraLight,
    Poppins_300Light,
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_600SemiBold,
    Poppins_700Bold,
    Poppins_800ExtraBold,
    Poppins_900Black,
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <TaskProvider>
      <SharedContextProvider>
        <ThemeProvider>
          <ActionSheetProvider>
            <RootNavigator/>
          </ActionSheetProvider>
        </ThemeProvider>
      </SharedContextProvider>
    </TaskProvider>
  );
}

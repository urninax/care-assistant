import { SharedContextProvider } from "./utils/shared-context";
import { ThemeProvider } from './utils/theme-context';
import RootNavigator from "./RootNavigator";

export default function App() {
  return (
    <SharedContextProvider>
      <ThemeProvider>
          <RootNavigator/>
      </ThemeProvider>
    </SharedContextProvider>
  );
}

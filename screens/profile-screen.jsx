import { Text, View, Button } from "react-native"
import { useContext } from "react";
import { ThemeContext } from "../utils/theme-context";

export const ProfileScreen = () => {
    const { scheme, setScheme } = useContext(ThemeContext);

    return (
      <View>
        <Text>Current Theme: {scheme}</Text>
        <Button title="System" onPress={() => setScheme('system')} />
        <Button title="Light"    onPress={() => setScheme('light')} />
        <Button title="Dark"      onPress={() => setScheme('dark')} />
      </View>
    );
}
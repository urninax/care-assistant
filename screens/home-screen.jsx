import { StyleSheet, View, Text } from "react-native";
import { Image } from 'expo-image'
import { ProgressBar } from '../components/home-screen/progress-bar'

export const HomeScreen = () => {
  return (
    <>
      <View style={styles.screen}>
        <ProgressBar current={4} total={5} />
        <View style={styles.treeContainer}>
          <Image
            source={require('../images/hamster-meme.gif')}
            style={styles.gif}
          />
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: "center",
  },
  treeContainer: {
    marginTop: 10,
    height: '50%',
    width: '80%',
    borderWidth: 1,
    borderColor: 'black',
  },
  gif: {
    height: '100%',
    width: '100%'
  },
});

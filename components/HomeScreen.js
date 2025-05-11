import { StyleSheet, View, Text, Image } from "react-native";

export const HomeScreen = () => {
  return (
    <>
      <View style={styles.container}>
        <View style={styles.textContainer}>
          <Text>Hello World</Text>
        </View>
        <View style={styles.imageRow}>
          <View>
            <Image
              source={require("../images/img01.jpg")}
              style={styles.image}
            />
          </View>
          <View>
            <Image
              source={require("../images/img01.jpg")}
              style={styles.image}
            />
          </View>
        </View>
        <View style={styles.textContainer}>
          <Text>Hello Again</Text>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-end",
    paddingBottom: 50,
  },
  textContainer: {
    backgroundColor: "white",
    borderWidth: 2,
    borderColor: "black",
    height: 50,
    width: 210,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    marginBottom: 20,
    overflow: "hidden",
  },
  imageRow: {
    flexDirection: "row",
    gap: 10,
  },
  image: {
    width: 100,
    height: 100,
    marginBottom: 10,
    borderRadius: 10,
  },
});

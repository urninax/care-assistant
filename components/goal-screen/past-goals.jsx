import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Pressable,
  FlatList,
} from "react-native";
import React, { useContext, useState, useEffect } from "react";
import Ionicons from "react-native-vector-icons/Ionicons";

import { ThemeContext } from "../../utils/theme-context";

export const PastGoals = ({ navigation, route }) => {
  const { scheme } = useContext(ThemeContext);
  const [goals, setGoals] = useState([]);

  const styles = getStyles(scheme);

  // Verschobene Ziele von anderen Screens
  useEffect(() => {
    if (route.params?.goalAdd) {
      setGoals((prevGoals) => [...prevGoals, route.params.goalAdd]);
      navigation.setParams({ goalAdd: null });
    }
  }, [route.params?.goalAdd, navigation]);

  // Ziel bearbeiten
  const editGoal = () => {
    if (item.id) {
      const updatedGoals = goals.map((goal) =>
        goal.id === item.id ? { ...goal, name: item.name } : goal
      );
      setGoals(updatedGoals);
    }
  };

  // Ziel verschieben
  const moveGoal = (goalId, nextScreen) => {
    // Ziel aus goals entfernen
    const goalMove = goals.find((goal) => goal.id === goalId);
    if (goalMove) {
      const updatedGoals = goals.filter((goal) => goal.id !== goalId);
      setGoals(updatedGoals);

      // Zu entsprechendem Ziel-Screen navigieren und das ausgewählte Ziel verschieben
      navigation.navigate(nextScreen, {
        goalAdd: goalMove,
      });
    }
  };

  return (
    <View style={styles.screen}>
      {/* Liste der Ziele */}
      {goals.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>No goals</Text>
        </View>
      ) : (
        <FlatList
          data={goals}
          renderItem={({ item }) => (
            <SingleGoal moveGoal={moveGoal} editGoal={editGoal} item={item} />
          )}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContainer}
        />
      )}
    </View>
  );
};

// Einzelnes Ziel rendern
const SingleGoal = ({ item, moveGoal, editGoal }) => {
  const { scheme } = useContext(ThemeContext);
  const [isEditing, setIsEditing] = useState(false);

  const styles = getStyles(scheme);
  return (
    <View style={styles.goalItem}>
      {isEditing ? (
        <TextInput
          style={styles.input}
          value={item.name}
          onChangeText={(text) => {
            editGoal({
              ...item,
              name: text,
            });
          }}
        ></TextInput>
      ) : (
        <Text style={styles.goalText}>{item.name}</Text>
      )}
      <View style={styles.buttonContainer}>
        <Pressable
          onPress={() => {
            setIsEditing(!isEditing);
          }}
        >
          <Ionicons
            name={isEditing ? "checkmark" : "pencil"}
            size={30}
            color="#007AFF"
          />
        </Pressable>
        <Pressable onPress={() => moveGoal(item.id, "CurrentGoals")}>
          <Ionicons name="play" size={30} color="#4CD964" />
        </Pressable>
        <Pressable onPress={() => moveGoal(item.id, "PauseGoals")}>
          <Ionicons name="pause" size={30} color="#FF9500" />
        </Pressable>
      </View>
    </View>
  );
};

const getStyles = (scheme) =>
  StyleSheet.create({
    screen: {
      flex: 1,
      backgroundColor: scheme === "dark" ? "#121212" : "#fff",
    },
    emptyContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
    emptyText: {
      fontSize: 16,
      color: "#8E8E93",
      textAlign: "center",
    },
    listContainer: {
      padding: 16,
    },
    goalItem: {
      backgroundColor: "#D3D3D3",
      padding: 16,
      borderRadius: 10,
      marginBottom: 12,
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },
    goalText: {
      fontSize: 25,
      color: scheme === "dark" ? "#fff" : "#000",
    },
    buttonContainer: {
      flexDirection: "column",
      gap: 10,
    },
    input: {
      width: "80%",
      fontSize: 25,
      borderWidth: 1,
      borderColor: scheme === "dark" ? "#2C2C2E" : "#C7C7CC",
      borderRadius: 5,
      padding: 12,
      marginBottom: 16,
      color: scheme === "dark" ? "#fff" : "#000",
      backgroundColor: scheme === "dark" ? "#2C2C2E" : "#F2F2F7",
    },
  });

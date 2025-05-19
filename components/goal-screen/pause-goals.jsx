import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Pressable,
  FlatList,
  Platform
} from "react-native";
import React, { useContext, useState, useEffect } from "react";
import Ionicons from "react-native-vector-icons/Ionicons";

import { ThemeContext } from "../../utils/theme-context";

export const PauseGoals = ({ navigation, route }) => {
  const { scheme, theme } = useContext(ThemeContext);
  const [goals, setGoals] = useState([]);

  const styles = getStyles(scheme, theme);

  // Verschobene Ziele von anderen Screens
  useEffect(() => {
    if (route.params?.goalAdd) {
      setGoals((prevGoals) => [...prevGoals, route.params.goalAdd]);
      navigation.setParams({ goalAdd: null });
    }
  }, [route.params?.goalAdd, navigation]);

  // Ziel bearbeiten
  const editGoal = (item) => {
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
  const { scheme, theme } = useContext(ThemeContext);
  const [isEditing, setIsEditing] = useState(false);

  const styles = getStyles(scheme, theme);
  return (
    <View style={[styles.goalItem, styles.shadow]}>
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
            name={isEditing ? "checkmark" : "pencil-outline"}
            size={30}
            color="#007AFF"
          />
        </Pressable>
        <Pressable onPress={() => moveGoal(item.id, "CurrentGoals")}>
          <Ionicons name="play-outline" size={30} color="#4CD964" />
        </Pressable>
        <Pressable onPress={() => moveGoal(item.id, "PastGoals")}>
          <Ionicons name="checkmark-circle" size={30} color="#34C759" />
        </Pressable>
      </View>
    </View>
  );
};

const getStyles = (scheme, theme) =>
  StyleSheet.create({
    screen: {
      flex: 1,
    },
    emptyContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
    emptyText: {
      fontSize: 16,
      color: theme.colors.secondaryText,
      textAlign: "center",
    },
    listContainer: {
      padding: 16,
    },
    goalItem: {
      backgroundColor: theme.colors.view,
      padding: 16,
      borderRadius: 10,
      marginBottom: 12,
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },
    goalText: {
      fontSize: 20,
      color: theme.colors.text,
      flexShrink: 1,
      flexWrap: 'wrap',
    },
    buttonContainer: {
      flexDirection: "column",
      gap: 10,
    },
    input: {
      fontSize: 20,
      marginRight: 10,
      borderRadius: 15,
      padding: 10,
      color: theme.colors.text,
      backgroundColor: theme.colors.secondary,
      flexShrink: 1,
      flexWrap: 'wrap'
    },
    shadow: {
      shadowColor: '#000',
      ...Platform.select({
        ios:{
          shadowOpacity: 0.5,
          shadowRadius: 7,
          shadowOffset: {
            height: 0,
            width: 0
          }
        },
        android:{
          elevation: 5
        }
      })
    },
  });

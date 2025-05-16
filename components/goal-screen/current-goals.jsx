import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  TextInput,
  Pressable,
  FlatList,
  Alert,
} from "react-native";
import React, { useContext, useState, useEffect } from "react";
import { ThemeContext } from "../../utils/theme-context";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useNavigation, useRoute } from "@react-navigation/native";

export const CurrentGoals = () => {
  const { scheme } = useContext(ThemeContext);

  const [goals, setGoals] = useState([]); // Liste der aktiven Ziele
  const [editingGoal, setEditingGoal] = useState(null); // Ziel, das bearbeitet wird
  const [showModal, setShowModal] = useState(false); // Bearbeitungsfenster sichtbar oder nicht
  const [newGoalName, setNewGoalName] = useState(""); // Name des neuen oder bearbeiteten Ziels

  const styles = getStyles(scheme);
  const navigation = useNavigation();
  const route = useRoute();

  // Verschobene Ziele von anderen Screens
  useEffect(() => {
    if (route.params?.goalToAdd) {
      setGoals((prevGoals) => [...prevGoals, route.params.goalToAdd]);
      navigation.setParams({ goalToAdd: null }); // Parameter zurücksetzen
    }
  }, [route.params?.goalToAdd]);

  // Neues Ziel hinzufügen
  const addGoal = () => {
    if (newGoalName !== "") {
      const newGoal = {
        id: Date.now().toString(),
        name: newGoalName,
      };
      setGoals([...goals, newGoal]);
      setNewGoalName("");
      setShowModal(false);
    }
  };

  // Ziel bearbeiten
  const editGoal = () => {
    if (newGoalName !== "" && editingGoal) {
      const updatedGoals = goals.map((goal) =>
        goal.id === editingGoal.id ? { ...goal, name: newGoalName } : goal
      );
      setGoals(updatedGoals);
      setNewGoalName("");
      setEditingGoal(null);
      setShowModal(false);
    }
  };

  // Ziel verschieben
  const moveGoal = (goalId, targetScreen) => {
    // Ziel aus der Liste entfernen
    const goalToMove = goals.find((goal) => goal.id === goalId);
    if (goalToMove) {
      const updatedGoals = goals.filter((goal) => goal.id !== goalId);
      setGoals(updatedGoals);

      // Zu entsprechendem Ziel-Screen navigieren und das ausgewählte Ziel verschieben
      navigation.navigate(targetScreen, {
        goalToAdd: goalToMove,
      });

      // Benachrichtigung anzeigen, dass Ziel verschoben wurde
      Alert.alert("Goal moved");
    }
  };

  // Bearbeitung des Ziels starten
  const startEditing = (goal) => {
    setEditingGoal(goal);
    setNewGoalName(goal.name);
    setShowModal(true);
  };

  // Einzelnes Ziel rendern
  const renderGoalItem = ({ item }) => (
    <View style={styles.goalItem}>
      <Text style={styles.goalText}>{item.name}</Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={() => startEditing(item)}>
          <Ionicons name="pencil" size={30} color="#007AFF" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => moveGoal(item.id, "PauseGoals")}>
          <Ionicons name="pause" size={30} color="#FF9500" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => moveGoal(item.id, "PastGoals")}>
          <Ionicons name="checkmark-circle" size={30} color="#34C759" />
        </TouchableOpacity>
      </View>
    </View>
  );

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
          renderItem={renderGoalItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContainer}
        />
      )}

      {/* Button zum Hinzufügen */}
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => {
          setEditingGoal(null);
          setNewGoalName("");
          setShowModal(true);
        }}
      >
        <Ionicons name="add" size={30} color="white" />
      </TouchableOpacity>

      {/* Bearbeitungsfenster */}
      <Modal visible={showModal} transparent={true} animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>
              {editingGoal ? "Edit goal" : "New goal"}
            </Text>

            <TextInput
              style={styles.input}
              value={newGoalName}
              onChangeText={setNewGoalName}
              placeholder="Name of goal"
              placeholderTextColor="#999"
            />

            <View style={styles.modalButtons}>
              <Pressable
                style={[styles.button, styles.cancelButton]}
                onPress={() => {
                  setShowModal(false);
                  setNewGoalName("");
                  setEditingGoal(null);
                }}
              >
                <Text style={styles.buttonText}>Cancel</Text>
              </Pressable>

              <Pressable
                style={[styles.button, styles.saveButton]}
                onPress={editingGoal ? editGoal : addGoal}
              >
                <Text style={styles.buttonText}>
                  {editingGoal ? "Save" : "Add"}
                </Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
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
    addButton: {
      position: "absolute",
      bottom: 20,
      right: 20,
      backgroundColor: scheme === "dark" ? "#0A84FF" : "#007AFF",
      width: 56,
      height: 56,
      borderRadius: 30,
      justifyContent: "center",
      alignItems: "center",
    },
    modalContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
    modalContent: {
      backgroundColor: scheme === "dark" ? "#1c1c1e" : "#fff",
      padding: 20,
      borderRadius: 8,
      width: "80%",
    },
    modalTitle: {
      fontSize: 20,
      fontWeight: "bold",
      marginBottom: 16,
      textAlign: "center",
      color: scheme === "dark" ? "#fff" : "#000",
    },
    input: {
      borderWidth: 1,
      borderColor: scheme === "dark" ? "#2C2C2E" : "#C7C7CC",
      borderRadius: 5,
      padding: 12,
      marginBottom: 16,
      color: scheme === "dark" ? "#fff" : "#000",
      backgroundColor: scheme === "dark" ? "#2C2C2E" : "#F2F2F7",
    },
    modalButtons: {
      flexDirection: "row",
      justifyContent: "space-between",
    },
    button: {
      padding: 12,
      borderRadius: 5,
      flex: 1,
      marginHorizontal: 5,
    },
    cancelButton: {
      backgroundColor: scheme === "dark" ? "#2C2C2E" : "#E5E5EA",
    },
    saveButton: {
      backgroundColor: scheme === "dark" ? "#0A84FF" : "#007AFF",
    },
    buttonText: {
      color: scheme === "dark" ? "#fff" : "#000",
      textAlign: "center",
      fontWeight: "bold",
    },
  });

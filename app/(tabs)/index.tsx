import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from "react-native";

type Goal = {
  id: string;
  text: string;
  done: boolean;
};

export default function HomeScreen() {

  const [goals, setGoals] = useState<Goal[]>([]);
  const [text, setText] = useState("");
  const [editId, setEditId] = useState<string | null>(null);

  // CREATE
  const addGoal = () => {
    if (text.trim() === "") return;

    const newGoal: Goal = {
      id: Date.now().toString(),
      text,
      done: false,
    };

    setGoals([...goals, newGoal]);
    setText("");
  };

  // MARK DONE
  const toggleDone = (id: string) => {
    setGoals(
      goals.map((goal) =>
        goal.id === id ? { ...goal, done: !goal.done } : goal
      )
    );
  };

  // DELETE
  const deleteGoal = (id: string) => {
    setGoals(goals.filter((goal) => goal.id !== id));
  };

  // START EDIT
  const startEdit = (goal: Goal) => {
    setText(goal.text);
    setEditId(goal.id);
  };

  // UPDATE
  const updateGoal = () => {
    if (text.trim() === "") return;

    setGoals(
      goals.map((goal) =>
        goal.id === editId ? { ...goal, text } : goal
      )
    );

    setText("");
    setEditId(null);
  };

  return (
    <View style={styles.container}>

      <Text style={styles.title}>🎯 Goal Manager</Text>

      <TextInput
        style={styles.input}
        placeholder="Enter goal..."
        value={text}
        onChangeText={setText}
      />

      {editId ? (
        <TouchableOpacity style={styles.updateButton} onPress={updateGoal}>
          <Text style={styles.buttonText}>UPDATE GOAL</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity style={styles.addButton} onPress={addGoal}>
          <Text style={styles.buttonText}>ADD GOAL</Text>
        </TouchableOpacity>
      )}

      <FlatList
        data={goals}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.goalCard}>

            <Text style={[styles.goalText, item.done && styles.done]}>
              {item.text}
            </Text>

            <View style={styles.buttonRow}>

              <TouchableOpacity
                style={styles.doneBtn}
                onPress={() => toggleDone(item.id)}
              >
                <Text style={styles.buttonText}>
                  {item.done ? "Undo" : "Done"}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.editBtn}
                onPress={() => startEdit(item)}
              >
                <Text style={styles.buttonText}>Edit</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.deleteBtn}
                onPress={() => deleteGoal(item.id)}
              >
                <Text style={styles.buttonText}>Delete</Text>
              </TouchableOpacity>

            </View>

          </View>
        )}
      />

    </View>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f5f6fa",
  },

  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },

  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 12,
    marginBottom: 10,
    backgroundColor: "#fff",
  },

  addButton: {
    backgroundColor: "#3498db",
    padding: 14,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 20,
  },

  updateButton: {
    backgroundColor: "#27ae60",
    padding: 14,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 20,
  },

  goalCard: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 10,
    marginBottom: 12,
    elevation: 3,
  },

  goalText: {
    fontSize: 18,
    marginBottom: 10,
  },

  done: {
    textDecorationLine: "line-through",
    color: "gray",
  },

  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  doneBtn: {
    backgroundColor: "#f39c12",
    padding: 8,
    borderRadius: 6,
    width: "30%",
    alignItems: "center",
  },

  editBtn: {
    backgroundColor: "#27ae60",
    padding: 8,
    borderRadius: 6,
    width: "30%",
    alignItems: "center",
  },

  deleteBtn: {
    backgroundColor: "#e74c3c",
    padding: 8,
    borderRadius: 6,
    width: "30%",
    alignItems: "center",
  },

  buttonText: {
    color: "white",
    fontWeight: "bold",
  },

});
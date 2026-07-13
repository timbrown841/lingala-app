import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";

const dummyLessons = [
  { id: 1, title: "Lesson 1: Basic Greetings" },
  { id: 2, title: "Lesson 2: Responding to Greetings" },
];

export default function UnitScreen() {
  const nav = useNavigation();
  const route = useRoute();
  const { unitId } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Unit {unitId}</Text>

      <FlatList
        data={dummyLessons}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.lesson}
            onPress={() => nav.navigate("Lesson", { lessonId: item.id })}
          >
            <Text style={styles.lessonText}>{item.title}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 28, fontWeight: "bold", marginBottom: 20 },
  lesson: {
    padding: 20,
    backgroundColor: "#e8e8e8",
    borderRadius: 8,
    marginBottom: 15,
  },
  lessonText: { fontSize: 18 },
});
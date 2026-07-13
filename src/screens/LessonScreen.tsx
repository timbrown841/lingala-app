import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useRoute } from "@react-navigation/native";

export default function LessonScreen() {
  const route = useRoute();
  const { lessonId } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Lesson {lessonId}</Text>

      <Text style={styles.text}>Lingala content will appear here.</Text>
      <Text style={styles.text}>Quiz will appear here.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 28, fontWeight: "bold", marginBottom: 20 },
  text: { fontSize: 18, marginBottom: 10 },
});
import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from "react-native";
import { useNavigation } from "@react-navigation/native";

const dummyUnits = [
  { id: 1, title: "Unit 1: Greetings" },
  { id: 2, title: "Unit 2: Family" },
  { id: 3, title: "Unit 3: Food" },
];

export default function HomeScreen() {
  const nav = useNavigation();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Choose a Unit</Text>

      <FlatList
        data={dummyUnits}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.unit}
            onPress={() => nav.navigate("Unit", { unitId: item.id })}
          >
            <Text style={styles.unitText}>{item.title}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 28, fontWeight: "bold", marginBottom: 20 },
  unit: {
    padding: 20,
    backgroundColor: "#f0f0f0",
    borderRadius: 8,
    marginBottom: 15,
  },
  unitText: { fontSize: 18 },
});
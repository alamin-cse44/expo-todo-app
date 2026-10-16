import { FlatList, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const todoData = [
  {
    id: 1,
    title: "Buy groceries",
    completed: false,
  },
  {
    id: 2,
    title: "Walk the dog",
    completed: false,
  },
  {
    id: 3,
    title: "Do laundry",
    completed: true,
  },
  {
    id: 4,
    title: "Clean the house",
    completed: false,
  },
];
export default function Index() {
  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={todoData}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <Text style={{ fontWeight: "bold" }}>{item.title}</Text>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

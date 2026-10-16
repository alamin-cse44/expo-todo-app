import { Ionicons } from "@expo/vector-icons";
import { FlatList, Image, StyleSheet, Text, View } from "react-native";
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
      <View style={styles.header}>
        <Ionicons name="menu" size={32} color="black" />
        <Image
          source={{ uri: "https://via.placeholder.com/60" }}
          style={{ width: 60, height: 60, borderRadius: 30 }}
        />
      </View>
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
    paddingHorizontal: 16,
    backgroundColor: "#f5f5f5",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
});

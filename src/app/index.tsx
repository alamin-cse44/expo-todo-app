import { Ionicons } from "@expo/vector-icons";
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
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
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => alert("Menu button pressed!")}>
          <Ionicons name="menu" size={24} color="black" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => alert("Add button pressed!")}>
          <Image
            source={{ uri: "https://via.placeholder.com/40" }}
            style={{ width: 40, height: 40, borderRadius: 30 }}
          />
        </TouchableOpacity>
      </View>

      {/* search bar */}
      <View style={styles.searchBar}>
        <Ionicons
          name="search"
          size={20}
          color="black"
          style={{ marginRight: 8 }}
        />
        <TextInput
          placeholder="Search todos..."
          style={styles.searchInput}
          clearButtonMode="always"
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
    marginBottom: 16,
  },
  searchBar: {
    backdropFilter: "blur(10px)",
    backgroundColor: "rgba(255, 255, 255, 0.7)",
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginBottom: 16,
    flexDirection: "row",
    alignItems: "center",
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: "black",
  }
});

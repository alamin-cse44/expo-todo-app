import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Checkbox } from "expo-checkbox";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export type TodoItemProps = {
  id: number;
  title: string;
  completed: boolean;
};

export default function TodoItems({
  item,
  setTodos,
}: {
  item: TodoItemProps;
  setTodos: React.Dispatch<React.SetStateAction<TodoItemProps[]>>;
}) {
  const deleteTodo = async (id: number) => {
    try {
      const storedTodos = await AsyncStorage.getItem("my-todos");
      if (storedTodos) {
        const todos = JSON.parse(storedTodos);
        const updatedTodos = todos.filter(
          (todo: TodoItemProps) => todo.id !== id,
        );
        await AsyncStorage.setItem("my-todos", JSON.stringify(updatedTodos));
        setTodos(updatedTodos); // Update the state after deletion
      }
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  };

  // Function to toggle the completed status of a todo item
  const handleCompletedChange = async (id: number) => {
    try {
      const storedTodos = await AsyncStorage.getItem("my-todos");
      if (storedTodos) {
        const todos = JSON.parse(storedTodos);
        const updatedTodos = todos.map((todo: TodoItemProps) => {
          if (todo.id === id) {
            alert(`Todo ${id} completed status toggled!`);
            return { ...todo, completed: !todo.completed };
          }
          return todo;
        });
        await AsyncStorage.setItem("my-todos", JSON.stringify(updatedTodos));
        setTodos(updatedTodos); // Update the state after toggling completion
      }
    } catch (error) {
      console.error("Error updating todo:", error);
    }
  };

  return (
    <View style={styles.todoContainer}>
      <View style={styles.todoItem}>
        <Checkbox
          value={item.completed}
          onValueChange={() => handleCompletedChange(item.id)}
        />
        <Text
          style={{
            fontWeight: "bold",
            textDecorationLine: item.completed ? "line-through" : "none",
          }}
        >
          {item.title}
        </Text>
      </View>
      <TouchableOpacity
        onPress={() => {
          deleteTodo(item.id);
          alert(`Todo ${item.id} deleted!`);
        }}
      >
        <Ionicons name="trash" size={24} color="red" />
      </TouchableOpacity>
    </View>
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
    // backgroundColor: "red",
  },
  todoContainer: {
    backgroundColor: "white",
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    shadowColor: "#000",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  todoItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  footer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 10,
    backgroundColor: "white",
    borderTopWidth: 1,
    borderTopColor: "#ccc",
    marginBottom: 10,
  },
  addButton: {
    backgroundColor: "lightgray",
    borderRadius: 8,
    padding: 8,
  },
});
function setTodos(updatedTodos: any) {
  throw new Error("Function not implemented.");
}

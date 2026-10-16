import TodoItems, { TodoItemProps } from "@/components/TodoItems";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import {
  FlatList,
  Image,
  Keyboard,
  KeyboardAvoidingView,
  StyleSheet,
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
  const [todos, setTodos] = useState<TodoItemProps[]>([]);
  const [todoText, setTodoText] = useState<string>("");
  // implement the search query state
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [oldTodos, setOldTodos] = useState<TodoItemProps []>([]);

  useEffect(() => {
    const getTodos = async () => {
      try {
        const storedTodos = await AsyncStorage.getItem("my-todos");
        if (storedTodos) {
          setTodos(JSON.parse(storedTodos));
          setOldTodos(JSON.parse(storedTodos));
        } else {
          setTodos(todoData);
        }
      } catch (error) {
        console.error("Error retrieving todos:", error);
      }
    };

    getTodos();
  }, []);

  const addTodo = async () => {
    try {
      if (todoText.trim() === "") return;
      const newTodo: TodoItemProps = {
        id: Math.random(),
        title: todoText,
        completed: false,
      };
      // setTodos([...todos, newTodo]);
      todos.push(newTodo);
      setTodos(todos);
      await AsyncStorage.setItem("my-todos", JSON.stringify(todos));
      // await AsyncStorage.setItem('my-todos', JSON.stringify([...todos, newTodo]));
      setTodoText("");
      Keyboard.dismiss();
    } catch (error) {
      console.error("Error adding todo:", error);
    }
  };

  const onSearch = (query: string) => {
    if (query == "") {
      setTodos(oldTodos);
    } else {
      const filteredTodos = todos.filter((todo) =>
        todo.title.toLowerCase().includes(query.toLowerCase())
      );
      setTodos(filteredTodos);
    }
  };

  useEffect(() => {
    onSearch(searchQuery);
  }, [searchQuery]);

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
          value={searchQuery}
          onChangeText={(text) => setSearchQuery(text)}
          style={styles.searchInput}
          clearButtonMode="always"
        />
      </View>

      <FlatList
        data={todos.reverse()}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <TodoItems item={item} setTodos={setTodos} />}
      />

      {/* footer -> add new Item */}
      <KeyboardAvoidingView
        style={styles.footer}
        behavior="padding"
        keyboardVerticalOffset={20}
      >
        <TextInput
          placeholder="Add a new todo..."
          value={todoText}
          onChangeText={(text) => setTodoText(text)}
          style={styles.searchInput}
          autoCorrect={false}
        />
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => {
            addTodo();
          }}
        >
          <Ionicons name="add" size={24} color="black" />
        </TouchableOpacity>
      </KeyboardAvoidingView>
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

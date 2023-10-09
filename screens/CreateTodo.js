import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";

import { TodoDao } from "../data";

const CreateTodoRemark = ({ navigation, route }) => {
  const [todo] = useState(route.params.todo);
  const [type] = useState(route.params.type);
  const [title, setTitle] = useState(todo?.title ?? "");
  const [body, setBody] = useState(todo?.body ?? "");

  useEffect(() => {
    navigation.setOptions({
      title: type == "create" ? "Create Todo" : "Update Todo",
    });
  });

  const onPressCreateTodo = async () => {
    if (title == "" || body == "") {
      alert("Please fill required fields.");
      return;
    }

    if (type == "create") {
      await TodoDao.createTodo({ title, body });
      navigation.goBack();
      return;
    }

    await todo.updateTodo({ title, body });
    navigation.goBack();
  };
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={title}
        onChangeText={(text) => setTitle(text)}
        placeholder="Title"
        placeholderTextColor="grey"
        // autoFocus={true}
      />
      <TextInput
        style={styles.input}
        value={body}
        onChangeText={(text) => setBody(text)}
        placeholder="Body (Optional)"
        placeholderTextColor="grey"
        multiline={true}
        scrollEnabled={true}
      />
      <TouchableOpacity
        delayPressIn={0}
        style={styles.button}
        onPress={onPressCreateTodo}
      >
        <Text style={styles.buttonLabel}>
          {type == "create" ? "Create Todo" : "Update Todo"}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "white",
  },
  button: {
    borderColor: "black",
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 6,
    borderWidth: 1,
    alignItems: "center",
  },
  buttonLabel: {
    fontSize: 16,
    color: "black",
  },
  input: {
    marginBottom: 16,
    fontSize: 16,
    color: "black",
    paddingLeft: 8,
    paddingRight: 8,
    paddingTop: 10,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: "gray",
    borderRadius: 6,
  },
});

export default CreateTodoRemark;

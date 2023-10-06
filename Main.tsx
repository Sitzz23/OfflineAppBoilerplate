import {
  StyleSheet,
  View,
  Dimensions,
  ScrollView,
  Button,
  Text,
  SafeAreaView,
  StatusBar,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { useWatermelonDB } from "./useWatermelonDB";
import database from "./data/db";

export default function App() {
  const todos = useWatermelonDB("todos");

  const addTodo = async () => {
    const newTodo = await database.write(async () => {
      return await database.collections
        .get("todos")
        .create(
          (todo: { title: string; completed: boolean; created_at: number }) => {
            todo.title = "todo 1";
            todo.completed = false;
            todo.created_at = new Date().getTime();
          }
        );
    });
    console.log("New Todo: ", newTodo);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      <Button title="Add todo" onPress={() => addTodo()} />

      <View>
        {todos.map((todo) => (
          <View>
            <Text>{todo.title}</Text>
          </View>
        ))}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

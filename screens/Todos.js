import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Keyboard,
  TextInput,
  Image,
  Platform,
} from "react-native";
import withObservables from "@nozbe/with-observables";
import {
  SafeAreaView,
  SafeAreaInsetsContext,
} from "react-native-safe-area-context";
import { TodoDao } from "../data";
import ItemTodo from "../components/ItemTodo";
import { Ionicons } from "@expo/vector-icons";
import { SyncTodo } from "../SyncTodo";
import { database } from "../data";

const Todos = ({ navigation, todos }) => {
  // const Todos = () => {
  const [remark, setRemark] = useState("");
  const [isAddRemark, setAddRemark] = useState(false);
  const [keyboardOffset, setKeyboardOffset] = useState(0);
  const [selectedTodo, setSelectedTodo] = useState(null);

  useEffect(() => {
    Keyboard.addListener("keyboardDidShow", _keyboardDidShow);
    Keyboard.addListener("keyboardDidHide", _keyboardDidHide);

    // Cleanup function
    return () => {
      Keyboard.removeAllListeners("keyboardDidShow", _keyboardDidShow);
      Keyboard.removeAllListeners("keyboardDidHide", _keyboardDidHide);
    };
  }, []);

  //methods
  const _keyboardDidShow = (e) => {
    setKeyboardOffset(e.endCoordinates.height);
  };

  const _keyboardDidHide = (e) => {
    setAddRemark(false);
    setKeyboardOffset(0);
  };

  const onPressAdd = () => {
    navigation.navigate("Create", { type: "create" });
  };

  const onPressTodo = (todo) => {
    navigation.navigate("Create", { todo });
  };

  const onPressNewRemark = (todo) => {
    setAddRemark(!isAddRemark);
    setSelectedTodo(todo);
  };

  const onPressAddRemark = async () => {
    await selectedTodo.addRemark(remark);
    setAddRemark(false);
    setKeyboardOffset(0);
    setRemark("");
  };

  const _renderItem = ({ item, index }) => {
    return (
      <ItemTodo
        todo={item}
        onPress={() => onPressTodo(item)}
        onPressNewRemark={() => onPressNewRemark(item)}
      />
    );
  };

  const _emptyComponent = () => {
    return (
      <View style={styles.emptyWrapper}>
        <Text style={{ color: "black" }}>No todos available!</Text>
      </View>
    );
  };

  const renderAddRemarkUI = (insetBottom) => {
    return (
      <View
        style={[
          styles.addCommentWrapper,
          {
            marginBottom: isAddRemark
              ? Platform.OS == "ios"
                ? keyboardOffset
                : 0
              : insetBottom,
          },
        ]}
      >
        <TextInput
          style={styles.input}
          value={remark}
          onChangeText={(text) => setRemark(text)}
          placeholder="Add remarks"
          placeholderTextColor="grey"
          autoFocus={true}
          returnKeyLabel="Add"
          returnKeyType="done"
          onSubmitEditing={onPressAddRemark}
        />
        <TouchableOpacity
          onPress={onPressAddRemark}
          activeOpacity={0.5}
          delayPressIn={0}
        >
          <Ionicons name="add-circle-outline" size={16} color="black" />
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <SafeAreaInsetsContext.Consumer>
      {(insets) => (
        <SafeAreaView style={styles.container} edges={["bottom"]}>
          <View style={styles.header}>
            <Text style={styles.headerTitle}>Todos</Text>
            <TouchableOpacity
              delayPressIn={0}
              onPress={onPressAdd}
              activeOpacity={0.5}
              style={styles.addButton}
            >
              <Text style={styles.addButtonLabel}>+ Add</Text>
            </TouchableOpacity>
            <TouchableOpacity
              delayPressIn={0}
              onPress={() => SyncTodo(database)}
              activeOpacity={0.5}
              style={styles.addButton}
            >
              <Text style={styles.addButtonLabel}>Sync</Text>
            </TouchableOpacity>
          </View>
          <FlatList
            data={todos}
            keyExtractor={(_, index) => index.toString()}
            renderItem={_renderItem}
            contentContainerStyle={{
              paddingTop: 12,
              paddingBottom: 12,
            }}
            ListEmptyComponent={_emptyComponent}
            initialNumToRender={3}
          />
          {isAddRemark && renderAddRemarkUI(insets.bottom)}
        </SafeAreaView>
      )}
    </SafeAreaInsetsContext.Consumer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  header: {
    alignItems: "center",
    flexDirection: "row",
    gap: 4,
    padding: 16,
  },
  addButton: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 50,
    backgroundColor: "black",
  },
  addButtonLabel: {
    fontSize: 14,
    color: "white",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
    flex: 1,
    color: "black",
  },
  emptyWrapper: {
    justifyContent: "center",
    alignItems: "center",
    color: "black",
    padding: 22,
  },
  addCommentWrapper: {
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    position: "absolute",
    bottom: 0,
    borderBottomWidth: 1,
    borderBottomColor: "gray",
    backgroundColor: "white",
    elevation: 5,
  },
  input: {
    fontSize: 16,
    color: "black",
    paddingRight: 8,
    paddingLeft: 8,
    paddingTop: 0,
    paddingBottom: 0,
    flex: 1,
  },
  addCommentIcon: {
    width: 22,
    height: 22,
    tintColor: "black",
  },
});

const enhance = withObservables([], () => ({
  todos: TodoDao.observeTodos(),
}));

export default enhance(Todos);
//export default Todos;

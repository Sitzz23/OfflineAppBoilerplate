import React, { useState } from "react";
import { Text, TouchableOpacity, Image, StyleSheet, View } from "react-native";
import withObservables from "@nozbe/with-observables";
import moment from "moment";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Octicons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";

const ItemTodo = ({ todo, remarks, onPress, onPressNewRemark }) => {
  const [expanded, setExpanded] = useState(false);

  const onPressDelete = async () => {
    await todo.deleteTodo();
  };
  return (
    <TouchableOpacity
      style={styles.wrapper}
      delayPressIn={0}
      onPress={onPress}
      activeOpacity={0.5}
    >
      <View style={styles.contentWrapper}>
        <Text style={styles.title} numberOfLines={1}>
          {todo.title}
        </Text>
        <Text style={styles.body}>{todo.body}</Text>
        <Text style={styles.date}>
          {moment(todo.createdAt).format("ddd, Do MMM YY")}
        </Text>
      </View>
      <View style={styles.divider} />
      <TouchableOpacity
        activeOpacity={0.5}
        delayPressIn={0}
        onPress={() => setExpanded(!expanded)}
        style={styles.footerWrapper}
      >
        <View style={styles.commentCountWrapper}>
          <Octicons name="pencil" size={16} color="black" />
        </View>
        <TouchableOpacity
          hitSlop={{ top: 10, right: 10, bottom: 10, left: 10 }}
          onPress={onPressNewRemark}
        >
          <Ionicons name="add-circle-outline" size={16} color="black" />
        </TouchableOpacity>
      </TouchableOpacity>

      {expanded && remarks.map((r) => <ItemRemarkLive key={r.id} remark={r} />)}
      <TouchableOpacity
        style={styles.deleteButton}
        onPress={onPressDelete}
        hitSlop={{ top: 10, right: 10, bottom: 10, left: 10 }}
      >
        <MaterialCommunityIcons name="delete-outline" size={16} color="black" />
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

const ItemRemark = ({ remark }) => {
  const onPressDeleteRemark = async () => {
    await remark.deleteRemark();
  };

  return (
    <View
      style={{
        paddingHorizontal: 18,
        paddingBottom: 12,
      }}
    >
      <Text style={styles.commentBody}>{remark.body}</Text>
      <TouchableOpacity
        style={[styles.deleteButton, { right: 12 }]}
        onPress={onPressDeleteRemark}
        hitSlop={{ top: 10, right: 10, bottom: 10, left: 10 }}
      >
        <MaterialCommunityIcons name="delete-outline" size={16} color="black" />
      </TouchableOpacity>
    </View>
  );
};

//stylesheets
const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: "white",
    elevation: 5,
    marginHorizontal: 16,
    marginBottom: 12,
    borderRadius: 6,
    // borderLeftWidth: 3,
    // borderLeftColor: "#6200EA",
  },
  contentWrapper: {
    padding: 12,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "black",
  },
  body: {
    fontSize: 14,
    color: "black",
    lineHeight: 18,
  },
  deleteButton: {
    position: "absolute",
    top: 10,
    right: 10,
  },
  deleteIcon: {
    width: 14,
    height: 14,
  },
  divider: {
    width: "100%",
    height: 1,
    backgroundColor: "rgba(0,0,0,0.1)",
  },
  footerWrapper: {
    padding: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  commentCountWrapper: {
    flexDirection: "row",
    alignItems: "center",
  },
  commentCountLabel: {
    fontSize: 14,
    color: "black",
    marginLeft: 8,
  },
  commentCountIcon: {
    width: 14,
    height: 14,
    tintColor: "black",
  },
  addCommentIcon: {
    width: 18,
    height: 18,
    tintColor: "black",
  },
  date: {
    fontSize: 12,
    color: "black",
    marginTop: 8,
    alignSelf: "flex-end",
  },
  commentTitleWrapper: {
    flexDirection: "row",
  },
  commentUser: {
    fontSize: 16,
    fontWeight: "bold",
    color: "black",
  },
  commentDate: {
    fontSize: 16,
    color: "black",
    marginLeft: 8,
  },
  commentBody: {
    fontSize: 14,
    color: "black",
  },
});

// observables
const ItemRemarkLive = withObservables(["remark"], ({ remark }) => ({
  remark: remark.observe(),
}))(ItemRemark);

const ItemTodoLive = withObservables(["task"], ({ todo }) => ({
  todo: todo.observe(),
  remarks: todo.remarks.observe(),
}))(ItemTodo);

export default ItemTodoLive;

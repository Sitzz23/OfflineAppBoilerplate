import { StyleSheet } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import Main from "./Main";
import database from "./data/db";
import DatabaseProvider from "@nozbe/watermelondb/DatabaseProvider";

export default function App() {
  return (
    <DatabaseProvider database={database}>
      <Main />
    </DatabaseProvider>
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

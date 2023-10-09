import { StyleSheet } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import Main from "./Main";
import { database } from "./data";
import DatabaseProvider from "@nozbe/watermelondb/DatabaseProvider";
import "react-native-gesture-handler";

export default function App() {
  return (
    <DatabaseProvider database={database}>
      <Main />
    </DatabaseProvider>
  );
}

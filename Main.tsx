import React, { Fragment } from "react";
import { StatusBar } from "react-native";
import Routes from "./Routes";
import { NavigationContainer } from "@react-navigation/native";

export default function Main() {
  return (
    <Fragment>
      <StatusBar barStyle="light-content" backgroundColor={"#161616"} />
      <NavigationContainer>
        <Routes />
      </NavigationContainer>
    </Fragment>
  );
}

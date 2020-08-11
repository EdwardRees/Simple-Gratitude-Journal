import { AntDesign, FontAwesome5 } from "@expo/vector-icons";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import * as SQLite from "expo-sqlite";
import * as React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { AppearanceProvider, useColorScheme } from "react-native-appearance";

import {
  Add,
  Edit,
  Home,
  Settings,
  ViewItem,
  SetAffirmations,
  ViewAffirmations,
} from "./views";

const { useEffect, useState, useRef } = React;

const db = SQLite.openDatabase("db.db");

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

// Notifications.setNotificationHandler({
//   handleNotification: async () => ({
//     shouldShowAlert: true,
//     shouldPlaySound: false,
//     shouldSetBadge: false,
//   }),
// });
export default function App(props: any) {
  return (
    <AppearanceProvider>
      <AppView props={props} />
    </AppearanceProvider>
  );
}

function AffirmationStack(props: any) {
  const colorScheme = useColorScheme();

  const { button } = styles;
  const header =
    colorScheme === "light" ? styles.light_header : styles.dark_header;
  const header_title =
    colorScheme === "light"
      ? styles.light_header_title
      : styles.dark_header_title;

  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen
        name="ViewAffirmations"
        component={ViewAffirmations}
        options={({ navigation }) => {
          return {
            headerStyle: header,
            headerTitleStyle: header_title,
            headerTitle: "Affirmations",
            headerTitleAlign: "center",
            headerMode: "screen",
            headerLeft: () => (
              <TouchableOpacity
                onPress={() => navigation.navigate("Settings")}
                style={button}
              >
                <FontAwesome5
                  name="cog"
                  size={30}
                  color={colorScheme === "light" ? "#3C6074" : "#f8f8f8"}
                />
              </TouchableOpacity>
            ),
            headerRight: () => (
              <TouchableOpacity
                onPress={() => navigation.navigate("SetAffirmations")}
                style={button}
              >
                <FontAwesome5
                  name="edit"
                  size={30}
                  color={colorScheme === "light" ? "#3C6074" : "#f8f8f8"}
                />
              </TouchableOpacity>
            ),

          };
        }}
      />
      <Stack.Screen
        name="SetAffirmations"
        component={SetAffirmations}
        options={({ navigation }) => {
          return {
            headerTitle: "Set Affirmations",
            headerTitleAlign: "center",
            headerStyle: header,
            headerTitleStyle: header_title,
            headerLeft: () => (
              <TouchableOpacity onPress={() => navigation.pop()} style={button}>
                <AntDesign
                  name="left"
                  size={30}
                  color={colorScheme === "light" ? "#000" : "#f8f8f8"}
                />
              </TouchableOpacity>
            ),
          };
        }}
      />

      <Stack.Screen
        name="Settings"
        component={Settings}
        options={({ navigation }) => {
          return {
            headerTitleAlign: "center",
            headerStyle: header,
            headerTitleStyle: header_title,
            headerLeft: () => (
              <TouchableOpacity onPress={() => navigation.pop()} style={button}>
                <AntDesign
                  name="left"
                  size={30}
                  color={colorScheme === "light" ? "#000" : "#f8f8f8"}
                />
              </TouchableOpacity>
            ),
          };
        }}
      />
    </Stack.Navigator>
  );
}

function JournalStack(props: any) {
  const colorScheme = useColorScheme();

  const { button } = styles;
  const header =
    colorScheme === "light" ? styles.light_header : styles.dark_header;
  const header_title =
    colorScheme === "light"
      ? styles.light_header_title
      : styles.dark_header_title;

  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen
        name="Home"
        component={Home}
        options={({ navigation }) => {
          return {
            headerStyle: header,
            headerTitleStyle: header_title,
            headerTitle: "3-5 Grateful Things",
            headerTitleAlign: "center",
            headerMode: "screen",
            headerLeft: () => (
              <TouchableOpacity
                onPress={() => navigation.navigate("Settings")}
                style={button}
              >
                <FontAwesome5
                  name="cog"
                  size={30}
                  color={colorScheme === "light" ? "#3C6074" : "#f8f8f8"}
                />
              </TouchableOpacity>
            ),
            headerRight: () => (
              <TouchableOpacity
                onPress={() => navigation.navigate("New")}
                style={button}
              >
                <AntDesign
                  name="plus"
                  size={30}
                  color={colorScheme === "light" ? "#3C6074" : "#f8f8f8"}
                />
              </TouchableOpacity>
            ),
          };
        }}
      />
      <Stack.Screen
        name="New"
        component={Add}
        options={({ navigation }) => {
          return {
            headerTitleAlign: "center",
            headerStyle: header,
            headerTitleStyle: header_title,
            headerLeft: () => (
              <TouchableOpacity onPress={() => navigation.pop()} style={button}>
                <AntDesign
                  name="left"
                  size={30}
                  color={colorScheme === "light" ? "#000" : "#f8f8f8"}
                />
              </TouchableOpacity>
            ),
          };
        }}
      />
      <Stack.Screen
        name="Edit"
        component={Edit}
        options={({ navigation }) => {
          return {
            headerTitleAlign: "center",

            headerStyle: header,
            headerTitleStyle: header_title,
            headerLeft: () => (
              <TouchableOpacity onPress={() => navigation.pop()} style={button}>
                <AntDesign
                  name="left"
                  size={30}
                  color={colorScheme === "light" ? "#000" : "#f8f8f8"}
                />
              </TouchableOpacity>
            ),
          };
        }}
      />
      <Stack.Screen
        name="View"
        component={ViewItem}
        options={({ navigation }) => {
          return {
            headerTitleAlign: "center",

            headerStyle: header,
            headerTitleStyle: header_title,
            headerLeft: () => (
              <TouchableOpacity onPress={() => navigation.pop()} style={button}>
                <AntDesign
                  name="left"
                  size={30}
                  color={colorScheme === "light" ? "#000" : "#f8f8f8"}
                />
              </TouchableOpacity>
            ),
          };
        }}
      />
      <Stack.Screen
        name="Settings"
        component={Settings}
        options={({ navigation }) => {
          return {
            headerTitleAlign: "center",
            headerStyle: header,
            headerTitleStyle: header_title,
            headerLeft: () => (
              <TouchableOpacity onPress={() => navigation.pop()} style={button}>
                <AntDesign
                  name="left"
                  size={30}
                  color={colorScheme === "light" ? "#000" : "#f8f8f8"}
                />
              </TouchableOpacity>
            ),
          };
        }}
      />
    </Stack.Navigator>
  );
}

function AppView(props: any) {
  const colorScheme = useColorScheme();
  useEffect(() => {
    db.transaction((tx) => {
      tx.executeSql(
        "create table if not exists journal (id integer primary key not null, postdate text, first text, firstDesc text, second text, secondDesc text, third text, thirdDesc text, fourth text, fourthDesc text, fifth text, fifthDesc fifth);"
      );
      tx.executeSql(
        "create table if not exists affirmations (id integer primary key not null, loveMost text, sadManage text, first text, second text, third text, betterSkill text, pleasantlySurprised text, lookingAhead text, appreciated text, selfThank text, downReminder text);"
      );
    });
  }, []);

  const { button } = styles;
  const header =
    colorScheme === "light" ? styles.light_header : styles.dark_header;
  const header_title =
    colorScheme === "light"
      ? styles.light_header_title
      : styles.dark_header_title;

  const bottom_tab =
    colorScheme === "light" ? styles.light_bottom_tab : styles.dark_bottom_tab;

  return (
    <NavigationContainer>
      <Tab.Navigator
        tabBarOptions={{
          tabStyle: bottom_tab,
          activeTintColor: colorScheme === "light" ? "#3C6074" : "#f8f8f8",
          keyboardHidesTabBar: true
        }}
      >
        <Tab.Screen
          name="Journal"
          component={JournalStack}
          options={{
            tabBarIcon: ({color, size}) => (
              <FontAwesome5
                name="book"
                size={size}
                color={color}
              />
            ),
          }}
        />
        <Tab.Screen name="Affirmations" component={AffirmationStack} options={{
          tabBarIcon: ({color, size}) => (
            <FontAwesome5
              name="heart"
              size={size}
              color={color}
            />
          ),
        }}/>
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  button: {
    padding: 10,
  },
  light_header: {
    backgroundColor: "#f8f8f8",
  },
  dark_header: {
    backgroundColor: "#000",
  },
  dark_header_title: {
    color: "#f8f8f8",
  },
  light_header_title: {
    color: "#000",
  },
  light_bottom_tab: {
    backgroundColor: "#f8f8f8",
  },
  dark_bottom_tab: {
    backgroundColor: "#000",
  },
 
});

import { AntDesign, FontAwesome5 } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  getFocusedRouteNameFromRoute,
  NavigationContainer,
} from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import * as SQLite from "expo-sqlite";
import * as React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { AppearanceProvider, useColorScheme } from "react-native-appearance";

import {
  Add,
  Edit,
  EditAffirmations,
  Home,
  ListAffirmations,
  AddAffirmations,
  Settings,
  ViewAffirmations,
  ViewItem,
} from "./views";

const { useEffect, useLayoutEffect } = React;

const db = SQLite.openDatabase("db.db");

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function getHeaderLeft(navigation: any, colorScheme: any) {
  const { button } = styles;
  return () => (
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
  );
}

function getHeaderRight(route: any, navigation: any, colorScheme: any) {
  const { button } = styles;
  const routeName = getFocusedRouteNameFromRoute(route) ?? "Home";
  switch (routeName) {
    case "Home":
      return () => (
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
      );
    case "ListAffirmations":
      return () => (
        <TouchableOpacity
          onPress={() => navigation.navigate("NewAffirmation")}
          style={button}
        >
          <AntDesign
            name="plus"
            size={30}
            color={colorScheme === "light" ? "#000" : "#f8f8f8"}
          />
        </TouchableOpacity>
      );
  }
}

function getHeaderTitle(route: any) {
  const routeName = getFocusedRouteNameFromRoute(route) ?? "Home";

  switch (routeName) {
    case "Home":
      return "Journal Entries";
    case "ListAffirmations":
      return "Affirmations";
  }
}
export default function App(props: any) {
  return (
    <AppearanceProvider>
      <AppView props={props} />
    </AppearanceProvider>
  );
}

function Tabs(props: any) {
  const colorScheme = useColorScheme();

  const { navigation, route } = props;

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: getHeaderTitle(route),
      headerLeft: getHeaderLeft(navigation, colorScheme),
      headerRight: getHeaderRight(route, navigation, colorScheme),
    });
  }, [navigation, route]);

  const bottom_tab =
    colorScheme === "light" ? styles.light_bottom_tab : styles.dark_bottom_tab;

  return (
    <Tab.Navigator
      tabBarOptions={{
        tabStyle: bottom_tab,
        activeTintColor: colorScheme === "light" ? "#3C6074" : "#f8f8f8",
        keyboardHidesTabBar: true,
      }}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({ color, size }) => (
            <FontAwesome5 name="book" size={size} color={color} />
          ),
          tabBarLabel: "Journal",
        }}
      />
      <Tab.Screen
        name="ListAffirmations"
        component={ListAffirmations}
        options={{
          tabBarIcon: ({ color, size }) => (
            <FontAwesome5 name="heart" size={size} color={color} />
          ),
          tabBarLabel: "Affirmations",
        }}
      />
    </Tab.Navigator>
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
        "create table if not exists affirmations (id integer primary key not null, postdate text, loveMost text, sadManage text, first text, second text, third text, betterSkill text, pleasantlySurprised text, lookingAhead text, appreciated text, selfThank text, downReminder text);"
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
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Tabs"
          component={Tabs}
          options={({ navigation }) => {
            return {
              headerTitleAlign: "center",
              headerStyle: header,
              headerTitleStyle: header_title,
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
                <TouchableOpacity
                  onPress={() => navigation.pop()}
                  style={button}
                >
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
                <TouchableOpacity
                  onPress={() => navigation.pop()}
                  style={button}
                >
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
                <TouchableOpacity
                  onPress={() => navigation.pop()}
                  style={button}
                >
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
          name="NewAffirmation"
          component={AddAffirmations}
          options={({ navigation }) => {
            return {
              headerTitle: "New Affirmations",
              headerTitleAlign: "center",
              headerStyle: header,
              headerTitleStyle: header_title,
              headerLeft: () => (
                <TouchableOpacity
                  onPress={() => navigation.pop()}
                  style={button}
                >
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
          name="EditAffirmation"
          component={EditAffirmations}
          options={({ navigation }) => {
            return {
              headerTitle: "Edit Affirmations",
              headerTitleAlign: "center",
              headerStyle: header,
              headerTitleStyle: header_title,
              headerLeft: () => (
                <TouchableOpacity
                  onPress={() => navigation.pop()}
                  style={button}
                >
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
          name="ViewAffirmation"
          component={ViewAffirmations}
          options={({ navigation }) => {
            return {
              headerTitle: "View Affirmation",
              headerTitleAlign: "center",
              headerStyle: header,
              headerTitleStyle: header_title,
              headerLeft: () => (
                <TouchableOpacity
                  onPress={() => navigation.pop()}
                  style={button}
                >
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
                <TouchableOpacity
                  onPress={() => navigation.pop()}
                  style={button}
                >
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

import * as SQLite from "expo-sqlite";
import * as React from "react";
import {
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
} from "react-native";
import { useColorScheme } from "react-native-appearance";

const { useState, useEffect } = React;

const db = SQLite.openDatabase("db.db");

const Home = (props: any) => {
  const colorScheme = useColorScheme();
  const [entries, setEntries] = useState([]);
  const [welcome, showWelcome] = useState(false);

  const container =
    colorScheme === "light" ? styles.light_container : styles.dark_container;
  const text = colorScheme === "light" ? styles.light_text : styles.dark_text;
  const button =
    colorScheme === "light" ? styles.light_button : styles.dark_button;
  const button_text =
    colorScheme === "light"
      ? styles.light_button_text
      : styles.dark_button_text;
  const modal_container =
    colorScheme === "light"
      ? styles.light_modal_container
      : styles.dark_modal_container;
  const modal_text =
    colorScheme === "light" ? styles.light_modal_text : styles.dark_modal_text;
  const modal_heading =
    colorScheme === "light"
      ? styles.light_modal_heading
      : styles.dark_modal_heading;
  const modal_button =
    colorScheme === "light"
      ? styles.light_modal_button
      : styles.dark_modal_button;
  const modal_button_label =
    colorScheme === "light"
      ? styles.light_modal_button_label
      : styles.dark_modal_button_label;

  const { navigation } = props;

  useEffect(() => {
    const interval = setInterval(() => {
      db.transaction((tx) => {
        tx.executeSql("select * from journal", [], (_, res) => {
          let rows: any = res.rows;
          setEntries(rows["_array"]);
        });
      });
    }, 1000);
    return () => clearInterval(interval);
  });

  const renderData = () => {
    if (entries.length === 0) {
      // const [styles] = useTheme(themedStyles);
      return (
        <View style={container}>
          <Text style={text}>No Journal Entries Made Yet</Text>
          <View style={{ padding: 5 }} />
          <TouchableOpacity onPress={() => showWelcome(true)} style={button}>
            <Text style={button_text}>Help</Text>
          </TouchableOpacity>
          <View style={{ padding: 5 }} />
          <TouchableOpacity
            onPress={() => navigation.navigate("New")}
            style={button}
          >
            <Text style={button_text}>Add New Journal Entry</Text>
          </TouchableOpacity>
          <Modal
            animationType="slide"
            transparent={true}
            visible={welcome}
            onRequestClose={() => {
              showWelcome(false);
            }}
          >
            <View style={modal_container}>
              <Text style={modal_heading}>Welcome!</Text>
              <Text style={modal_text}>
                This is a simple Gratitude Journal App. This application was
                built with the intention to help rewire one's brain to be more
                mindful and grateful of the world around them.
              </Text>
              <Text style={modal_text}>
                The app will require you to input at least 3 aspects of your
                life that you are grateful for. The app will not input the item
                to the database unless 3 values are input. For each value or
                aspect, the app allows you to input some optional information to
                go along side it, should you feel the need to.
              </Text>
              <Text style={modal_text}>
                For those who are more concerned about data and information
                privacy, all data is stored locally on the app and never leaves
                the application itself. Asides from what one is grateful for,
                the only other data that is stored is the date of when the
                information was added.
              </Text>
              <Text style={modal_text}>
                Feel free to close me once you are done with the close button
                below!
              </Text>

              <View style={{ padding: 5 }} />
              <TouchableOpacity
                onPress={() => showWelcome(false)}
                style={modal_button}
              >
                <Text style={modal_button_label}>Close</Text>
              </TouchableOpacity>
            </View>
          </Modal>
        </View>
      );
    } else {
      return (
        <ScrollView
          style={{
            flex: 1,
            backgroundColor: colorScheme === "light" ? "#f8f8f8" : "#000",
          }}
        >
          {entries.map((entry) => {
            const { id, postdate } = entry;
            return (
              <View
                key={id}
                style={{
                  flexDirection: "row",
                  justifyContent: "space-around",
                  alignItems: "center",
                  padding: 10,
                }}
              >
                <Text style={text}>{postdate}</Text>
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate("View", { data: entry, id })
                  }
                >
                  <Text style={text}>View</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => navigation.navigate("Edit", { data: entry })}
                >
                  <Text style={text}>Edit</Text>
                </TouchableOpacity>
              </View>
            );
          })}
        </ScrollView>
      );
    }
  };

  return renderData();
};

const styles = StyleSheet.create({
  light_container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f8f8f8",
    color: "#000",
  },
  dark_container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#000",
    color: "#f8f8f8",
  },
  light_button: {
    padding: 10,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#3C6074",
  },
  dark_button: {
    padding: 10,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#62C3E8",
  },
  light_button_text: {
    textAlign: "center",
    fontSize: 16,
    color: "#3C6074",
  },
  dark_button_text: {
    textAlign: "center",
    fontSize: 16,
    color: "#62C3E8",
  },
  dark_text: {
    fontSize: 18,
    color: "#f8f8f8",
  },
  light_text: {
    fontSize: 18,
    color: "#000",
  },
  light_modal_container: {
    flex: 1,
    backgroundColor: "#f8f8f8",
    alignItems: "center",
    padding: 20,
  },
  dark_modal_container: {
    flex: 1,
    backgroundColor: "#000",
    alignItems: "center",
    padding: 20,
  },
  light_modal_heading: {
    fontSize: 18,
    textAlign: "center",
    paddingVertical: 5,
  },
  dark_modal_heading: {
    fontSize: 18,
    textAlign: "center",
    paddingVertical: 5,
    color: "#f8f8f8",
  },
  light_modal_text: {
    fontSize: 16,
    textAlign: "center",
    paddingVertical: 5,
    lineHeight: 25,
  },
  dark_modal_text: {
    fontSize: 16,
    textAlign: "center",
    paddingVertical: 5,
    lineHeight: 25,
    color: "#f8f8f8",
  },
  light_modal_button: {
    borderWidth: 2,
    borderRadius: 10,
    borderColor: "#3c6074",
    padding: 10,
  },
  light_modal_button_label: {
    fontSize: 16,
    textAlign: "center",
    color: "#3C6074",
  },
  dark_modal_button: {
    borderWidth: 2,
    borderRadius: 10,
    borderColor: "#62C3E8",
    padding: 10,
  },
  dark_modal_button_label: {
    fontSize: 16,
    textAlign: "center",
    color: "#62C3E8",
  },
});

export { Home };

import * as SQLite from "expo-sqlite";
import * as React from "react";
import { Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";

const { useState, useEffect } = React;

const db = SQLite.openDatabase("db.db");

const Home = (props: any) => {
  const [entries, setEntries] = useState([]);
  const [welcome, showWelcome] = useState(false);

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

  const {
    container,
    button,
    button_text,
    modal_container,
    modal_text,
    modal_heading,
    modal_button,
    modal_button_label,
  } = styles;
  const renderData = () => {
    if (entries.length === 0) {
      return (
        <View style={container}>
          <Text>No Data to Show</Text>
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
        <View style={{ flex: 1, backgroundColor: "#fff" }}>
          {entries.map((entry) => {
            const {
              id,
              postdate,
              first,
              firstDesc,
              second,
              secondDesc,
              third,
              thirdDesc,
              fourth,
              fourthDesc,
              fifth,
              fifthDesc,
            } = entry;
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
                <Text style={styles.text}>{postdate}</Text>
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate("View", { data: entry, id })
                  }
                >
                  <Text style={styles.text}>View</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => navigation.navigate("Edit", { data: entry })}
                >
                  <Text style={styles.text}>Edit</Text>
                </TouchableOpacity>
              </View>
            );
          })}
        </View>
      );
    }
  };

  return renderData();
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  button: {
    padding: 10,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#3C6074",
  },
  button_text: {
    textAlign: "center",
    fontSize: 16,
    color: "#3C6074",
  },
  text: {
    fontSize: 18,
  },
  modal_container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    padding: 20,
  },
  modal_heading: {
    fontSize: 18,
    textAlign: "center",
    paddingVertical: 5,
  },
  modal_text: {
    fontSize: 16,
    textAlign: "center",
    paddingVertical: 5,
    lineHeight: 25,
  },
  modal_button: {
    borderWidth: 2,
    borderRadius: 10,
    borderColor: "#3c6074",
    padding: 10,
  },
  modal_button_label: {
    fontSize: 16,
    textAlign: "center",
    color: "#3C6074",
  },
});

export { Home };

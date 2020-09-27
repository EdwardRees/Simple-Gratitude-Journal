import React, { useEffect, useState } from "react";
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
} from "react-native";
import * as SQLite from "expo-sqlite";
import { useColorScheme } from "react-native-appearance";

const db = SQLite.openDatabase("db.db");

const ListAffirmations = (props: any) => {
  useEffect(() => {
    const interval = setInterval(() => {
      db.transaction((tx) => {
        tx.executeSql("select * from affirmations", [], (_, res) => {
          let rows: any = res.rows;
          setAffirmations(rows["_array"]);
        });
      });
    }, 1000);
    return () => clearInterval(interval);
  });
  const colorScheme = useColorScheme();
  const [affirmations, setAffirmations] = useState([]);
  const [help, showHelp] = useState(false);

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
  const renderData = () => {
    if (affirmations.length === 0) {
      // const [styles] = useTheme(themedStyles);
      return (
        <View style={container}>
          <Text style={text}>No Affirmation Entries Made Yet</Text>
          <View style={{ padding: 5 }} />
          <TouchableOpacity onPress={() => showHelp(true)} style={button}>
            <Text style={button_text}>Help</Text>
          </TouchableOpacity>
          <View style={{ padding: 5 }} />
          <TouchableOpacity
            onPress={() => navigation.navigate("NewAffirmation")}
            style={button}
          >
            <Text style={button_text}>Add New Affirmation Entry</Text>
          </TouchableOpacity>
          <Modal
            animationType="slide"
            transparent={true}
            visible={help}
            onRequestClose={() => {
              showHelp(false);
            }}
          >
            <View style={modal_container}>
              <Text style={modal_heading}>Welcome!</Text>
              <Text style={modal_text}>
                This is an extended part of the Gratitude Journal App. This part
                allows you to write down some simple affirmations that you can
                always refer back to. As there are more fields, this part isn't
                a daily input, but rather can serve as a reminder to what is
                most important to ourselves, especially when we are at our
                lowest.
              </Text>
              <Text style={modal_text}>
                Just like the Journal aspect, this allows you to fill in 11
                fields all pertaining to some helpful personal affirmations.
                Feel free to write as much as you please, the screens will adapt
                to how ever much is written.
              </Text>
              <Text style={modal_text}>
                Once again, for those who are more concerned about data and
                information privacy, all data is stored locally on the app and
                never leaves the application itself. In this case, only the
                affirmations are stored in a separate database location as the
                journal entries.
              </Text>
              <Text style={modal_text}>
                Feel free to close me once you are done with the close button
                below!
              </Text>

              <View style={{ padding: 5 }} />
              <TouchableOpacity
                onPress={() => showHelp(false)}
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
          {affirmations.map((entry) => {
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
                    navigation.navigate("ViewAffirmation", { data: entry, id })
                  }
                >
                  <Text style={text}>View</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => navigation.navigate("EditAffirmation", { data: entry })}
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

export { ListAffirmations };
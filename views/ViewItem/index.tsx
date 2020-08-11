import * as SQLite from "expo-sqlite";
import * as React from "react";
import {
  Alert,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { useColorScheme } from "react-native-appearance";

const { useState } = React;
const db = SQLite.openDatabase("db.db");

const ViewItem = (props: any) => {
  const colorScheme = useColorScheme();
  const [modalVisible, setModalVisibility] = useState(false);

  const { navigation, route } = props;

  let data = route.params?.data;
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
  } = data;

  const onCancel = () => {
    setModalVisibility(false);
    Alert.alert("Deletion cancelled");
  };

  const onDelete = () => {
    setModalVisibility(false);

    db.transaction(
      (tx) => {
        tx.executeSql(`delete from journal where id = ?;`, [id]);
      },
      undefined,
      undefined
    );
    Alert.alert("Item Deleted!");
    navigation.popToTop();
  };
  const container = colorScheme === "light" ? styles.light_container : styles.dark_container;
  const heading = colorScheme === "light" ? styles.light_heading : styles.dark_heading;
  const value = colorScheme === "light" ? styles.light_value : styles.dark_value;
  const description = colorScheme === "light" ? styles.light_description : styles.dark_description;
  const button = colorScheme === "light" ? styles.light_button : styles.dark_button;
  const label = colorScheme === "light" ? styles.light_button : styles.dark_label;
  const delete_button = colorScheme === "light" ? styles.light_delete_button : styles.dark_delete_button;
  const delete_label = colorScheme === "light" ? styles.light_delete_button : styles.dark_delete_label;

  const modal_container = colorScheme === "light" ? styles.light_modal_container : styles.dark_modal_container;
  const modal_label = colorScheme === "light" ? styles.light_modal_label : styles.dark_modal_label;
  const modal_confirm = colorScheme === "light" ? styles.light_modal_confirm : styles.dark_modal_confirm;
  const modal_cancel = colorScheme === "light" ? styles.light_modal_cancel : styles.dark_modal_cancel;
  const modal_confirm_label = colorScheme === "light" ? styles.light_modal_confirm_label : styles.dark_modal_confirm_label;
  const modal_cancel_label = colorScheme === "light" ? styles.light_modal_cancel_label : styles.dark_modal_cancel_label;

  const {
    group,
    modal_buttons,
  } = styles;

  return (
    <ScrollView style={container}>
      <Text style={heading}>{postdate}</Text>
      <View style={group}>
        <Text style={value}>1: {first}</Text>
        <Text style={description}>{firstDesc}</Text>
      </View>
      <View style={group}>
        <Text style={value}>2: {second}</Text>
        <Text style={description}>{secondDesc}</Text>
      </View>
      <View style={group}>
        <Text style={value}>3: {third}</Text>
        <Text style={description}>{thirdDesc}</Text>
      </View>
      <View style={group}>
        <Text style={value}>{fourth != "" ? `4: ${fourth}` : ""}</Text>
        <Text style={description}>{fourthDesc}</Text>
      </View>
      <View style={group}>
        <Text style={value}>{fifth != "" ? `5: ${fifth}` : ""}</Text>
        <Text style={description}>{fifthDesc}</Text>
      </View>
      <TouchableOpacity
        onPress={() => navigation.navigate("Edit", { data: data })}
        style={button}
      >
        <Text style={label}>Edit</Text>
      </TouchableOpacity>
      <View style={{ padding: 5 }} />

      <TouchableOpacity
        onPress={() => setModalVisibility(true)}
        style={delete_button}
      >
        <Text style={delete_label}>Delete</Text>
      </TouchableOpacity>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          onCancel();
          Alert.alert("Cancelled");
        }}
      >
        <View style={modal_container}>
          <Text style={modal_label}>Confirm Deletion?</Text>
          <View style={{ padding: 5 }} />
          <View style={modal_buttons}>
            <TouchableOpacity onPress={() => onCancel()} style={modal_cancel}>
              <Text style={modal_cancel_label}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => onDelete()} style={modal_confirm}>
              <Text style={modal_confirm_label}>Confirm</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  light_container: {
    padding: 10,
    backgroundColor: "#f8f8f8",
  },
  dark_container: {
    padding: 10,
    backgroundColor: "#000",
  },
  light_heading: {
    fontSize: 18,
    textAlign: "center",
    color: "#000"
  },
  dark_heading: {
    fontSize: 18,
    textAlign: "center",
    color: "#f8f8f8"
  },
  group: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  light_value: {
    fontSize: 16,
    color: "#000"
  },
  dark_value: {
    fontSize: 16,
    color: "#f8f8f8"
  },
  light_description: {
    fontSize: 16,
    textAlign: "center",
    width: "50%",
    color: "#000"
  },
  dark_description: {
    fontSize: 16,
    textAlign: "center",
    width: "50%",
    color: "#f8f8f8"
  },
  light_button: {
    borderColor: "#3C6074",
    borderWidth: 2,
    borderRadius: 10,
    padding: 10,
  },
  dark_button: {
    borderColor: "#62C3E8",
    borderWidth: 2,
    borderRadius: 10,
    padding: 10,
  },
  light_label: {
    textAlign: "center",
    fontSize: 16,
    color: "#3C6074",
  },
  dark_label: {
    textAlign: "center",
    fontSize: 16,
    color: "#62C3E8",
  },
  light_delete_label: {
    textAlign: "center",
    fontSize: 16,
    color: "#9e2121",
  },
  dark_delete_label: {
    textAlign: "center",
    fontSize: 16,
    color: "#f36f6f",
  },
  light_delete_button: {
    borderColor: "#9e2121",
    borderWidth: 2,
    borderRadius: 10,
    padding: 10,
  },
  dark_delete_button: {
    borderColor: "#f36f6f",
    borderWidth: 2,
    borderRadius: 10,
    padding: 10,
  },
  light_modal_container: {
    backgroundColor: "#f8f8f8",
    flex: 1,
    padding: 20,
    justifyContent: "center",
    alignContent: "center",
  },
  dark_modal_container: {
    backgroundColor: "#000",
    flex: 1,
    padding: 20,
    justifyContent: "center",
    alignContent: "center",
  },
  light_modal_label: {
    textAlign: "center",
    fontSize: 18,
    padding: 10,
    color: "#000"
  },
  dark_modal_label: {
    textAlign: "center",
    fontSize: 18,
    padding: 10,
    color: "#f8f8f8"
  },
  modal_buttons: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  light_modal_confirm: {
    borderColor: "#219e43",
    borderWidth: 2,
    borderRadius: 10,
    padding: 10,
  },
  dark_modal_confirm: {
    borderColor: "#5df185",
    borderWidth: 2,
    borderRadius: 10,
    padding: 10,
  },
  light_modal_cancel: {
    borderColor: "#9e2121",
    borderWidth: 2,
    borderRadius: 10,
    padding: 10,
  },
  dark_modal_cancel: {
    borderColor: "#f36f6f",
    borderWidth: 2,
    borderRadius: 10,
    padding: 10,
  },
  light_modal_confirm_label: {
    color: "#219e43",
  },
  dark_modal_confirm_label: {
    color: "#5df185",
  },
  light_modal_cancel_label: {
    color: "#9e2121",
  },
  dark_modal_cancel_label: {
    color: "#f36f6f",
  },
});

export { ViewItem };

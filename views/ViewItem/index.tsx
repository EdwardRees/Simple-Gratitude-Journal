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

const { useState } = React;
const db = SQLite.openDatabase("db.db");

const ViewItem = (props: any) => {
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

  const {
    container,
    heading,
    value,
    description,
    group,
    button,
    label,
    delete_button,
    delete_label,
    modal_container,
    modal_label,
    modal_buttons,
    modal_confirm,
    modal_cancel,
    modal_confirm_label,
    modal_cancel_label,
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
  container: {
    padding: 10,
    backgroundColor: "#fff",
  },
  heading: {
    fontSize: 18,
    textAlign: "center",
  },
  group: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  value: {
    fontSize: 16,
  },
  description: {
    fontSize: 16,
    textAlign: "center",
    width: "50%",
  },
  button: {
    borderColor: "#3C6074",
    borderWidth: 2,
    borderRadius: 10,
    padding: 10,
  },
  label: {
    textAlign: "center",
    fontSize: 16,
    color: "#3C6074",
  },
  delete_label: {
    textAlign: "center",
    fontSize: 16,
    color: "#9e2121",
  },
  delete_button: {
    borderColor: "#9e2121",
    borderWidth: 2,
    borderRadius: 10,
    padding: 10,
  },
  modal_container: {
    backgroundColor: "#fff",
    flex: 1,
    padding: 20,
    justifyContent: "center",
    alignContent: "center",
  },
  modal_label: {
    textAlign: "center",
    fontSize: 18,
    padding: 10,
  },
  modal_buttons: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  modal_confirm: {
    borderColor: "#219e43",
    borderWidth: 2,
    borderRadius: 10,
    padding: 10,
  },
  modal_cancel: {
    borderColor: "#9e2121",
    borderWidth: 2,
    borderRadius: 10,
    padding: 10,
  },
  modal_confirm_label: {
    color: "#219e43",
  },
  modal_cancel_label: {
    color: "#9e2121",
  },
});

export { ViewItem };

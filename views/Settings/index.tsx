import * as SQLite from "expo-sqlite";
import * as React from "react";
import {
  Alert,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { PrivacyPolicy } from "./PrivacyPolicy";
import { Terms } from "./Terms";

const { useState } = React;

const db = SQLite.openDatabase("db.db");

const Settings = () => {
  const [showModal, setShowModal] = useState(false);
  const [showPrivacy, setShowPrivacy] = useState(false);
  const [showTerms, setShowTerms] = useState(false);

  const onCancel = () => {
    setShowModal(false);
  };

  const onConfirm = () => {
    Alert.alert("Cleared Database!");
    setShowModal(false);
    db.transaction((tx) => {
      tx.executeSql(`delete from journal`);
    });
  };

  const {
    container,
    group,
    label,
    inner,
    value,
    delete_button,
    delete_label,
    modal_container,
    modal_label,
    modal_buttons,
    modal_confirm,
    modal_cancel,
    modal_confirm_label,
    modal_cancel_label,
    open_label,
    open_button,
    close_label,
    close_button,
    footer,
  } = styles;
  return (
    <View style={container}>
      <View style={inner}>
        <View style={group}>
          <Text style={label}>Privacy Policy</Text>
          <TouchableOpacity
            onPress={() => setShowPrivacy(true)}
            style={open_button}
          >
            <Text style={open_label}>Open Privacy Policy</Text>
          </TouchableOpacity>

          <Modal
            animationType="slide"
            transparent={true}
            visible={showPrivacy}
            onRequestClose={() => {}}
          >
            <PrivacyPolicy />
            <TouchableOpacity
              onPress={() => setShowPrivacy(false)}
              style={close_button}
            >
              <Text style={close_label}>Close</Text>
            </TouchableOpacity>
          </Modal>
        </View>
        <View style={group}>
          <Text style={label}>Privacy Policy</Text>
          <TouchableOpacity
            onPress={() => setShowTerms(true)}
            style={open_button}
          >
            <Text style={open_label}>Open Terms and Conditions</Text>
          </TouchableOpacity>

          <Modal
            animationType="slide"
            transparent={true}
            visible={showTerms}
            onRequestClose={() => {}}
          >
            <Terms />
            <TouchableOpacity
              onPress={() => setShowTerms(false)}
              style={close_button}
            >
              <Text style={close_label}>Close</Text>
            </TouchableOpacity>
          </Modal>
        </View>
        <View style={group}>
          <Text style={label}>Reset Database</Text>
          <TouchableOpacity
            onPress={() => setShowModal(true)}
            style={delete_button}
          >
            <Text style={delete_label}>Clear Database</Text>
          </TouchableOpacity>

          <Modal
            animationType="slide"
            transparent={true}
            visible={showModal}
            onRequestClose={() => {
              onCancel();
              Alert.alert("Cancelled");
            }}
          >
            <View style={modal_container}>
              <Text style={modal_label}>Confirm Deletion?</Text>
              <View style={{ padding: 5 }} />
              <View style={modal_buttons}>
                <TouchableOpacity
                  onPress={() => onCancel()}
                  style={modal_cancel}
                >
                  <Text style={modal_cancel_label}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => onConfirm()}
                  style={modal_confirm}
                >
                  <Text style={modal_confirm_label}>Confirm</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
        </View>
      </View>
      <View style={footer}>
        <Text style={{ textAlign: "center" }}>
          Simple Gratitude Journal v1.0.0
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  group: {
    flexDirection: "row",
    justifyContent: "space-around",
    textAlignVertical: "center",
    paddingVertical: 10,
  },
  label: {
    fontSize: 16,
    textAlignVertical: "center",
  },
  value: {},
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
  open_label: {
    textAlign: "center",
    fontSize: 16,
    color: "#214d9e",
  },
  open_button: {
    borderColor: "#214d9e",
    borderWidth: 2,
    borderRadius: 10,
    padding: 10,
  },
  close_label: {
    textAlign: "center",
    fontSize: 16,
    color: "#214d9e",
  },
  close_button: {
    borderColor: "#214d9e",
    borderWidth: 2,
    borderRadius: 10,
    padding: 10,
    zIndex: 1,
    backgroundColor: "#fff"
  },
  footer: {
    flex: 0.01,
  },
  inner: {
    flex: 0.99,
  },
});

export { Settings };

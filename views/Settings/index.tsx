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
import { useColorScheme } from "react-native-appearance";

import { PrivacyPolicy } from "./PrivacyPolicy";
import { Terms } from "./Terms";

const { useState } = React;

const db = SQLite.openDatabase("db.db");

const Settings = () => {
  const colorScheme = useColorScheme();
  const [showAffirmationModal, setShowAffirmationModal] = useState(false);
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

  const onAffirmationCancel = () => {
    setShowAffirmationModal(false);
  };

  const onAffirmationConfirm = () => {
    Alert.alert("Cleared Affirmations!");
    setShowAffirmationModal(false);
    db.transaction((tx) => {
      tx.executeSql(`delete from affirmations`);
    });
  };


  const container =
    colorScheme === "light" ? styles.light_container : styles.dark_container;
  const label =
    colorScheme === "light" ? styles.light_label : styles.dark_label;
  const delete_button =
    colorScheme === "light"
      ? styles.light_delete_button
      : styles.dark_delete_button;
  const delete_label =
    colorScheme === "light"
      ? styles.light_delete_label
      : styles.dark_delete_label;
  const modal_container =
    colorScheme === "light"
      ? styles.light_modal_container
      : styles.dark_modal_container;
  const modal_label =
    colorScheme === "light"
      ? styles.light_modal_label
      : styles.dark_modal_label;
  const modal_confirm =
    colorScheme === "light"
      ? styles.light_modal_confirm
      : styles.dark_modal_confirm;
  const modal_cancel =
    colorScheme === "light"
      ? styles.light_modal_cancel
      : styles.dark_modal_cancel;
  const modal_confirm_label =
    colorScheme === "light"
      ? styles.light_modal_confirm_label
      : styles.dark_modal_confirm_label;
  const modal_cancel_label =
    colorScheme === "light"
      ? styles.light_modal_cancel_label
      : styles.dark_modal_cancel_label;
  const open_label =
    colorScheme === "light" ? styles.light_open_label : styles.dark_open_label;
  const open_button =
    colorScheme === "light"
      ? styles.light_open_button
      : styles.dark_open_button;
  const close_label =
    colorScheme === "light"
      ? styles.light_close_label
      : styles.dark_close_label;
  const close_button =
    colorScheme === "light"
      ? styles.light_close_button
      : styles.dark_close_button;

  const { group, inner, value, modal_buttons, footer } = styles;

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
          <Text style={label}>Reset Journal Database</Text>
          <TouchableOpacity
            onPress={() => setShowModal(true)}
            style={delete_button}
          >
            <Text style={delete_label}>Clear Journal</Text>
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
        <View style={group}>
          <Text style={label}>Reset Affirmations Database</Text>
          <TouchableOpacity
            onPress={() => setShowAffirmationModal(true)}
            style={delete_button}
          >
            <Text style={delete_label}>Clear Affirmations</Text>
          </TouchableOpacity>

          <Modal
            animationType="slide"
            transparent={true}
            visible={showAffirmationModal}
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
                  onPress={() => onAffirmationCancel()}
                  style={modal_cancel}
                >
                  <Text style={modal_cancel_label}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => onAffirmationConfirm()}
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
        <Text style={{ textAlign: "center", color: colorScheme === "light" ? "#000" : "#f8f8f8" }}>
          Simple Gratitude Journal v2.0.0
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  light_container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f8f8f8",
  },
  dark_container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#000",
  },
  group: {
    flexDirection: "row",
    justifyContent: "space-around",
    textAlignVertical: "center",
    paddingVertical: 10,
  },
  light_label: {
    fontSize: 16,
    textAlignVertical: "center",
    color: "#000",
  },
  dark_label: {
    fontSize: 16,
    textAlignVertical: "center",
    color: "#f8f8f8",
  },
  value: {},
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
    color: "#000",
  },
  dark_modal_label: {
    textAlign: "center",
    fontSize: 18,
    padding: 10,
    color: "#f8f8f8",
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
  light_open_label: {
    textAlign: "center",
    fontSize: 16,
    color: "#3c6074",
  },
  dark_open_label: {
    textAlign: "center",
    fontSize: 16,
    color: "#62c3e8",
  },
  light_open_button: {
    borderColor: "#3c6074",
    borderWidth: 2,
    borderRadius: 10,
    padding: 10,
  },
  dark_open_button: {
    borderColor: "#62c3e8",
    borderWidth: 2,
    borderRadius: 10,
    padding: 10,
  },
  light_close_label: {
    textAlign: "center",
    fontSize: 16,
    color: "#3c6074",
  },
  dark_close_label: {
    textAlign: "center",
    fontSize: 16,
    color: "#62c3e8",
  },
  light_close_button: {
    borderColor: "#3c6074",
    borderWidth: 2,
    borderRadius: 10,
    padding: 10,
    zIndex: 1,
    backgroundColor: "#f8f8f8",
  },
  dark_close_button: {
    borderColor: "#62c3e8",
    borderWidth: 2,
    borderRadius: 10,
    padding: 10,
    zIndex: 1,
    backgroundColor: "#000",
  },
  footer: {
    flex: 0.01,
  },
  inner: {
    flex: 0.99,
  },
});

export { Settings };

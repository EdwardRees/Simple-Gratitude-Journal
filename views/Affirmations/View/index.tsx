import * as SQLite from "expo-sqlite";
import * as React from "react";
import {
  Alert,
  Modal,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { useColorScheme } from "react-native-appearance";

const { useState, useEffect } = React;

const db = SQLite.openDatabase("db.db");

const ViewAffirmations = (props: any) => {
  const colorScheme = useColorScheme();
  const [ modalVisible, setModalVisibility ] = useState(false);
  const { navigation, route } = props;

  let data = route.params?.data;

  const {
    id,
    postdate,
    loveMost,
    sadManage,
    first,
    second,
    third,
    betterSkill,
    pleasantlySurprised,
    lookingAhead,
    appreciated, 
    selfThank,
    downReminder
  } = data;

  const [hasData, setHasData] = useState(false);
  const [help, showHelp] = useState(false);


  const onCancel = () => {
    setModalVisibility(false);
    Alert.alert("Deletion cancelled");
  }

  const onDelete = () => {
    setModalVisibility(false);

    db.transaction(
      tx => {
        tx.executeSql(`delete from affirmations where id = ?`, [id]);
      },
      undefined,
      undefined
    );
    Alert.alert("Item Deleted!");
    navigation.popToTop();
  }
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
  const text = colorScheme === "light" ? styles.lightText : styles.darkText;

  const {
    group,
    modal_buttons,
  } = styles;

  const renderData = () => {
    return (
      <ScrollView style={container}>
      <Text style={heading}>{postdate}</Text>
      <View style={container}>
          <View style={group}>
            <Text style={text}>
              What I love most about myself today is{" "}
              <Text style={value}>{loveMost}</Text>
              <Text style={text}>.</Text>
            </Text>
          </View>
          <View style={group}>
            <Text style={text}>
              Even when I'm sad I always manage to{" "}
              <Text style={value}>{sadManage}</Text>
              <Text style={text}>.</Text>
            </Text>
          </View>
          <View>
            <View style={group}>
              <Text style={text}>
                Three things I would never want to change about myself would be:
              </Text>
            </View>
            <View style={group}>
              <Text style={text}>1. </Text>
              <Text style={value}>{first}</Text>
            </View>
            <View style={group}>
              <Text style={text}> 2. </Text>
              <Text style={value}>{second}</Text>
            </View>
            <View style={group}>
              <Text style={text}> 3. </Text>
              <Text style={value}>{third}</Text>
            </View>
          </View>
          <View style={group}>
            <Text style={text}>
              Something I can do better than most people I know is{" "}
              <Text style={value}>{betterSkill}</Text>
              <Text style={text}>.</Text>
            </Text>
          </View>
          <View style={group}>
            <Text style={text}>
              The last time I pleasantly surprised myself was{" "}
              <Text style={value}>{pleasantlySurprised}</Text>
              <Text style={text}>.</Text>
            </Text>
          </View>
          <View style={group}>
            <Text style={text}>
              Something I'm most looking forward to currently is{" "}
              <Text style={value}>{lookingAhead}</Text>
              <Text style={text}>.</Text>
            </Text>
          </View>
          <View style={group}>
            <Text style={text}>
              The last time I felt super appreciated by someone was{" "}
              <Text style={value}>{appreciated}</Text>
              <Text style={text}>.</Text>
            </Text>
          </View>
          <View style={group}>
            <Text style={text}>
              I want to thank myself for <Text style={value}>{selfThank}</Text>
              <Text style={text}>.</Text>
            </Text>
          </View>
          <View style={group}>
            <Text style={text}>
              When I'm ever feeling down, I want to remind myself that{" "}
              <Text style={value}>{downReminder}</Text>
              <Text style={text}>.</Text>
            </Text>
          </View>
        </View>
      <TouchableOpacity
        onPress={() => navigation.navigate("EditAffirmation", { data: data })}
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
      // <ScrollView
      //   style={{
      //     flex: 1,
      //     backgroundColor: colorScheme === "light" ? "#f8f8f8" : "#000",
      //   }}
      // >
      //   <View style={container}>
      //     <View style={group}>
      //       <Text style={text}>
      //         What I love most about myself today is{" "}
      //         <Text style={value}>{loveMost}</Text>
      //         <Text style={text}>.</Text>
      //       </Text>
      //     </View>
      //     <View style={group}>
      //       <Text style={text}>
      //         Even when I'm sad I always manage to{" "}
      //         <Text style={value}>{sadManage}</Text>
      //         <Text style={text}>.</Text>
      //       </Text>
      //     </View>
      //     <View>
      //       <View style={group}>
      //         <Text style={text}>
      //           Three things I would never want to change about myself would be:
      //         </Text>
      //       </View>
      //       <View style={group}>
      //         <Text style={text}>1. </Text>
      //         <Text style={value}>{first}</Text>
      //       </View>
      //       <View style={group}>
      //         <Text style={text}> 2. </Text>
      //         <Text style={value}>{second}</Text>
      //       </View>
      //       <View style={group}>
      //         <Text style={text}> 3. </Text>
      //         <Text style={value}>{third}</Text>
      //       </View>
      //     </View>
      //     <View style={group}>
      //       <Text style={text}>
      //         Something I can do better than most people I know is{" "}
      //         <Text style={value}>{betterSkill}</Text>
      //         <Text style={text}>.</Text>
      //       </Text>
      //     </View>
      //     <View style={group}>
      //       <Text style={text}>
      //         The last time I pleasantly surprised myself was{" "}
      //         <Text style={value}>{pleasantlySurprised}</Text>
      //         <Text style={text}>.</Text>
      //       </Text>
      //     </View>
      //     <View style={group}>
      //       <Text style={text}>
      //         Something I'm most looking forward to currently is{" "}
      //         <Text style={value}>{lookingAhead}</Text>
      //         <Text style={text}>.</Text>
      //       </Text>
      //     </View>
      //     <View style={group}>
      //       <Text style={text}>
      //         The last time I felt super appreciated by someone was{" "}
      //         <Text style={value}>{appreciated}</Text>
      //         <Text style={text}>.</Text>
      //       </Text>
      //     </View>
      //     <View style={group}>
      //       <Text style={text}>
      //         I want to thank myself for <Text style={value}>{selfThank}</Text>
      //         <Text style={text}>.</Text>
      //       </Text>
      //     </View>
      //     <View style={group}>
      //       <Text style={text}>
      //         When I'm ever feeling down, I want to remind myself that{" "}
      //         <Text style={value}>{downReminder}</Text>
      //         <Text style={text}>.</Text>
      //       </Text>
      //     </View>
      //   </View>
      // </ScrollView>
    );
  };
  return renderData();
};

const styles = StyleSheet.create({
  lightNoneContainer: {
    backgroundColor: "#f8f8f8",
    flex: 1,
    paddingHorizontal: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  darkNoneContainer: {
    backgroundColor: "#000",
    flex: 1,
    paddingHorizontal: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  lightContainer: {
    backgroundColor: "#f8f8f8",
    paddingHorizontal: 10,
  },
  darkContainer: {
    backgroundColor: "#000",
    paddingHorizontal: 10,
  },
  lightText: { color: "#000", fontSize: 16 },
  darkText: { color: "#f8f8f8", fontSize: 16 },
  lightValue: {
    color: "#000",
    textDecorationLine: "underline",
    fontWeight: "bold",
  },
  darkValue: {
    color: "#f8f8f8",
    textDecorationLine: "underline",
    fontWeight: "bold",
  },
  lightButton: {
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#3C6074",
    padding: 10,
  },
  darkButton: {
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#62C3E8",
    padding: 10,
  },
  lightButtonText: { color: "#3C6074", textAlign: "center", fontSize: 16 },
  darkButtonText: { color: "#62c3E8", textAlign: "center", fontSize: 16 },
  gap: { padding: 5 },
  group: {
    flexDirection: "row",
    padding: 5,
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

export { ViewAffirmations };

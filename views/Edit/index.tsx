import * as SQLite from "expo-sqlite";
import * as React from "react";
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const { useState } = React;
import { useColorScheme } from "react-native-appearance";
const db = SQLite.openDatabase("db.db");

const Edit = (props: any) => {
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

  const colorScheme = useColorScheme();
  const [newFirst, setFirst] = useState(first);
  const [newFirstDesc, setFirstDesc] = useState(firstDesc);
  const [newSecond, setSecond] = useState(second);
  const [newSecondDesc, setSecondDesc] = useState(secondDesc);
  const [newThird, setThird] = useState(third);
  const [newThirdDesc, setThirdDesc] = useState(thirdDesc);
  const [newFourth, setFourth] = useState(fourth);
  const [newFourthDesc, setFourthDesc] = useState(fourthDesc);
  const [newFifth, setFifth] = useState(fifth);
  const [newFifthDesc, setFifthDesc] = useState(fifthDesc);

  const update = () => {
    if (
      newFirst === null ||
      newFirst === "" ||
      newSecond === null ||
      newSecond === "" ||
      newThird === null ||
      newThird === ""
    ) {
      return false;
    }
    db.transaction(
      (tx) => {
        tx.executeSql(`update journal set first = ? where id = ?`, [
          newFirst,
          id,
        ]);
        tx.executeSql(`update journal set firstDesc = ? where id = ?`, [
          newFirstDesc,
          id,
        ]);
        tx.executeSql(`update journal set second = ? where id = ?`, [
          newSecond,
          id,
        ]);
        tx.executeSql(`update journal set secondDesc = ? where id = ?`, [
          newSecondDesc,
          id,
        ]);
        tx.executeSql(`update journal set third = ? where id = ?`, [
          newThird,
          id,
        ]);
        tx.executeSql(`update journal set thirdDesc = ? where id = ?`, [
          newThirdDesc,
          id,
        ]);
        tx.executeSql(`update journal set fourth = ? where id = ?`, [
          newFourth,
          id,
        ]);
        tx.executeSql(`update journal set fourthDesc = ? where id = ?`, [
          newFourthDesc,
          id,
        ]);
        tx.executeSql(`update journal set fifth = ? where id = ?`, [
          newFifth,
          id,
        ]);
        tx.executeSql(`update journal set fifthDesc = ? where id = ?`, [
          newFifthDesc,
          id,
        ]);
      },
      undefined,
      undefined
    );
    return true;
  };


  const container =
    colorScheme === "light" ? styles.light_container : styles.dark_container;

  const button =
    colorScheme === "light" ? styles.light_button : styles.dark_button;

  const label =
    colorScheme === "light" ? styles.light_label : styles.dark_label;
  const input =
    colorScheme === "light" ? styles.light_input : styles.dark_input;
  const { formGroup } = styles;
  return (
    <ScrollView style={container}>
      <View style={formGroup}>
        <Text style={label}>1 (required): </Text>
        <TextInput
          style={input}
          onChangeText={(val) => setFirst(val)}
          placeholder={"First value"}
          value={newFirst}
          multiline
        />
      </View>
      <View style={formGroup}>
        <Text style={label}>1 Description (optional): </Text>
        <TextInput
          style={input}
          onChangeText={(val) => setFirstDesc(val)}
          placeholder={"First value description *Optional"}
          value={newFirstDesc}
          multiline
        />
      </View>
      <View style={formGroup}>
        <Text style={label}>2 (required): </Text>
        <TextInput
          style={input}
          onChangeText={(val) => setSecond(val)}
          placeholder={"Second value"}
          multiline
          value={newSecond}
        />
      </View>
      <View style={formGroup}>
        <Text style={label}>2 Description (optional): </Text>
        <TextInput
          style={input}
          onChangeText={(val) => setSecondDesc(val)}
          multiline
          placeholder={"Second value description *Optional"}
          value={newSecondDesc}
        />
      </View>
      <View style={formGroup}>
        <Text style={label}>3 (required): </Text>
        <TextInput
          style={input}
          onChangeText={(val) => setThird(val)}
          multiline
          placeholder={"Third value"}
          value={newThird}
        />
      </View>
      <View style={formGroup}>
        <Text style={label}>3 Description (optional): </Text>
        <TextInput
          style={input}
          multiline
          onChangeText={(val) => setThirdDesc(val)}
          placeholder={"Third value description *Optional"}
          value={newThirdDesc}
        />
      </View>
      <View style={formGroup}>
        <Text style={label}>4: </Text>
        <TextInput
          multiline
          style={input}
          onChangeText={(val) => setFourth(val)}
          placeholder={"Fourth value"}
          value={newFourth}
        />
      </View>
      <View style={formGroup}>
        <Text style={label}>4 Description (optional): </Text>
        <TextInput
          style={input}
          onChangeText={(val) => setFourthDesc(val)}
          multiline
          placeholder={"Fourth value description *Optional"}
          value={newFourthDesc}
        />
      </View>
      <View style={formGroup}>
        <Text style={label}>5: </Text>
        <TextInput
          style={input}
          onChangeText={(val) => setFifth(val)}
          placeholder={"Fifth value"}
          multiline
          value={newFifth}
        />
      </View>
      <View style={formGroup}>
        <Text style={label}>5 Description (optional): </Text>
        <TextInput
          style={input}
          onChangeText={(val) => setFifthDesc(val)}
          placeholder={"Fifth value description *Optional"}
          multiline
          value={newFifthDesc}
        />
      </View>
      <TouchableOpacity
        style={button}
        onPress={() => {
          if (update()) {
            navigation.popToTop();
          } else {
            Alert.alert(
              "Failed to update! Make sure at least three items are added!"
            );
          }
        }}
      >
        <Text style={{ textAlign: "center", fontSize: 16, color: colorScheme === "light" ? "#3C6074" : "#62C3E8" }}>
          Save
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  light_container: {
    flex: 1,
    paddingHorizontal: 10,
    backgroundColor: "#f8f8f8",
  },
  dark_container: {
    flex: 1,
    paddingHorizontal: 10,
    backgroundColor: "#000",
  },
  light_label: {
    textAlign: "center",
    textAlignVertical: "center",
    fontSize: 16,
    color: "#000",
  },
  dark_label: {
    textAlign: "center",
    textAlignVertical: "center",
    fontSize: 16,
    color: "#f8f8f8",
  },
  light_input: {
    textAlign: "center",
    textAlignVertical: "center",
    width: 150,
    height: 50,
    fontSize: 16,
    color: "#000",
  },
  dark_input: {
    textAlign: "center",
    textAlignVertical: "center",
    width: 150,
    height: 50,
    fontSize: 16,
    color: "#f8f8f8",
  },
  formGroup: {
    padding: 10,
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  light_button: {
    color: "#3C6074",
    borderRadius: 10,
    borderTopWidth: 2,
    borderLeftWidth: 2,
    borderBottomWidth: 2,
    borderRightWidth: 2,
    borderColor: "#3C6074",
    padding: 10,
  },
  dark_button: {
    color: "#62C3E8",
    borderRadius: 10,
    borderTopWidth: 2,
    borderLeftWidth: 2,
    borderBottomWidth: 2,
    borderRightWidth: 2,
    borderColor: "#62C3E8",
    padding: 10,
  },
});
export { Edit };

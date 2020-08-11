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
import { useColorScheme } from "react-native-appearance";

const { useState } = React;

const db = SQLite.openDatabase("db.db");

const Add = (props: any) => {
  const { navigation } = props;
  const [first, setFirst] = useState("");
  const [firstDesc, setFirstDesc] = useState("");
  const [second, setSecond] = useState("");
  const [secondDesc, setSecondDesc] = useState("");
  const [third, setThird] = useState("");
  const [thirdDesc, setThirdDesc] = useState("");
  const [fourth, setFourth] = useState("");
  const [fourthDesc, setFourthDesc] = useState("");
  const [fifth, setFifth] = useState("");
  const [fifthDesc, setFifthDesc] = useState("");

  const colorScheme = useColorScheme();

  const add = () => {
    if (
      first === null ||
      first === "" ||
      second === "" ||
      second === null ||
      third === "" ||
      third === null
    ) {
      return false;
    }
    db.transaction(
      (tx) => {
        tx.executeSql(
          "insert into journal (postdate, first, firstDesc, second, secondDesc, third, thirdDesc, fourth, fourthDesc, fifth, fifthDesc) values (?,?,?,?,?,?,?,?,?,?,?)",
          [
            new Date().toDateString(),
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
          ]
        );
      },
      (e) => {
        console.log("Failed addition", e.message);
      },
      () => {
        console.log("Successful addition");
      }
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
          placeholder={"Placeholder: Friends"}
          value={first}
          multiline
        />
      </View>
      <View style={formGroup}>
        <Text style={label}>1 Description (optional): </Text>
        <TextInput
          style={input}
          onChangeText={(val) => setFirstDesc(val)}
          placeholder={"Placeholder: My friends show me who I can be"}
          value={firstDesc}
          multiline
        />
      </View>
      <View style={formGroup}>
        <Text style={label}>2 (required): </Text>
        <TextInput
          style={input}
          onChangeText={(val) => setSecond(val)}
          placeholder={"Placeholder: Family"}
          multiline
          value={second}
        />
      </View>
      <View style={formGroup}>
        <Text style={label}>2 Description (optional): </Text>
        <TextInput
          style={input}
          onChangeText={(val) => setSecondDesc(val)}
          multiline
          placeholder={"Placeholder: They support me and care for me"}
          value={secondDesc}
        />
      </View>
      <View style={formGroup}>
        <Text style={label}>3 (required): </Text>
        <TextInput
          style={input}
          onChangeText={(val) => setThird(val)}
          multiline
          placeholder={"Placeholder: Health"}
          value={third}
        />
      </View>
      <View style={formGroup}>
        <Text style={label}>3 Description (optional): </Text>
        <TextInput
          style={input}
          multiline
          onChangeText={(val) => setThirdDesc(val)}
          placeholder={"Placeholder: I am healthy"}
          value={thirdDesc}
        />
      </View>
      <View style={formGroup}>
        <Text style={label}>4: </Text>
        <TextInput
          multiline
          style={input}
          onChangeText={(val) => setFourth(val)}
          placeholder={"Placeholder: Social Media"}
          value={fourth}
        />
      </View>
      <View style={formGroup}>
        <Text style={label}>4 Description (optional): </Text>
        <TextInput
          style={input}
          onChangeText={(val) => setFourthDesc(val)}
          multiline
          placeholder={"Placeholder: I can stay connected to others no matter where they are"}
          value={fourthDesc}
        />
      </View>
      <View style={formGroup}>
        <Text style={label}>5: </Text>
        <TextInput
          style={input}
          onChangeText={(val) => setFifth(val)}
          placeholder={"Placeholder: Internet"}
          multiline
          value={fifth}
        />
      </View>
      <View style={formGroup}>
        <Text style={label}>5 Description (optional): </Text>
        <TextInput
          style={input}
          onChangeText={(val) => setFifthDesc(val)}
          placeholder={"Placeholder: I can keep up to date with everything happening around the world"}
          multiline
          value={fifthDesc}
        />
      </View>
      <TouchableOpacity
        style={button}
        onPress={() => {
          if (add()) {
            navigation.popToTop();
          } else {
            Alert.alert(
              "Add unsuccessful! Make sure at least three items are added!"
            );
          }
        }}
      >
        <Text style={{ textAlign: "center", fontSize: 16, color: colorScheme=== "light" ? "#3C6074" : "#62C3E8" }}>
          Add
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

export { Add };

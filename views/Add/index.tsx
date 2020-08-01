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

  const { container, button, label, input, formGroup } = styles;
  return (
    <ScrollView style={container}>
      <View style={formGroup}>
        <Text style={label}>1 (required): </Text>
        <TextInput
          style={input}
          onChangeText={(val) => setFirst(val)}
          placeholder={"First value"}
          value={first}
          multiline
        />
      </View>
      <View style={formGroup}>
        <Text style={label}>1 Description (optional): </Text>
        <TextInput
          style={input}
          onChangeText={(val) => setFirstDesc(val)}
          placeholder={"First value description *Optional"}
          value={firstDesc}
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
          value={second}
        />
      </View>
      <View style={formGroup}>
        <Text style={label}>2 Description (optional): </Text>
        <TextInput
          style={input}
          onChangeText={(val) => setSecondDesc(val)}
          multiline
          placeholder={"Second value description *Optional"}
          value={secondDesc}
        />
      </View>
      <View style={formGroup}>
        <Text style={label}>3 (required): </Text>
        <TextInput
          style={input}
          onChangeText={(val) => setThird(val)}
          multiline
          placeholder={"Third value"}
          value={third}
        />
      </View>
      <View style={formGroup}>
        <Text style={label}>3 Description (optional): </Text>
        <TextInput
          style={input}
          multiline
          onChangeText={(val) => setThirdDesc(val)}
          placeholder={"Third value description *Optional"}
          value={thirdDesc}
        />
      </View>
      <View style={formGroup}>
        <Text style={label}>4: </Text>
        <TextInput
          multiline
          style={input}
          onChangeText={(val) => setFourth(val)}
          placeholder={"Fourth value"}
          value={fourth}
        />
      </View>
      <View style={formGroup}>
        <Text style={label}>4 Description (optional): </Text>
        <TextInput
          style={input}
          onChangeText={(val) => setFourthDesc(val)}
          multiline
          placeholder={"Fourth value description *Optional"}
          value={fourthDesc}
        />
      </View>
      <View style={formGroup}>
        <Text style={label}>5: </Text>
        <TextInput
          style={input}
          onChangeText={(val) => setFifth(val)}
          placeholder={"Fifth value"}
          multiline
          value={fifth}
        />
      </View>
      <View style={formGroup}>
        <Text style={label}>5 Description (optional): </Text>
        <TextInput
          style={input}
          onChangeText={(val) => setFifthDesc(val)}
          placeholder={"Fifth value description *Optional"}
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
        <Text style={{ textAlign: "center", fontSize: 16, color: "#3C6074" }}>
          Add
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
    backgroundColor: "#fff",
  },
  label: {
    textAlign: "center",
    textAlignVertical: "center",
    fontSize: 16,
  },
  input: {
    textAlign: "center",
    textAlignVertical: "center",
    width: 150,
    height: 50,
    fontSize: 16,
  },
  formGroup: {
    padding: 10,
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  button: {
    color: "#3C6074",
    borderRadius: 10,
    borderTopWidth: 2,
    borderLeftWidth: 2,
    borderBottomWidth: 2,
    borderRightWidth: 2,
    borderColor: "#3C6074",
    padding: 10,
  },
});

export { Add };

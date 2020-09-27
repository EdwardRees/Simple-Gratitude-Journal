import * as SQLite from "expo-sqlite";
import * as React from "react";
import {
  ScrollView,
  TouchableOpacity,
  Alert,
  StyleSheet,
  Text,
  View,
  TextInput,
} from "react-native";
import { useColorScheme } from "react-native-appearance";

const { useState, useEffect } = React;
const db = SQLite.openDatabase("db.db");

const AddAffirmations = (props: any) => {
  const { navigation } = props;
  const [loveMost, setLoveMost] = useState("");
  const [sadManage, setSadManage] = useState("");
  const [first, setFirst] = useState("");
  const [second, setSecond] = useState("");
  const [third, setThird] = useState("");
  const [betterSkill, setBetterSkill] = useState("");
  const [pleasantlySurprised, setPleasantlySurprised] = useState("");
  const [lookingAhead, setLookingAhead] = useState("");
  const [appreciated, setAppreciated] = useState("");
  const [selfThank, setSelfThank] = useState("");
  const [downReminder, setDownReminder] = useState("");

  const colorScheme = useColorScheme();

  const add = () => {
    if (
      loveMost === null ||
      loveMost === "" ||
      sadManage === null ||
      sadManage === "" ||
      first === null ||
      first === "" ||
      second === null ||
      second === "" ||
      third === null ||
      third === "" ||
      betterSkill === null ||
      betterSkill === "" ||
      pleasantlySurprised === null ||
      pleasantlySurprised === "" ||
      lookingAhead === null ||
      lookingAhead === "" ||
      appreciated === null ||
      appreciated === "" ||
      selfThank === null ||
      selfThank === "" ||
      downReminder === null ||
      downReminder === ""
    ) {
      return false;
    }

    db.transaction(
      (tx) => {
        tx.executeSql(
          "insert into affirmations (postdate, loveMost, sadManage, first, second, third, betterSkill, pleasantlySurprised, lookingAhead, appreciated, selfThank, downReminder) values (?, ?, ?,  ?, ?, ?, ?, ?,?, ?,?, ?);",
          [
            new Date().toDateString(),
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
            downReminder,
          ]
        );
      },
      (e) => {
        console.error(`Failed addition: ${e.message}`);
      },
      () => {
        console.info("Successful addition");
      }
    );
    return true;
  };

  const container =
    colorScheme === "light" ? styles.lightContainer : styles.darkContainer;

  const button =
    colorScheme === "light" ? styles.lightButton : styles.darkButton;

  const label = colorScheme === "light" ? styles.lightLabel : styles.darkLabel;

  const input = colorScheme === "light" ? styles.lightInput : styles.darkInput;

  const multiGroup =
    colorScheme === "light" ? styles.lightMultiGroup : styles.darkMultiGroup;

  const { formGroup } = styles;

  return (
    <ScrollView style={container}>
      <View style={formGroup}>
        <Text style={label}>What I love most about myself today is:</Text>
        <TextInput
          style={input}
          onChangeText={(val) => setLoveMost(val)}
          placeholder="Placeholder: My Kindness"
          value={loveMost}
          multiline
        />
      </View>
      <View style={formGroup}>
        <Text style={label}>When I'm sad, I always manage to:</Text>
        <TextInput
          style={input}
          onChangeText={(val) => setSadManage(val)}
          placeholder="Placeholder: Try to Smile"
          value={sadManage}
          multiline
        />
      </View>
      <View style={multiGroup}>
        <Text style={label}>
          Three things I would never want to change about myself would be:
        </Text>
        <TextInput
          style={input}
          onChangeText={(val) => setFirst(val)}
          placeholder="Placeholder: My Optimism"
          value={first}
          multiline
        />
        <TextInput
          style={input}
          onChangeText={(val) => setSecond(val)}
          placeholder="Placeholder: My Compassion"
          value={second}
          multiline
        />
        <TextInput
          style={input}
          onChangeText={(val) => setThird(val)}
          placeholder="Placeholder: My Hope"
          value={third}
          multiline
        />
      </View>
      <View style={formGroup}>
        <Text style={label}>
          Something I can do better than most people I know is:
        </Text>
        <TextInput
          style={input}
          onChangeText={(val) => setBetterSkill(val)}
          placeholder="Placeholder: Help Others"
          value={betterSkill}
          multiline
        />
      </View>
      <View style={formGroup}>
        <Text style={label}>
          The last time I pleasantly surprised myself was:{" "}
        </Text>
        <TextInput
          style={input}
          onChangeText={(val) => setPleasantlySurprised(val)}
          placeholder="Placeholder: Today"
          value={pleasantlySurprised}
          multiline
        />
      </View>
      <View style={formGroup}>
        <Text style={label}>
          Something I'm most looking forward to currently is:{" "}
        </Text>
        <TextInput
          style={input}
          onChangeText={(val) => setLookingAhead(val)}
          placeholder="Placeholder: Meeting my Friends"
          value={lookingAhead}
          multiline
        />
      </View>
      <View style={formGroup}>
        <Text style={label}>
          The last time I felt super appreciated by someone was:{" "}
        </Text>
        <TextInput
          style={input}
          onChangeText={(val) => setAppreciated(val)}
          placeholder="Placeholder: Today"
          value={appreciated}
          multiline
        />
      </View>
      <View style={formGroup}>
        <Text style={label}>I want to thank myself for: </Text>
        <TextInput
          style={input}
          onChangeText={(val) => setSelfThank(val)}
          placeholder="Placeholder: Never giving up"
          value={selfThank}
          multiline
        />
      </View>
      <View style={formGroup}>
        <Text style={label}>
          When I'm ever feeling down, I want to remind myself that:{" "}
        </Text>
        <TextInput
          style={input}
          onChangeText={(val) => setDownReminder(val)}
          placeholder="Placeholder: Have hope, it gets better"
          value={downReminder}
          multiline
        />
      </View>
      <TouchableOpacity
        style={button}
        onPress={() => {
          if (add()) {
            navigation.popToTop();
          } else {
            Alert.alert("Add unsuccessful! Make sure all fields have values!");
          }
        }}
      >
        <Text
          style={{
            textAlign: "center",
            fontSize: 16,
            color: colorScheme === "light" ? "#3C6074" : "#62C3E8",
          }}
        >
          Add
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  lightContainer: {
    flex: 1,
    paddingHorizontal: 10,
    backgroundColor: "#f8f8f8",
  },
  darkContainer: {
    flex: 1,
    paddingHorizontal: 10,
    backgroundColor: "#000",
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
  lightLabel: {
    color: "#000",
    fontSize: 16,
  },
  darkLabel: {
    color: "#f8f8f8",
    fontSize: 16,
  },

  lightInput: {
    fontSize: 16,
    color: "#000",
  },
  darkInput: {
    fontSize: 16,
    color: "#f8f8f8",
  },
  formGroup: {
    paddingVertical: 15,
  },
  lightMultiGroup: {
    paddingVertical: 15,
  },
  darkMultiGroup: {
    paddingVertical: 15,
  },
});

export { AddAffirmations };

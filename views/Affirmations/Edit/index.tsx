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

const EditAffirmations = (props: any) => {
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
    downReminder,
  } = data;

  const colorScheme = useColorScheme();
  const [newLoveMost, setLoveMost] = useState(loveMost);
  const [newSadManage, setSadManage] = useState(sadManage);
  const [newFirst, setFirst] = useState(first);
  const [newSecond, setSecond] = useState(second);
  const [newThird, setThird] = useState(third);
  const [newBetterSkill, setBetterSkill] = useState(betterSkill);
  const [newPleasantlySurprised, setPleasantlySurprised] = useState(
    pleasantlySurprised
  );
  const [newLookingAhead, setLookingAhead] = useState(lookingAhead);
  const [newAppreciated, setAppreciated] = useState(appreciated);
  const [newSelfThank, setSelfThank] = useState(selfThank);
  const [newDownReminder, setDownReminder] = useState(downReminder);

  const update = () => {
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
        tx.executeSql(`update affirmations set loveMost = ? where id = ?`, [
          newLoveMost,
          id,
        ]);
        tx.executeSql(`update affirmations set sadManage = ? where id = ?`, [
          newSadManage,
          id,
        ]);
        tx.executeSql(`update affirmations set first = ? where id = ?`, [
          newFirst,
          id,
        ]);
        tx.executeSql(`update affirmations set second = ? where id = ?`, [
          newSecond,
          id,
        ]);
        tx.executeSql(`update affirmations set third = ? where id = ?`, [
          newThird,
          id,
        ]);
        tx.executeSql(`update affirmations set betterSkill = ? where id = ?`, [
          newBetterSkill,
          id,
        ]);
        tx.executeSql(
          `update affirmations set pleasantlySurprised = ? where id = ?`,
          [newPleasantlySurprised, id]
        );
        tx.executeSql(`update affirmations set lookingAhead = ? where id = ?`, [
          newLookingAhead,
          id,
        ]);
        tx.executeSql(`update affirmations set appreciated = ? where id = ?`, [
          newAppreciated,
          id,
        ]);
        tx.executeSql(`update affirmations set selfThank = ? where id = ?`, [
          newSelfThank,
          id,
        ]);
        tx.executeSql(`update affirmations set downReminder = ? where id = ?`, [
          newDownReminder,
          id,
        ]);
      },
      (e) => {
        console.error(`Failed update: ${e.message}`);
      },
      () => {
        console.info("Successful Set");
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
          value={newLoveMost}
          multiline
        />
      </View>
      <View style={formGroup}>
        <Text style={label}>When I'm sad, I always manage to:</Text>
        <TextInput
          style={input}
          onChangeText={(val) => setSadManage(val)}
          placeholder="Placeholder: Try to Smile"
          value={newSadManage}
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
          value={newFirst}
          multiline
        />
        <TextInput
          style={input}
          onChangeText={(val) => setSecond(val)}
          placeholder="Placeholder: My Compassion"
          value={newSecond}
          multiline
        />
        <TextInput
          style={input}
          onChangeText={(val) => setThird(val)}
          placeholder="Placeholder: My Hope"
          value={newThird}
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
          value={newBetterSkill}
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
          value={newPleasantlySurprised}
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
          value={newLookingAhead}
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
          value={newAppreciated}
          multiline
        />
      </View>
      <View style={formGroup}>
        <Text style={label}>I want to thank myself for: </Text>
        <TextInput
          style={input}
          onChangeText={(val) => setSelfThank(val)}
          placeholder="Placeholder: Never giving up"
          value={newSelfThank}
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
          value={newDownReminder}
          multiline
        />
      </View>
      <TouchableOpacity
        style={button}
        onPress={() => {
          if (update()) {
            navigation.popToTop();
          } else {
            Alert.alert(
              "Update unsuccessful! Make sure all fields have values!"
            );
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
          Update
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
export { EditAffirmations };

import * as SQLite from "expo-sqlite";
import * as React from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Modal,
} from "react-native";
import { useColorScheme } from "react-native-appearance";

const { useState, useEffect } = React;

const db = SQLite.openDatabase("db.db");

const ViewAffirmations = (props: any) => {
  const colorScheme = useColorScheme();
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
  const [hasData, setHasData] = useState(false);
  const [help, showHelp] = useState(false);

  const nonecontainer =
    colorScheme === "light"
      ? styles.lightNoneContainer
      : styles.darkNoneContainer;
  const container =
    colorScheme === "light" ? styles.lightContainer : styles.darkContainer;

  const text = colorScheme === "light" ? styles.lightText : styles.darkText;

  const value = colorScheme === "light" ? styles.lightValue : styles.darkValue;
  const button =
    colorScheme === "light" ? styles.lightButton : styles.darkButton;
  const buttonText =
    colorScheme === "light" ? styles.lightButtonText : styles.darkButtonText;

  const modal_container =
    colorScheme === "light"
      ? styles.light_modal_container
      : styles.dark_modal_container;
  const modal_text =
    colorScheme === "light" ? styles.light_modal_text : styles.dark_modal_text;
  const modal_heading =
    colorScheme === "light"
      ? styles.light_modal_heading
      : styles.dark_modal_heading;
  const modal_button =
    colorScheme === "light"
      ? styles.light_modal_button
      : styles.dark_modal_button;
  const modal_button_label =
    colorScheme === "light"
      ? styles.light_modal_button_label
      : styles.dark_modal_button_label;

  const { gap, group } = styles;

  useEffect(() => {
    const interval = setInterval(() => {
      db.transaction((tx) => {
        tx.executeSql("select * from affirmations", [], (_, res) => {
          let rows: any = res.rows;
          let vals: any = rows["_array"];
          if (vals.length === 0 || vals === undefined) {
            setHasData(false);
          } else {
            setHasData(true);
            if (vals[0].hasOwnProperty("loveMost")) {
              setLoveMost(vals[0]["loveMost"]);
              setSadManage(vals[0]["sadManage"]);
              setFirst(vals[0]["first"]);
              setSecond(vals[0]["second"]);
              setThird(vals[0]["third"]);
              setBetterSkill(vals[0]["betterSkill"]);
              setPleasantlySurprised(vals[0]["pleasantlySurprised"]);
              setLookingAhead(vals[0]["lookingAhead"]);
              setAppreciated(vals[0]["appreciated"]);
              setSelfThank(vals[0]["selfThank"]);
              setDownReminder(vals[0]["downReminder"]);
            }
          }
        });
      });
    }, 1000);
    return () => clearInterval(interval);
  });

  const renderData = () => {
    if (!hasData) {
      return (
        <View style={nonecontainer}>
          <Text style={[text, {fontSize: 18}]}>Affirmations Not Set Yet</Text>
          <View style={gap} />

          <TouchableOpacity onPress={() => showHelp(true)} style={button}>
            <Text style={buttonText}>Help</Text>
          </TouchableOpacity>
          <View style={gap} />
          <TouchableOpacity
            onPress={() => navigation.navigate("SetAffirmations")}
            style={button}
          >
            <Text style={buttonText}>Set Affirmations</Text>
          </TouchableOpacity>
          <Modal
            animationType="slide"
            transparent={true}
            visible={help}
            onRequestClose={() => {
              showHelp(false);
            }}
          >
            <View style={modal_container}>
              <Text style={modal_heading}>Welcome!</Text>
              <Text style={modal_text}>
                This is an extended part of the Gratitude Journal App. This part
                allows you to write down some simple affirmations that you can
                always refer back to. As there are more fields, this part isn't
                a daily input, but rather can serve as a reminder to what is
                most important to ourselves, especially when we are at our
                lowest.
              </Text>
              <Text style={modal_text}>
                Just like the Journal aspect, this allows you to fill in 11
                fields all pertaining to some helpful personal affirmations.
                Feel free to write as much as you please, the screens will adapt
                to how ever much is written.
              </Text>
              <Text style={modal_text}>
                Once again, for those who are more concerned about data and
                information privacy, all data is stored locally on the app and
                never leaves the application itself. In this case, only the
                affirmations are stored in a separate database location as the
                journal entries.
              </Text>
              <Text style={modal_text}>
                Feel free to close me once you are done with the close button
                below!
              </Text>

              <View style={{ padding: 5 }} />
              <TouchableOpacity
                onPress={() => showHelp(false)}
                style={modal_button}
              >
                <Text style={modal_button_label}>Close</Text>
              </TouchableOpacity>
            </View>
          </Modal>
        </View>
      );
    } else {
      return (
        <ScrollView
          style={{
            flex: 1,
            backgroundColor: colorScheme === "light" ? "#f8f8f8" : "#000",
          }}
        >
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
                  Three things I would never want to change about myself would
                  be:
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
                I want to thank myself for{" "}
                <Text style={value}>{selfThank}</Text>
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
        </ScrollView>
      );
    }
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
});

export { ViewAffirmations };

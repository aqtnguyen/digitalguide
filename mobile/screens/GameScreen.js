import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useRoute, useNavigation } from "@react-navigation/native";
import axios from "axios";
import { api } from "../helpers/Constants";
import Icon from "react-native-vector-icons/Ionicons";

const GameScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const [quest, setQuest] = useState("");
  const [ans1, setAns1] = useState("");
  const [ans2, setAns2] = useState("");
  const [ans3, setAns3] = useState("");

  useEffect(() => {
    axios
      .get(`${api}/quiz/${route.params.id}`)
      .then((response) => {
        console.log(response.data);
        console.log(route.params.id);
        setQuest(response.data.found.question);
        setAns1(response.data.found.answer1);
        setAns2(response.data.found.answer2);
        setAns3(response.data.found.answer3);
      })
      .catch((error) => console.log(error));
  }, []);

  // load screen after asnyc function
  if (!ans3) return <Text>Loading...</Text>;

  const firstOpt = (ans) => {
    if (/right/.test(ans)) {
      Alert.alert("Great Job!");
    } else {
      Alert.alert("Try again!");
    }
  };

  const secondOpt = (ans) => {
    if (/right/.test(ans)) {
      Alert.alert("Great Job!");
    } else {
      Alert.alert("Try Again!");
    }
  };

  const thirdOpt = (ans) => {
    if (/right/.test(ans)) {
      Alert.alert("Great Job!");
    } else {
      Alert.alert("Try Again!");
    }
  };

  return (
    <SafeAreaView style={styles.quizContainer}>
      <View style={styles.contentContainer}>
        <Icon
          size={28}
          name="chevron-back-outline"
          color="black"
          onPress={() => navigation.navigate("Poi", { id: route.params.id })}
          style={{ marginBottom: 20 }}
        />
        <View style={{ marginVertical: 20 }}>
          <Text style={styles.buttonText}>{quest}</Text>
        </View>

        <TouchableOpacity
          style={styles.buttonContainer}
          onPress={() => firstOpt(ans1)}
        >
          <Text style={styles.buttonText}>
            {ans1.substring(0, ans1.length - 5)}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.buttonContainer}
          onPress={() => secondOpt(ans2)}
        >
          <Text style={styles.buttonText}>
            {ans2.substring(0, ans2.length - 5)}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.buttonContainer}
          onPress={() => thirdOpt(ans3)}
        >
          <Text style={styles.buttonText}>
            {ans3.substring(0, ans3.length - 5)}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  quizContainer: {
    flex: 1,
    backgroundColor: "#D9D9D9",
  },
  contentContainer: {
    padding: 20,
  },
  buttonText: {
    fontSize: 20,
    fontWeight: "bold",
  },
  buttonContainer: {
    alignItems: "center",
    backgroundColor: "#F9AA21",
    width: "100%",
    padding: 15,
    borderRadius: 10,
    marginTop: 30,
  },
});

export default GameScreen;

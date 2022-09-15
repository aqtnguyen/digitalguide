import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
  Alert,
} from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/Ionicons";
import axios from "axios";
import { api } from "../helpers/Constants";

const ForgotPassScreen = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");

  const resetPass = async () => {
    const data = { email: email };
    await axios
      .post(`${api}/tourist/resetpassword`, data)
      .then((response) => {
        if (response.data.error) {
          Alert.alert(response.data.error);
        } else {
          Alert.alert("You received an email, please check your mailbox!");
        }
      })
      .catch((error) => console.log(error));
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.contentContainer}>
        <Icon
          size={28}
          name="chevron-back-outline"
          color="black"
          onPress={() => navigation.navigate("Login")}
        />
        <Text style={{ fontWeight: "bold", fontSize: 25, marginTop: 30 }}>
          Please enter your registration email address
        </Text>
        <TextInput
          placeholder="Email"
          autoCapitalize="none"
          onChangeText={(email) => {
            setEmail(email);
          }}
          style={styles.input}
        />
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            resetPass();
          }}
        >
          <Text style={{ fontSize: 14, color: "white" }}>Send email</Text>
        </TouchableOpacity>
        <Text style={{ fontSize: 20, marginTop: 30 }}>
          We will send you an email to reset your password.
        </Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#D9D9D9",
  },
  contentContainer: {
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 10,
  },
  input: {
    backgroundColor: "white",
    padding: 15,
    borderRadius: 10,
    marginTop: 22,
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#7584BA",
    width: "100%",
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
  },
});

export default ForgotPassScreen;

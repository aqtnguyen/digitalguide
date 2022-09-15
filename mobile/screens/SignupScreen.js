import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  SafeAreaView,
  Alert,
} from "react-native";
import React, { useState, useContext } from "react";
import { useNavigation } from "@react-navigation/native";
import { AuthContext } from "../helpers/AuthContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Toast from "react-native-toast-message";
import Icon from "react-native-vector-icons/Ionicons";
import axios from "axios";
import { api } from "../helpers/Constants";

const objectField = (obj) => {
  return Object.values(obj).every((value) => value);
};

const updateError = (error, stateUpdate) => {
  stateUpdate(error);
  setTimeout(() => {
    stateUpdate("");
  }, 2500);
};

const validEmail = (value) => {
  const regx =
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return regx.test(value);
};

const SignupScreen = () => {
  const navigation = useNavigation();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const { setAuthState } = useContext(AuthContext);

  const isValidForm = () => {
    if (!objectField(username, email, password, confirmPassword))
      return updateError("All fields are required!", setError);
    if (!username.trim()) return updateError("Invalid username!", setError);
    if (!validEmail(email))
      return updateError("Please enter a valid email!!", setError);
    if (password.length < 6)
      return updateError("Password must contain at least 6 chars!", setError);
    if (password !== confirmPassword)
      return updateError("Passwords don't match!", setError);

    return true;
  };

  const handleSignUp = async () => {
    if (isValidForm()) {
      const data = { username: username, email: email, password: password };
      await axios
        .post(`${api}/tourist`, data)
        .then((response) => {
          if (response.data.error) {
            Alert.alert(response.data.error);
          } else {
            axios
              .post(`${api}/tourist/login`, {
                username: username,
                password: password,
              })
              .then((response) => {
                AsyncStorage.setItem("accessToken", response.data.token);
                setAuthState({
                  username: response.data.username,
                  id: response.data.id,
                  status: true,
                });
                Toast.show({
                  text1: "Welcome to Digital Guide!",
                });
                navigation.navigate("Tabbar");
              })
              .catch((error) => console.log(error));
          }
        })
        .catch((error) => console.log(error));
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#D9D9D9" }}>
      <View style={{ marginLeft: 20, marginTop: 10 }}>
        <Icon
          size={28}
          name="chevron-back-outline"
          color="black"
          onPress={() => navigation.navigate("Start")}
        />
      </View>
      <View style={styles.container}>
        <Text style={{ fontWeight: "bold", fontSize: 30, color: "#3f3d56" }}>
          Digital Guide
        </Text>

        <View style={styles.inputContainer}>
          {error ? (
            <Text style={{ fontSize: 22, fontWeight: "bold", color: "red" }}>
              {error}
            </Text>
          ) : null}
          <TextInput
            placeholder="Username"
            onChangeText={(username) => {
              setUsername(username);
            }}
            style={styles.input}
            placeholderTextColor="grey"
          />
          <TextInput
            placeholder="Email"
            onChangeText={(email) => {
              setEmail(email);
            }}
            style={styles.input}
            autoCapitalize="none"
            placeholderTextColor="grey"
          />
          <TextInput
            placeholder="Password"
            onChangeText={(password) => {
              setPassword(password);
            }}
            style={styles.input}
            autoCapitalize="none"
            placeholderTextColor="grey"
            secureTextEntry
          />

          <TextInput
            placeholder="Confirm Password"
            onChangeText={(confirmPassword) => {
              setConfirmPassword(confirmPassword);
            }}
            style={styles.input}
            autoCapitalize="none"
            placeholderTextColor="grey"
            secureTextEntry
          />
          {/* <Text style={{ marginTop: 20, marginBottom: 20 }}>
            By creating an account, you agree to the Terms of Service. For more
            information about Digital Guide's privacy practices, see the Digital
            Guide Privacy Statement.
          </Text> */}

          <TouchableOpacity
            style={styles.button}
            onPress={() => handleSignUp()}
          >
            <Text style={styles.buttonText}>Sign Up</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate("Login")}
          >
            <Text style={styles.buttonText}>Sign In</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
  inputContainer: {
    width: "80%",
  },
  input: {
    backgroundColor: "white",
    padding: 15,
    borderRadius: 10,
    marginTop: 22,
  },
  buttonContainer: {
    alignItems: "center",
    width: "80%",
  },
  button: {
    alignItems: "center",
    backgroundColor: "#7584BA",
    width: "100%",
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
  },
  buttonText: {
    fontSize: 14,
    color: "white",
  },
});

export default SignupScreen;

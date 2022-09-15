import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  TextInput,
  SafeAreaView,
  Alert,
} from "react-native";
import React, { useContext, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { AuthContext } from "../helpers/AuthContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Toast from "react-native-toast-message";
import Icon from "react-native-vector-icons/Ionicons";
import axios from "axios";
import { api } from "../helpers/Constants";

const LoginScreen = () => {
  const navigation = useNavigation();
  const { setAuthState } = useContext(AuthContext);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const loginin = () => {
    const data = { username: username, password: password };
    axios
      .post(`${api}/tourist/login`, data)
      .then((response) => {
        if (response.data.error) {
          Alert.alert(response.data.error);
        } else {
          AsyncStorage.setItem("accessToken", response.data.token);
          setAuthState({
            username: response.data.username,
            id: response.data.id,
            status: true,
          });
          Toast.show({
            text1: "We've already missed you. Welcome Back!",
          });

          navigation.navigate("Tabbar");
        }
      })
      .catch((error) => console.log(error));
  };

  return (
    <SafeAreaView>
      <View style={{ marginLeft: 20, marginTop: 10 }}>
        <Icon
          size={28}
          name="chevron-back-outline"
          color="black"
          onPress={() => navigation.navigate("Start")}
        />
      </View>
      <View style={styles.container}>
        <Image
          source={require("../assets/auth/logo.png")}
          style={{ width: 200, height: 200, marginVertical: 20 }}
        />

        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Username or Email"
            onChangeText={(username) => {
              setUsername(username);
            }}
            style={styles.input}
            placeholderTextColor="grey"
            autoCapitalize="none"
          />
          <TextInput
            placeholder="Password"
            onChangeText={(password) => {
              setPassword(password);
            }}
            style={styles.input}
            placeholderTextColor="grey"
            secureTextEntry
          />

          <TouchableOpacity
            style={{ marginTop: 20 }}
            onPress={() => navigation.navigate("ForgotPass")}
          >
            <Text style={{ fontSize: 22 }}>Forgot Password?</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              loginin();
            }}
          >
            <Text style={styles.buttonText}>Log In</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate("Signup")}
          >
            <Text style={styles.buttonText}>Register</Text>
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

export default LoginScreen;

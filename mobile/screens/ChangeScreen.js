import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import React, { useState, useContext } from "react";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import { api } from "../helpers/Constants";
import Icon from "react-native-vector-icons/Ionicons";
import { AuthContext } from "../helpers/AuthContext";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

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

const ChangeScreen = () => {
  const navigation = useNavigation();
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [oldEmail, setOldEmail] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [error, setError] = useState("");
  const { authState } = useContext(AuthContext);

  const isValidEmail = () => {
    if (!validEmail(oldEmail))
      return updateError("Please enter a valid email!!", setError);
    if (!validEmail(newEmail))
      return updateError("Please enter a valid email!!", setError);
    return true;
  };

  const isValidPassword = () => {
    if (newPassword.length < 6)
      return updateError("Password must contain at least 6 chars!", setError);
    return true;
  };

  const changeEmail = async () => {
    if (isValidEmail()) {
      await axios
        .put(`${api}/tourist/changeemail/${authState.id}`, {
          oldEmail: oldEmail,
          newEmail: newEmail,
        })
        .then((response) => {
          if (response.data.error) {
            setError(response.data.error);
          } else {
            Alert.alert("You successfully changed your email!");
          }
        });
    }
  };

  const changePassword = async () => {
    if (isValidPassword()) {
      await axios
        .put(`${api}/tourist/changepassword/${authState.id}`, {
          oldPassword: oldPassword,
          newPassword: newPassword,
        })
        .then((response) => {
          if (response.data.error) {
            setError(response.data.error);
          } else {
            Alert.alert("You successfully changed your password!");
          }
        });
    }
  };

  return (
    <SafeAreaView style={styles.changeContainer}>
      <KeyboardAwareScrollView style={styles.contentContainer}>
        <View style={{ marginBottom: 20 }}>
          <Icon
            size={28}
            name="chevron-back-outline"
            color="black"
            onPress={() => navigation.navigate("Profile")}
          />
        </View>
        <Text style={{ fontSize: 30, fontWeight: "bold", marginBottom: 20 }}>
          Settings
        </Text>

        <Text style={{ fontSize: 20 }}>Current Email</Text>
        <TextInput
          placeholder="Username"
          onChangeText={(oldEmail) => {
            setOldEmail(oldEmail);
          }}
          style={styles.input}
          autoCapitalize="none"
          placeholderTextColor="grey"
        />

        <Text style={{ fontSize: 20 }}>New Email</Text>
        <TextInput
          placeholder="Username"
          onChangeText={(newEmail) => {
            setNewEmail(newEmail);
          }}
          style={styles.input}
          autoCapitalize="none"
          placeholderTextColor="grey"
        />

        <TouchableOpacity style={styles.button} onPress={() => changeEmail()}>
          <Text style={styles.buttonText}>Change Email</Text>
        </TouchableOpacity>

        <Text style={{ fontSize: 20 }}>Current Password</Text>
        <TextInput
          placeholder="Username"
          onChangeText={(oldPassword) => {
            setOldPassword(oldPassword);
          }}
          style={styles.input}
          autoCapitalize="none"
          placeholderTextColor="grey"
          secureTextEntry
        />

        <Text style={{ fontSize: 20 }}>New Password</Text>
        <TextInput
          placeholder="Username"
          onChangeText={(newPassword) => {
            setNewPassword(newPassword);
          }}
          style={styles.input}
          autoCapitalize="none"
          placeholderTextColor="grey"
          secureTextEntry
        />
        <TouchableOpacity
          style={styles.button}
          onPress={() => changePassword()}
        >
          <Text style={styles.buttonText}>Change Password</Text>
        </TouchableOpacity>
        {error ? <Text style={{ color: "red" }}>{error}</Text> : null}
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  changeContainer: {
    flex: 1,
    backgroundColor: "#D9D9D9",
  },
  contentContainer: {
    padding: 20,
  },
  input: {
    backgroundColor: "white",
    padding: 15,
    borderRadius: 10,
    marginBottom: 22,
  },
  button: {
    alignItems: "center",
    backgroundColor: "#F9AA21",
    width: "100%",
    padding: 15,
    borderRadius: 10,
    marginBottom: 60,
  },
});

export default ChangeScreen;

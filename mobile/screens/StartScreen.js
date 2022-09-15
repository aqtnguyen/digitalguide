import React, { useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  SafeAreaView,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { GOOGLE_LOGIN_API_KEY, FACEBOOK_LOGIN_API_KEY } from "@env";
import { useNavigation } from "@react-navigation/native";
import { AuthContext } from "../helpers/AuthContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Toast from "react-native-toast-message";
import * as Google from "expo-auth-session/providers/google";
import * as Facebook from "expo-auth-session/providers/facebook";
import axios from "axios";

const StartScreen = () => {
  const navigation = useNavigation();
  const { setAuthState } = useContext(AuthContext);

  const [_, __, googlePromptAsync] = Google.useAuthRequest({
    expoClientId: GOOGLE_LOGIN_API_KEY,
    iosClientId: "GOOGLE_GUID.apps.googleusercontent.com",
    androidClientId: "GOOGLE_GUID.apps.googleusercontent.com",
    webClientId: "GOOGLE_GUID.apps.googleusercontent.com",
  });

  const [___, ____, fbPromptAsync] = Facebook.useAuthRequest({
    clientId: FACEBOOK_LOGIN_API_KEY,
  });

  const googleRegister = async () => {
    const response = await googlePromptAsync();
    if (response.type === "success") {
      const { access_token } = response.params;

      await axios
        .get("https://www.googleapis.com/userinfo/v2/me", {
          headers: {
            Authorization: "Bearer " + access_token,
          },
        })
        .then((response) => {
          const googleId = response.data.id.slice(0, 6);
          console.log(googleId);
          AsyncStorage.setItem("accessToken", access_token);
          setAuthState({
            username: response.data.given_name,
            id: parseInt(googleId, 10),
            status: true,
          });
          Toast.show({
            text1: "We've already missed you. Welcome Back!",
          });
          navigation.navigate("Tabbar");
        });
    }
  };

  const facebookRegister = async () => {
    const response = await fbPromptAsync();
    if (response.type === "success") {
      const { access_token } = response.params;

      await axios
        .get(
          `https://graph.facebook.com/me?fields=id,name,email&access_token=${access_token}`
        )
        .then((response) => {
          const facebookId = response.data.id.slice(0, 7);
          console.log(facebookId);
          AsyncStorage.setItem("accessToken", access_token);
          setAuthState({
            username: response.data.name,
            id: parseInt(facebookId, 10),
            status: true,
          });
          Toast.show({
            text1: "We've already missed you. Welcome Back!",
          });
          navigation.navigate("Tabbar");
        });
    } else {
      console.log("didnt work");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity
        onPress={() => navigation.navigate("Tabbar")}
        style={{ alignItems: "flex-end", padding: 20 }}
      >
        <Text style={{ textDecorationLine: "underline", fontSize: 15 }}>
          Skip
        </Text>
      </TouchableOpacity>
      <View style={styles.imgContainer}>
        <Image
          source={require("../assets/auth/logo.png")}
          style={{
            width: 180,
            height: 180,
            marginBottom: 40,
            marginTop: 40,
          }}
        />
      </View>
      <View style={styles.textContainer}>
        <Text style={{ fontSize: 30, fontWeight: "bold", color: "#3f3d56" }}>
          Explore a city one tour
        </Text>
        <Text style={{ fontSize: 30, fontWeight: "bold", color: "#3f3d56" }}>
          at a time
        </Text>
        <Text style={{ fontSize: 27, fontWeight: "bold", color: "#3f3d56" }}>
          to your desire!
        </Text>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={() => facebookRegister()}
          style={styles.button}
        >
          <Icon
            size={20}
            name="logo-facebook"
            color="white"
            style={{ marginRight: 30 }}
          />
          <Text style={{ fontSize: 20, color: "white" }}>
            Sign In with Facebook
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => googleRegister()}
          style={styles.button}
        >
          <Icon
            size={20}
            name="logo-google"
            color="white"
            style={{ marginRight: 30 }}
          />
          <Text style={{ fontSize: 20, color: "white" }}>
            Sign In with Google
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate("Login")}
          style={styles.button}
        >
          <Icon
            size={20}
            name="mail"
            color="white"
            style={{ marginRight: 30 }}
          />
          <Text style={{ fontSize: 20, color: "white" }}>
            Sign In with Email
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("Signup")}>
          <Text
            style={{
              textDecorationLine: "underline",
              fontSize: 15,
              marginTop: 10,
            }}
          >
            Sign Up
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imgContainer: {
    alignItems: "center",
  },
  textContainer: {
    paddingLeft: 20,
  },
  buttonContainer: {
    alignItems: "center",
    padding: 30,
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#7584BA",
    width: "100%",
    padding: 14,
    borderRadius: 10,
    marginBottom: 20,
  },
});

export default StartScreen;

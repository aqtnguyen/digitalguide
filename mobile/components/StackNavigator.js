import React, { useEffect, useState } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import { AuthContext } from "../helpers/AuthContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Linking from "expo-linking";
import Toast from "react-native-toast-message";
import axios from "axios";
import { api } from "../helpers/Constants";

import {
  StartScreen,
  SignupScreen,
  LoginScreen,
  ForgotPassScreen,
  TourInfoScreen,
  PoiInfoScreen,
  TabNavigator,
  PoiScreen,
  WriteReviewScreen,
  SeeReviewScreen,
  ChangeScreen,
  CategoryScreen,
  GameScreen,
  SeeProfileScreen,
} from "./index";

import Camera from "./Camera";

const Stack = createNativeStackNavigator();

const StackNavigator = () => {
  const prefix = Linking.createURL("/");
  const linking = {
    prefixes: [prefix],
    config: {
      screens: {
        Home: "home",
        Poi: {
          path: "poi/:id",
          parse: {
            id: (id) => `${id}`,
          },
        },
      },
    },
  };

  const [authState, setAuthState] = useState({
    username: "",
    id: 0,
    status: false,
  });

  const [favourite, setFavourite] = useState([]);

  useEffect(async () => {
    await axios.get(`${api}/tourist/auth`).then((response) => {
      if (response.data.error) {
        setAuthState({ ...authState, status: false });
      } else {
        setAuthState({
          username: response.data.username,
          id: response.data.id,
          status: true,
        });
      }
    });
  }, []);

  return (
    <AuthContext.Provider
      value={{ authState, setAuthState, favourite, setFavourite }}
    >
      <NavigationContainer linking={linking}>
        <Stack.Navigator>
          <Stack.Screen
            name="Start"
            component={StartScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Signup"
            component={SignupScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="ForgotPass"
            component={ForgotPassScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Tabbar"
            component={TabNavigator}
            options={{ headerShown: false, gestureEnabled: false }}
          />
          <Stack.Screen
            name="Category"
            component={CategoryScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Tour"
            component={TourInfoScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="PoiInfo"
            component={PoiInfoScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Poi"
            component={PoiScreen}
            options={{ headerShown: false, gestureEnabled: false }}
          />
          <Stack.Screen
            name="WriteReview"
            component={WriteReviewScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="SeeReview"
            component={SeeReviewScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Change"
            component={ChangeScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Camera"
            component={Camera}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Game"
            component={GameScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="SeeProfile"
            component={SeeProfileScreen}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
      <Toast />
    </AuthContext.Provider>
  );
};

export default StackNavigator;

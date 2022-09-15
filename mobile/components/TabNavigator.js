import { View, Image } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React, { useEffect, useContext } from "react";
import { AuthContext } from "../helpers/AuthContext";
import { useIsFocused } from "@react-navigation/native";
import HomeScreen from "../screens/HomeScreen";
import ProfileScreen from "../screens/ProfileScreen";
import FavScreen from "../screens/FavScreen";
import FilterScreen from "../screens/FilterScreen";
import axios from "axios";
import { api } from "../helpers/Constants";

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  const isFocused = useIsFocused();
  const { authState, favourite, setFavourite } = useContext(AuthContext);

  useEffect(() => {
    axios
      .get(`${api}/fav/${authState.id}`)
      .then((response) => {
        setFavourite(response.data);
      })
      .catch((error) => console.log(error));
  }, [isFocused]);

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarShowLabel: false,
        headerShown: false,
        tabBarStyle: {
          position: "absolute",
          bottom: 30,
          left: 60,
          right: 60,
          borderRadius: 15,
          height: 70,
          backgroundColor: "#778899",
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <View>
              <Image
                source={require("../assets/tabbar/home.png")}
                resizeMode="contain"
                style={{
                  marginTop: 25,
                  width: 40,
                  height: 40,
                  tintColor: focused ? "#F9AA21" : "black",
                }}
              />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Filter"
        component={FilterScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <View>
              <Image
                source={require("../assets/tabbar/search.png")}
                resizeMode="contain"
                style={{
                  marginTop: 25,
                  width: 40,
                  height: 40,
                  tintColor: focused ? "#F9AA21" : "black",
                }}
              />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Fav"
        component={FavScreen}
        options={{
          tabBarBadge: favourite.length ? favourite.length : null,
          tabBarBadgeStyle: { backgroundColor: "#F9AA21" },
          tabBarIcon: ({ focused }) => (
            <View>
              <Image
                source={require("../assets/tabbar/fav.png")}
                resizeMode="contain"
                style={{
                  marginTop: 25,
                  width: 40,
                  height: 40,
                  tintColor: focused ? "#F9AA21" : "black",
                }}
              />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <View>
              <Image
                source={require("../assets/tabbar/profile.png")}
                resizeMode="contain"
                style={{
                  marginTop: 25,
                  width: 40,
                  height: 40,
                  tintColor: focused ? "#F9AA21" : "black",
                }}
              />
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigator;

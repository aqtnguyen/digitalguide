import {
  Text,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  View,
  Image,
  TextInput,
  Alert,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { useNavigation, useIsFocused } from "@react-navigation/native";
import { AuthContext } from "../helpers/AuthContext";
import Icon from "react-native-vector-icons/Ionicons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { api } from "../helpers/Constants";

const ProfileScreen = () => {
  const { authState, setAuthState } = useContext(AuthContext);
  const [userInfo, setUserInfo] = useState([]);
  const [description, setDescription] = useState("");
  const navigation = useNavigation();
  const isFocused = useIsFocused();

  useEffect(() => {
    axios
      .get(`${api}/tourist/${authState.id}`)
      .then((response) => {
        setUserInfo(response.data);
      })
      .catch((error) => console.log(error));
  }, [isFocused]);

  const logout = () => {
    AsyncStorage.removeItem("accessToken");
    setAuthState({ username: "", id: 0, status: false });
    navigation.navigate("Start");
  };

  const addDescription = async () => {
    await axios
      .put(`${api}/tourist/adddescription/${authState.id}`, {
        description: description,
      })
      .then(() => {
        Alert.alert("You successfully added a description");
      })
      .catch((error) => console.log(error));
  };

  const testButton = async () => {
    console.log(await AsyncStorage.getItem("accessToken"));
  };

  return (
    <SafeAreaView style={styles.profileContainer}>
      <View style={styles.contentContainer}>
        <Text style={{ fontSize: 30, fontWeight: "bold", marginBottom: 20 }}>
          Profile
        </Text>
        {authState.id ? (
          <View>
            {userInfo.map((value, index) => {
              return (
                <View key={index}>
                  <View
                    style={{
                      marginVertical: 10,
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                  >
                    <Image
                      source={{
                        uri: `https://avatars.dicebear.com/api/initials/${value.username}.png`,
                      }}
                      style={{
                        width: 130,
                        height: 130,
                        borderRadius: 100,
                        borderWidth: 2,
                      }}
                    />
                    <View style={{ flexDirection: "row" }}>
                      <Icon
                        size={30}
                        name="settings-outline"
                        color="black"
                        onPress={() => navigation.navigate("Change")}
                      />
                      <Icon
                        size={30}
                        name="share-social-outline"
                        color="black"
                        onPress={() => testButton()}
                        style={{ marginLeft: 20 }}
                      />
                    </View>
                  </View>
                  <Text style={{ fontSize: 20 }}>{value.username}</Text>
                  <Text style={{ fontSize: 20, marginBottom: 20 }}>
                    {value.email}
                  </Text>
                  <View style={styles.descriptionContainer}>
                    <TextInput
                      placeholder={value.description}
                      placeholderTextColor="black"
                      onChangeText={(description) => {
                        setDescription(description);
                      }}
                    />
                  </View>
                  <View style={{ alignItems: "flex-end" }}>
                    <TouchableOpacity
                      style={styles.buttonContainer}
                      onPress={() => addDescription()}
                    >
                      <Text style={{ fontWeight: "bold" }}>
                        Add description
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              );
            })}
            <TouchableOpacity
              style={{ alignItems: "center", marginTop: 40 }}
              onPress={() => {
                logout();
              }}
            >
              <Text
                style={{
                  fontSize: 20,
                  textDecorationLine: "underline",
                }}
              >
                Sign Out
              </Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.noAccountView}>
            <Text style={{ fontSize: 20 }}>You don't have an account yet.</Text>
            <Text style={{ fontSize: 20 }}>
              Do you want to join our community?
            </Text>
            <TouchableOpacity
              style={{ marginTop: 40 }}
              onPress={() => {
                logout();
              }}
            >
              <Text style={{ fontSize: 30, textDecorationLine: "underline" }}>
                Join here
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  profileContainer: {
    flex: 1,
    backgroundColor: "#D9D9D9",
  },
  contentContainer: {
    padding: 20,
  },
  usernameContainer: {
    borderWidth: 2,
    borderRadius: 14,
    padding: 15,
    marginBottom: 20,
  },
  descriptionContainer: {
    height: "40%",
    borderWidth: 2,
    borderRadius: 14,
    padding: 15,
  },
  buttonContainer: {
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    backgroundColor: "#F9AA21",
    padding: 15,
  },
  noAccountView: {
    height: "80%",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default ProfileScreen;

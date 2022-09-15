import { View, Text, SafeAreaView, StyleSheet, Image } from "react-native";
import React, { useEffect, useState } from "react";
import {
  useRoute,
  useNavigation,
  useIsFocused,
} from "@react-navigation/native";
import Icon from "react-native-vector-icons/MaterialIcons";
import axios from "axios";
import { api } from "../helpers/Constants";

const SeeProfileScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const isFocused = useIsFocused();
  const [userInfo, setUserInfo] = useState([]);

  useEffect(() => {
    axios
      .get(`${api}/tourist/${route.params.id}`)
      .then((response) => {
        setUserInfo(response.data);
      })
      .catch((error) => console.log(error));
  }, [isFocused]);

  const seeReview = (id) => {
    navigation.navigate("SeeReview", { id: id });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.contentContainer}>
        <View style={{ marginBottom: 20 }}>
          <Icon
            size={28}
            name="arrow-back-ios"
            color="black"
            onPress={() => seeReview(route.params.tour)}
          />
        </View>
        {userInfo.map((value, index) => {
          return (
            <View key={index}>
              <View
                style={{
                  marginVertical: 10,
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <View>
                  <Text style={{ fontSize: 40, fontWeight: "bold" }}>
                    {value.username}
                  </Text>
                  <Text style={{ fontSize: 20, marginBottom: 20 }}>
                    Joined{" "}
                    {value.createdAt.substring(0, value.createdAt.length - 14)}
                  </Text>
                </View>
                <Image
                  source={{
                    uri: `https://avatars.dicebear.com/api/initials/${value.username}.png`,
                  }}
                  style={{
                    width: 100,
                    height: 100,
                    borderRadius: 100,
                    borderWidth: 2,
                  }}
                />
              </View>
              <View style={styles.descriptionContainer}>
                <Text style={{ fontSize: 20 }}>{value.description}</Text>
              </View>
            </View>
          );
        })}
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
    padding: 20,
  },
  descriptionContainer: {
    marginTop: 20,
    height: "60%",
    borderWidth: 2,
    borderRadius: 14,
    padding: 15,
  },
});

export default SeeProfileScreen;

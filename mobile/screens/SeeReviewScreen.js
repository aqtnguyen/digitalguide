import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  Image,
  Alert,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState, useContext } from "react";
import {
  useRoute,
  useNavigation,
  useIsFocused,
} from "@react-navigation/native";
import { AuthContext } from "../helpers/AuthContext";
import Rating from "../components/Rating";
import Icon from "react-native-vector-icons/MaterialIcons";
import axios from "axios";
import { api } from "../helpers/Constants";

const SeeReviewScreen = () => {
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const route = useRoute();
  const [review, setReview] = useState([]);
  const { authState } = useContext(AuthContext);

  useEffect(async () => {
    await axios
      .get(`${api}/rev/${route.params.id}`)
      .then((response) => {
        setReview(response.data);
      })
      .catch((error) => console.log(error));
  }, [isFocused]);

  const tourStart = (id) => {
    navigation.navigate("Tour", { id: id });
  };

  const tourReview = (id) => {
    navigation.navigate("WriteReview", { id: id });
  };

  const seeProfile = (id) => {
    navigation.navigate("SeeProfile", { id: id, tour: route.params.id });
  };

  const deleteReview = (id) => {
    Alert.alert("Delete option", "Do you want to delete your review?", [
      {
        text: "Cancel",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel",
      },
      {
        text: "OK",
        onPress: async () => {
          await axios
            .delete(`${api}/rev/${route.params.id}/${authState.id}`)
            .then(() => {
              setReview(
                review.filter((val) => {
                  return val.id !== id;
                })
              );
            })
            .catch((error) => console.log(error));
        },
      },
    ]);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.contentContainer}>
        <View style={{ marginBottom: 20 }}>
          <Icon
            size={28}
            name="arrow-back-ios"
            color="black"
            onPress={() => tourStart(route.params.id)}
          />
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <View>
            <Text style={{ fontSize: 22, fontWeight: "bold" }}>
              User's review for
            </Text>
            <Text
              style={{
                fontSize: 22,
                fontWeight: "bold",
                color: "#F9AA21",
              }}
            >
              {route.params.title}
            </Text>
          </View>
          <Image
            source={require("../assets/home/rating.png")}
            style={{ width: 130, height: 130 }}
          />
        </View>
        <ScrollView style={{ height: "65%" }}>
          {review.map((value, item) => {
            return (
              <View style={styles.reviewContainer} key={item}>
                <View
                  style={{
                    justifyContent: "space-between",
                    flexDirection: "row",
                  }}
                >
                  <TouchableOpacity onPress={() => seeProfile(value.touristId)}>
                    <Text style={{ fontSize: 22, fontWeight: "bold" }}>
                      {value.touristName}
                    </Text>
                  </TouchableOpacity>
                  <Text style={{ fontSize: 22 }}>{value.createdAt}</Text>
                </View>
                <View style={{ marginVertical: 10 }}>
                  <Rating value={value.reviewRating} />
                </View>
                <ScrollView>
                  <Text style={{ fontSize: 22 }}>{value.reviewText}</Text>
                </ScrollView>
                {value.touristId === authState.id && (
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "flex-end",
                    }}
                  >
                    <Icon
                      name="delete"
                      color="black"
                      size={30}
                      onPress={() => deleteReview(value.id)}
                    />
                    <Icon
                      name="edit"
                      color="black"
                      size={30}
                      style={{ marginLeft: 20 }}
                      onPress={() => tourReview(value.tourId)}
                    />
                  </View>
                )}
              </View>
            );
          })}
        </ScrollView>
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
  backButton: {
    alignItems: "center",
    justifyContent: "center",
    margin: 10,
    width: 60,
    height: 60,
    borderRadius: 60,
    backgroundColor: "black",
  },
  reviewContainer: {
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 20,
    paddingBottom: 10,
    height: 180,
    backgroundColor: "white",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    marginBottom: 10,
  },
});

export default SeeReviewScreen;

import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Alert,
} from "react-native";
import React, { useEffect, useState, useContext } from "react";
import { useRoute, useNavigation } from "@react-navigation/native";
import { AuthContext } from "../helpers/AuthContext";
import Icon from "react-native-vector-icons/Ionicons";
import axios from "axios";
import Rating from "../components/Rating";
import Toast from "react-native-toast-message";
import { api } from "../helpers/Constants";

const TourInfoScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const [tour, setTour] = useState([]);
  const [review, setReview] = useState([]);
  const [favorite, setFavorite] = useState(null);
  const [rating, setRating] = useState(0);
  const { authState } = useContext(AuthContext);

  useEffect(async () => {
    await axios
      .get(`${api}/rev/${route.params.id}`)
      .then((response) => {
        setRating(response.data.length);
        setReview(response.data);
      })
      .catch((error) => console.log(error));
    await axios
      .get(`${api}/tour/createdtour/${route.params.id}`)
      .then(async (response) => {
        setTour(response.data);
        await axios
          .get(`${api}/fav/${response.data[0].id}/${authState.id}`)
          .then((response) => {
            if (response.data.status) {
              setFavorite(false);
            } else {
              setFavorite(true);
            }
          })
          .catch((error) => console.log(error));
      })
      .catch((error) => console.log(error));
  }, []);

  const poiStart = async (id) => {
    await axios
      .put(`${api}/tour/addcounter/${route.params.id}`)
      .then(() => {
        navigation.navigate("PoiInfo", { id: id });
      })
      .catch((error) => console.log(error));
  };

  const reviewScreen = (tour) => {
    navigation.navigate("SeeReview", { id: tour.id, title: tour.title });
  };

  const addFavHandler = async (id) => {
    if (authState.id) {
      const data = { touristId: authState.id, tourId: id };
      await axios
        .post(`${api}/fav`, data)
        .then((response) => {
          if (response.data.fav) {
            setFavorite(false);
            Toast.show({
              text1: "Great! A new tour on your fav list",
            });
          } else {
            setFavorite(true);
            Toast.show({
              type: "error",
              text1: "Tour removed from fav list",
            });
          }
        })
        .catch((error) => console.log(error));
    } else {
      Alert.alert("You've to create an account for this!");
    }
  };

  const result = review.reduce((a, v) => (a = a + v.reviewRating), 0);
  const stars = Math.round((result / rating) * 10) / 10;

  return (
    <SafeAreaView style={styles.tourContainer}>
      {tour.map((value, index) => {
        return (
          <View style={styles.contentContainer} key={index}>
            <View style={{ marginBottom: 20 }}>
              <Icon
                size={28}
                name="chevron-back-outline"
                color="black"
                onPress={() => navigation.navigate("Tabbar")}
              />
            </View>
            <Image
              source={{
                uri: `${api}/Images/${value.tourImg}`,
              }}
              style={{ width: "100%", height: 200, borderRadius: 10 }}
            />
            <View>
              <Text style={{ fontSize: 22, marginTop: 20, fontWeight: "bold" }}>
                {value.title}
              </Text>
              <Text style={{ fontSize: 18, marginTop: 10, fontWeight: "bold" }}>
                {value.city}
              </Text>
            </View>

            <View style={{ flexDirection: "row", marginTop: 19, height: 100 }}>
              <Icon size={28} name="document-text-outline" color="#F9AA21" />
              <ScrollView>
                <Text
                  style={{ fontSize: 16, marginLeft: 10, paddingRight: 20 }}
                >
                  {value.tourText}
                </Text>
              </ScrollView>
            </View>

            <View
              style={{
                flexDirection: "row",
                marginBottom: 22,
                alignItems: "center",
              }}
            >
              <Icon size={28} name="time-outline" color="#F9AA21" />
              <Text style={{ fontSize: 16, marginLeft: 10 }}>
                estimated duration: {value.duration} min
              </Text>
            </View>

            <View
              style={{
                flexDirection: "row",
                marginBottom: 22,
                alignItems: "center",
              }}
            >
              <Icon size={28} name="location-outline" color="#F9AA21" />
              <Text style={{ fontSize: 16, marginLeft: 10 }}>
                estimated distance: {value.distance} km
              </Text>
            </View>

            <View
              style={{
                flexDirection: "row",
                marginBottom: 22,
                alignItems: "center",
              }}
            >
              <Icon size={28} name="walk-outline" color="#F9AA21" />
              <Text style={{ fontSize: 16, marginLeft: 10 }}>
                {value.counter} people walked this tour
              </Text>
            </View>

            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              {stars ? (
                <Rating value={stars} />
              ) : (
                <View style={{ flexDirection: "row" }}>
                  <Icon size={30} name="star-outline" color="#F9AA21" />
                  <Icon size={30} name="star-outline" color="#F9AA21" />
                  <Icon size={30} name="star-outline" color="#F9AA21" />
                  <Icon size={30} name="star-outline" color="#F9AA21" />
                  <Icon size={30} name="star-outline" color="#F9AA21" />
                </View>
              )}
              <Text style={{ fontSize: 16 }}>
                {(stars ? stars : 0) + "/5" + " (" + rating + ")"}
              </Text>
              <TouchableOpacity onPress={() => reviewScreen(value)}>
                <Text style={{ fontSize: 16, textDecorationLine: "underline" }}>
                  See Reviews
                </Text>
              </TouchableOpacity>
            </View>

            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                marginTop: 18,
              }}
            >
              <TouchableOpacity
                style={styles.button}
                onPress={() => {
                  poiStart(value.id);
                }}
              >
                <Text
                  style={{ fontSize: 22, fontWeight: "bold", color: "white" }}
                >
                  Start Tour
                </Text>
              </TouchableOpacity>
              {favorite ? (
                <TouchableOpacity style={styles.button}>
                  <Text
                    style={{ fontSize: 22, fontWeight: "bold", color: "white" }}
                    onPress={() => {
                      addFavHandler(value.id);
                    }}
                  >
                    Favourite
                  </Text>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  style={{ ...styles.button, ...styles.rbutton }}
                >
                  <Text
                    style={{ fontSize: 22, fontWeight: "bold", color: "white" }}
                    onPress={() => {
                      addFavHandler(value.id);
                    }}
                  >
                    Remove
                  </Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
        );
      })}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  tourContainer: {
    flex: 1,
    backgroundColor: "#D9D9D9",
  },
  contentContainer: {
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 10,
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    margin: 10,
    width: 150,
    height: 60,
    borderRadius: 7,
    backgroundColor: "#F9AA21",
  },
  rbutton: {
    backgroundColor: "red",
  },
});

export default TourInfoScreen;

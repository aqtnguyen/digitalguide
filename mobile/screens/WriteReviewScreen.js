import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Image,
  TextInput,
  Alert,
} from "react-native";
import React, { useState, useContext, useEffect } from "react";
import {
  useRoute,
  useNavigation,
  useIsFocused,
} from "@react-navigation/native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { AuthContext } from "../helpers/AuthContext";
import Icon from "react-native-vector-icons/Ionicons";
import Toast from "react-native-toast-message";
import axios from "axios";
import { api } from "../helpers/Constants";

const WriteReviewScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const { authState } = useContext(AuthContext);
  const [defaultRating, setDefaultRating] = useState(2);
  const [rating, setRating] = useState([1, 2, 3, 4, 5]);
  const [review, setReview] = useState();
  const [written, setWritten] = useState(null);

  useEffect(async () => {
    await axios
      .get(`${api}/rev/${route.params.id}/${authState.id}`)
      .then((response) => {
        if (response.data.status) {
          setWritten(true);
        } else {
          setWritten(false);
        }
      })
      .catch((error) => console.log(error));
  }, []);

  const starImgCorner =
    "https://github.com/tranhonghan/images/blob/main/star_corner.png?raw=true";
  const starImgFilled =
    "https://github.com/tranhonghan/images/blob/main/star_filled.png?raw=true";

  const RatingBar = () => {
    return (
      <View style={styles.ratingBar}>
        {rating.map((value, index) => {
          return (
            <TouchableOpacity
              activeOpacity={0.7}
              key={index}
              onPress={() => setDefaultRating(value)}
            >
              <Image
                style={styles.starImg}
                source={
                  value <= defaultRating
                    ? { uri: starImgFilled }
                    : { uri: starImgCorner }
                }
              />
            </TouchableOpacity>
          );
        })}
      </View>
    );
  };

  const addReviewHandler = async (id) => {
    const data = {
      tourId: id,
      touristId: authState.id,
      touristName: authState.username,
      reviewText: review,
      reviewRating: defaultRating,
    };
    await axios
      .post(`${api}/rev`, data)
      .then((response) => {
        console.log(response);
        Toast.show({
          text1: "Great, you successfully added a review!",
        });
        navigation.navigate("SeeReview", { id: route.params.id });
      })
      .catch((error) => console.log(error));
  };

  const poiStart = (id) => {
    navigation.navigate("PoiInfo", { id: id });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ marginBottom: 20, marginLeft: 20, marginTop: 10 }}>
        <Icon
          size={28}
          name="chevron-back-outline"
          color="black"
          onPress={() => poiStart(route.params.id)}
        />
      </View>
      <KeyboardAwareScrollView>
        <View style={styles.reviewContainer}>
          {written ? (
            <Text style={{ fontSize: 30, fontWeight: "bold" }}>
              {" "}
              You already reviewed this tour. Wanna edit?
            </Text>
          ) : (
            <Text style={{ fontSize: 30, fontWeight: "bold" }}>
              Do you like this tour?
            </Text>
          )}
          <Image
            source={require("../assets/home/rating.png")}
            style={{ width: 140, height: 140, marginVertical: 10 }}
          />
          <RatingBar />
          <Text style={{ fontSize: 17, fontWeight: "bold" }}>
            {defaultRating + "/" + rating.length}
          </Text>
          <TextInput
            style={styles.input}
            multiline={true}
            returnKeyType="go"
            onSubmitEditing={() => addReviewHandler(route.params.id)}
            onChangeText={(review) => {
              setReview(review);
            }}
          />
          <TouchableOpacity
            style={styles.button}
            onPress={() => addReviewHandler(route.params.id)}
          >
            <Text style={{ fontSize: 22, fontWeight: "bold", color: "white" }}>
              Submit
            </Text>
          </TouchableOpacity>
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#D9D9D9",
  },
  reviewContainer: {
    padding: 20,
    alignItems: "center",
  },
  ratingBar: {
    flexDirection: "row",
    justifyContent: "center",
    marginVertical: 20,
  },
  starImg: {
    height: 34,
    width: 34,
    resizeMode: "cover",
    margin: 7,
  },
  input: {
    width: "100%",
    padding: 15,
    borderRadius: 10,
    backgroundColor: "#EFEFEF",
    marginTop: 20,
    height: 150,
    borderBottomWidth: 2,
    borderBottomColor: "black",
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    width: 160,
    height: 60,
    borderRadius: 10,
    backgroundColor: "black",
    marginTop: 20,
  },
});

export default WriteReviewScreen;

import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Alert,
} from "react-native";
import React, { useEffect, useState, useContext } from "react";
import {
  useRoute,
  useNavigation,
  useIsFocused,
} from "@react-navigation/native";
import { AuthContext } from "../helpers/AuthContext";
import MapView, { Marker, Callout } from "react-native-maps";
import MapViewDirections from "react-native-maps-directions";
import Icon from "react-native-vector-icons/Ionicons";
import axios from "axios";
import { GOOGLE_MAPS_API_KEY } from "@env";
import { api } from "../helpers/Constants";

const PoiInfoScreen = () => {
  const isFocused = useIsFocused();
  const route = useRoute();
  const navigation = useNavigation();
  const { authState } = useContext(AuthContext);
  const [poi, setPoi] = useState([]);
  const [initLat, setInitLat] = useState(0);
  const [initLong, setInitLong] = useState(0);
  const [lastLat, setLastLat] = useState(0);
  const [lastLong, setLastLong] = useState(0);
  let betweenpoints = new Array();

  useEffect(async () => {
    await axios
      .get(`${api}/poi/list/${route.params.id}`)
      .then((response) => {
        setInitLat(response.data[0].latitude);
        setInitLong(response.data[0].longitude);
        setLastLat(response.data[response.data.length - 1].latitude);
        setLastLong(response.data[response.data.length - 1].longitude);
        setPoi(response.data);
      })
      .catch((error) => console.log(error));
  }, [isFocused]);

  poi.map((val) => {
    return betweenpoints.push({
      latitude: val.latitude,
      longitude: val.longitude,
    });
  });

  // load screen after async function
  if (!lastLong) return <Text>Loading...</Text>;

  const detailScreen = async (id) => {
    await axios
      .put(`${api}/poi/addcounter/${id}`)
      .then(() => {
        navigation.navigate("Camera");
      })
      .catch((error) => console.log(error));
    // navigation.navigate("Poi", { id: id });
  };

  const reviewScreen = (id) => {
    if (authState.id) {
      navigation.navigate("WriteReview", { id: id });
    } else {
      Alert.alert("You've to create an account for this!");
    }
  };

  return (
    <SafeAreaView style={styles.poiContainer}>
      <View style={styles.poiContainer}>
        <View style={{ marginBottom: 20 }}>
          <Icon
            size={28}
            name="chevron-back-outline"
            color="black"
            onPress={() => navigation.navigate("Tour", { id: route.params.id })}
          />
        </View>
        <Text style={{ fontSize: 20, fontWeight: "bold", marginBottom: 10 }}>
          Trip plan
        </Text>
        <MapView
          style={styles.mapContainer}
          region={{
            latitude: initLat,
            longitude: initLong,
            latitudeDelta: 0.019,
            longitudeDelta: 0.019,
          }}
        >
          <MapViewDirections
            origin={{ latitude: initLat, longitude: initLong }}
            destination={{ latitude: lastLat, longitude: lastLong }}
            waypoints={betweenpoints}
            apikey={GOOGLE_MAPS_API_KEY}
            strokeWidth={4}
            strokeColor="red"
            mode="WALKING"
          />
          {poi.map((value, index) => {
            return (
              <View key={index}>
                <Marker
                  coordinate={{
                    latitude: value.latitude,
                    longitude: value.longitude,
                  }}
                  pinColor="#fd9727"
                >
                  <Callout>
                    <Text>{value.title}</Text>
                  </Callout>
                </Marker>
              </View>
            );
          })}
        </MapView>
        <View style={styles.textContainer}>
          <ScrollView>
            {poi.map((value, index) => {
              return (
                <View key={index}>
                  <TouchableOpacity
                    onPress={() => detailScreen(value.id)}
                    style={styles.button}
                  >
                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <Text style={{ fontWeight: "bold" }}>{value.title}</Text>
                      <Icon name="camera-outline" color="black" size={20} />
                    </View>
                  </TouchableOpacity>
                </View>
              );
            })}
          </ScrollView>
        </View>

        <TouchableOpacity
          onPress={() => reviewScreen(route.params.id)}
          style={{
            justifyContent: "flex-end",
            alignItems: "center",
            padding: 40,
          }}
        >
          <Text style={{ textDecorationLine: "underline", fontSize: 15 }}>
            Leave a Review
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  poiContainer: {
    flex: 1,
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 10,
    backgroundColor: "#D9D9D9",
  },
  mapContainer: {
    width: "100%",
    height: 250,
    borderRadius: 10,
  },
  textContainer: {
    backgroundColor: "#CCCCCC",
    height: 300,
    width: "100%",
    borderRadius: 10,
    marginTop: 10,
    padding: 20,
  },
  button: {
    backgroundColor: "#EFEFEF",
    width: "100%",
    padding: 20,
    borderRadius: 20,
    marginTop: 20,
  },
});

export default PoiInfoScreen;

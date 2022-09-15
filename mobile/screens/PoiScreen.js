import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  Modal,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useRoute, useNavigation } from "@react-navigation/native";
import axios from "axios";
import { api } from "../helpers/Constants";
import Icon from "react-native-vector-icons/MaterialIcons";

const PoiScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { id } = route.params;
  const [poi, setPoi] = useState([]);
  const [poiImg, setPoiImg] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [currentImg, setcurrentImg] = useState("");

  useEffect(() => {
    axios
      .get(`${api}/poi/poidetail/${id}`)
      .then((response) => {
        setPoi(response.data);
      })
      .catch((error) => console.log(error));

    axios
      .get(`${api}/img/poi/${id}`)
      .then((response) => {
        setPoiImg(response.data);
      })
      .catch((error) => console.log(error));
  }, []);

  const goBack = (poi) => {
    navigation.navigate("PoiInfo", { id: poi.tourId });
  };

  const goGame = (poi) => {
    navigation.navigate("Game", { id: poi.id });
  };

  return (
    <SafeAreaView style={styles.poiContainer}>
      <Modal visible={modalOpen}>
        <SafeAreaView style={{ flex: 1, backgroundColor: "black" }}>
          <View style={{ padding: 20 }}>
            <Icon
              name="clear"
              color="grey"
              size={30}
              style={{ marginBottom: 20 }}
              onPress={() => {
                setModalOpen(false), setcurrentImg("");
              }}
            />
            <TouchableOpacity
              onPress={() => {
                setModalOpen(false), setcurrentImg("");
              }}
            >
              <Image
                source={{
                  uri: `${api}/Images/${currentImg}`,
                }}
                style={{
                  width: "100%",
                  height: "90%",
                }}
              />
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </Modal>
      <View style={styles.imgContainer}>
        {poi.map((value, index) => {
          return (
            <View key={index}>
              <Text
                style={{
                  fontSize: 20,
                  marginBottom: 10,
                  fontWeight: "bold",
                }}
              >
                {value.title}
              </Text>

              <Image
                source={{
                  uri: `${api}/Images/${value.poiImg}`,
                }}
                style={{ width: "100%", height: 170, borderRadius: 10 }}
              />

              <View key={index} style={styles.textContainer}>
                <ScrollView>
                  <Text style={{ fontSize: 17 }}>{value.poiText}</Text>
                </ScrollView>
              </View>

              <Text
                style={{
                  fontSize: 17,
                  marginBottom: 20,
                  fontWeight: "bold",
                  marginTop: 20,
                  marginBottom: 10,
                }}
              >
                See more photos of this location point
              </Text>

              <ScrollView horizontal={true}>
                <View style={styles.addImgContainer}>
                  <TouchableOpacity
                    onPress={() => {
                      setModalOpen(true), setcurrentImg(value.poiImg);
                    }}
                  >
                    <Image
                      source={{
                        uri: `${api}/Images/${value.poiImg}`,
                      }}
                      style={{
                        width: 130,
                        height: 100,
                        borderRadius: 10,
                        marginRight: 10,
                      }}
                    />
                  </TouchableOpacity>
                  {poiImg.map((value2, index2) => {
                    return (
                      <View key={index2}>
                        <TouchableOpacity
                          onPress={() => {
                            setModalOpen(true), setcurrentImg(value2.imgTitle);
                          }}
                        >
                          <Image
                            source={{
                              uri: `${api}/Images/${value2.imgTitle}`,
                            }}
                            style={{
                              width: 130,
                              height: 100,
                              borderRadius: 10,
                              marginRight: 10,
                            }}
                          />
                        </TouchableOpacity>
                      </View>
                    );
                  })}
                </View>
              </ScrollView>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  marginTop: 30,
                }}
              >
                <TouchableOpacity
                  style={styles.button}
                  onPress={() => goBack(value)}
                >
                  <Text
                    style={{ fontSize: 22, fontWeight: "bold", color: "white" }}
                  >
                    Go Back
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{ ...styles.button, ...styles.rbutton }}
                  onPress={() => goGame(value)}
                >
                  <Text
                    style={{ fontSize: 22, fontWeight: "bold", color: "white" }}
                  >
                    Game
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          );
        })}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  poiContainer: {
    flex: 1,
    padding: 20,
    backgroundColor: "#D9D9D9",
  },
  imgContainer: {
    width: "100%",
    borderRadius: 10,
    padding: 20,
    paddingBottom: 0,
  },
  textContainer: {
    marginTop: 20,
    width: "100%",
    backgroundColor: "#EFEFEF",
    borderRadius: 10,
    padding: 10,
    height: 170,
    shadowOpacity: 0.08,
    shadowOffset: {
      width: 0,
      height: 20,
    },
    shadowRadius: 10,
    // Shadow for Android
    elevation: 5,
  },
  addImgContainer: {
    borderRadius: 10,

    flexDirection: "row",
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    width: 160,
    height: 70,
    borderRadius: 10,
    backgroundColor: "#75B51C",
  },
  rbutton: {
    backgroundColor: "#F9AA21",
  },
});

export default PoiScreen;

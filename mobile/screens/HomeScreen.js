import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  SafeAreaView,
  Modal,
} from "react-native";
import React, { useContext, useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { AuthContext } from "../helpers/AuthContext";
import { useIsFocused } from "@react-navigation/native";
import Icon from "react-native-vector-icons/MaterialIcons";
import axios from "axios";
import SearchComponent from "../components/SearchComponent";
import { api } from "../helpers/Constants";

const HomeScreen = () => {
  const isFocused = useIsFocused();
  const navigation = useNavigation();
  const [tour, setTour] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const { authState } = useContext(AuthContext);

  useEffect(async () => {
    await axios
      .get(`${api}/tour`)
      .then((response) => {
        setTour(response.data);
      })
      .catch((error) => console.log(error));
  }, [isFocused]);

  const tourStart = (id) => {
    navigation.navigate("Tour", { id: id });
  };

  const mostPopular = async () => {
    let column = "counter";
    let order = "DESC";
    await axios
      .get(`${api}/tour/${column}/${order}`)
      .then((response) => {
        setTour(response.data);
      })
      .catch((error) => console.log(error));
  };

  const latest = async () => {
    let column = "updatedAt";
    let order = "DESC";
    await axios
      .get(`${api}/tour/${column}/${order}`)
      .then((response) => {
        setTour(response.data);
      })
      .catch((error) => console.log(error));
  };

  return (
    <SafeAreaView style={styles.container}>
      <Modal visible={modalOpen} animationType="slide">
        <SafeAreaView>
          <SearchComponent
            placeholder="Enter a Search term"
            data={tour}
            setOpenModal={setModalOpen}
          />
        </SafeAreaView>
      </Modal>

      <View style={styles.textContainer}>
        <Text
          style={{
            fontSize: 30,
            color: "#F9AA21",
            marginBottom: 20,
            fontWeight: "bold",
          }}
        >
          Hello{" "}
          {authState.username ? (
            <Text>{authState.username}</Text>
          ) : (
            <Text>New Tourist</Text>
          )}
        </Text>
        <Text style={{ fontSize: 30, fontWeight: "bold" }}>
          What do you want
        </Text>
        <Text style={{ fontSize: 30, fontWeight: "bold" }}>
          to do in the city today?
        </Text>

        <View style={{ alignItems: "center", marginTop: 20 }}>
          <TouchableOpacity
            style={styles.searchField}
            onPress={() => setModalOpen(true)}
          >
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Text style={{ color: "grey" }}>Tour quick search</Text>
              <Icon name="search" color="grey" size={20} />
            </View>
          </TouchableOpacity>
        </View>

        <Text style={{ fontSize: 22, fontWeight: "bold", marginTop: 20 }}>
          Explore your city!
        </Text>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity>
          <Text style={{ fontSize: 22, fontWeight: "bold" }}>All</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => mostPopular()}>
          <Text style={{ fontSize: 22, fontWeight: "bold" }}>Most Popular</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => latest()}>
          <Text style={{ fontSize: 22, fontWeight: "bold" }}>Latest</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.tourPreviewContainer}>
        <ScrollView horizontal={true}>
          {tour.map((value, key) => {
            return (
              <View key={key}>
                {/[1-9]/.test(value.distance) && (
                  <View style={styles.tourContainer}>
                    <TouchableOpacity
                      onPress={() => {
                        tourStart(value.id);
                      }}
                    >
                      <Image
                        source={{
                          uri: `${api}/Images/${value.tourImg}`,
                        }}
                        style={{ width: 130, height: 100, borderRadius: 10 }}
                      />
                      <Text>{value.title}</Text>
                      <ScrollView horizontal={true} style={{ width: 130 }}>
                        <Text>{value.hashtag}</Text>
                      </ScrollView>
                    </TouchableOpacity>
                  </View>
                )}
              </View>
            );
          })}
        </ScrollView>
      </View>
      <View style={styles.categoryContainer}>
        <Text style={{ fontSize: 18, fontWeight: "bold" }}>Categories</Text>
      </View>
      <View style={styles.iconContainer}>
        <TouchableOpacity
          onPress={() => navigation.navigate("Category", { id: "Museum" })}
          style={{ alignItems: "center" }}
        >
          <Icon name="museum" color="black" size={40} />
          <Text>Museum</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate("Category", { id: "Shopping" })}
          style={{ alignItems: "center" }}
        >
          <Icon name="redeem" color="black" size={40} />
          <Text>Shopping</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate("Category", { id: "Festival" })}
          style={{ alignItems: "center" }}
        >
          <Icon name="festival" color="black" size={40} />
          <Text>Festival</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate("Category", { id: "Attraction" })}
          style={{ alignItems: "center" }}
        >
          <Icon name="attractions" color="black" size={40} />
          <Text>Attractions</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#D9D9D9",
  },
  textContainer: {
    marginTop: 40,
    padding: 20,
  },
  searchField: {
    width: 330,
    height: 50,
    borderWidth: 2,
    justifyContent: "center",
    paddingHorizontal: 10,
    borderRadius: 14,
    borderColor: "grey",
    backgroundColor: "#eeeeeeff",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingLeft: 40,
    paddingRight: 40,
  },
  tourPreviewContainer: {
    padding: 20,
  },
  tourContainer: {
    borderRadius: 10,
    borderColor: "white",
    backgroundColor: "white",
    borderWidth: 2,
    marginRight: 10,
    padding: 2,
  },
  categoryContainer: {
    padding: 20,
  },
  iconContainer: {
    justifyContent: "space-between",
    flexDirection: "row",
    paddingLeft: 30,
    paddingRight: 30,
  },
});

export default HomeScreen;

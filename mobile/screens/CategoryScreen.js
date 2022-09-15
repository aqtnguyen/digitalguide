import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
} from "react-native";
import React, { useEffect, useState } from "react";
import {
  useRoute,
  useNavigation,
  useIsFocused,
} from "@react-navigation/native";
import Icon from "react-native-vector-icons/Ionicons";
import axios from "axios";
import { api } from "../helpers/Constants";

const CategoryScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const category = new RegExp(route.params.id);
  const isFocused = useIsFocused();
  const [tour, setTour] = useState([]);

  useEffect(() => {
    axios
      .get(`${api}/tour`)
      .then((response) => {
        setTour(response.data);
      })
      .catch((error) => console.log(error));
  }, [isFocused]);

  const tourStart = (id) => {
    navigation.navigate("Tour", { id: id });
  };

  return (
    <SafeAreaView style={styles.categoryContainer}>
      <View style={styles.contentContainer}>
        <Icon
          size={28}
          name="chevron-back-outline"
          color="black"
          style={{ marginBottom: 20 }}
          onPress={() => navigation.navigate("Tabbar")}
        />
        <Text style={{ fontSize: 30, fontWeight: "bold", marginBottom: 20 }}>
          {route.params.id}
        </Text>
        <ScrollView style={{ height: "80%" }}>
          {tour.map((value, key) => {
            return (
              <View key={key}>
                {category.test(value.hashtag) && (
                  <TouchableOpacity
                    onPress={() => {
                      tourStart(value.id);
                    }}
                    style={styles.tourContainer}
                  >
                    <Image
                      source={{
                        uri: `${api}/Images/${value.tourImg}`,
                      }}
                      style={{ width: "100%", height: "90%", borderRadius: 10 }}
                    />
                    <Text>{value.title}</Text>
                  </TouchableOpacity>
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
  categoryContainer: {
    flex: 1,
    backgroundColor: "#D9D9D9",
  },
  contentContainer: {
    padding: 20,
  },
  tourContainer: {
    height: 200,
    width: "100%",
    padding: 10,
    alignItems: "center",
    borderRadius: 10,
    borderColor: "black",
    borderWidth: 2,
    marginBottom: 20,
    borderColor: "#eeeeeeff",
    backgroundColor: "#eeeeeeff",
  },
});

export default CategoryScreen;

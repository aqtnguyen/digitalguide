import React, { useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
  ScrollView,
  Image,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Slider from "@react-native-community/slider";
import SelectDropdown from "react-native-select-dropdown";
import axios from "axios";
import { api } from "../helpers/Constants";
import FontAwesome from "react-native-vector-icons/FontAwesome";

const FilterScreen = () => {
  const navigation = useNavigation();
  const [searchTerm, setSearchTerm] = useState("");
  const [durationRange, setDurationRange] = useState(0);
  const [distanceRange, setDistanceRange] = useState(0);
  const [result, setResult] = useState([]);

  const sortOptions = ["title", "city", "most visited", "latest"];

  const handleSearch = async () => {
    await axios
      .get(
        `${api}/tour/searchfilter/${
          searchTerm ? searchTerm : null
        }/${durationRange}/${distanceRange}`
      )
      .then((response) => {
        setResult(response.data);
      })
      .catch((error) => console.log(error));
  };

  const handleReset = () => {
    setResult([]);
  };

  const tourStart = (id) => {
    navigation.navigate("Tour", { id: id });
  };

  return (
    <SafeAreaView style={styles.filterContainer}>
      <View style={styles.filterContent}>
        <Text style={{ fontSize: 30, fontWeight: "bold", marginBottom: 20 }}>
          Search filter
        </Text>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            marginVertical: 10,
          }}
        >
          <Text style={{ fontSize: 19, fontWeight: "bold" }}>Search</Text>
          <TextInput
            style={styles.input}
            onChangeText={(term) => setSearchTerm(term)}
          />
        </View>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Text style={{ fontSize: 19, fontWeight: "bold" }}>
            max. Duration
          </Text>
          <View style={{ alignItems: "center" }}>
            <Text>{durationRange}</Text>
            <Slider
              style={{ width: 200, height: 40 }}
              minimumValue={0}
              maximumValue={240}
              minimumTrackTintColor="#FFFFFF"
              maximumTrackTintColor="#000000"
              thumbTintColor="#FFFFFF"
              onValueChange={(value) => setDurationRange(parseInt(value))}
            />
          </View>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            marginVertical: 10,
          }}
        >
          <Text style={{ fontSize: 19, fontWeight: "bold" }}>
            max. Distance
          </Text>
          <View style={{ alignItems: "center" }}>
            <Text>{distanceRange}</Text>
            <Slider
              style={{ width: 200, height: 40 }}
              minimumValue={0}
              maximumValue={5}
              minimumTrackTintColor="#FFFFFF"
              maximumTrackTintColor="#000000"
              thumbTintColor="#FFFFFF"
              onValueChange={(value) => setDistanceRange(parseInt(value))}
            />
          </View>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginTop: 10,
            marginBottom: 30,
          }}
        >
          <TouchableOpacity style={styles.button} onPress={handleReset}>
            <Text style={{ fontSize: 22, fontWeight: "bold", color: "white" }}>
              Reset
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{ ...styles.button, ...styles.rbutton }}
            onPress={handleSearch}
          >
            <Text style={{ fontSize: 22, fontWeight: "bold", color: "white" }}>
              Apply Filter
            </Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "flex-end",
            marginBottom: 20,
          }}
        >
          <SelectDropdown
            data={sortOptions}
            onSelect={async (selectedItem) => {
              let column = "";
              let order = "";
              if (selectedItem === "title") {
                column = "title";
                order = "ASC";
              } else if (selectedItem === "city") {
                column = "city";
                order = "ASC";
              } else if (selectedItem === "most visited") {
                column = "counter";
                order = "DESC";
              } else {
                column = "updatedAt";
                order = "DESC";
              }
              return await axios
                .get(`${api}/tour/${column}/${order}`)
                .then((response) => {
                  setResult(response.data);
                })
                .catch((error) => console.log(error));
            }}
            dropdownIconPosition={"right"}
            renderDropdownIcon={(isOpened) => {
              return (
                <FontAwesome
                  name={isOpened ? "chevron-up" : "chevron-down"}
                  color={"#444"}
                  size={18}
                />
              );
            }}
            buttonStyle={styles.selectMenuContainer}
          />
        </View>
        <ScrollView style={{ height: 250 }}>
          {result.map((value, key) => {
            return (
              <View key={key} style={{ alignItems: "center" }}>
                {/[1-9]/.test(value.distance) && (
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
  filterContainer: {
    flex: 1,
    backgroundColor: "#D9D9D9",
  },
  filterContent: {
    padding: 20,
  },
  input: {
    backgroundColor: "white",
    padding: 10,
    borderRadius: 10,
    width: "70%",
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    width: 150,
    height: 60,
    borderRadius: 10,
    backgroundColor: "#75B51C",
  },
  rbutton: {
    backgroundColor: "#F9AA21",
  },
  tourContainer: {
    height: 150,
    width: "80%",
    padding: 10,
    alignItems: "center",
    borderRadius: 10,
    borderColor: "black",
    borderWidth: 2,
    marginBottom: 20,
    borderColor: "#eeeeeeff",
    backgroundColor: "#eeeeeeff",
  },
  selectMenuContainer: {
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#444",
    backgroundColor: "#D9D9D9",
  },
});

export default FilterScreen;

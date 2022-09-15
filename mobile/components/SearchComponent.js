import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/Ionicons";

const SearchComponent = ({ placeholder, data, setOpenModal }) => {
  const navigation = useNavigation();
  const [filteredData, setFilteredData] = useState([]);
  const [wordEntered, setWordEntered] = useState("");

  const handleFilter = (wordEntered) => {
    const searchWord = wordEntered;
    setWordEntered(searchWord);
    const newFilter = data.filter((value) => {
      return value.title.toLowerCase().includes(searchWord.toLowerCase());
    });

    if (searchWord === "") {
      setFilteredData([]);
    } else {
      setFilteredData(newFilter);
    }
  };

  const clearInput = () => {
    setFilteredData([]);
    setWordEntered("");
  };

  const tourStart = (id) => {
    setOpenModal(false);
    navigation.navigate("Tour", { id: id });
  };

  return (
    <SafeAreaView style={styles.searchContainer}>
      <View style={styles.searchWrapperStyle}>
        <Icon
          size={28}
          name="arrow-back-outline"
          color="grey"
          style={styles.iconStyle}
          onPress={() => setOpenModal(false)}
        />
        <TextInput
          placeholderTextColor="grey"
          style={styles.searchInputStyle}
          placeholder={placeholder}
          value={wordEntered}
          onChangeText={handleFilter}
        />
        <Icon
          size={28}
          name="close"
          color="grey"
          style={styles.iconStyle}
          onPress={clearInput}
        />
      </View>

      {filteredData.length != 0 && (
        <View style={styles.dataResult}>
          {filteredData.slice(0, 15).map((value, index) => {
            return (
              <View
                key={index}
                style={{
                  justifyContent: "space-between",
                  flexDirection: "row",
                }}
              >
                <TouchableOpacity
                  onPress={() => {
                    tourStart(value.id);
                  }}
                >
                  <Text style={styles.dataItem}>
                    {value.title} in {value.city}
                  </Text>
                </TouchableOpacity>
              </View>
            );
          })}
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  searchWrapperStyle: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 22,
  },
  iconStyle: {
    marginTop: 10,
    marginHorizontal: 14,
  },
  searchInputStyle: {
    flex: 1,
    fontSize: 24,
    paddingVertical: 8,
    paddingHorizontal: 0,
    margin: 0,
    color: "black",
    borderBottomWidth: 1,
  },
  dataResult: {
    marginTop: 7,
    width: "100%",
    height: "80%",
    backgroundColor: "white",
    padding: 20,
    overflow: "hidden",
  },
  dataItem: {
    fontSize: 22,
    marginBottom: 22,
    marginLeft: 42,
  },
});

export default SearchComponent;

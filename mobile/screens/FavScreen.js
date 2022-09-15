import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  Image,
  TouchableOpacity,
  useWindowDimensions,
  Animated,
} from "react-native";
import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../helpers/AuthContext";
import { SwipeListView } from "react-native-swipe-list-view";
import Icon from "react-native-vector-icons/MaterialIcons";
import { useNavigation, useIsFocused } from "@react-navigation/native";
import axios from "axios";
import { api } from "../helpers/Constants";

const FavScreen = () => {
  const isFocused = useIsFocused();
  const navigation = useNavigation();
  const [tour, setTour] = useState([]);
  const [tourId, setTourId] = useState([]);
  const { authState, setFavourite } = useContext(AuthContext);
  const { width: screenWidth } = useWindowDimensions();

  useEffect(() => {
    axios
      .get(`${api}/fav/${authState.id}`)
      .then((response) => {
        setTourId(response.data);
      })
      .catch((error) => console.log(error));

    axios
      .get(`${api}/tour`)
      .then((response) => {
        setTour(response.data);
      })
      .catch((error) => console.log(error));
  }, [isFocused]);

  const result = tour.filter((val) => {
    return tourId.find((val2) => val2.tourId === val.id);
  });

  const renderItem = (data, rowMap) => {
    const rowHeightAnimatedValue = new Animated.Value(150);
    return (
      <VisibleItem
        data={data}
        rowMap={rowMap}
        rowHeightAnimatedValue={rowHeightAnimatedValue}
      />
    );
  };

  const renderHiddenItem = (data, rowMap) => {
    const rowActionAnimatedValue = new Animated.Value(100);
    const rowHeightAnimatedValue = new Animated.Value(150);
    return (
      <HiddenItemWithActions
        data={data}
        rowMap={rowMap}
        rowActionAnimatedValue={rowActionAnimatedValue}
        rowHeightAnimatedValue={rowHeightAnimatedValue}
        onDelete={() => deleteRow(rowMap, data.item.id)}
      />
    );
  };

  // dont remove, see SwipeListView docs
  const deleteRow = () => {};

  const VisibleItem = (props) => {
    const { data, rowHeightAnimatedValue, rightActionState } = props;

    if (rightActionState) {
      Animated.timing(rowHeightAnimatedValue, {
        toValue: 0,
        duration: 100,
        useNativeDriver: false,
      }).start(() => {
        deleteFav(data.item.id);
      });
    }

    return (
      <Animated.View
        style={[styles.favContainer, { height: rowHeightAnimatedValue }]}
      >
        <TouchableOpacity
          onPress={() => {
            tourStart(data.item.id);
          }}
          style={{ width: "100%" }}
        >
          <Image
            source={{
              uri: `${api}/Images/${data.item.tourImg}`,
            }}
            style={{ width: "100%", height: "80%", borderRadius: 10 }}
          />
          <Text style={{ fontSize: 20 }}>{data.item.title}</Text>
        </TouchableOpacity>
      </Animated.View>
    );
  };

  const HiddenItemWithActions = (props) => {
    const {
      rowActionAnimatedValue,
      rowHeightAnimatedValue,
      swipeAnimatedValue,
      rightActionActivated,
      data,
    } = props;

    if (rightActionActivated) {
      Animated.spring(rowActionAnimatedValue, {
        toValue: screenWidth,
        useNativeDriver: false,
      }).start();
    }

    return (
      <Animated.View
        style={{
          alignItems: "flex-end",
          justifyContent: "center",
          height: rowHeightAnimatedValue,
        }}
      >
        <Animated.View
          style={{
            flex: 1,
            marginTop: 50,
            width: rowActionAnimatedValue,
          }}
        >
          <TouchableOpacity onPress={() => deleteFav(data.item.id)}>
            <Animated.View
              style={{
                transform: [
                  {
                    scale: swipeAnimatedValue.interpolate({
                      inputRange: [-90, -45],
                      outputRange: [1, 0],
                      extrapolate: "clamp",
                    }),
                  },
                ],
              }}
            >
              <Icon name="delete" color="red" size={40} />
            </Animated.View>
          </TouchableOpacity>
        </Animated.View>
      </Animated.View>
    );
  };

  // dont remove
  const onRightActionStatusChange = () => {};

  // dont remove
  const swipeGestureEnded = () => {};

  const deleteFav = async (id) => {
    await axios
      .delete(`${api}/fav/${id}/${authState.id}`)
      .then(() => {
        setTour(
          tour.filter((val) => {
            return val.id !== id;
          })
        );
        setTourId(
          tourId.filter((val) => {
            return val.tourId !== id;
          })
        );
        setFavourite(
          tourId.filter((val) => {
            return val.tourId !== id;
          })
        );
      })
      .catch((error) => console.log(error));
  };

  const tourStart = (id) => {
    navigation.navigate("Tour", { id: id });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.resultContainer}>
        <Text style={{ fontSize: 30, fontWeight: "bold", marginBottom: 20 }}>
          Favorites
        </Text>
        <SwipeListView
          data={result}
          renderItem={renderItem}
          renderHiddenItem={renderHiddenItem}
          rightOpenValue={-100}
          rightActivationValue={-200}
          rightActionValue={-screenWidth}
          disableRightSwipe
          onRightActionStatusChange={onRightActionStatusChange}
          swipeGestureEnded={swipeGestureEnded}
          swipeToOpenPercent={10}
          swipeToClosePercent={10}
          useNativeDriver={false}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#D9D9D9",
  },
  resultContainer: {
    padding: 20,
    height: "90%",
  },
  favContainer: {
    height: 150,
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

export default FavScreen;

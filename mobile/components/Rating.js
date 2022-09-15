import { View } from "react-native";
import React from "react";
import Icon from "react-native-vector-icons/Ionicons";

const getStars = (value) => {
  const stars = [];
  const [whole, part] = parseFloat(value).toString().split(".");
  for (let i = 0; i < whole; i++) stars.push("star");
  if (part) stars.push("star-half");
  for (let i = whole; i < (part ? 4 : 5); i++) stars.push("star-outline");

  return stars;
};

const Rating = ({ value }) => {
  return (
    <View style={{ flexDirection: "row" }}>
      {getStars(value).map((value, index) => (
        <Icon size={30} name={value} color="#F9AA21" key={index} />
      ))}
    </View>
  );
};

export default Rating;

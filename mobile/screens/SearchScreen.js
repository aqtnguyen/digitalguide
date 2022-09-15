import React, { useEffect, useState } from "react";
import { View, Text, StatusBar, FlatList, StyleSheet } from "react-native";
import SearchComponent from "../components/SearchComponent";
import axios from "axios";
import { api } from "../helpers/Constants";

const SearchScreen = () => {
  const [posts, setPosts] = useState([]);
  const [err, setErr] = useState("");
  const [term, setTerm] = useState("");

  const getPosts = () => {
    axios.get(`${api}/posts`).then((response) => {
      if (response.data.error) {
        setPosts([]);
        setErr("No post found");
      } else {
        setPosts(response.data);
      }
    });
  };

  const renderPosts = ({ item }) => {
    return (
      <View style={styles.itemWrapperStyle}>
        <Text style={styles.itemTitleStyle}>{item.title}</Text>
      </View>
    );
  };

  useEffect(() => {
    getPosts(term);
  }, [term]);

  return (
    <>
      <StatusBar backgroundColor="#00876C" />
      <View>
        <SearchComponent
          onSearchEnter={(newTerm) => {
            setTerm(newTerm);
            setErr("");
          }}
        />

        {err ? (
          <Text style={styles.errStyle}>{err}</Text>
        ) : (
          <FlatList
            data={posts}
            renderItem={renderPosts}
            keyExtractor={(post) => post.title}
          />
        )}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  itemWrapperStyle: {
    borderBottomWidth: 1,
    paddingVertical: 8,
    borderColor: "#ccc",
    paddingHorizontal: 16,
  },
  itemTitleStyle: {
    fontSize: 14,
    color: "#000",
    fontWeight: "bold",
  },
  itemBodyStyle: {
    fontSize: 14,
    color: "#555",
    marginTop: 4,
  },
  errStyle: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    color: "red",
  },
});

export default SearchScreen;

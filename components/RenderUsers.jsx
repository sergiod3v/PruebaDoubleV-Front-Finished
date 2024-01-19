import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  TouchableWithoutFeedback,
} from "react-native";
import { getNumberOfFollowers } from "./GetFollowers";

const RenderUsers = ({ users, navigation }) => {
  const goToUserProfile = (item) => {
    navigation.navigate("UserProfile", {
      username: item.login,
      title: item.login,
    });
  };

  const renderItem = ({ item }) => (
    <TouchableWithoutFeedback
      onPress={() => {
        goToUserProfile(item);
      }}
    >
      <View style={styles.userContainer}>
        <Text>User: {item.login}</Text>
        <Text>ID: {item.id}</Text>
        <Image source={{ uri: item.avatar_url }} style={styles.image} />
      </View>
    </TouchableWithoutFeedback>
  );

  return (
    <FlatList
      style={{ width: "90%" }}
      data={users}
      keyExtractor={(item) => item.id.toString()}
      renderItem={renderItem}
    />
  );
};

const styles = StyleSheet.create({
  userContainer: {
    flex: 1,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    paddingVertical: 8,
    marginBottom: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: 75,
    height: 75,
    borderRadius: 25, // Assuming it's a circular avatar
    marginTop: 8,
  },
});

export default RenderUsers;

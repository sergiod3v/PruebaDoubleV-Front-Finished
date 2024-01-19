import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  Image,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
  FlatList,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import styles from "../styles/user-profile";

const UserProfile = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { username } = route.params;
  const [user, setUser] = useState({});
  useEffect(() => {
    const fetchUser = async () => {
      const url = `https://api.github.com/users/${username}`;
      try {
        const response = await fetch(url);
        const data = await response.json();
        console.log(data);
        setUser(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchUser();
  }, []);

  useEffect(() => {
    navigation.setOptions({
      title: username, // Set the title dynamically based on the username
    });
  }, [username]);
  return (
    <>
      <View style={styles.container}>
        <Text style={styles.text}>ID: {user.id ? user.id : "Loading..."}</Text>
        {user.bio && <Text style={styles.text}>Bio: {user.bio}</Text>}
        {user.company && (
          <Text style={styles.text}>Company: {user.company}</Text>
        )}
        {user.location && (
          <Text style={styles.text}>Location: {user.location}</Text>
        )}
        <Image source={{ uri: user.avatar_url }} style={styles.image} />
      </View>
    </>
  );
};
export default UserProfile;

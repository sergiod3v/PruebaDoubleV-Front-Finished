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

import RenderUsers from "../components/RenderUsers";
import Error from "../components/Error";
import Stats from "../components/Stats";

import styles from "../styles/home";

const Home = ({ navigation }) => {
  const [page, setPage] = useState(1);
  const [username, setUsername] = useState("");
  const [users, setUsers] = useState([]);
  const [usersData, setUsersData] = useState([]);
  const [totalUsers, setTotalUsers] = useState(0);
  const [error, setError] = useState({
    msg: "",
    status: false,
  });
  const [currentView, setCurrentView] = useState("users");

  const handleSearch = async () => {
    if (username.toLowerCase() === "doublevpartners") {
      setError((prevState) => ({
        ...prevState,
        msg: "Acá no buscamos ese usuario...",
        status: true,
      }));
    } else if (username.length < 4) {
      setError((prevState) => ({
        ...prevState,
        msg: "Ingrese almenos 4 caracteres.",
        status: true,
      }));
    } else {
      const url = `https://api.github.com/search/users?q=${username}&per_page=10&page=${page}`;
      try {
        const response = await fetch(url);
        const data = await response.json();
        setUsers(data.items);
        setTotalUsers(data.total_count);
        setPage(1);
      } catch (error) {
        console.error(error);
        // Handle errors gracefully, e.g., display an error message to the user
      }
    }
  };

  const prevPage = () => {
    page > 0 && setPage(page - 1);
    handleSearch();
  };
  const nextPage = () => {
    (page + 1) * 10 < totalUsers && setPage(page + 1);
    handleSearch();
  };

  const onRetry = () => {
    setError((prevState) => ({
      ...prevState,
      msg: "",
      status: false,
    }));
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={styles.container}>
        {error.status && <Error message={error.msg} onRetry={onRetry} />}
        <View style={styles.searchbar}>
          {users.length > 0 && page != 1 && <Text onPress={prevPage}>◀️</Text>}
          <TextInput
            style={
              error.status
                ? { ...styles.input, borderColor: "red" }
                : styles.input
            }
            onChangeText={setUsername}
            returnKeyType="done"
          />
          {users.length > 0 && totalUsers > page * 10 && (
            <Text onPress={nextPage}>▶️</Text>
          )}
        </View>
        <Button title="Buscar" onPress={handleSearch} />
        {users.length > 0 && (
          <>
            <View style={styles.chooseView}>
              <Text
                style={styles.chooseViewText}
                onPress={() => {
                  setCurrentView("users");
                }}
              >
                USERS
              </Text>
              <Text style={styles.chooseViewText}> | </Text>
              <Text
                style={styles.chooseViewText}
                onPress={() => {
                  setCurrentView("stats");
                }}
              >
                STATS
              </Text>
            </View>
            {currentView === "users" ? (
              <>
                <Text style={{ textAlign: "center", fontSize: 25 }}>
                  Results: {totalUsers}
                  {totalUsers > 1 && ` - Page ${page}`}
                </Text>
                <RenderUsers users={users} navigation={navigation} />
              </>
            ) : (
              <>
                <Stats data={users} />
              </>
            )}
          </>
        )}
      </View>
    </TouchableWithoutFeedback>
  );
};

export default Home;

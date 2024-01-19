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
import getFollowerCount from "./GetFollowers";
import Chart from "./Chart";

const Stats = ({ data }) => {
  const [number, setNumber] = useState(0);
  const [chartData, setChartData] = useState([]);
  let test = [];
  useEffect(() => {
    const fetchData = async () => {
      const promises = data.map(async (item) => {
        const count = await getFollowerCount(item.login);
        return {
          value: count,
          label: item.login,
        };
      });

      const results = await Promise.all(promises);
      setChartData(results);
    };

    fetchData();
  }, [data]);

  useEffect(() => {
    console.log(`LIST: ${chartData}`);
  }, [chartData]);
  return (
    <View>
      {chartData.length == 0 ? (
        <Text>Loading BarChart...</Text>
      ) : (
        <Chart data={chartData} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({});

export default Stats;

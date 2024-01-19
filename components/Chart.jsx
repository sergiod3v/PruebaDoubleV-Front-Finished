import React from "react";
import { View, StyleSheet, Text } from "react-native";
import Svg, { Rect, Text as SvgText } from "react-native-svg";

const Chart = ({ data }) => {
  const barHeight = 20; // Height of each bar
  const chartWidth = 200; // Width of the chart

  // Sort the data array based on the 'value' field in descending order
  const sortedData = [...data].sort((a, b) => b.value - a.value);

  // Calculate the maximum value in the data
  const maxValue = Math.max(...sortedData.map((item) => item.value));

  return (
    <View style={styles.chartContainer}>
      <Svg width={chartWidth} height={data.length * (barHeight + 30)}>
        {sortedData.map((item, index) => (
          <React.Fragment key={index}>
            <Rect
              x={0}
              y={index * (barHeight + 10)}
              width={(item.value / maxValue) * chartWidth} // Normalize the width
              height={barHeight}
              fill="steelblue"
            />
            <SvgText
              x={(item.value / maxValue) * chartWidth + 5} // Adjust the position of the text label
              y={index * (barHeight + 10) + barHeight / 2}
              fontSize="12"
              fill="black"
              textAnchor="start" // Align text to the start of the x coordinate
              alignmentBaseline="middle" // Align text to the middle of the y coordinate
            >
              {item.label} - {item.value ? item.value : "0"} followers
            </SvgText>
          </React.Fragment>
        ))}
      </Svg>
    </View>
  );
};

const styles = StyleSheet.create({
  chartContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
  },
});

export default Chart;

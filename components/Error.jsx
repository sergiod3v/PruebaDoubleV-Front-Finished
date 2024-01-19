import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

const Error = ({ message, onRetry }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.message}>{message}</Text>
      {onRetry && (
        <TouchableOpacity onPress={onRetry} style={styles.retryButton}>
          <Text style={styles.retryButtonText}>Retry</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
  message: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: "center",
  },
  retryButton: {
    backgroundColor: "#3498db",
    padding: 10,
    borderRadius: 5,
  },
  retryButtonText: {
    color: "#000",
    fontWeight: "bold",
  },
});

export default Error;

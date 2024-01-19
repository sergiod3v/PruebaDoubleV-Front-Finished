import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#1c1c1c",
    alignItems: "center",
    justifyContent: "center",
    paddingBottom: 75,
    paddingTop: 25,
    paddingLeft: 35,
    paddingRight: 35,
    height: "100%",
  },
  image: {
    width: 125,
    height: 125,
    borderRadius: 15, // Assuming it's a circular avatar
    marginTop: 10,
  },
  text: {
    fontSize: 20,
    color: "#d4d4d4",
    textAlign: "center",
    marginBottom: 10,
  },
});

export default styles;

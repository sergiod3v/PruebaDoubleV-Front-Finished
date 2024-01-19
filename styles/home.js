import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
    paddingBottom: 75,
    paddingTop: 25,
    height: "100%",
  },
  input: {
    width: 200,
    height: 40,
    borderColor: "black",
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginLeft: 10,
    marginRight: 10,
  },
  userContainer: {
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    paddingVertical: 8,
    marginBottom: 8,
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 25, // Assuming it's a circular avatar
    marginTop: 8,
  },
  searchbar: {
    flexDirection: "row", // or 'column' (default)
    justifyContent: "space-between", // or 'flex-start', 'flex-end', 'center', 'space-around', 'space-evenly'
    alignItems: "center", // or 'flex-start', 'flex-end', 'center', 'stretch'
    padding: 16,
  },
  chooseView: {
    flexDirection: "row",
    marginTop: 15,
    marginBottom: 15,
  },
  chooseViewText: {
    fontSize: 20,
    color: "#3498db",
  },
});

export default styles;

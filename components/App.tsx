import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./firebaseConfig";
import ChatRoom from "./ChatRoom";
import SignIn from "./SignIn";
import SignOut from "./SignOut";

const App = () => {
  const [user] = useAuthState(auth);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={require("./assets/Recurso1.png")} style={styles.logo} />
        <Text style={styles.title}>CachunChat</Text>
        <SignOut />
      </View>
      <View style={styles.content}>{user ? <ChatRoom /> : <SignIn />}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "linear-gradient(to right, #ff7e5f, #feb47b)",
    width: "100%",
    padding: 10,
  },
  logo: {
    width: 50,
    height: 50,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
  },
  content: {
    flex: 1,
    width: "100%",
    backgroundColor: "linear-gradient(to bottom right, #ffecd2, #fcb69f)",
  },
});

export default App;

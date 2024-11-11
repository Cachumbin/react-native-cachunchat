import React from "react";
import { Button, StyleSheet } from "react-native";
import { signOut } from "@react-native-firebase/auth";
import { auth } from "./firebaseConfig";

const SignOut = () => {
  return (
    auth.currentUser && (
      <Button title="Sign Out" onPress={() => signOut(auth)} color="#ff7e5f" />
    )
  );
};

export default SignOut;

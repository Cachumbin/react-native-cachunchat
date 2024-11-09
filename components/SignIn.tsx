import React from "react";
import { Button, StyleSheet } from "react-native";
import {
  GoogleAuthProvider,
  signInWithPopup,
} from "@react-native-firebase/auth";
import { auth } from "./firebaseConfig";

const SignIn = () => {
  const signInWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider);
  };

  return (
    <Button
      title="Sign in with Google"
      onPress={signInWithGoogle}
      color="#ff7e5f"
    />
  );
};

export default SignIn;

import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { auth } from "./firebaseConfig";

interface Message {
  text: string;
  uid: string;
  photoURL?: string;
  createdAt?: any;
  displayName?: string;
}

interface MessageProps {
  message: Message;
}

const ChatMessage: React.FC<MessageProps> = ({ message }) => {
  const { text, uid, photoURL, displayName } = message;

  const isSentByCurrentUser = uid === auth.currentUser?.uid;

  const messageAlignment = isSentByCurrentUser ? "flex-end" : "flex-start";
  const backgroundColor = isSentByCurrentUser ? "#ff7e5f" : "#feb47b";
  const textColor = isSentByCurrentUser ? "white" : "black";

  return (
    <View style={[styles.messageContainer, { alignItems: messageAlignment }]}>
      {photoURL && <Image style={styles.avatar} source={{ uri: photoURL }} />}
      <View style={[styles.message, { backgroundColor }]}>
        {displayName && (
          <Text style={[styles.displayName, { color: textColor }]}>
            {displayName}
          </Text>
        )}
        {text && (
          <Text style={[styles.text, { color: textColor }]}>{text}</Text>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  messageContainer: {
    flexDirection: "row",
    marginBottom: 10,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    margin: 5,
  },
  message: {
    borderRadius: 10,
    padding: 10,
    maxWidth: "80%",
  },
  displayName: {
    fontWeight: "bold",
    marginBottom: 5,
  },
  text: {
    marginBottom: 5,
  },
});

export default ChatMessage;

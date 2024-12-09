import React, { useState } from "react";
import { View, TextInput, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface MessageFormProps {
  onSendMessage: (
    message: string,

    file: File | null,

    fileName: string | null,

    fileSize: number | null
  ) => Promise<void>;
}

const MessageForm: React.FC<MessageFormProps> = ({ onSendMessage }) => {
  const [formValue, setFormValue] = useState<string>("");

  const handleSubmit = () => {
    if (formValue.trim() === "") {
      return;
    }
    onSendMessage(formValue, null, null, null);
    setFormValue("");
  };

  return (
    <View style={styles.container}>
      <View style={styles.form}>
        <TextInput
          style={styles.input}
          value={formValue}
          onChangeText={setFormValue}
          placeholder="Type your message"
        />
        <TouchableOpacity
          onPress={handleSubmit}
          disabled={!formValue.trim()}
          style={styles.sendButton}
        >
          <Ionicons name="send-outline" size={24} style={styles.icon} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    padding: 10,
  },
  form: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 5,
    padding: 10,
  },
  input: {
    flex: 1,
    backgroundColor: "#f0f0f0",
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
  },
  sendButton: {
    backgroundColor: "#ff7e5f",
    borderRadius: 5,
    padding: 10,
  },
  icon: {
    color: "white",
  },
});

export default MessageForm;

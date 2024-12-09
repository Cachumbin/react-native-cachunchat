import React, { useRef, useEffect } from "react";
import { View, Text, FlatList, StyleSheet, ScrollView } from "react-native";
import {
  collection,
  query,
  orderBy,
  addDoc,
  serverTimestamp,
  FirestoreDataConverter,
} from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { auth, firestore } from "./firebaseConfig";
import ChatMessage from "./ChatMessage";
import MessageForm from "./MessageForm";

interface MessageProps {
  text: string;
  createdAt: any;
  uid: string;
  photoURL: string;
  displayName: string;
  fileURL?: string | undefined;
  fileName?: string | undefined;
  fileSize?: number | undefined;
}

const messageConverter: FirestoreDataConverter<MessageProps> = {
  toFirestore(message: MessageProps): any {
    return {
      text: message.text,
      createdAt: message.createdAt,
      uid: message.uid,
      photoURL: message.photoURL,
      displayName: message.displayName,
      fileURL: message.fileURL || undefined,
      fileName: message.fileName || undefined,
      fileSize: message.fileSize || null,
    };
  },
  fromFirestore(snapshot: any): MessageProps {
    const data = snapshot.data();
    return {
      text: data.text,
      createdAt: data.createdAt,
      uid: data.uid,
      photoURL: data.photoURL,
      displayName: data.displayName,
      fileURL: data.fileURL || undefined,
      fileName: data.fileName || undefined,
      fileSize: data.fileSize || null,
    };
  },
};

const ChatRoom: React.FC = () => {
  const dummy = useRef<ScrollView>(null);
  const messagesRef = collection(firestore, "messages").withConverter(
    messageConverter
  );
  const q = query(messagesRef, orderBy("createdAt"));
  const [messages] = useCollectionData(q);

  const sendMessage = async (
    message: string,
    file: File | null,
    fileName: string | null,
    fileSize: number | null
  ) => {
    const { uid, photoURL, displayName } = auth.currentUser!;

    let fileURL: string | undefined = undefined;
    if (file) {
      const storage = getStorage();
      const fileRef = ref(storage, `uploads/${file.name}`);
      await uploadBytes(fileRef, file);
      fileURL = await getDownloadURL(fileRef);
    }

    const safePhotoURL = photoURL || "";
    const safeDisplayName = displayName || undefined;

    const messageData: Partial<MessageProps> = {
      text: message,
      createdAt: serverTimestamp(),
      uid,
      photoURL: safePhotoURL,
      displayName: safeDisplayName,
      fileURL: fileURL || undefined,
      fileName: fileName || undefined,
      fileSize: fileSize || undefined,
    };

    await addDoc(messagesRef, messageData);
  };

  useEffect(() => {
    if (dummy.current) {
      dummy.current.scrollToEnd({ animated: true });
    }
  }, [messages]);

  return (
    <ScrollView style={styles.container} ref={dummy}>
      <FlatList
        data={messages}
        renderItem={({ item }) => <ChatMessage message={item} />}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={styles.messageList}
      />
      <MessageForm onSendMessage={sendMessage} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
  },
  messageList: {
    padding: 10,
  },
});

export default ChatRoom;

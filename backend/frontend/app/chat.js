import React, { useEffect, useState } from "react";
import { db } from "./dashboard/config";
import {
  collection,
  query,
  where,
  getDocs,
  setDoc,
  doc,
  limit,
  serverTimestamp,
  onSnapshot,
  orderBy,
} from "firebase/firestore";

const Chat = () => {
  const [room, setRoom] = useState('');
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const messagesRef = collection(db, "messages");
  const name = localStorage.getItem("username");

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const roomParam = urlParams.get("room");
    if (roomParam) {
      setRoom(roomParam);
    }
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const q = query(
          messagesRef,
          where("community", "==", room),
          orderBy("time")
        );
        const querySnapshot = await getDocs(q);
        const messages = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        console.log(messages)
        setMessages(messages);
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    };

    if (room) {
      fetchData();
    }
  }, [room]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!newMessage.trim()) return;

    try {
      const newDoc = doc(messagesRef);
      await setDoc(newDoc, {
        community: room,
        message: newMessage,
        name: name,
        time: serverTimestamp()
      });
      setNewMessage("");
    } catch (error) {
      console.error("Error adding message:", error);
    }
  };

  return (
    <div className="chat-app">
      <div className="header">
        <h1>Welcome to: {room.toUpperCase()}</h1>
      </div>
      <div className="messages">
        {messages.map((message) => (
        <div key={message.id}>
          <p>{message.name}: {message.message}</p>
        </div>
      ))}
      </div>
      <form onSubmit={handleSubmit} className="new-message-form">
        <input
          type="text"
          value={newMessage}
          onChange={(event) => setNewMessage(event.target.value)}
          className="new-message-input"
          placeholder="Type your message here..."
        />
        <button type="submit" className="send-button">
          Send
        </button>
      </form>
    </div>
  );
};

export default Chat;

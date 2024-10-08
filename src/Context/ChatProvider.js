import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const ChatContext = createContext();

const ChatProvider = ({ children }) => {
  const [user, setUser] = useState(); // Initialize user state as null
  const [selectedChat, setSelectedChat] = useState();
  const [chats, setChats] = useState([]);
  const [notification, setNotification] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    // Retrieve user details from local storage
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    console.log("userInfo(Chatprovider): ", userInfo);
    // If user details exist, set the user state
    if (userInfo) {
      setUser(userInfo);
    } else {
      // If no user details found, navigate to the homepage
      navigate("/");
    }
  }, [navigate]);

  return (
    <ChatContext.Provider
      value={{ user, setUser, selectedChat, setSelectedChat, chats, setChats, notification, setNotification }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export const ChatState = () => {
  return useContext(ChatContext);
};

export default ChatProvider;

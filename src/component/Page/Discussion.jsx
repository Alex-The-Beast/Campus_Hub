import { useEffect, useState, useRef } from "react";
import io from "socket.io-client";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";

const socket = io(import.meta.env.VITE_BACKEND_API_URL_chat);
// this will work on prod 

// const socket = io("http://localhost:3000/");


export default function Discussion() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [typingUsers, setTypingUsers] = useState([]);
  const [userCountMessage, setUserCountMessage] = useState(
    "No one else in the room"
  );
    const [currentUser, setCurrentUser] = useState(null); 

  const messagesEndRef = useRef(null);
  const messagesContainerRef = useRef(null);

  // Auto-scroll reliably
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Socket listeners
  useEffect(() => {
    socket.on("chatHistory", (history) => setMessages(history));
    socket.on("receiveMessage", (msg) => setMessages((prev) => [...prev, msg]));
    socket.on("userTyping", (typingList) => setTypingUsers(typingList));
    socket.on("updateUserCount", (msg) => setUserCountMessage(msg));
      // 👇 NEW: get my nickname from server
    socket.on("yourInfo", (data) => setCurrentUser(data.nickname));

    return () => {
      socket.off("chatHistory");
      socket.off("receiveMessage");
      socket.off("userTyping");
      socket.off("updateUserCount");
    };
  }, []);

  // Send message
  const sendMessage = () => {
    if (!input.trim()) return;
    socket.emit("sendMessage", input);
    setInput("");
  };

  // Typing indicator
  const handleInputChange = (e) => {
    setInput(e.target.value);
    socket.emit("typing");
  };

  // Send geolocation once
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        socket.emit("location", { lat: latitude, lng: longitude });
      });
    }
  }, []);

  return (
    <div className="flex flex-col h-screen bg-black text-white">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-gray-800 bg-black/90 backdrop-blur-md fixed top-0 w-full z-10">
        <Link to="/">
          {" "}
          <h1 className="text-xl font-bold">Wapas jana hai</h1>
        </Link>
        <span className="text-sm text-gray-400">{userCountMessage}</span>
      </div>

      {/* Messages container */}
      <div
        ref={messagesContainerRef}
        className="flex-1 mt-16 mb-24 px-6 py-4 overflow-y-auto custom-scrollbar"
        style={{ background: "linear-gradient(to bottom, #000000, #111111)" }}
      >
        <AnimatePresence initial={false}>
          {messages.map((msg) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="mb-4"
            >
              <div className="inline-block px-4 py-2 rounded-2xl bg-black/70 backdrop-blur-md border border-gray-800 shadow-md">
                <span
                  className={`font-bold ${
                    msg.user === currentUser ? "text-blue-400" : "text-green-400"
                  }`}
                >
                  {msg.user}:
                </span>{" "}
                <span>{msg.text}</span>
              </div>
              <div className="text-xs text-gray-500 mt-1 ml-2">
                {new Date(msg.timestamp).toLocaleTimeString()}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        <div ref={messagesEndRef} />
      </div>

      {/* Typing users */}
      {typingUsers.length > 0 && (
        <div className="fixed bottom-20 left-0 w-full px-6 text-gray-400 italic text-sm">
          {typingUsers.join(", ")} {typingUsers.length > 1 ? "are" : "is"}{" "}
          typing...
        </div>
      )}

      {/* Input */}
      <div className="fixed bottom-0 left-0 w-full bg-black/90 backdrop-blur-md px-6 py-4 border-t border-gray-800 flex items-center gap-2">
        <input
          type="text"
          className="flex-1 p-3 rounded-2xl bg-black/60 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          placeholder="Type your message..."
          value={input}
          onChange={handleInputChange}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        />
        <button
          onClick={sendMessage}
          className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-2xl transition-all duration-200"
        >
          Send
        </button>
      </div>

      {/* Scrollbar */}
      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.2);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.4);
        }
      `}</style>
    </div>
  );
}

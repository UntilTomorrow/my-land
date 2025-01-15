import { useState, useRef, useEffect } from "react";
import { ChatBubbleLeftIcon, XMarkIcon } from "@heroicons/react/24/outline";

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { type: "bot", text: "Hello! Aries AI disini !!!" },
  ]);
  const [inputValue, setInputValue] = useState("");
  const chatMessagesRef = useRef(null);

  useEffect(() => {
    if (chatMessagesRef.current) {
      chatMessagesRef.current.scrollTop = chatMessagesRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSendMessage = async () => {
    const userMessage = inputValue.trim();
    if (!userMessage) return;

    setMessages((prev) => [...prev, { type: "user", text: userMessage }]);
    setInputValue("");

    setMessages((prev) => [...prev, { type: "bot", text: "Typing..." }]);

    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: userMessage }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`HTTP Error: ${response.status} - ${errorText}`);
      }

      const data = await response.json();
      setMessages((prev) =>
        prev.map((msg, idx) =>
          idx === prev.length - 1 && msg.text === "Typing..."
            ? { type: "bot", text: data.output }
            : msg
        )
      );
    } catch (error) {
      console.error("Request gagal:", error.message);
      setMessages((prev) =>
        prev.map((msg, idx) =>
          idx === prev.length - 1 && msg.text === "Typing..."
            ? { type: "bot", text: "Maaf, terjadi kesalahan." }
            : msg
        )
      );
    }
  };

  return (
    <div className="fixed bottom-4 right-4">
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="bg-indigo-600 text-white rounded-full p-3 shadow-lg hover:bg-indigo-700 transition-colors duration-200"
        >
          <ChatBubbleLeftIcon className="h-6 w-6" />
        </button>
      )}
      {isOpen && (
        <div className="bg-white rounded-lg shadow-xl w-80 h-96 flex flex-col">
          <div className="bg-indigo-600 text-white p-4 rounded-t-lg flex justify-between items-center">
            <h3 className="font-bold">Chat with Aries AI</h3>
            <button onClick={() => setIsOpen(false)}>
              <XMarkIcon className="h-6 w-6" />
            </button>
          </div>
          <div className="flex-grow p-4 overflow-y-auto" ref={chatMessagesRef}>
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`message ${
                  msg.type === "user"
                    ? "self-end bg-blue-100 text-right"
                    : "self-start bg-gray-100"
                } p-2 rounded-lg mb-2`}
              >
                {msg.text}
              </div>
            ))}
          </div>
          <div className="p-4 border-t flex">
            <input
              type="text"
              placeholder="Type your message..."
              className="flex-grow px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === "Enter") handleSendMessage();
              }}
            />
            <button
              onClick={handleSendMessage}
              className="bg-indigo-600 text-white px-2 py-1 ml-1 rounded-md hover:bg-indigo-700"
            >
              Send
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

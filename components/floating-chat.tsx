"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MessageCircle, X, Send, Minimize2, Maximize2 } from "lucide-react";
import { getMessage } from "@/utils/actions";

type Message = {
  id: string;
  content: string;
  sender: "user" | "bot";
  timestamp: Date;
};

export function FloatingChat({ userId }: { userId: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      content:
        "Hi there! I'm UNI the deer, your assistant. How can I help you today with your studies or wellbeing?",
      sender: "bot",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen && !isMinimized) {
      scrollToBottom();
    }
  }, [messages, isOpen, isMinimized]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSend = async () => {
    if (input.trim() === "") return;

    // Add user message
    const userMessage: Message = {
      id: `user-${Date.now()}`,
      content: input,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    const response = await getMessage(userId, userMessage.content);

    const botMessage: Message = {
      id: `bot-${Date.now()}`,
      content: response as string,
      sender: "bot",
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, botMessage]);
    setIsTyping(false);
  };

  return (
    <>
      {/* Floating chat button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-10 right-4 z-50 cursor-pointer bg-tertiary-theme text-white rounded-full p-3 shadow-lg hover:bg-tertiary-theme/80 transition-all"
        >
          <MessageCircle className="h-6 w-6" />
          <span className="absolute -top-1 -right-1 h-3 w-3 bg-green-500 rounded-full animate-pulse"></span>
        </button>
      )}

      {/* Chat window */}
      {isOpen && (
        <div
          className={`fixed z-50 transition-all duration-300 shadow-xl rounded-t-xl ${
            isMinimized
              ? "bottom-0 right-4 w-60 h-12"
              : "bottom-0 right-0 sm:right-4 w-full sm:w-80 md:w-96 h-[70vh] max-h-[500px]"
          }`}
        >
          {/* Chat header */}
          <div className="bg-gradient-to-r from-primary-theme to-tertiary-theme text-white p-3 rounded-t-xl flex justify-between items-center">
            <div className="flex items-center">
              {!isMinimized && <MessageCircle className="h-5 w-5 mr-2" />}
              <h3 className="font-medium">UNI Support</h3>
            </div>
            <div className="flex items-center space-x-1">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsMinimized(!isMinimized)}
                className="h-7 w-7 text-white hover:bg-white/20"
              >
                {isMinimized ? (
                  <Maximize2 className="h-4 w-4" />
                ) : (
                  <Minimize2 className="h-4 w-4" />
                )}
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => {
                  setIsOpen(false);
                  setIsMinimized(false);
                }}
                className="h-7 w-7 text-white hover:bg-white/20"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Chat body */}
          {!isMinimized && (
            <>
              <div className="bg-white p-3 overflow-y-auto h-[calc(100%-110px)]">
                <div className="space-y-3">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${
                        message.sender === "user"
                          ? "justify-end"
                          : "justify-start"
                      }`}
                    >
                      <div
                        className={`max-w-[80%] rounded-lg px-3 py-2 ${
                          message.sender === "user"
                            ? "bg-primary-theme text-white"
                            : "bg-teal-100 text-gray-800"
                        }`}
                      >
                        <p className="text-sm">{message.content}</p>
                        <p className="text-xs opacity-70 mt-1">
                          {message.timestamp.toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </p>
                      </div>
                    </div>
                  ))}

                  {isTyping && (
                    <div className="flex justify-start">
                      <div className="bg-teal-100 text-gray-800 rounded-lg px-3 py-2">
                        <div className="flex space-x-1">
                          <div className="h-2 w-2 bg-gray-500 rounded-full animate-bounce"></div>
                          <div
                            className="h-2 w-2 bg-gray-500 rounded-full animate-bounce"
                            style={{ animationDelay: "0.2s" }}
                          ></div>
                          <div
                            className="h-2 w-2 bg-gray-500 rounded-full animate-bounce"
                            style={{ animationDelay: "0.4s" }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  )}

                  <div ref={messagesEndRef} />
                </div>
              </div>

              {/* Chat input */}
              <div className="bg-gray-50 p-3 border-t border-gray-200">
                <div className="flex items-center space-x-2">
                  <Input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Type your message..."
                    className="flex-1 border-secundary-theme"
                    onKeyPress={(e) => e.key === "Enter" && handleSend()}
                  />
                  <Button
                    onClick={handleSend}
                    disabled={input.trim() === "" || isTyping}
                    className="bg-tertiary-theme hover:bg-tertiary-theme h-9 w-9 p-0"
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </>
          )}
        </div>
      )}
    </>
  );
}

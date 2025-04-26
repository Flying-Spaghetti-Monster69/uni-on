"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Send } from "lucide-react"

type Message = {
  id: string
  content: string
  sender: "user" | "bot"
  timestamp: Date
}

export function ChatBot() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      content:
        "Hi there! I'm MindfulBot, your personal assistant. How can I help you today with your studies or wellbeing?",
      sender: "bot",
      timestamp: new Date(),
    },
  ])

  const [input, setInput] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  const handleSend = () => {
    if (input.trim() === "") return

    // Add user message
    const userMessage: Message = {
      id: `user-${Date.now()}`,
      content: input,
      sender: "user",
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsTyping(true)

    // Simulate bot response
    setTimeout(() => {
      const botResponses = [
        "I understand how you feel. University can be stressful at times. Have you tried any relaxation techniques?",
        "That's a great question about your studies. I'd recommend breaking down the material into smaller chunks and using active recall techniques.",
        "It sounds like you're feeling overwhelmed. Remember to take breaks and practice self-care. Your mental health is just as important as your studies.",
        "I can help you organize your study schedule. What subjects are you finding most challenging right now?",
        "Have you tried the Pomodoro technique? It's 25 minutes of focused study followed by a 5-minute break. Many students find it helpful for maintaining concentration.",
      ]

      const randomResponse = botResponses[Math.floor(Math.random() * botResponses.length)]

      const botMessage: Message = {
        id: `bot-${Date.now()}`,
        content: randomResponse,
        sender: "bot",
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, botMessage])
      setIsTyping(false)
    }, 1500)
  }

  return (
    <div className="flex flex-col h-[50vh]">
      <div className="flex-1 overflow-y-auto mb-4 space-y-4">
        {messages.map((message) => (
          <div key={message.id} className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}>
            <div
              className={`max-w-[80%] rounded-lg px-4 py-2 ${
                message.sender === "user" ? "bg-blue-600 text-white" : "bg-teal-100 text-gray-800"
              }`}
            >
              <p>{message.content}</p>
              <p className="text-xs opacity-70 mt-1">
                {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
              </p>
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-teal-100 text-gray-800 rounded-lg px-4 py-2">
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

      <div className="flex items-center space-x-2">
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message..."
          className="flex-1 border-teal-200"
          onKeyPress={(e) => e.key === "Enter" && handleSend()}
        />
        <Button
          onClick={handleSend}
          disabled={input.trim() === "" || isTyping}
          className="bg-blue-600 hover:bg-blue-700"
        >
          <Send className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}

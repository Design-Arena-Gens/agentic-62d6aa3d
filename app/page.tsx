/* eslint-disable @next/next/no-img-element */
"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { ChatMessage, ChatAuthor } from "@/components/ChatMessage";
import { Composer } from "@/components/Composer";
import { craftResponse } from "@/lib/responder";

interface Message {
  id: string;
  author: ChatAuthor;
  text: string;
  createdAt: Date;
}

const formatTime = (date: Date) =>
  date.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" });

const greetings = [
  "Hey there! I'm your conversational co-pilot.",
  "Welcome! I'm tuned in and ready to chat.",
  "Hi! Let's follow the thread wherever it goes."
];

export default function HomePage() {
  const [messages, setMessages] = useState<Message[]>(() => [
    {
      id: crypto.randomUUID(),
      author: "bot",
      text: greetings[Math.floor(Math.random() * greetings.length)],
      createdAt: new Date()
    }
  ]);
  const [isThinking, setIsThinking] = useState(false);
  const [turn, setTurn] = useState(1);
  const feedRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const node = feedRef.current;
    if (!node) {
      return;
    }

    node.scrollTop = node.scrollHeight;
  }, [messages]);

  const pendingMessage = useMemo(() => {
    if (!isThinking) {
      return null;
    }

    return {
      id: "typing",
      author: "bot" as const,
      text: "Thinking…",
      createdAt: new Date()
    };
  }, [isThinking]);

  const handleSend = (message: string) => {
    const nextMessage: Message = {
      id: crypto.randomUUID(),
      author: "me",
      text: message,
      createdAt: new Date()
    };

    setMessages((current) => [...current, nextMessage]);
    setIsThinking(true);

    const responseDelay = Math.min(
      2000,
      500 + Math.floor(Math.random() * 900) + message.length * 15
    );

    window.setTimeout(() => {
      setMessages((current) => [
        ...current,
        {
          id: crypto.randomUUID(),
          author: "bot",
          text: craftResponse(message, turn),
          createdAt: new Date()
        }
      ]);
      setTurn((value) => value + 1);
      setIsThinking(false);
    }, responseDelay);
  };

  const feedMessages = pendingMessage
    ? [...messages, pendingMessage]
    : messages;

  return (
    <main>
      <header className="chat-header">
        <h1>Talk To Me</h1>
        <p>Drop a thought, ask anything, or simply say hello.</p>
      </header>
      <section className="chat-feed" ref={feedRef} aria-live="polite">
        {feedMessages.map((message) => (
          <ChatMessage
            key={message.id}
            author={message.author}
            text={message.text}
            timestamp={formatTime(message.createdAt)}
          />
        ))}
      </section>
      <Composer onSend={handleSend} disabled={isThinking} />
    </main>
  );
}

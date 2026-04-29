"use client";

import { useState } from "react";

export default function Home() {
  const [messages, setMessages] = useState<{ role: string; text: string }[]>([]);
  const [input, setInput] = useState("");

  const sendMessage = async () => {
    if (!input) return;

    const userMessage = { role: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);

    const res = await fetch("/api/chat", {
      method: "POST",
      body: JSON.stringify({ message: input }),
    });

    const data = await res.json();

    const botMessage = { role: "cat", text: data.reply };
    setMessages((prev) => [...prev, botMessage]);

    setInput("");
  };

  return (
    <main style={{ padding: 20, fontFamily: "sans-serif" }}>
      <h1>🐱 Calm Cat</h1>

      <div style={{ minHeight: 300, marginBottom: 20 }}>
        {messages.map((m, i) => (
          <div key={i}>
            <b>{m.role === "user" ? "คุณ" : "แมว"}:</b> {m.text}
          </div>
        ))}
      </div>

      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="พิมพ์ความรู้สึกของคุณ..."
        style={{ padding: 10, width: "70%" }}
      />
      <button onClick={sendMessage} style={{ padding: 10 }}>
        ส่ง
      </button>
    </main>
  );
}

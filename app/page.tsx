"use client";

import { useState, useEffect, useRef } from "react";

type Message = {
  role: "user" | "cat";
  text: string;
};

export default function Home() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");

  const [animation, setAnimation] = useState("cat_neutral");
  const [showReward, setShowReward] = useState(false);
  const [visits, setVisits] = useState(0);

  const [isAnimating, setIsAnimating] = useState(false);
  const [showHearts, setShowHearts] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // ⏱️ idle
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!animation.includes("reward")) {
        setAnimation("cat_idle");
      }
    }, 10000);

    return () => clearTimeout(timer);
  }, [messages, animation]);

  // 📊 visits
  useEffect(() => {
    const count = localStorage.getItem("visits");
    const newCount = count ? Number(count) + 1 : 1;

    localStorage.setItem("visits", newCount.toString());
    setVisits(newCount);
  }, []);

  // 📜 auto scroll + focus
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    inputRef.current?.focus();
  }, [messages, isLoading]);

  // 💬 send message
  const sendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = { role: "user", text: input };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);
    setAnimation("cat_idle");

    try {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 10000);

      const res = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: userMessage.text }),
        signal: controller.signal,
      });

      clearTimeout(timeout);

      if (!res.ok) throw new Error("API error");

      const data = await res.json();

      const botMessage: Message = {
        role: "cat",
        text: data.reply || "เมี๊ยว… เราคิดไม่ออกแฮะ",
      };

      setMessages((prev) => {
        let newMessages = [...prev, botMessage];

        // 🎁 reward
        if (!showReward && newMessages.length >= 6) {
          setShowReward(true);

          const rewardTexts = [
            "เลาดีใจจนหางสั่น! วันนี้พิเศษ... ให้เกาพุง 1 ครั้งถ้วน!",
            "เลาดีใจที่นุดมาหา... ให้ลูบหัว 1 ทีเยย",
          ];

          const randomText =
            rewardTexts[Math.floor(Math.random() * rewardTexts.length)];

          newMessages.push({
            role: "cat",
            text: randomText,
          });
        }

        return newMessages;
      });

      const map: Record<string, string> = {
        STRESSED: "cat_stress",
        SAD: "cat_sad",
        LONELY: "cat_idle",
        POSITIVE: "cat_happy",
        NEUTRAL: "cat_neutral",
      };

      setAnimation(map[data.emotion] || "cat_idle");
    } catch (err) {
      console.error(err);

      setMessages((prev) => [
        ...prev,
        {
          role: "cat",
          text: "เมี๊ยว… ตอนนี้เราตอบไม่ได้ ลองใหม่อีกทีนะ",
        },
      ]);

      setAnimation("cat_sad");
    } finally {
      setIsLoading(false);
    }
  };

  // 🐾 pet
  const handlePet = () => {
    const isHead = Math.random() > 0.5;

    setAnimation(isHead ? "cat_reward_head" : "cat_reward_belly");

    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), 300);

    setShowHearts(true);
    setTimeout(() => setShowHearts(false), 1000);

    const audio = new Audio("/purr.mp3");
    audio.volume = 0.3;
    audio.play().catch(() => {});

    setTimeout(() => {
      setAnimation("cat_happy");
    }, 2000);
  };

  return (
    <main
      style={{
        padding: 20,
        fontFamily: "sans-serif",
        textAlign: "center",
        maxWidth: 500,
        margin: "0 auto",
      }}
    >
      {/* 🐱 Header */}
      <h1 style={{ display: "flex", justifyContent: "center", gap: 10 }}>
        <img src="/cat/cat_neutral.png" width={40} />
        Calm Cat
      </h1>

      {/* 🐱 Cat */}
      <div style={{ position: "relative" }}>
        <img
          src={`/cat/${animation}.png`}
          width={180}
          onClick={() => {
            setAnimation("cat_happy");
            setIsAnimating(true);
            setTimeout(() => setIsAnimating(false), 300);
          }}
          style={{
            cursor: "pointer",
            transform: isAnimating ? "scale(1.1)" : "scale(1)",
            transition: "0.2s",
          }}
        />

        {showHearts && (
          <div style={{ position: "absolute", left: "50%", top: 0 }}>
            <div style={{ animation: "floatUp 1s ease-out" }}>💗</div>
          </div>
        )}
      </div>

      {/* 🏆 unlock */}
      {visits >= 5 && (
        <div>
          <p>นุด… กลับมาบ่อยจัง เราเริ่มชอบแล้วนะ 🐱</p>
          <img src="/cat/cat_special.png" width={120} />
        </div>
      )}

      {/* 💬 chat */}
      <div
        style={{
          minHeight: 300,
          maxHeight: 300,
          overflowY: "auto",
          marginBottom: 20,
          textAlign: "left",
        }}
      >
        {messages.map((m, i) => (
          <div key={i}>
            <b>{m.role === "user" ? "คุณ" : "แมว"}:</b> {m.text}
          </div>
        ))}

        {isLoading && <div>แมวกำลังคิด… 🐱💭</div>}

        <div ref={bottomRef} />
      </div>

      {/* ✏️ input */}
      <input
        ref={inputRef}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="พิมพ์ความรู้สึกของคุณ..."
        style={{ padding: 10, width: "70%" }}
        onKeyDown={(e) => {
          if (e.key === "Enter") sendMessage();
        }}
      />

      <button onClick={sendMessage} style={{ padding: 10 }}>
        ส่ง
      </button>

      {/* 🐾 reward */}
      {showReward && (
        <div style={{ marginTop: 20 }}>
          <p>มานี่… เราจะให้รางวัลนุด 🐾</p>

          <button onClick={handlePet}>
            <img src="/cat/paw.png" width={70} />
          </button>
        </div>
      )}

      {/* ✨ animation */}
      <style>
        {`
          @keyframes floatUp {
            0% { transform: translateY(0); opacity: 1; }
            100% { transform: translateY(-50px); opacity: 0; }
          }
        `}
      </style>
    </main>
  );
}

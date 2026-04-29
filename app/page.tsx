"use client";

import { useState, useEffect } from "react";

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

  // ⏱️ idle → กลับไป idle ถ้าไม่มี activity
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!animation.includes("reward")) {
        setAnimation("cat_idle");
      }
    }, 10000);

    return () => clearTimeout(timer);
  }, [messages, animation]);

  // 📊 visits counter
  useEffect(() => {
    const count = localStorage.getItem("visits");
    const newCount = count ? Number(count) + 1 : 1;

    localStorage.setItem("visits", newCount.toString());
    setVisits(newCount);
  }, []);

  // 💬 send message
  const sendMessage = async () => {
    if (!input || isLoading) return;

    const userMessage: Message = { role: "user", text: input };

    // ✅ show user instantly
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);
    setAnimation("cat_idle");

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: userMessage.text }),
      });

      if (!res.ok) throw new Error("API error");

      const data = await res.json();

      const botMessage: Message = {
        role: "cat",
        text: data.reply || "เมี๊ยว… เราคิดไม่ออกแฮะ",
      };

      // ✅ update safely
      setMessages((prev) => {
        let newMessages = [...prev, botMessage];

        // 🎁 reward trigger
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

      // 🎭 animation mapping
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

      // ❗ fallback message
      setMessages((prev) => [
        ...prev,
        {
          role: "cat",
          text: "เมี๊ยว… ตอนนี้เรางงนิดหน่อย ลองใหม่อีกทีนะ",
        },
      ]);

      setAnimation("cat_sad");
    } finally {
      setIsLoading(false);
    }
  };

  // 🐾 pet interaction
  const handlePet = () => {
    const isHead = Math.random() > 0.5;

    setAnimation(isHead ? "cat_reward_head" : "cat_reward_belly");

    // 🐱 bounce
    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), 300);

    // 💗 hearts
    setShowHearts(true);
    setTimeout(() => setShowHearts(false), 1000);

    // 🎵 sound (optional)
    const audio = new Audio("/purr.mp3");
    audio.volume = 0.3;
    audio.play().catch(() => {});

    // 🔁 back to happy
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

        {/* 💗 hearts */}
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
      <div style={{ minHeight: 300, marginBottom: 20, textAlign: "left" }}>
        {messages.map((m, i) => (
          <div key={i}>
            <b>{m.role === "user" ? "คุณ" : "แมว"}:</b> {m.text}
          </div>
        ))}

        {isLoading && <div>แมวกำลังคิด… 🐱💭</div>}
      </div>

      {/* ✏️ input */}
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="พิมพ์ความรู้สึกของคุณ..."
        style={{ padding: 10, width: "70%" }}
        onKeyDown={(e) => {
          if (e.key === "Enter") sendMessage();
        }}
      />

      <button
        onClick={sendMessage}
        style={{ padding: 10 }}
        disabled={isLoading}
      >
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


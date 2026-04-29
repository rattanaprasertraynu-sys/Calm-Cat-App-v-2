"use client";

import { useState, useEffect } from "react";

export default function Home() {
  const [messages, setMessages] = useState<{ role: string; text: string }[]>([]);
  const [input, setInput] = useState("");

  const [animation, setAnimation] = useState("cat_neutral");
  const [showReward, setShowReward] = useState(false);
  const [visits, setVisits] = useState(0);

  const [isAnimating, setIsAnimating] = useState(false);
  const [showHearts, setShowHearts] = useState(false);

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

  const sendMessage = async () => {
    if (!input) return;

    try {
      const userMessage = { role: "user", text: input };
      setMessages((prev) => [...prev, userMessage]);

      const res = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: input }),
      });

      const data = await res.json();

      const botMessage = { role: "cat", text: data.reply };
      setMessages((prev) => [...prev, botMessage]);

      const map: any = {
        STRESSED: "cat_stress",
        SAD: "cat_sad",
        LONELY: "cat_idle",
        POSITIVE: "cat_happy",
        NEUTRAL: "cat_neutral",
      };

      setAnimation(map[data.emotion] || "cat_idle");

      // 🎁 reward
      if (!showReward && messages.length + 1 >= 4) {
        setShowReward(true);

        const rewardTexts = [
          "เลาดีใจจนหางสั่น! วันนี้พิเศษ... ให้เกาพุง 1 ครั้งถ้วน!",
          "เลาดีใจที่นุดมาหา... ให้ลูบหัว 1 ทีเยย",
        ];

        const randomText =
          rewardTexts[Math.floor(Math.random() * rewardTexts.length)];

        setMessages((prev) => [
          ...prev,
          { role: "cat", text: randomText },
        ]);
      }

      setInput("");
    } catch (err) {
      console.error(err);
    }
  };

  // 🐾 ลูบแมว
  const handlePet = () => {
    const random = Math.random();

    if (random > 0.5) {
      setAnimation("cat_reward_head");
    } else {
      setAnimation("cat_reward_belly");
    }

    // 🐱 เด้ง
    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), 300);

    // 💗 หัวใจ
    setShowHearts(true);
    setTimeout(() => setShowHearts(false), 1000);

    // 🎵 เสียง (มีหรือไม่มีไฟล์ก็ไม่พัง)
    const audio = new Audio("/purr.mp3");
    audio.volume = 0.3;
    audio.play().catch(() => {});

    // 🔁 กลับ happy
    setTimeout(() => {
      setAnimation("cat_happy");
    }, 2000);
  };

  return (
    <main style={{ padding: 20, fontFamily: "sans-serif", textAlign: "center" }}>
      {/* 🐱 Header */}
      <h1 style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 10 }}>
        <img src="/cat/cat_neutral.png" width={40} style={{ borderRadius: "50%" }} />
        Calm Cat
      </h1>

      {/* 🐱 แมว */}
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
            transition: "transform 0.2s ease",
          }}
        />

        {/* 💗 หัวใจ */}
        {showHearts && (
          <div style={{ position: "absolute", left: "50%", top: 0 }}>
            <div style={{ fontSize: 24, animation: "floatUp 1s ease-out" }}>💗</div>
          </div>
        )}
      </div>

      {/* 🏆 แมวพิเศษ */}
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
      </div>

      {/* ✏️ input */}
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="พิมพ์ความรู้สึกของคุณ..."
        style={{ padding: 10, width: "70%" }}
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

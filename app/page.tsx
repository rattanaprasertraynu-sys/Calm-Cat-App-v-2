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
  const [rewardGiven, setRewardGiven] = useState(false);

  const [visits, setVisits] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [showHearts, setShowHearts] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

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

  // 💬 send message
  const sendMessage = async () => {
    if (!input || isLoading || showReward) return;

    const userMessage: Message = { role: "user", text: input };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: userMessage.text }),
      });

      const data = await res.json();

      const botMessage: Message = {
        role: "cat",
        text: data.reply || "เมี๊ยว… เราคิดไม่ออกแฮะ",
      };

      setMessages((prev) => {
        const newMessages = [...prev, botMessage];

        // 🎁 trigger reward ครั้งเดียว
        if (!rewardGiven && newMessages.length >= 6) {
          setRewardGiven(true);
          setShowReward(true);

          const rewardTexts = [
            "เลาดีใจจนหางสั่น! วันนี้พิเศษ... ให้เกาพุง 1 ครั้งถ้วน!",
            "เลาดีใจที่นุดมาหา... ให้ลูบหัว 1 ทีเยย",
          ];

          const randomText =
            rewardTexts[Math.floor(Math.random() * rewardTexts.length)];

          return [
            ...newMessages,
            { role: "cat", text: randomText },
          ];
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
      setMessages((prev) => [
        ...prev,
        { role: "cat", text: "เมี๊ยว… ลองใหม่อีกทีนะ" },
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

    // ✅ reset flow หลัง reward
    setTimeout(() => {
      setAnimation("cat_happy");
      setShowReward(false);
    }, 2000);
  };

  return (
    <main style={{ padding: 20, textAlign: "center", maxWidth: 500, margin: "0 auto" }}>
      <h1>
        <img src="/cat/cat_neutral.png" width={40} /> Calm Cat
      </h1>

      {/* 🐱 cat */}
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
          }}
        />

        {showHearts && (
          <div style={{ position: "absolute", left: "50%", top: 0 }}>
            💗
          </div>
        )}
      </div>

      {/* 🏆 unlock */}
      {visits >= 5 && (
        <div>
          <p>นุด… กลับมาบ่อยจัง 🐱</p>
          <img src="/cat/cat_special.png" width={120} />
        </div>
      )}

      {/* 💬 chat */}
      <div style={{ minHeight: 300, textAlign: "left" }}>
        {messages.map((m, i) => (
          <div key={i}>
            <b>{m.role === "user" ? "คุณ" : "แมว"}:</b> {m.text}
          </div>
        ))}

        {isLoading && <div>แมวกำลังคิด…</div>}
      </div>

      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && sendMessage()}
      />

      <button onClick={sendMessage} disabled={isLoading || showReward}>
        ส่ง
      </button>

      {/* 🐾 reward */}
      {showReward && (
        <div>
          <p>มานี่… 🐾</p>
          <button onClick={handlePet}>
            <img src="/cat/paw.png" width={70} />
          </button>
        </div>
      )}
    </main>
  );
}

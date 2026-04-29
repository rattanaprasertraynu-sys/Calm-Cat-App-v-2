"use client";

import { useState } from "react";
const [visits, setVisits] = useState(0);
useEffect(() => {
  const count = localStorage.getItem("visits");

  const newCount = count ? Number(count) + 1 : 1;

  localStorage.setItem("visits", newCount.toString());
  setVisits(newCount);
}, []);

export default function Home() {
  const [messages, setMessages] = useState<{ role: string; text: string }[]>([]);
  const [input, setInput] = useState("");

  // 🐱 แมว
  const [animation, setAnimation] = useState("cat_neutral");

  // 🎁 reward
  const [showReward, setShowReward] = useState(false);

  // 💬 ส่งข้อความ
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

    // 🎭 เปลี่ยนหน้าแมวตาม emotion
    const map: any = {
      STRESSED: "cat_stress",
      SAD: "cat_sad",
      LONELY: "cat_idle",
      POSITIVE: "cat_happy",
      NEUTRAL: "cat_idle",
    };

    setAnimation(map[data.emotion] || "cat_idle");

    // 🎁 trigger reward
    if (messages.length >= 4) {
      setShowReward(true);

      // 🐱 random ข้อความแมว (แนวเจ้านาย 😼)
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
  };

  // 🐾 ลูบแมว
  const handlePet = () => {
    const random = Math.random();

    if (random > 0.5) {
      setAnimation("cat_reward_head");
    } else {
      setAnimation("cat_reward_belly");
    }

    // 🎵 เสียง purr
    const audio = new Audio("/purr.mp3");
    audio.volume = 0.3;
    audio.play();
  };

  return (
    <main style={{ padding: 20, fontFamily: "sans-serif" }}>
      <h1>🐱 Calm Cat</h1>

      {/* 🐱 แมว */}
      <img
        src={`/cat/${animation}.png`}
        width={180}
{/* 🏆 แมวพิเศษ */}
{visits >= 5 && (
<div>
<p>นุด… กลับมาบ่อยจัง เราเริ่มชอบแล้วนะ 🐱</p>
<img src="/cat/cat_special.png" width={120} />
</div>
)}
        onClick={() => setAnimation("cat_happy")} // 🐾 tap แล้วขยับ
        style={{ cursor: "pointer" }}
      />

      {/* 💬 chat */}
      <div style={{ minHeight: 300, marginBottom: 20 }}>
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

      {/* 📩 ส่ง */}
      <button onClick={sendMessage} style={{ padding: 10 }}>
        ส่ง
      </button>

      {/* 🐾 reward */}
      {showReward && (
        <div style={{ marginTop: 20 }}>
          <p>มานี่… เราจะให้รางวัลนุด 🐾</p>

          <button onClick={handlePet} className="paw-button">
            <img src="/cat/paw.png" width={70} />
          </button>
        </div>
      )}
    </main>
  );
}


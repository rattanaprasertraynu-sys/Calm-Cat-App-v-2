"use client";

import { useState, useEffect, useRef } from "react";

type Phase =
| "splash"
| "greeting"
| "chat"
| "emotion"
| "reward"
| "healing"
| "farewell";

type Reward = {
image: string;
text: string;
};

export default function Home() {
const [phase, setPhase] = useState<Phase>("splash");
const [input, setInput] = useState("");
const [animation, setAnimation] = useState("cat_idle");
const [healingText, setHealingText] = useState("");
const [showReward, setShowReward] = useState(false);
const [currentReward, setCurrentReward] =
useState<Reward | null>(null);

// 🔥 timeout control
const timeoutRef = useRef<NodeJS.Timeout | null>(null);
const runTimeout = (fn: () => void, delay: number) => {
if (timeoutRef.current) clearTimeout(timeoutRef.current);
timeoutRef.current = setTimeout(fn, delay);
};

// 🎵 audio refs
const purrRef = useRef<HTMLAudioElement | null>(null);
const fadeRef = useRef<NodeJS.Timeout | null>(null);

const rewards: Reward[] = [
{ image: "/rewards/charm_protect.png", text: "ยันต์กันคนใจร้าย 🧿" },
{ image: "/rewards/coin_happiness.png", text: "เหรียญเรียกความสุข ✨" },
{ image: "/rewards/orb_calm.png", text: "ลูกแก้วใจสงบ 💗" },
{ image: "/rewards/pouch_lucky.png", text: "ถุงโชคดีแมวส้ม 🍊" },
{ image: "/rewards/staff_power.png", text: "คฑาแมวส้มพลังใจ 🐾" },
];

// 🌟 splash → greeting (นิ่ง)
useEffect(() => {
runTimeout(() => setPhase("greeting"), 2000);
}, []);

// 🧹 clear timeout ทุกครั้ง
useEffect(() => {
return () => {
if (timeoutRef.current) clearTimeout(timeoutRef.current);
};
}, [phase]);

// 📊 session counter
useEffect(() => {
const count = localStorage.getItem("sessions");
const newCount = count ? Number(count) + 1 : 1;
localStorage.setItem("sessions", newCount.toString());
if (newCount >= 3) setShowReward(true);
}, []);

// 🎵 setup purr
useEffect(() => {
const audio = new Audio("/purr.wav");
audio.loop = true;
audio.volume = 0;
purrRef.current = audio;
}, []);

const startPurr = async () => {
if (!purrRef.current) return;
const audio = purrRef.current;


try {
  await audio.play();

  if (fadeRef.current) clearInterval(fadeRef.current);

  let vol = audio.volume;
  fadeRef.current = setInterval(() => {
    vol += 0.02;
    if (vol >= 0.25) {
      vol = 0.25;
      if (fadeRef.current) clearInterval(fadeRef.current);
    }
    audio.volume = vol;
  }, 100);
} catch {}


};

const stopPurr = () => {
if (!purrRef.current) return;
const audio = purrRef.current;


if (fadeRef.current) clearInterval(fadeRef.current);

let vol = audio.volume;
fadeRef.current = setInterval(() => {
  vol -= 0.02;
  if (vol <= 0) {
    vol = 0;
    if (fadeRef.current) clearInterval(fadeRef.current);
    audio.pause();
    audio.currentTime = 0;
  }
  audio.volume = vol;
}, 100);


};

// 🐱 default animation
useEffect(() => {
if (phase === "chat") setAnimation("cat_idle");
}, [phase]);

// 💬 send message (FIX แมวโหม่ง)
const sendMessage = () => {
if (!input.trim()) return;


stopPurr();

setAnimation("cat_head_bunt_1");

setTimeout(() => setAnimation("cat_head_bunt_2"), 150);
setTimeout(() => setAnimation("cat_head_bunt_3"), 300);
setTimeout(() => setAnimation("cat_love"), 500);

const meow = new Audio("/meow.wav");
meow.volume = 0.4;
meow.play().catch(() => {});

setInput("");

runTimeout(() => setPhase("emotion"), 1200);


};

const selectEmotion = (emotion: string) => {
const healingMap: Record<string, string> = {
เหนื่อย: "เก่งมากแล้วนุด... พักบนพุงจ้มนะ",
เศร้า: "ไม่เป็นไรนะ... จ้มอยู่ตรงนี้ข้างๆ เอง",
ว้าวุ่น: "ใจเย็นๆ นะนุด... ค่อยๆ หายใจนะ",
ปกติ: "ดีแล้วล่ะ... วันเรียบๆ ก็น่ารักดีนะ",
ใจฟู: "เย้! จ้มดีใจด้วยนะนุด ใจฟูตามเลย!",
};


const animationMap: Record<string, string> = {
  เหนื่อย: "cat_tired",
  เศร้า: "cat_sad",
  ว้าวุ่น: "cat_anxious",
  ปกติ: "cat_normal",
  ใจฟู: "cat_reward_head",
};

setHealingText(healingMap[emotion]);
setAnimation(animationMap[emotion]);

runTimeout(() => {
  if (showReward) {
    const randomReward =
      rewards[Math.floor(Math.random() * rewards.length)];
    setCurrentReward(randomReward);
    setPhase("reward");
  } else {
    setPhase("healing");
  }
}, 700);


};

const handleRewardContinue = () => {
setPhase("healing");
};

const endSession = () => {
setAnimation("cat_idle");
setPhase("farewell");


runTimeout(() => {
  setPhase("splash");
  runTimeout(() => setPhase("greeting"), 2000);
}, 3000);


};

return ( <main style={containerStyle}>
{/* 🌟 SPLASH */}
{phase === "splash" && (
<div style={{ animation: "fadeIn 1.5s ease" }}> <img src="/logo/calmcat_logo.png" width={240} />
<p style={{ color: "#999" }}>
safe space for your heart 🐾 </p> </div>
)}


  {/* 🐱 GREETING */}
  {phase === "greeting" && (
    <div style={{ animation: "fadeIn 1s ease" }}>
      <img src="/cat/cat_idle.png" width={220} />
      <p>หวัดดีนุด... เล่ามาเลย จ้มรอฟังอยู่</p>
      <button onClick={() => setPhase("chat")} style={buttonStyle}>
        เริ่มเลย
      </button>
    </div>
  )}

  {/* 💬 CHAT (สำคัญ: ใช้ animation แล้ว) */}
  {phase === "chat" && (
    <div style={{ animation: "fadeIn 0.6s ease" }}>
      <img src={`/cat/${animation}.png`} width={220} />

      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onFocus={startPurr}
        onBlur={stopPurr}
        onKeyDown={(e) => e.key === "Enter" && sendMessage()}
      />

      <button onClick={sendMessage} style={buttonStyle}>
        ส่งความรู้สึกให้จ้ม
      </button>
    </div>
  )}

 {/* 💛 EMOTION */}
{phase === "emotion" && (
  <div
    style={{
      animation: "fadeIn 0.6s ease",
    }}
  >
    <img
      src="/cat/cat_idle.png"
      width={220}
    />

    <p
      style={{
        marginTop: 16,
        fontSize: 20,
        color: "#444",
      }}
    >
      แล้วตอนนี้... ใจนุดเป็นยังไง?
    </p>

    <div
      style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: 12,
        marginTop: 20,
        width: 300,
      }}
    >
      {["เหนื่อย", "เศร้า", "ว้าวุ่น", "ปกติ"].map((emotion) => (
        <button
          key={emotion}
          onClick={() => selectEmotion(emotion)}
          style={{
            padding: "14px 10px",
            borderRadius: 18,
            border: "none",
            background: "#FFF4E8",
            fontSize: 16,
            cursor: "pointer",
          }}
        >
          {emotion}
        </button>
      ))}
    </div>

    <div style={{ marginTop: 12 }}>
      <button
        onClick={() => selectEmotion("ใจฟู")}
        style={{
          padding: "14px 24px",
          borderRadius: 18,
          border: "none",
          background: "#FFE0E6",
          fontSize: 16,
          cursor: "pointer",
        }}
      >
        ใจฟู
      </button>
    </div>
  </div>
)}

 {/* 🌷 HEALING */}
{phase === "healing" && (
  <div
    style={{
      animation: "fadeIn 0.8s ease",
      textAlign: "center",
    }}
  >
    <img
      src={`/cat/${animation}.png`}
      width={220}
      style={{
        animation: "breath 4s ease-in-out infinite",
      }}
      onError={(e) => {
        e.currentTarget.src = "/cat/cat_idle.png";
      }}
    />

    <p
      style={{
        marginTop: 18,
        fontSize: 22,
        color: "#444",
        lineHeight: 1.6,
      }}
    >
      {healingText}
    </p>

    <button
      onClick={endSession}
      style={{
        marginTop: 20,
        padding: "14px 24px",
        borderRadius: 20,
        border: "none",
        background: "#FFE7CC",
        color: "#444",
        fontSize: 16,
        cursor: "pointer",
      }}
    >
      ไว้เจอกันนะ
    </button>
  </div>
)}

  {/* 🌙 FAREWELL */}
  {phase === "farewell" && (
    <div>
      <img src="/logo/calmcat_logo.png" width={220} />
      <p>ฝันดีนะนุด 🐾</p>
    </div>
  )}

  <style>
    {`
    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(10px);}
      to { opacity: 1; transform: translateY(0);}
    }
  `}
  </style>
</main>


);
}

const containerStyle: React.CSSProperties = {
minHeight: "100dvh",
display: "flex",
justifyContent: "center",
alignItems: "center",
flexDirection: "column",
};

const buttonStyle: React.CSSProperties = {
marginTop: 20,
padding: "14px 24px",
borderRadius: 20,
border: "none",
background: "#FFE7CC",
};


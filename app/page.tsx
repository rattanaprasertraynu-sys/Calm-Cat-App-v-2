"use client";

import { useState, useEffect, useRef } from "react";

type Phase =
  | "splash"
  | "greeting"
  | "chat"
  | "emotion"
  | "healing"
  | "reward"
  | "farewell";

const text = {
  th: {
    greeting: "หวัดดีนุด... เล่ามาเลย จ้มรอฟังอยู่",
    start: "เริ่มเลย",
    askEmotion: "แล้วตอนนี้... ใจนุดเป็นยังไง?",
    send: "ส่งความรู้สึกให้จ้ม",
    goodbye: "ฝันดีนะนุด 🐾",
    continue: "ไว้เจอกันนะ",

    emotions: {
      tired: "เหนื่อย",
      sad: "เศร้า",
      anxious: "ว้าวุ่น",
      normal: "ปกติ",
      happy: "ใจฟู",
    },

    healing: {
      tired:
        "เก่งมากแล้วนุด... พักบนพุงจ้มนะ\nไม่ว่าอะไรจะเกิดขึ้น... จ้มอยู่ข้างนุดเสมอนะ 🐾",

      sad:
        "ไม่เป็นไรนะ... จ้มอยู่ตรงนี้ข้างๆ เอง\nโลกจะใจร้ายแค่ไหน... จ้มยังเข้าข้างนุดนะ 🌙",

      anxious:
        "ใจเย็นๆ นะนุด... ค่อยๆ หายใจนะ\nจ้มอาจแก้ทุกอย่างไม่ได้... แต่จะไม่ปล่อยให้นุดอยู่คนเดียว 🤍",

      normal:
        "ดีแล้วล่ะ... วันเรียบๆ ก็น่ารักดีนะ\nจ้มดีใจที่วันนี้นุดยังดูแลหัวใจตัวเองอยู่ ✨",

      happy:
        "เย้! จ้มดีใจด้วยนะนุด ใจฟูตามเลย!\nขอให้ความรู้สึกดีๆ อยู่กับนุดนานๆ เลย 🍊",
    },
  },

  en: {
    greeting: "Hi hooman... tell me everything. Jom's listening.",
    start: "Let's begin",
    askEmotion: "How's your heart feeling right now?",
    send: "Send your feelings to Jom",
    goodbye: "Goodnight hooman 🐾",
    continue: "See you again",

    emotions: {
      tired: "Tired",
      sad: "Sad",
      anxious: "Restless",
      normal: "Okay",
      happy: "Happy",
    },

    healing: {
      tired:
        "You've done well today... come rest with Jom 🐾\nNo matter what happens... Jom stays by your side.",

      sad:
        "It's okay... Jom's right here with you 🌙\nEven if the world feels heavy... you're not alone.",

      anxious:
        "Easy now, hooman... take a slow breath 🤍\nJom may not fix everything... but Jom won't leave you alone.",

      normal:
        "Quiet days are lovely too ✨\nJom's happy you're taking care of your heart.",

      happy:
        "Yay! Jom feels happy too 🍊\nHope this warm feeling stays with you for a long time.",
    },
  },
};

export default function Home() {
  const [phase, setPhase] = useState<Phase>("splash");
  const [input, setInput] = useState("");
  const [animation, setAnimation] = useState("cat_idle");
  const [healingText, setHealingText] = useState("");
  const [comfortVideo, setComfortVideo] = useState("");
  const [rewardVideo, setRewardVideo] = useState("");
  const [rewardText, setRewardText] = useState("");
  const [lang, setLang] = useState<"th" | "en">("th");

  const t = text[lang];

  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const runTimeout = (fn: () => void, delay: number) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(fn, delay);
  };

  const purrRef = useRef<HTMLAudioElement | null>(null);
  const fadeRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    runTimeout(() => setPhase("greeting"), 6000);
  }, []);

  useEffect(() => {
  return () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    if (fadeRef.current) clearInterval(fadeRef.current);
  };
}, [phase]);

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

  useEffect(() => {
    if (phase === "chat") {
      setAnimation("cat_idle");
    }
  }, [phase]);

  const sendMessage = () => {
  if (!input.trim()) return;

  stopPurr();

  const meow = new Audio("/meow.wav");

  meow.volume = 0.4;

  meow.play().catch(() => {});

  setInput("");

  runTimeout(() => {
    setPhase("emotion");
  }, 700);
};
const selectEmotion = (emotion: string) => {
const animationMap: Record<string, string> = {
    tired: "cat_tired",
    sad: "cat_sad",
    anxious: "cat_anxious",
    normal: "cat_normal",
    happy: "cat_happy",
  };
  
   // 🌙 comfort video for sad/anxious
  if (emotion === "sad" || emotion === "anxious") {
    const videos = [
      "/comfort/headpat.mp4",
      "/comfort/bellyrub.mp4",
    ];

    const randomVideo =
      videos[Math.floor(Math.random() * videos.length)];

    setComfortVideo(randomVideo);
  } else {
    setComfortVideo("");
  }
// 🎁 reward system
const rewards = [
  "/rewards/charm_protect.mp4",
  "/rewards/coin_happiness.mp4",
  "/rewards/orb_calm.mp4",
  "/rewards/pouch_lucky.mp4",
  "/rewards/staff_power.mp4",
];

const rewardTexts = [
  "ยันต์กันคนใจร้าย ✨ พกไว้... ไม่มีใครกล้าทำนุด",
  "เหรียญใจฟู 🍊 วันนี้นุดเก่งมากเลยนะ",
  "ลูกแก้วสงบใจ 🌙 คืนนี้ขอให้นอนสบาย",
  "ถุงโชคดี 🐾 จ้มแอบใส่ luck ให้แล้ว",
  "ไม้เท้าพลังใจ 🤍 เอาไว้สู้วันพรุ่งนี้นะ",
];
const shouldGetReward = Math.random() < 0.3;

if (shouldGetReward) {
  const randomIndex =
  Math.floor(Math.random() * rewards.length);

setRewardVideo(rewards[randomIndex]);
setRewardText(rewardTexts[randomIndex]);
} else {
  setRewardVideo("");
  setRewardText("");
}

setAnimation(
  animationMap[
    emotion as keyof typeof animationMap
  ]
);

setHealingText(
  t.healing[emotion as keyof typeof t.healing]
);
    
    setTimeout(() => {
      setPhase("healing");
    }, 2200);
  };

const endSession = () => {
  setAnimation("cat_idle");
  setComfortVideo("");

  if (rewardVideo) {
    setPhase("reward");
    return;
  }

  setPhase("farewell");

  runTimeout(() => {
    setPhase("splash");

    runTimeout(() => {
      setPhase("greeting");
    }, 1800);
  }, 2600);
};
  
   
  return (
    <main style={containerStyle}>
      {/* 🌐 LANGUAGE */}
      <div
        style={{
          position: "absolute",
          top: 20,
          right: 20,
          display: "flex",
          gap: 8,
        }}
      >
        <button
          onClick={() => setLang("th")}
          style={lang === "th" ? activeLang : langButton}
        >
          TH
        </button>

        <button
          onClick={() => setLang("en")}
          style={lang === "en" ? activeLang : langButton}
        >
          EN
        </button>
      </div>

      {/* 🌟 SPLASH */}
{phase === "splash" && (
  <div style={{ animation: "fadeIn 1.5s ease" }}>
    <video
      autoPlay
      muted
      playsInline
      preload="auto"
      style={{
        width: 260,
        borderRadius: 24,
      }}
    >
  <source
    src={`/intro/${
      ["butterfly.mp4", "yarn.mp4", "flower.mp4", "dancing.mp4"][
        Math.floor(Math.random() * 4)
      ]
    }`}
    type="video/mp4"
  />
</video>
</div>
)}
      
      {/* 🐱 GREETING */}
      {phase === "greeting" && (
        <div style={{ animation: "fadeIn 1s ease" }}>
          <img src="/cat/cat_idle.png" width={220} />

          <p>{t.greeting}</p>

          <button
            onClick={() => setPhase("chat")}
            style={buttonStyle}
          >
            {t.start}
          </button>
        </div>
      )}

      {/* 💬 CHAT */}
      {phase === "chat" && (
        <div style={{ animation: "fadeInSoft 0.8s ease" }}>
          <img
            src={`/cat/${animation}.png`}
            width={220}
          />

          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onFocus={startPurr}
            onClick={startPurr}
            onBlur={stopPurr}
            onKeyDown={(e) =>
              e.key === "Enter" && sendMessage()
            }
            style={inputStyle}
          />

          <button
            onClick={sendMessage}
            style={buttonStyle}
          >
            {t.send}
          </button>
        </div>
      )}

      {/* 💛 EMOTION */}
      {phase === "emotion" && (
        <div style={{ animation: "fadeInSoft 0.8s ease" }}>
          <img
            src={`/cat/${animation}.png`}
            width={220}
          />

          <p
            style={{
              marginTop: 16,
              fontSize: 20,
              color: "#444",
            }}
          >
            {t.askEmotion}
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
            <button
              onClick={() => selectEmotion("tired")}
              style={emotionButton}
            >
              {t.emotions.tired}
            </button>

            <button
              onClick={() => selectEmotion("sad")}
              style={emotionButton}
            >
              {t.emotions.sad}
            </button>

            <button
              onClick={() => selectEmotion("anxious")}
              style={emotionButton}
            >
              {t.emotions.anxious}
            </button>

            <button
              onClick={() => selectEmotion("normal")}
              style={emotionButton}
            >
              {t.emotions.normal}
            </button>
          </div>

          <div style={{ marginTop: 12 }}>
            <button
              onClick={() => selectEmotion("happy")}
              style={happyButton}
            >
              {t.emotions.happy}
            </button>
          </div>
        </div>
      )}

      {/* 🌷 HEALING */}
      {phase === "healing" && (
        <div
          style={{
            animation: "fadeInSoft 1s ease",
            textAlign: "center",
          }}
        >
         {comfortVideo ? (
  <video
    autoPlay
    muted
    playsInline
    loop
    style={{
      width: 320,
      borderRadius: 24,
    }}
  >
    <source src={comfortVideo} type="video/mp4" />
  </video>
) : (
  <img
    src={`/cat/${animation}.png`}
    width={220}
    style={{
      animation:
        "breath 4s ease-in-out infinite",
    }}
  />
)}

          <p
            style={{
              marginTop: 18,
              fontSize: 21,
              color: "#444",
              lineHeight: 1.8,
              whiteSpace: "pre-line",
              maxWidth: 340,
            }}
          >
            {healingText}
          </p>
           <button
            onClick={endSession}
            style={buttonStyle}
          >
            {t.continue}
          </button>
        </div>
      )}
{/* 🎁 REWARD */}
{phase === "reward" && (
  <div
    style={{
      animation: "fadeInSoft 1s ease",
      textAlign: "center",
      maxWidth: 340,
    }}
  >
    <p
      style={{
        fontSize: 24,
        marginBottom: 18,
      }}
    >
      🎁 จ้มมีของขวัญให้นุดนะ
    </p>

    <div
  style={{
    marginTop: 28,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 12,
    animation: "fadeInSoft 1s ease",
  }}
>
  <video
    autoPlay
    muted
    playsInline
    loop
    style={{
      width: 260,
      maxWidth: "80vw",
      borderRadius: 28,
    }}
  >
    <source src={rewardVideo} type="video/mp4" />
  </video>

  <p
    style={{
      fontSize: 18,
      color: "#7A5C3E",
      maxWidth: 280,
      lineHeight: 1.6,
      textAlign: "center",
      whiteSpace: "pre-line",
    }}
  >
    {rewardText}
  </p>
</div>

      <button
      onClick={() => {
        setRewardVideo("");
        setRewardText("");
        setPhase("farewell");

        runTimeout(() => {
          setPhase("splash");

          runTimeout(() => {
            setPhase("greeting");
          }, 1800);
        }, 2600);
      }}
      style={buttonStyle}
    >
      รับไว้เลย 🐾
    </button>
  </div>
)}
         
      {/* 🌙 FAREWELL */}
      {phase === "farewell" && (
        <div style={{ animation: "fadeIn 1.5s ease" }}>
         <video
  autoPlay
  muted
  playsInline
  loop
  preload="auto"
  style={{
    width: 220,
    borderRadius: 24,
  }}
>
  <source
    src="/logo/calmcat_logo.mp4"
    type="video/mp4"
  />
</video>

          <p>{t.goodbye}</p>
        </div>
      )}

      <style>
        {`
          @keyframes fadeIn {
            from {
              opacity: 0;
              transform: translateY(10px);
            }

            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          @keyframes fadeInSoft {
            from {
              opacity: 0;
              transform: translateY(6px);
            }

            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          @keyframes breath {
            0% {
              transform: scale(1);
            }

            50% {
              transform: scale(1.02);
            }

            100% {
              transform: scale(1);
            }
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
  position: "relative",
  padding: 20,
};

const buttonStyle: React.CSSProperties = {
  marginTop: 20,
  padding: "14px 24px",
  borderRadius: 20,
  border: "none",
  background: "#FFE7CC",
  color: "#444",
  fontSize: 16,
  cursor: "pointer",
};

const inputStyle: React.CSSProperties = {
  marginTop: 20,
  padding: "14px 18px",
  borderRadius: 18,
  border: "none",
  width: 280,
  fontSize: 16,
  outline: "none",
  background: "#FFF8F2",
};

const emotionButton: React.CSSProperties = {
  padding: "14px 10px",
  borderRadius: 18,
  border: "none",
  background: "#FFF4E8",
  fontSize: 16,
  cursor: "pointer",
};

const happyButton: React.CSSProperties = {
  padding: "14px 24px",
  borderRadius: 18,
  border: "none",
  background: "#FFE0E6",
  fontSize: 16,
  cursor: "pointer",
};

const langButton: React.CSSProperties = {
  border: "none",
  borderRadius: 12,
  padding: "8px 12px",
  background: "#f3f3f3",
  cursor: "pointer",
};

const activeLang: React.CSSProperties = {
  border: "none",
  borderRadius: 12,
  padding: "8px 12px",
  background: "#FFD8A8",
  cursor: "pointer",
};

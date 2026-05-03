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

  // 🎵 audio refs
  const purrRef = useRef<HTMLAudioElement | null>(null);

  // 🎵 fade interval ref
  const fadeRef = useRef<NodeJS.Timeout | null>(null);

  // 🎁 reward pool
  const rewards: Reward[] = [
    {
      image: "/rewards/charm_protect.png",
      text: "ยันต์กันคนใจร้าย 🧿",
    },
    {
      image: "/rewards/coin_happiness.png",
      text: "เหรียญเรียกความสุข ✨",
    },
    {
      image: "/rewards/orb_calm.png",
      text: "ลูกแก้วใจสงบ 💗",
    },
    {
      image: "/rewards/pouch_lucky.png",
      text: "ถุงโชคดีแมวส้ม 🍊",
    },
    {
      image: "/rewards/staff_power.png",
      text: "คฑาแมวส้มพลังใจ 🐾",
    },
  ];

  // 🎬 splash screen
  useEffect(() => {
    const timer = setTimeout(() => {
      setPhase("greeting");
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  // 📊 session counter
  useEffect(() => {
    const count = localStorage.getItem("sessions");

    const newCount = count ? Number(count) + 1 : 1;

    localStorage.setItem("sessions", newCount.toString());

    // unlock reward
    if (newCount >= 3) {
      setShowReward(true);
    }
  }, []);

  // 🎵 setup purr
  useEffect(() => {
    const audio = new Audio("/purr.wav");

    audio.loop = true;
    audio.volume = 0;

    purrRef.current = audio;
  }, []);

  // 🎵 fade in purr
  const startPurr = async () => {
    if (!purrRef.current) return;

    const audio = purrRef.current;

    try {
      await audio.play();

      if (fadeRef.current) {
        clearInterval(fadeRef.current);
      }

      let vol = audio.volume;

      fadeRef.current = setInterval(() => {
        vol += 0.02;

        if (vol >= 0.25) {
          vol = 0.25;

          if (fadeRef.current) {
            clearInterval(fadeRef.current);
          }
        }

        audio.volume = vol;
      }, 100);
    } catch (err) {
      console.log(err);
    }
  };

  // 🎵 fade out purr
  const stopPurr = () => {
    if (!purrRef.current) return;

    const audio = purrRef.current;

    if (fadeRef.current) {
      clearInterval(fadeRef.current);
    }

    let vol = audio.volume;

    fadeRef.current = setInterval(() => {
      vol -= 0.02;

      if (vol <= 0) {
        vol = 0;

        if (fadeRef.current) {
          clearInterval(fadeRef.current);
        }

        audio.pause();
        audio.currentTime = 0;
      }

      audio.volume = vol;
    }, 100);
  };

  // 💬 send message
  const sendMessage = () => {
    if (!input.trim()) return;

    stopPurr();

    // 🐱 head bunt animation sequence
    setAnimation("cat_head_bunt_1");

    setTimeout(() => {
      setAnimation("cat_head_bunt_2");
    }, 120);

    setTimeout(() => {
      setAnimation("cat_head_bunt_3");
    }, 240);

    setTimeout(() => {
      setAnimation("cat_love");
    }, 420);

    // 🎵 meow
    const meow = new Audio("/meow.wav");

    meow.volume = 0.4;

    meow.play().catch(() => {});

    setInput("");

    // ➜ ไปหน้า emotion หลัง animation จบ
    setTimeout(() => {
      setPhase("emotion");
    }, 900);
  };

  // 💛 emotion selection
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
      ใจฟู: "cat_happy",
    };

    setHealingText(healingMap[emotion]);

    setAnimation(animationMap[emotion]);

    // 🎁 random reward
    if (showReward) {
      const randomReward =
        rewards[Math.floor(Math.random() * rewards.length)];

      setCurrentReward(randomReward);

      setTimeout(() => {
        setPhase("reward");
      }, 700);
    } else {
      setTimeout(() => {
        setPhase("healing");
      }, 700);
    }
  };

  // 🏆 continue after reward
  const handleRewardContinue = () => {
    setPhase("healing");
  };

  // 👋 end session
  const endSession = () => {
    setAnimation("cat_idle");

    setPhase("farewell");

    setTimeout(() => {
      setPhase("splash");

      setTimeout(() => {
        setPhase("greeting");
      }, 2000);
    }, 3000);
  };

  return (
    <main
      style={{
        minHeight: "100dvh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        background: "#ffffff",
        padding: 24,
        textAlign: "center",
        overflow: "hidden",
        fontFamily: "sans-serif",
      }}
    >
      {/* 🌟 SPLASH */}
      {phase === "splash" && (
        <div style={{ animation: "fadeIn 1.5s ease" }}>
          <img
            src="/logo/calmcat_logo.png"
            width={240}
            style={{
              marginBottom: 16,
            }}
          />

          <p
            style={{
              color: "#999",
              fontSize: 16,
            }}
          >
            safe space for your heart 🐾
          </p>
        </div>
      )}

      {/* 🐱 GREETING */}
      {phase === "greeting" && (
        <div style={{ animation: "fadeIn 1s ease" }}>
          <img
            src="/cat/cat_idle.png"
            width={220}
            style={{
              animation: "breath 4s ease-in-out infinite",
            }}
          />

          <p
            style={{
              marginTop: 12,
              fontSize: 20,
              color: "#444",
            }}
          >
            หวัดดีนุด... เล่ามาเลย จ้มรอฟังอยู่
          </p>

          <button
            onClick={() => setPhase("chat")}
            style={buttonStyle}
          >
            เริ่มเลย
          </button>
        </div>
      )}

      {/* 💬 CHAT */}
      {phase === "chat" && (
        <div
          style={{
            width: "100%",
            maxWidth: 500,
            animation: "fadeIn 0.6s ease",
          }}
        >
          <img
            src="/cat/cat_typing.png"
            width={220}
            style={{
              animation: "breath 4s ease-in-out infinite",
            }}
          />

          <p
            style={{
              marginTop: 10,
              color: "#777",
            }}
          >
            จ้มนั่งฟังอยู่ตรงนี้นะ...
          </p>

          <div
            style={{
              marginTop: 24,
            }}
          >
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onFocus={startPurr}
              onBlur={stopPurr}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  sendMessage();
                }
              }}
              placeholder="พิมพ์ความรู้สึกของคุณ..."
              style={{
                width: "100%",
                padding: "16px 18px",
                borderRadius: 20,
                border: "none",
                outline: "none",
                background: "#FFF8F1",
                fontSize: 16,
                boxSizing: "border-box",
              }}
            />

            <button
              onClick={sendMessage}
              style={{
                ...buttonStyle,
                width: "100%",
                marginTop: 14,
              }}
            >
              ส่งความรู้สึกให้จ้ม
            </button>
          </div>
        </div>
      )}

      {/* 💛 EMOTION */}
      {phase === "emotion" && (
        <div style={{ animation: "fadeIn 0.6s ease" }}>
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
            แล้วตอนนี้... ใจนุดเป็นยังไง?
          </p>

          {/* 🎭 emotion grid */}
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
                  transition: "0.2s",
                }}
              >
                {emotion}
              </button>
            ))}
          </div>

          {/* 💗 center button */}
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
                transition: "0.2s",
              }}
            >
              ใจฟู
            </button>
          </div>
        </div>
      )}

      {/* 🏆 REWARD */}
      {phase === "reward" && (
        <div style={{ animation: "fadeIn 0.8s ease" }}>
          <img
            src={
              currentReward?.image ||
              "/rewards/charm_protect.png"
            }
            width={180}
            style={{
              animation: "floatReward 3s ease-in-out infinite",
            }}
          />

          <p
            style={{
              marginTop: 14,
              fontSize: 22,
              color: "#444",
            }}
          >
            นุดเก่งมาก... จ้มมีของมาให้!
          </p>

          <p
            style={{
              marginTop: 10,
              fontSize: 18,
              color: "#666",
            }}
          >
            {currentReward?.text}
          </p>

          <button
            onClick={handleRewardContinue}
            style={buttonStyle}
          >
            รับไว้เลย 🐾
          </button>
        </div>
      )}

      {/* 🌷 HEALING */}
      {phase === "healing" && (
        <div style={{ animation: "fadeIn 0.8s ease" }}>
          <img
            src={`/cat/${animation}.png`}
            width={220}
            style={{
              animation: "breath 4s ease-in-out infinite",
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
            style={buttonStyle}
          >
            ไว้เจอกันนะ
          </button>
        </div>
      )}

      {/* 🌙 FAREWELL */}
      {phase === "farewell" && (
        <div style={{ animation: "fadeIn 1s ease" }}>
          <img
            src="/logo/calmcat_logo.png"
            width={220}
          />

          <p
            style={{
              marginTop: 20,
              color: "#666",
              fontSize: 18,
              lineHeight: 1.8,
            }}
          >
            ขอบคุณที่เชื่อใจจ้มนะ...
            <br />
            วันนี้ฝันดีนะนุด 🐾
          </p>
        </div>
      )}

      {/* 🎬 animations */}
      <style>
        {`
          @keyframes breath {
            0% { transform: scale(1); }
            50% { transform: scale(1.03); }
            100% { transform: scale(1); }
          }

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

          @keyframes floatReward {
            0% { transform: translateY(0px); }
            50% { transform: translateY(-10px); }
            100% { transform: translateY(0px); }
          }
        `}
      </style>
    </main>
  );
}

// 🎨 reusable button style
const buttonStyle: React.CSSProperties = {
  marginTop: 20,
  padding: "14px 24px",
  borderRadius: 20,
  border: "none",
  background: "#FFE7CC",
  color: "#444",
  fontSize: 16,
  cursor: "pointer",
  transition: "0.2s",
};


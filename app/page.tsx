"use client";

import { useState, useEffect, useRef } from "react";

type Phase =
  | "splash"
  | "greeting"
  | "chat"
  | "emotion"
  | "healing"
  | "continueChoice"
  | "deepTalk1"
  | "deepTalk2"
  | "reward"
  | "farewell";

const randomItem = (arr: string[]) =>
  arr[Math.floor(Math.random() * arr.length)];

const splashVideos = [
  "/intro/butterfly.mp4",
  "/intro/yarn.mp4",
  "/intro/flower.mp4",
  "/intro/dancing.mp4",
];

const comfortVideos = [
  "/comfort/headpat.mp4",
  "/comfort/bellyrub.mp4",
];

const text = {
  th: {
    greeting:
      "หวัดดีนุด... เล่ามาเลย จ้มรอฟังอยู่ 🐾",

    intro:
      "Calm Cat คือพื้นที่เล็กๆ สำหรับพักใจ\nระบายความรู้สึก\nและให้จ้มอยู่ข้างๆ ในวันที่เหนื่อย",

    privacy:
      "Calm Cat ไม่เก็บข้อความที่นุดพิมพ์นะ 🐾",

    start: "เริ่มเลย",

    askEmotion:
      "แล้วตอนนี้... ใจนุดเป็นยังไง?",

    send: "ส่งความรู้สึกให้จ้ม",

    goodbye:
      "มีความสุข สบายใจนะนุด 🐾",

    continue: "ไว้เจอกันนะ",

    continueTalk: "🤍 อยากคุยต่อ",

    restEnough: "🌙 พักใจพอแล้ว",

    emotions: {
      tired: "เหนื่อย",
      sad: "เศร้า",
      anxious: "ว้าวุ่น",
      normal: "ปกติ",
      happy: "ใจฟู",
    },

    healing: {
      tired: [
        "เก่งมากแล้วนุด... พักบนพุงจ้มนะ 🐾",

        "วันนี้คงเหนื่อยมากเลยใช่ไหม...\nจ้มอยู่ตรงนี้นะ 🤍",

        "ไม่ต้องเก่งตลอดเวลาก็ได้นะ\nพักบ้างก็ได้ 🌙",
      ],

      sad: [
        "ไม่เป็นไรนะ... จ้มอยู่ตรงนี้ข้างๆ เอง 🌙",

        "โลกอาจใจร้ายบ้าง...\nแต่จ้มยังเข้าข้างนุดนะ 🤍",

        "นุดไม่จำเป็นต้องแบกทุกอย่างคนเดียวก็ได้ 🐾",
      ],

      anxious: [
        "ใจเย็นๆ นะนุด...\nค่อยๆ หายใจนะ 🤍",

        "จ้มอาจแก้ทุกอย่างไม่ได้...\nแต่จะไม่ปล่อยให้นุดอยู่คนเดียว 🌙",

        "ตอนนี้ยังไม่ต้องรีบคิดทุกอย่างก็ได้นะ 🐾",
      ],

      normal: [
        "วันเรียบๆ ก็น่ารักดีนะ ✨",

        "จ้มดีใจที่วันนี้นุดยังดูแลหัวใจตัวเองอยู่ 🍊",

        "บางวันแค่ผ่านไปได้ก็เก่งมากแล้ว 🐾",
      ],

      happy: [
        "เย้! จ้มดีใจด้วยนะนุด 🍊",

        "ขอให้ความรู้สึกดีๆ อยู่กับนุดนานๆ ✨",

        "เห็นนุดใจฟูแล้ว จ้มใจฟูตามเลย 🐾",
      ],
    },

    deepQuestions1: [
      "เกิดอะไรขึ้นเหรอนุด\nอะไรทำให้ใจหนักขนาดนี้",

      "มีอะไรติดอยู่ในใจนุดอยู่ใช่ไหม",

      "จ้มขอฟังเพิ่มอีกนิดได้ไหม 🐾",
    ],

    deepQuestions2: [
      "ถ้าโลกใจดีกับนุดได้อีกนิด...\nนุดอยากให้เรื่องนี้เป็นแบบไหนเหรอ",

      "ลึกๆ แล้ว...\nนุดอยากเห็นอะไรเปลี่ยนไปมากที่สุด",

      "ถ้าขอพรเรื่องนี้ได้หนึ่งอย่าง\nนุดอยากขออะไร",
    ],

    softClosing: [
      "จ้มเข้าใจแล้วนะ 🤍\nแค่ต้องแบกเรื่องนี้ไว้ก็คงเหนื่อยมากแล้ว",

      "ขอบคุณที่เล่าให้จ้มฟังนะ\nนุดไม่จำเป็นต้องเก็บทุกอย่างไว้คนเดียวก็ได้ 🌙",

      "จ้มอยู่ตรงนี้นะ\nนุดไม่ต้องเข้มแข็งตลอดเวลาก็ได้ 🐾",
    ],
  },
};

export default function Home() {
  const [phase, setPhase] =
    useState<Phase>("splash");

  const [input, setInput] =
    useState("");

  const [deepInput, setDeepInput] =
    useState("");

  const [animation, setAnimation] =
    useState("cat_idle");

  const [healingText, setHealingText] =
    useState("");

  const [deepTalkText, setDeepTalkText] =
    useState("");

  const [comfortVideo, setComfortVideo] =
    useState("");

  const [splashVideo, setSplashVideo] =
    useState("");

  const timeoutRef =
    useRef<NodeJS.Timeout | null>(null);
  const meowRef =
  useRef<HTMLAudioElement | null>(
    null
  );

const purrRef =
  useRef<HTMLAudioElement | null>(
    null
  );

const rewardAudioRef =
  useRef<HTMLAudioElement | null>(
    null
  );

const [rewardVideo, setRewardVideo] =
  useState("");

const [rewardAudio, setRewardAudio] =
  useState("");

const [rewardMessage, setRewardMessage] =
  useState("");

  const t = text.th;

  const runTimeout = (
    fn: () => void,
    delay: number
  ) => {
    if (timeoutRef.current)
      clearTimeout(timeoutRef.current);

    timeoutRef.current = setTimeout(
      fn,
      delay
    );
  };

  // 🌙 splash video random
  useEffect(() => {
  if (phase === "splash") {
    const randomVideo =
      splashVideos[
        Math.floor(
          Math.random() *
            splashVideos.length
        )
      ];

    setSplashVideo(randomVideo);

    const timer = setTimeout(() => {
      setPhase("greeting");
    }, 7500);

    return () =>
      clearTimeout(timer);
  }
}, [phase]);

  // 🌙 reset cat to idle
  useEffect(() => {
    if (phase === "emotion") {
      setAnimation("cat_idle");
    }
  }, [phase]);

  const sendMessage = () => {
    if (!input.trim()) return;

    setInput("");

    runTimeout(() => {
      setPhase("emotion");
    }, 500);
  };

  const selectEmotion = (
    emotion: string
  ) => {
    const animationMap: Record<
      string,
      string
    > = {
      tired: "cat_tired",
      sad: "cat_sad",
      anxious: "cat_anxious",
      normal: "cat_normal",
      happy: "cat_happy",
    };

    // 🌙 comfort videos
    if (
      emotion === "sad" ||
      emotion === "anxious"
    ) {
      setComfortVideo(
        randomItem(comfortVideos)
      );
    } else {
      setComfortVideo("");
    }

    setAnimation(
      animationMap[emotion]
    );

    setHealingText(
      randomItem(
        t.healing[
          emotion as keyof typeof t.healing
        ]
      )
    );

    setTimeout(() => {
      setPhase("healing");
    }, 1800);
  };

  const startDeepTalk1 = () => {
    setDeepTalkText(
      randomItem(t.deepQuestions1)
    );

    setPhase("deepTalk1");
  };

  const submitDeepTalk1 = () => {
    if (!deepInput.trim()) return;

    setDeepInput("");

    setDeepTalkText(
      randomItem(t.deepQuestions2)
    );

    setPhase("deepTalk2");
  };

 const submitDeepTalk2 = () => {
  if (!deepInput.trim()) return;

  setDeepInput("");

  setComfortVideo("");

  const randomReward =
    rewards[
      Math.floor(
        Math.random() *
          rewards.length
      )
    ];

  // 🌙 random reward
  setRewardVideo(
    randomReward.video
  );

  setRewardAudio(
    randomReward.audio
  );

  setRewardMessage(
    randomReward.message
  );

  setHealingText(
    randomItem(t.softClosing)
  );

  setPhase("reward");

  // 🌙 play reward sound
  setTimeout(() => {
    if (
      rewardAudioRef.current
    ) {
      rewardAudioRef.current.src =
        randomReward.audio;

      rewardAudioRef.current.currentTime =
        0;

      rewardAudioRef.current
        .play()
        .catch(() => {});
    }
  }, 200);
};
    setHealingText(
      randomItem(t.softClosing)
    );

    setPhase("reward");
  };

  const endSession = () => {
  // 🌙 reset states
  setComfortVideo("");

  setAnimation("cat_idle");

  setPhase("farewell");

  runTimeout(() => {
    setPhase("splash");
  }, 2600);
};

  return (
    <main style={containerStyle}>
      {/* SPLASH */}
{phase === "splash" &&
  splashVideo && (
    <div
      style={{
        animation:
          "fadeIn 1.5s ease",
      }}
    >
      <video
        key={splashVideo}
        autoPlay
        muted
        playsInline
        loop
        preload="auto"
        style={{
          width: 280,
          borderRadius: 28,
          objectFit: "cover",
        }}
      >
        <source
          src={splashVideo}
          type="video/mp4"
        />
      </video>
    </div>
  )}

      {/* GREETING */}
      {phase === "greeting" && (
        <div
          style={{
            animation:
              "fadeIn 1s ease",
            textAlign: "center",
          }}
        >
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

          <p>{t.greeting}</p>

          <p style={introStyle}>
            {t.intro}
          </p>

          <button
            onClick={() =>
              setPhase("chat")
            }
            style={buttonStyle}
          >
            {t.start}
          </button>
        </div>
      )}

      {/* CHAT */}
      {phase === "chat" && (
        <div
          style={{
            animation:
              "fadeInSoft 0.8s ease",
            textAlign: "center",
          }}
        >
          <img
            src={`/cat/${animation}.png`}
            width={220}
            style={{
              animation:
                "breath 4s ease-in-out infinite",
            }}
          />

          <input
            value={input}
            onChange={(e) =>
              setInput(e.target.value)
            }
            onKeyDown={(e) =>
              e.key === "Enter" &&
              sendMessage()
            }
            style={inputStyle}
          />

          <p style={privacyStyle}>
            {t.privacy}
          </p>

          <button
            onClick={sendMessage}
            style={buttonStyle}
          >
            {t.send}
          </button>
        </div>
      )}

      {/* EMOTION */}
      {phase === "emotion" && (
        <div
          style={{
            animation:
              "fadeInSoft 0.8s ease",
            textAlign: "center",
          }}
        >
          <img
            src="/cat/cat_idle.png"
            width={220}
            style={{
              animation:
                "breath 4s ease-in-out infinite",
            }}
          />

          <p style={questionStyle}>
            {t.askEmotion}
          </p>

          <div style={emotionGrid}>
            {Object.entries(
              t.emotions
            ).map(([key, value]) => (
              <button
                key={key}
                onClick={() =>
                  selectEmotion(key)
                }
                style={emotionButton}
              >
                {value}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* HEALING */}
      {phase === "healing" && (
        <div
          style={{
            animation:
              "fadeInSoft 1s ease",
            textAlign: "center",
          }}
        >
          {comfortVideo ? (
            <video
              autoPlay
              muted
              loop
              playsInline
              style={{
                width: 320,
                borderRadius: 24,
              }}
            >
              <source
                src={comfortVideo}
                type="video/mp4"
              />
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

          <p style={healingStyle}>
            {healingText}
          </p>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 12,
              marginTop: 24,
            }}
          >
            <button
              onClick={startDeepTalk1}
              style={buttonStyle}
            >
              {t.continueTalk}
            </button>

            <button
              onClick={endSession}
              style={buttonStyle}
            >
              {t.restEnough}
            </button>
          </div>
        </div>
      )}

      {/* DEEP TALK 1 */}
      {phase === "deepTalk1" && (
        <div style={deepTalkContainer}>
          <img
            src={`/cat/${animation}.png`}
            width={220}
          />

          <p style={healingStyle}>
            {deepTalkText}
          </p>

          <textarea
            value={deepInput}
            onChange={(e) =>
              setDeepInput(
                e.target.value
              )
            }
            style={textareaStyle}
          />

          <button
            onClick={submitDeepTalk1}
            style={buttonStyle}
          >
            {t.send}
          </button>
        </div>
      )}

      {/* DEEP TALK 2 */}
      {phase === "deepTalk2" && (
        <div style={deepTalkContainer}>
          <img
            src={`/cat/${animation}.png`}
            width={220}
          />

          <p style={healingStyle}>
            {deepTalkText}
          </p>

          <textarea
            value={deepInput}
            onChange={(e) =>
              setDeepInput(
                e.target.value
              )
            }
            style={textareaStyle}
          />

          <button
            onClick={submitDeepTalk2}
            style={buttonStyle}
          >
            {t.send}
          </button>
        </div>
      )}

      {/* FAREWELL */}
      {phase === "farewell" && (
        <div
          style={{
            animation:
              "fadeIn 1.5s ease",
            textAlign: "center",
          }}
        >
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

          <p
            style={{
              marginTop: 8,
              opacity: 0.7,
            }}
          >
            {t.continue}
          </p>
        </div>
      )}

      <audio
  ref={meowRef}
  preload="auto"
>
  <source
    src="/meow.wav"
    type="audio/wav"
  />
</audio>

<audio
  ref={purrRef}
  preload="auto"
>
  <source
    src="/purr.wav"
    type="audio/wav"
  />
</audio>

<audio
  ref={rewardAudioRef}
  preload="auto"
>
  <source
    src="/rewards/orb_calm.mp3"
    type="audio/mp3"
  />
</audio>
      
    </main>
  );
}

const containerStyle: React.CSSProperties =
  {
    minHeight: "100dvh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    padding: 20,

    transition: "all 0.8s ease",
  };

const buttonStyle: React.CSSProperties =
  {
    marginTop: 12,
    padding: "14px 24px",
    borderRadius: 20,
    border: "none",
    background: "#FFE7CC",
    color: "#444",
    fontSize: 16,
    cursor: "pointer",
  };

const inputStyle: React.CSSProperties =
  {
    marginTop: 20,
    padding: "14px 18px",
    borderRadius: 18,
    border: "none",
    width: 280,
    fontSize: 16,
    outline: "none",
    background: "#FFF8F2",
  };

const textareaStyle: React.CSSProperties =
  {
    marginTop: 20,
    padding: 16,
    borderRadius: 18,
    border: "none",
    width: 300,
    minHeight: 120,
    fontSize: 16,
    outline: "none",
    resize: "none",
    background: "#FFF8F2",
  };

const emotionButton: React.CSSProperties =
  {
    padding: "14px 10px",
    borderRadius: 18,
    border: "none",
    background: "#FFF4E8",
    fontSize: 16,
    cursor: "pointer",
  };

const emotionGrid: React.CSSProperties =
  {
    display: "grid",
    gridTemplateColumns:
      "1fr 1fr",
    gap: 12,
    marginTop: 20,
    width: 300,
  };

const healingStyle: React.CSSProperties =
  {
    marginTop: 18,
    fontSize: 21,
    color: "#444",
    lineHeight: 1.8,
    whiteSpace: "pre-line",
    maxWidth: 340,
  };

const questionStyle: React.CSSProperties =
  {
    marginTop: 16,
    fontSize: 20,
    color: "#444",
  };

const introStyle: React.CSSProperties =
  {
    marginTop: 12,
    fontSize: 14,
    opacity: 0.75,
    maxWidth: 280,
    lineHeight: 1.7,
    whiteSpace: "pre-line",
  };

const privacyStyle: React.CSSProperties =
  {
    marginTop: 10,
    fontSize: 12,
    opacity: 0.6,
    textAlign: "center",
  };

const deepTalkContainer: React.CSSProperties =
  {
    animation: "fadeInSoft 1s ease",
    textAlign: "center",
  };

<style jsx global>{`
  @keyframes fadeInSoft {
    from {
      opacity: 0;
      transform: translateY(8px);
    }

    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
    }

    to {
      opacity: 1;
    }
  }

  @keyframes breath {
    0% {
      transform: scale(1);
    }

    50% {
      transform: scale(1.03);
    }

    100% {
      transform: scale(1);
    }
  }
`}</style>

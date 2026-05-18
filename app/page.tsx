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

const text = {
  th: {
    greeting: "หวัดดีนุด... เล่ามาเลย จ้มรอฟังอยู่",

    intro:
      "Calm Cat คือพื้นที่เล็กๆ สำหรับพักใจ\nระบายความรู้สึก\nและให้จ้มอยู่ข้างๆ ในวันที่เหนื่อย 🐾",

    privacy:
      "Calm Cat ไม่เก็บข้อความที่นุดพิมพ์นะ 🐾",

    start: "เริ่มเลย",

    askEmotion:
      "แล้วตอนนี้... ใจนุดเป็นยังไง?",

    send: "ส่งความรู้สึกให้จ้ม",

    goodbye: "มีความสุข สบายใจนะนุด 🐾",

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

  en: {
    greeting:
      "Hi hooman... tell me everything. Jom's listening.",

    intro:
      "Calm Cat is a gentle little space\nfor resting your heart\nand letting Jom stay beside you 🐾",

    privacy:
      "Calm Cat does not store your messages 🐾",

    start: "Let's begin",

    askEmotion:
      "How's your heart feeling right now?",

    send: "Send your feelings to Jom",

    goodbye:
      "Stay happy, stay peaceful 🐾",

    continue: "See you again",

    continueTalk: "🤍 Keep talking",

    restEnough: "🌙 Rest for now",

    emotions: {
      tired: "Tired",
      sad: "Sad",
      anxious: "Restless",
      normal: "Okay",
      happy: "Happy",
    },

    healing: {
      tired: [
        "You've done well today 🐾",

        "You don't have to stay strong all the time 🤍",

        "Come rest with Jom for a while 🌙",
      ],

      sad: [
        "Jom's right here with you 🌙",

        "You don't have to carry this alone 🤍",

        "Even heavy hearts deserve rest 🐾",
      ],

      anxious: [
        "Take a slow breath 🤍",

        "Jom won't leave you alone 🌙",

        "You don't have to solve everything tonight 🐾",
      ],

      normal: [
        "Quiet days are lovely too ✨",

        "Jom's happy you're here 🍊",

        "Some days simply existing is enough 🐾",
      ],

      happy: [
        "Yay! Jom feels happy too 🍊",

        "Hope this warm feeling stays ✨",

        "Jom's heart feels fluffy too 🐾",
      ],
    },

    deepQuestions1: [
      "What happened, hooman?\nWhat made your heart feel this heavy?",

      "Is something still stuck in your heart?",

      "Can Jom listen a little more? 🐾",
    ],

    deepQuestions2: [
      "If the world could be kinder...\nwhat would you wish for?",

      "Deep down...\nwhat do you wish could change?",

      "If you had one wish about this...\nwhat would it be?",
    ],

    softClosing: [
      "Jom understands 🤍\nCarrying this must have been exhausting.",

      "Thank you for sharing this with Jom 🌙",

      "You don't have to stay strong all the time 🐾",
    ],
  },
};

export default function Home() {
  const [phase, setPhase] =
    useState<Phase>("splash");

  const [input, setInput] = useState("");

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

  const [rewardVideo, setRewardVideo] =
    useState("");

  const [rewardText, setRewardText] =
    useState("");

  const [lang, setLang] =
    useState<"th" | "en">("th");

  const t = text[lang];

  const timeoutRef =
    useRef<NodeJS.Timeout | null>(null);

  const runTimeout = (
    fn: () => void,
    delay: number
  ) => {
    if (timeoutRef.current)
      clearTimeout(timeoutRef.current);

    timeoutRef.current = setTimeout(fn, delay);
  };

  useEffect(() => {
    runTimeout(() => {
      setPhase("greeting");
    }, 5000);
  }, []);

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
    }, 1200);
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

    setHealingText(
      randomItem(t.softClosing)
    );

    setPhase("healing");
  };

  const endSession = () => {
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
      {/* LANGUAGE */}
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
          style={
            lang === "th"
              ? activeLang
              : langButton
          }
        >
          TH
        </button>

        <button
          onClick={() => setLang("en")}
          style={
            lang === "en"
              ? activeLang
              : langButton
          }
        >
          EN
        </button>
      </div>

      {/* SPLASH */}
      {phase === "splash" && (
        <img
          src="/cat/cat_idle.png"
          width={220}
        />
      )}

      {/* GREETING */}
      {phase === "greeting" && (
        <div
          style={{
            animation: "fadeIn 1s ease",
            textAlign: "center",
          }}
        >
          <img
            src="/cat/cat_idle.png"
            width={220}
          />

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
            src={`/cat/${animation}.png`}
            width={220}
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
          <img
            src={`/cat/${animation}.png`}
            width={220}
          />

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
          <img
            src="/cat/cat_idle.png"
            width={220}
          />

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

const langButton: React.CSSProperties =
  {
    border: "none",
    borderRadius: 12,
    padding: "8px 12px",
    background: "#f3f3f3",
    cursor: "pointer",
  };

const activeLang: React.CSSProperties =
  {
    border: "none",
    borderRadius: 12,
    padding: "8px 12px",
    background: "#FFD8A8",
    cursor: "pointer",
  };

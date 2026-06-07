"use client";

import { useState } from "react";
import "../styles/animations.css";

type EmotionType =
| "tired"
| "sad"
| "anxious"
| "normal"
| "happy";

export default function EmotionScreen() {
const [emotion, setEmotion] =
  useState<EmotionType | null>(null);

const [step, setStep] =
  useState<
    "select" |
    "diary" |
    "interaction"
  >("select");

const [message, setMessage] =
  useState("");
  const [submitted, setSubmitted] =
  useState(false);

const [touched, setTouched] =
  useState(false);

const [sadTearCount, setSadTearCount] =
  useState(0);

const [sadPawVisible, setSadPawVisible] =
  useState(false);

return ( <div className="emotion-container">


 {step === "select" && (
  <>
    <img
      src="/cat/cat_idle.png"
      width={220}
      className="breathing"
      alt="Idle Cat"
    />
    <h1 className="emotion-title">
      วันนี้รู้สึกอย่างไรบ้าง
    </h1>

    <div className="emotion-selector">

      <button
        onClick={() => {
          setEmotion("tired");
          setStep("diary");
        }}
      >
        เหนื่อย
      </button>

      <button
        onClick={() => {
          setEmotion("sad");
          setStep("diary");
        }}
      >
        เศร้า
      </button>

      <button
        onClick={() => {
          setEmotion("anxious");
          setStep("diary");
        }}
      >
        ว้าวุ่น
      </button>

      <button
        onClick={() => {
          setEmotion("normal");
          setStep("diary");
        }}
      >
        ปกติ
      </button>

      <button
        onClick={() => {
          setEmotion("happy");
          setStep("diary");
        }}
      >
        ใจฟู
      </button>

    </div>
  </>
)}

{step === "diary" && (
  <>
    {emotion === "tired" && (
      <>
     <img
  src="/cat/cat_tired.png"
  width={220}
  alt="Tired Cat"
  className={
    touched
      ? ""
      : "tired-breathing"
  }
  onClick={() => {
    if (submitted) {
      setTouched(true);
    }
  }}
/>
        <p
          style={{
            marginTop: 16,
            marginBottom: 20,
          }}
        >
          เจ้าเหมียวส้มก็เหนื่อยเหมือนกันเลย...
        </p>
      </>
    )}

    {emotion === "sad" && (
      <>
        <img
          src="/cat/cat_sad.png"
          width={220}
          alt="Sad Cat"
        />

        <p>
          วันนี้มีเรื่องเศร้าเหรอ...
        </p>
      </>
    )}

    {emotion === "anxious" && (
      <>
        <img
          src="/cat/cat_anxious.png"
          width={220}
          alt="Anxious Cat"
        />

        <p>
          มีเรื่องให้คิดเต็มหัวเลยใช่ไหม...
        </p>
      </>
    )}

    {emotion === "normal" && (
      <>
        <img
          src="/cat/cat_normal.png"
          width={220}
          alt="Normal Cat"
        />

        <p>
          วันนี้เรื่อย ๆ สบาย ๆ เนอะ
        </p>
      </>
    )}

    {emotion === "happy" && (
      <>
        <img
          src="/cat/cat_happy.png"
          width={220}
          alt="Happy Cat"
        />

        <p>
          ใจฟูเลยสินะ 😊
        </p>
      </>
    )}

    {!submitted && (
  <>
  <textarea
  value={message}
  onChange={(e) => {
    const value = e.target.value;

    setMessage(value);

    if (emotion === "sad") {
      const tears = Math.min(
        Math.floor(value.length / 35),
        6
      );

      setSadTearCount(tears);
    }
  }}
  placeholder="อยากเล่าอะไรให้จ้มฟังไหม..."
  rows={6}
  style={{
    width: "100%",
    maxWidth: 400,
    padding: 12,
    borderRadius: 12,
    marginTop: 16,

    filter:
      emotion === "sad"
        ? sadTearCount >= 5
          ? "blur(1.5px)"
          : sadTearCount >= 4
          ? "blur(1px)"
          : sadTearCount >= 3
          ? "blur(0.5px)"
          : "none"
        : "none",

    transition: "filter 0.5s ease",
  }}
/>

{emotion === "sad" && (
  <div className="tear-layer">
    {Array.from({
      length: sadTearCount,
    }).map((_, i) => (
      <div
        key={i}
        className="tear"
        style={{
          left: `${30 + i * 45}px`,
        }}
      />
    ))}
  </div>
)}

    <button
      onClick={() =>
        setSubmitted(true)
      }
      disabled={!message.trim()}
      style={{
        marginTop: 16,
      }}
    >
      ส่งให้จ้ม
    </button>
  </>
)}
   {submitted &&
 emotion === "tired" &&
 !touched && (
  <p
    style={{
      marginTop: 20,
      fontSize: 18,
    }}
  >
    จ้มอ่านแล้วนะ...
    <br />
    ลูบหัวจ้มหน่อยได้ไหม 🐾
  </p>
)}

{submitted &&
 emotion === "tired" &&
 touched && (
  <p
    style={{
      marginTop: 20,
      fontSize: 18,
    }}
  >
    ขอบคุณนะ...
    <br />
    เจ้าเหมียวเริ่มผ่อนคลายแล้ว 💛
  </p>
)}

{submitted &&
 emotion === "sad" && (
  <p
    style={{
      marginTop: 20,
      fontSize: 18,
    }}
  >
    จ้มรับฟังอยู่นะ...
    <br />
    ไม่เป็นไรนะ
    <br />
    ขอซับน้ำตาให้หน่อย 🐾
  </p>
)}
    
  </>
)}


  </div>

);
}

function TiredEmotion() {
const [touched, setTouched] =
useState(false);

return ( <div className="emotion-card">

  <img
    src="/cat/cat_tired.png"
    className={
      touched
        ? "cat-breath-slow"
        : "cat-breath"
    }
  />

  <div className="puff" />

  <p>
    {touched
      ? "ขอบคุณนะ... เจ้าเหมียวเริ่มผ่อนคลายแล้ว"
      : "เจ้าเหมียวส้มก็เหนื่อยเหมือนกันเลย..."}
  </p>

  {!touched && (
    <button
      onClick={() =>
        setTouched(true)
      }
    >
      แตะปลอบใจ
    </button>
  )}

</div>


);
}

function SadEmotion() {
return ( <div className="emotion-card">


  <img
    src="/cat/cat_sad.png"
    className="cat-static"
  />

  <p>
    Sad Mode
  </p>

</div>


);
}

function AnxiousEmotion() {
return ( <div className="emotion-card">


  <img
    src="/cat/cat_anxious.png"
    className="cat-static"
  />

  <p>
    Anxious Mode
  </p>

</div>


);
}

function NormalEmotion() {
return ( <div className="emotion-card">


  <img
    src="/cat/cat_normal.png"
    className="cat-gentle"
  />

  <p>
    Normal Mode
  </p>

</div>


);
}

function HappyEmotion() {
return ( <div className="emotion-card">


  <img
    src="/cat/cat_happy.png"
    className="cat-gentle"
  />

  <p>
    Happy Mode
  </p>

</div>


);
}


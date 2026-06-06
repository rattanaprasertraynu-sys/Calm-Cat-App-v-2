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

return ( <div className="emotion-container">


 {step === "select" && (
  <>
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
    <h2>
      อยากเล่าอะไรให้จ้มฟังไหม
    </h2>

    <textarea
      value={message}
      onChange={(e) =>
        setMessage(e.target.value)
      }
      placeholder="พิมพ์ได้เต็มที่เลย..."
      rows={6}
      style={{
        width: "100%",
        maxWidth: 400,
        padding: 12,
        borderRadius: 12,
      }}
    />

    <br />

    <button
      onClick={() =>
        setStep("interaction")
      }
      disabled={!message.trim()}
    >
      ส่งให้จ้ม
    </button>
  </>
)}

{step === "interaction" && (
  <>
    {emotion === "tired" && (
      <TiredEmotion />
    )}

    {emotion === "sad" && (
      <SadEmotion />
    )}

    {emotion === "anxious" && (
      <AnxiousEmotion />
    )}

    {emotion === "normal" && (
      <NormalEmotion />
    )}

    {emotion === "happy" && (
      <HappyEmotion />
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


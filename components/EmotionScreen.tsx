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
useState<EmotionType>("tired");

return ( <div className="emotion-container">


  <h1 className="emotion-title">
    Calm Cat Emotion Test
  </h1>

  <div className="emotion-selector">

    <button
      onClick={() =>
        setEmotion("tired")
      }
    >
      เหนื่อย
    </button>

    <button
      onClick={() =>
        setEmotion("sad")
      }
    >
      เศร้า
    </button>

    <button
      onClick={() =>
        setEmotion("anxious")
      }
    >
      ว้าวุ่น
    </button>

    <button
      onClick={() =>
        setEmotion("normal")
      }
    >
      ปกติ
    </button>

    <button
      onClick={() =>
        setEmotion("happy")
      }
    >
      ใจฟู
    </button>

  </div>

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


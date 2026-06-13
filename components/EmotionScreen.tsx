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

  const [blush, setBlush] =
  useState(false);

const [touched, setTouched] =
  useState(false);

  const [swiped, setSwiped] =
  useState(false);
  
const [sadStainCount, setSadStainCount] =
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
          setBlush(false);
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
    <div className="cat-wrapper">

      <img
        src="/cat/cat_normal.png"
        width={220}
        alt="Normal Cat"
        onClick={() => {
          if (submitted) {
            setBlush(true);
          }
        }}
      />

     {blush && (
  <div className="heart-container">
    <div className="heart h1">💗</div>
    <div className="heart h2">💗</div>
    <div className="heart h3">💗</div>
    <div className="heart h4">💗</div>
    <div className="heart h5">💗</div>
    <div className="heart h6">💗</div>
  </div>
)}
  </div>

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

 
 <div className="sad-text-wrapper">

  <textarea
   className={
  emotion === "anxious" &&
  swiped
    ? "swiped-away"
    : ""
}
   value={message}
    
    onChange={(e) => {
      const value = e.target.value;

      setMessage(value);

      if (emotion === "sad") {
  const stains = Math.min(
    Math.floor(value.length / 35),
    6
  );

  setSadStainCount(stains);
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
   color:
     emotion === "sad"
       ? sadStainCount >= 5
         ? "rgba(0,0,0,0.55)"
         : sadStainCount >= 3
         ? "rgba(0,0,0,0.75)"
         : "rgba(0,0,0,1)"
       : "rgba(0,0,0,1)",

   transition:
     "color 0.6s ease",
   textShadow:
      emotion === "sad" &&
      sadStainCount >= 4
        ? "0 0 2px rgba(0,0,0,0.10)"
        : "none",
 }}
/>
  
  {emotion === "sad" && (
   <div className="stain-layer">
      {Array.from({
        length: sadStainCount,
      }).map((_, i) => (
        <div
          key={i}
        className="sad-stain"
          style={{
           left: `${20 + i * 12}%`,
top: `${25 + (i % 2) * 20}%`,
          }}
        />
      ))}
    </div>
  )}

    {sadPawVisible && (
    <div className="sad-paw">
      <img
        src="/cat/paw.png"
        alt="Paw"
        width={90}
      />
    </div>
  )}

 {submitted &&
   emotion === "anxious" &&
   !swiped && (
    <div
      className="swipe-paw-inside"
      onClick={() =>
        setSwiped(true)
      }
    >
      <img
        src="/cat/paw.png"
        width={90}
        alt="Paw"
      />
    </div>
  )}

</div>

{submitted &&
 emotion === "anxious" &&
 swiped && (
  <p
    style={{
      marginTop: 20,
      fontSize: 18,
    }}
  >
    หายใจลึก ๆ ไปด้วยกันนะ 🌿
  </p>
)}
   
</div>


   {submitted ? null : (
  <button
    onClick={() => {
      setSubmitted(true);

      if (emotion === "sad") {
        setSadPawVisible(true);

        setTimeout(() => {
  setSadStainCount(0);
}, 2500);
      }
    }}
  >
    ส่งให้จ้ม
  </button>
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
  <>
  
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
  </>
)}
    
 {submitted &&
 emotion === "normal" &&
 !blush && (
  <p
    style={{
      marginTop: 20,
      fontSize: 18,
    }}
  >
    จ้มอ่านแล้วนะ...
    <br />
    แตะแก้มจ้มได้เลย ☺️🐾
  </p>
)}
  
{submitted &&
 emotion === "normal" &&
 blush && (
  <p>
    เขินนะนุด ☺️
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


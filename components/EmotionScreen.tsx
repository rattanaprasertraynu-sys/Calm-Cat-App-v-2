"use client";

import {
  useState,
  useEffect,
} from "react";
import "../styles/animations.css";
import { rewards } from "../data/rewards";

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

const [bonusStage,
 setBonusStage] =
 useState<
   "intro" |
   "welcome" |
   "emotion" |
   "comfort" |
   "reward" |
   "farewell" |
   "logo"
>("intro");

const [comfortType,
 setComfortType] =
 useState<
   "head" |
   "belly"
 >("head");

  
const [rewardVideo,
 setRewardVideo] =
 useState("");

const [rewardAudio,
 setRewardAudio] =
 useState("");

const [rewardMessage,
 setRewardMessage] =
 useState("");  
 
  const [farewellVideo,
 setFarewellVideo] =
 useState("");

  const farewellVideos = [
 "/farewell/cat_dance.mp4",
 "/farewell/cat_wave_heart.mp4",
 "/farewell/cat_wave_left.mp4",
 "/farewell/cat_wave_left_right.mp4",
];

  const startFarewell = () => {

 const randomVideo =
   farewellVideos[
     Math.floor(
       Math.random() *
       farewellVideos.length
     )
   ];

 setFarewellVideo(
   randomVideo
 );

 setBonusStage(
   "farewell"
 );
};
  
const introVideos = [
  "/intro/butterfly.mp4",
  "/intro/dancing.mp4",
  "/intro/flower.mp4",
  "/intro/yarn.mp4",
];

const [introVideo,
 setIntroVideo] =
 useState("");
  
  const [happySent, setHappySent] =
  useState(false);


const [returnHearts, setReturnHearts] =
  useState(false);

const [sendHeartVisible,
 setSendHeartVisible] =
 useState(false);

const goToComfortStage = () => {

  setComfortType(
    Math.random() < 0.5
      ? "head"
      : "belly"
  );

  setBonusStage(
    "comfort"
  );
};

const comfortVideo =
  comfortType === "head"
    ? "/comfort/headpat.mp4"
    : "/comfort/bellyrub.mp4";

  const startRewardStage = () => {

 const randomReward =
   rewards[
     Math.floor(
       Math.random() *
       rewards.length
     )
   ];

 setRewardVideo(
   randomReward.video
 );

 setRewardAudio(
   randomReward.audio
 );

 setRewardMessage(
   randomReward.message
 );

 setBonusStage("reward");
};

useEffect(() => {

  const randomVideo =
    introVideos[
      Math.floor(
        Math.random() *
        introVideos.length
      )
    ];

  setIntroVideo(
    randomVideo
  );

}, []);

  useEffect(() => {

  if (
    bonusStage ===
    "intro"
  ) {

    const timer =
      setTimeout(() => {

        setBonusStage(
          "welcome"
        );

      }, 5000);

    return () =>
      clearTimeout(timer);
  }

}, [bonusStage]);
  
  useEffect(() => {
  
  if (
    bonusStage === "reward"
  ) {

    const timer =
      setTimeout(() => {

        startFarewell();

      }, 4000);

    return () =>
      clearTimeout(timer);
  }

}, [bonusStage]);


  useEffect(() => {

  if (
    bonusStage ===
    "farewell"
  ) {

    const timer =
      setTimeout(() => {

        setBonusStage(
          "logo"
        );

      }, 5000);

    return () =>
      clearTimeout(timer);
  }

}, [bonusStage]);

  useEffect(() => {

  if (
    bonusStage ===
    "logo"
  ) {

    const timer =
      setTimeout(() => {

        window.location.reload();

      }, 3000);

    return () =>
      clearTimeout(timer);
  }

}, [bonusStage]);
  
return (
  <div className="emotion-container">
  
 {step === "select" && 
    bonusStage === "emotion" && (
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

{step === "diary" &&
 bonusStage === "emotion" && (
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
    <div className="happy-cat-wrapper">

      <img
        src="/cat/cat_happy.png"
        width={220}
        alt="Happy Cat"
       className={
  happySent
    ? "happy-powered"
    : "happy-breathing"
}
      />
{sendHeartVisible && (
  <div className="send-heart">
    ❤️
  </div>
)}
      
     {returnHearts && (
  <>
    <div className="fly f1">💛</div>
    <div className="fly f2">🐾</div>
    <div className="fly f3">💛</div>
    <div className="fly f4">🐾</div>
    <div className="fly f5">💛</div>
  </>
)}

    </div>

   {!happySent ? (
  <p>
    วันนี้มีเรื่องดี ๆ จนใจฟูเลยใช่ไหมคะ?
    <br />
    มาส่งพลังใจดวงโตให้เจ้าเหมียวส้มกันเถอะ!
  </p>
) : (
  <p
    style={{
      marginTop: 20,
      fontSize: 18,
      lineHeight: 1.6,
    }}
  >
    รับพลังใจดวงนี้กลับไปด้วยนะ!
    <br />
    ขอบคุณที่มาแบ่งปันความสุขให้กัน
    <br />
    ขอให้หัวใจฟูฟ่องแบบนี้ไปทั้งวันเลยนะ 💛
  </p>
)}
  </>
)}

 
 <div className="sad-text-wrapper">

  <textarea
  value={
    emotion === "anxious" &&
    swiped
      ? "หายใจลึก ๆ ไปด้วยกันนะ 🌿"
      : message
  }
  readOnly={submitted}
  
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
    <>
      <p
        style={{
          marginTop: 12,
          marginBottom: 8,
          fontSize: 16,
          lineHeight: 1.5,
        }}
      >
        ส่งความวุ่นวายมาให้จ้มเถอะ
        <br />
        แตะอุ้งเท้าจ้ม 🐾
      </p>

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
      </>
      )}
   {submitted &&
 emotion === "anxious" &&
 swiped && (
  <button
    onClick={
      goToComfortStage
    }
  >
    ไปพักผ่อนกับจ้ม 🐾
  </button>
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
 emotion === "happy" &&
 !happySent && (
  <button
    className="heart-send-btn"
    onClick={() => {

  setHappySent(true);

  setSendHeartVisible(true);

  setTimeout(() => {
    setSendHeartVisible(false);
  }, 1200);

  setTimeout(() => {
    setReturnHearts(true);
  }, 1500);

}}
   
  >
    ❤️ ส่งหัวใจให้จ้ม
  </button>
)}

  {submitted &&
 emotion === "happy" &&
 happySent && (
  <button
    onClick={
      goToComfortStage
    }
  >
    ไปพักผ่อนกับจ้ม 🐾
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
  <>
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

    <button
      onClick={
        goToComfortStage
      }
    >
      ไปพักผ่อนกับจ้ม 🐾
    </button>
  </>
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

{submitted &&
 emotion === "sad" &&
 sadStainCount === 0 && (
  <button
    onClick={
      goToComfortStage
    }
  >
    ไปพักผ่อนกับจ้ม 🐾
  </button>
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
  <>
    <p>
      เขินนะนุด ☺️
    </p>

    <button
      onClick={
        goToComfortStage
      }
    >
      ไปพักผ่อนกับจ้ม 🐾
    </button>
  </>
)}

  </>
)}
    {bonusStage === "intro" && (

<div
  style={{
    position: "fixed",
    inset: 0,
    background: "yellow",
    zIndex: 9999,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontSize: "40px",
  }}
>
  INTRO TEST
</div>

)}
    
   
    {bonusStage === "welcome" && (

<div
  style={{
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100vh",
    textAlign: "center",
  }}
>

  <h1>Calm Cat App</h1>

  <p>
    จ้มพร้อมฟังนุดเสมอนะ 🐾
  </p>

  {/* วางปุ่มตรงนี้ */}
  <button
  onClick={() => {

    setStep("select");

    setBonusStage(
      "emotion"
    );

  }}
>
  เริ่มเลย
</button>

</div>

)}
    
    {bonusStage === "comfort" && (
  <div className="comfort-stage">

    <video
      width={300}
      autoPlay
      loop
      muted
    >
      <source
        src={comfortVideo}
        type="video/mp4"
      />
    </video>

    <p
      style={{
        marginTop: 20,
        lineHeight: 1.8,
      }}
    >
      ภูมิใจในตัวเองให้มาก ๆ นะ
      <br />
      ถึงคนอื่นจะไม่รู้ว่าวันนี้เธอต้องพยายามขนาดไหน
      <br />
      แต่เจ้าเหมียวส้มรู้ และอยู่ข้าง ๆ เสมอ 💛
    </p>

  <button
  onClick={
    startRewardStage
  }
>
  รับของขวัญ 🎁
</button>

  </div>
)}

    

{bonusStage === "reward" && (

<div className="reward-stage">

  <video
    width={300}
    autoPlay
    muted
    playsInline
  >
    <source
      src={rewardVideo}
      type="video/mp4"
    />
  </video>

  <p
    style={{
      marginTop: 20,
      lineHeight: 1.8,
    }}
  >
    {rewardMessage}
  </p>

  <audio
    autoPlay
    src={rewardAudio}
  />

 

</div>

)}

{bonusStage === "farewell" && (

<div className="farewell-stage">

  <video
    width={300}
    autoPlay
    muted
    loop
    playsInline
  >
    <source
      src={farewellVideo}
      type="video/mp4"
    />
  </video>

  <p
    style={{
      marginTop: 20,
    }}
  >
    มีความสุข สบายใจนะนุด 🐾
  </p>

</div>

)}

  {bonusStage === "logo" && (

<div
  style={{
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100vh",
  }}
>

  <video
    autoPlay
    muted
    playsInline
  >
    <source
      src="/logo/calmcat_logo.mp4"
      type="video/mp4"
    />
  </video>

</div>

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


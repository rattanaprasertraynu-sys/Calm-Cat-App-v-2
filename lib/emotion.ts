import { Emotion } from "./replies";

export function detectEmotion(message: string): Emotion {
  const msg = message.toLowerCase();

  if (msg.includes("เครียด") || msg.includes("เหนื่อย")) return "STRESSED";
  if (msg.includes("เศร้า") || msg.includes("เสียใจ") || msg.includes("ร้องไห้")) return "SAD";
  if (msg.includes("เหงา") || msg.includes("คนเดียว")) return "LONELY";
  if (msg.includes("ดีใจ") || msg.includes("มีความสุข") || msg.includes("สำเร็จ")) return "POSITIVE";

  return "NEUTRAL";
}

import { replies, Emotion } from "./replies";

export function getReply(emotion: Emotion): string {
  const list = replies[emotion];
  const index = Math.floor(Math.random() * list.length);
  return list[index];
}

export function getReplySmart(emotion: Emotion, message: string): string {
  const list = replies[emotion];

  // ถ้ายาว = ใช้ประโยคท้าย ๆ (ลึกกว่า)
  if (message.length > 50) {
    return list[list.length - 1];
  }

  // ถ้าสั้น = สุ่ม
  return list[Math.floor(Math.random() * list.length)];
}


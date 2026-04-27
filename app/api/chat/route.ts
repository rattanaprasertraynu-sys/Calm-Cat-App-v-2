import { NextResponse } from "next/server";
import { detectEmotion } from "../../../lib/emotion";
import { getReplySmart } from "../../../lib/getReply";

const emotionMap: any = {
  STRESSED: "sit_tail",
  SAD: "heart",
  LONELY: "window",
  NEUTRAL: "idle",
  POSITIVE: "smile",
};

export async function POST(req: Request) {
  const { message } = await req.json();

  const emotion = detectEmotion(message);
  const reply = getReplySmart(emotion, message);

  return NextResponse.json({
    reply,
    emotion,
    animation: emotionMap[emotion],
  });
}

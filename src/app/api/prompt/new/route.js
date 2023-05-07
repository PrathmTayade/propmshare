import Prompt from "@/models/prompt";
import { connectToDB } from "@/utils/database";
import { NextResponse } from "next/server";

export const POST = async (req, res) => {
  const data = await req.json();
  try {
    await connectToDB();
    const newPrompt = new Prompt({
      creator: data.userId,
      prompt: data.prompt,
      tag: data.tag,
    });
    await newPrompt.save();

    return new NextResponse(JSON.stringify(newPrompt), { status: 201 });
  } catch (error) {
    return new NextResponse("Failed to creat new prompt ", { status: 500 });
  }
};

import Prompt from "@/models/prompt";
import { connectToDB } from "@/utils/database";
import { NextResponse } from "next/server";

export const GET = async (req, res) => {
  try {
    await connectToDB();
    const prompts = await Prompt.find({}).populate("creator");

    return new NextResponse(JSON.stringify(prompts), { status: 200 });
  } catch (error) {
    console.log(error);
    return new NextResponse("Failed to fetch prompts", { status: 500 });
  }
};

import Prompt from "@/models/prompt";
import { connectToDB } from "@/utils/database";
import { NextResponse } from "next/server";

//GET
export const GET = async (req, { params }) => {
  try {
    await connectToDB();
    const prompt = await Prompt.findById(params.id).populate("creator");

    if (!prompt) {
      return new Response("Prompt not found", { status: 404 });
    }
    return new NextResponse(JSON.stringify(prompt), { status: 200 });
  } catch (error) {
    console.log(error);
    return new NextResponse("Failed to fetch prompts", { status: 500 });
  }
};

export const PATCH = async (req, { params }) => {
  const { prompt, tag } = await req.json();
  try {
    await connectToDB;

    const existingPrompt = await Prompt.findById(params.id);

    if (!existingPrompt) {
      return new Response("Prompt not found", { status: 404 });
    }
    //updating the prompt
    existingPrompt.prompt = prompt;
    existingPrompt.tag = tag;

    await existingPrompt.save();

    return new NextResponse(JSON.stringify(existingPrompt), { status: 200 });
  } catch (error) {
    return new NextResponse("Failed to update the form", { status: 500 });
  }
};
export const DELETE = async (req, { params }) => {
  try {
    await connectToDB();
    await Prompt.findByIdAndDelete(params.id);
    return new Response("Prompt deleted", { status: 200 });
  } catch (error) {
    return new NextResponse("Failed to delete the prompt", { status: 500 });
  }
};

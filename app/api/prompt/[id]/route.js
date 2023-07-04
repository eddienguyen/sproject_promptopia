import Prompt from "@models/prompt";
import { connectToDB } from "@utils/database";

// GET
export const GET = async (request, { params }) => {
  try {
    await connectToDB();

    const _promptID = params.id || "";

    const prompt = await Prompt.findById(_promptID).populate("creator");

    if (!prompt) return new Response("Prompt not found!", { status: 404 });
    return new Response(JSON.stringify(prompt), { status: 200 });
  } catch (error) {
    return new Response("Failed to fetch one!", { status: 500 });
  }
};
// PATCH (update)
export const PATCH = async (req, { params }) => {
  try {
    await connectToDB();
    const _promptID = params.id || "";
    const _data = await req.json();
    console.log("[api/prompt/[id] - PATCH] _data:", _data);
    const existingPrompt = await Prompt.findById(_promptID).populate("creator");
    console.log("[api/prompt/[id] - PATCH] prompt:", existingPrompt);

    if (!existingPrompt) {
      return new Response("Prompt not found!", { status: 404 });
    }

    existingPrompt.prompt = _data?.prompt;
    existingPrompt.tag = _data?.tag;

    await existingPrompt.save();

    return new Response(JSON.stringify(existingPrompt), { status: 200 });
  } catch (error) {
    return new Response("Failed to fetch one!", { status: 500 });
  }
};
// DELETE
export const DELETE = async (req, { params }) => {
  try {
    await connectToDB();
    const _promptID = params.id || "";

    await Prompt.findOneAndDelete(_promptID);
    
    return new Response("Prompt deleted successfully!", { status: 200 });
  } catch (error) {
    return new Response(`Prompt is unable to delete: ${error}`, {
      status: 500,
    });
  }
};

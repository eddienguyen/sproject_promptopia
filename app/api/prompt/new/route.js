import Prompt from "@models/prompt";
import { connectToDB } from "@utils/database";

export const POST = async (req, res) => {
  const _req = await req.json();

  const { prompt = "[mptprmpt]", tag = "[mpttg]", userID = "[mptusr]" } = _req;
  try {
    await connectToDB();

    console.group("[api/prompt/new] success:");
    console.log("request", _req);
    console.groupEnd();

    const newPrompt = new Prompt({
      creator: userID,
      prompt: prompt.trim(),
      tag: tag.trim(),
    });
    await newPrompt.save();

    return new Response(JSON.stringify(newPrompt), { status: 201 });
  } catch (error) {
    return new Response(`Failed to create new prompt: ${error.toString()}`, {
      status: 500,
    });
  }
};

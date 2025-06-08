import Prompt from "@models/prompt";
import { connectToDB } from "@utils/database";

export const GET = async (req, { params }) => {
  //   console.log("[api/users/[id]/posts] params:", params);
  try {
    await connectToDB();
    const userID = params?.id || null;
    const response = await Prompt.find({
      creator: userID,
    }).populate("creator");

    return new Response(JSON.stringify(response), { status: 200 });
  } catch (error) {
    return new Response(`Failed to fetch user prompts: ${error}`, {
      status: 500,
    });
  }
};
import User from "@models/user";
import { connectToDB } from "@utils/database";

export const GET = async (req, { params }) => {
  //   console.log("[api/users/[id]] params:", params);
  try {
    await connectToDB();
    const userID = params?.id || null;
    const response = await User.findById(userID);

    return new Response(JSON.stringify(response), { status: 200 });
  } catch (error) {
    return new Response(`Failed to fetch user info: ${error}`, {
      status: 500,
    });
  }
};

import Prompt from "@models/prompt";
import User from "@models/user";
import StringExtra from "@plugins/utils/StringExtra";
import { connectToDB } from "@utils/database";

export const GET = async (req, res) => {
  // const _req = await req.json();

  console.log("calling api/prompt/route");

  try {
    await connectToDB();

    let conditions = {}; // mongoose conditions
    const searchParams = req?.nextUrl?.searchParams || new URLSearchParams(""); // URLSearchParams, contains {keyword}

    // console.group("[api/prompt/route]");
    // console.log("searchParams", searchParams);
    // console.log("searchParams type", typeof searchParams);
    // console.groupEnd();

    if (
      searchParams.has("keyword") &&
      !StringExtra.isEmpty(searchParams.get("keyword"))
    ) {
      let orCreators = []; // creators
      let or = []; // $or operator: https://www.mongodb.com/docs/manual/reference/operator/query/or/
      console.log('searchParams.get("keyword")', searchParams.get("keyword"));
      const keyword = searchParams.get("keyword");
      const qs = keyword.split(" ");

      // find creator(s) by keyword
      if (qs.length) {
        for (let i = 0; i < qs.length; i++) {
          const keywordCreator = qs[i];
          orCreators[i] = {};
          orCreators[i][`username`] = {
            // $regex: new RegExp(`(^| )${keywordCreator}( |$)`, "img"),
            $regex: new RegExp(`${keywordCreator}`, "i"), // find by part of string
          };
        }
      }
      const creators = await User.find({ $or: orCreators })
        .select({ username: 1 })
        .lean();

      const creatorIDs = creators.map((each) => each._id);

      if (qs.length) {
        for (let i = 0; i < qs.length; i++) {
          // by prompt or tag => 2
          // each loop checks for 2 => or[i] && or [i*2+1],
          // next loop: or[(i * 2)] && or[(i * 2) + 1],...so on

          const kw = qs[i];
          or[i * 3] = {};
          or[i * 3 + 1] = {};
          or[i * 3 + 2] = {};

          or[i * 3][`prompt`] = {
            $regex: new RegExp(`(^| )${kw}( |$)`, "img"), // img: regexp flag
          };
          or[i * 3 + 1][`tag`] = {
            $regex: new RegExp(`(^| )${kw}( |$)`, "img"), // img: regexp flag
          };
          or[i * 3 + 2][`creator`] = {
            $in: creatorIDs, // img: regexp flag
          };
        }
      }

      if (or.length) conditions["$or"] = or;
    }
    let response = await Prompt.find(conditions).populate("creator");

    return new Response(JSON.stringify(response), { status: 200 });
  } catch (error) {
    console.group("[api/prompt] error");
    console.log(error);
    console.groupEnd();

    return new Response(`Failed to fetch prompt: ${error.toString()}`, {
      status: 500,
    });
  }
};

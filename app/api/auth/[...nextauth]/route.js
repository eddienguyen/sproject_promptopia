// app/api/auth/[...nextauth]/route.js is the currently accepted best practice

import CONFIG from "@web.config";
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { connectToDB } from "@utils/database";
import User from "@models/user";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: CONFIG.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
      clientSecret: CONFIG.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET,
    }),
  ],

  callbacks: {
    async session({ session, user, token }) {
      const sessionUser = await User.findOne({
        email: session.user.email,
      });
      console.group("[NextAuth session]:");
      console.log("session", session);
      console.groupEnd();
      // make sure to update it's id to ensure that we always know which user is online
      session.user.id = sessionUser?._id?.toString();

      return session;
    },
    async signIn({ user, account, profile, email, credentials }) {
      // every nextjs route is something known as a serverless route
      // means it is a lambda function that opens up only when it gets called
      // everytime it gets called it needs to spin up the server and make a connection (to the db)
      // so the server is not running constantly => have to make a connection to the db

      try {
        await connectToDB();
        console.group("[NextAuth signIn] success:");
        console.log("profile", profile);
        console.log("user", user);
        console.log("account", account);
        console.groupEnd();
        // 1: check if user is already exists
        const isUserExists = await User.findOne({ email: profile.email });
        console.log("[NextAuth signIn] isUserExists: ", isUserExists);
        // 2: if user is not exist, create a new one and save it to the database
        if (!isUserExists) {
          await User.create({
            email: profile.email,
            username: profile.name.replace(" ", "").toLowerCase(), // make sure that it has no spaces and lowercase
            image: profile.picture,
          });
        }

        return true;
      } catch (error) {
        console.group("[NextAuth signIn] error:");

        console.log(error);
        console.groupEnd();

        return false;
      }
    },
  },
});

export { handler as GET, handler as POST };

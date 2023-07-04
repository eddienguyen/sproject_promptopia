"use client";

import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";

import Profile from "@components/Profile";
import { useRouter } from "next/navigation";
import API_ROUTES from "@constants/api_routes";

const ProfilePage = () => {
  const { data: session } = useSession({
    required: true,
    onUnauthenticated: () => {
      router.push("/");
    },
  });

  const router = useRouter();

  const [userPosts, setUserPosts] = useState([]);

  const handleEditPost = (promptID = "") => {
    router.push(`/update-prompt?id=${promptID}`);
  };
  const handleDeletePost = async (promptID = "") => {
    const hasConfirmed = confirm(
      "Are you sure you want to delete this prompt? (This action cannot be undone)"
    );

    if (hasConfirmed) {
      try {
        const response = await fetch(API_ROUTES.PROMPT.delete(promptID), {
          method: "DELETE",
        });

        if (response && response.ok) {
          fetchUserPosts();
        }
      } catch (error) {
        alert(error.toString());
      }
    }
  };

  const handleTagClick = (value) => {
    // console.log('handleTagClick', handleTagClick)
    router.push(`/?key=${value}`);
  };

  const fetchUserPosts = async () => {
    console.log("fetchUserPosts");
    const response = await fetch(API_ROUTES.USERS.posts(session.user?.id));
    const data = await response.json();

    setUserPosts(data);
  };

  useEffect(() => {
    if (session?.user?.id) fetchUserPosts();
    return () => {};
  }, [JSON.stringify(session)]);

  return (
    <Profile
      profileData={session?.user}
      desc="Welcome to your personalized profile page"
      prompts={userPosts}
      handleEditPost={handleEditPost}
      handleDeletePost={handleDeletePost}
      handleTagClick={handleTagClick}
    />
  );
};

export default ProfilePage;

"use client";

import React, { useEffect, useState } from "react";

import Profile from "@components/Profile";
import { useRouter, useParams } from "next/navigation";
import API_ROUTES from "@constants/api_routes";

const ProfilePage = () => {
  const params = useParams();
  const router = useRouter();
  const [userPosts, setUserPosts] = useState([]);
  const [userData, setUserData] = useState({});

  const fetchUserInfo = async () => {
    const response = await fetch(API_ROUTES.USERS.posts(params?.userID));
    const data = await response.json();

    setUserPosts(data);
  };
  const fetchUserPosts = async () => {
    const response = await fetch(API_ROUTES.USERS.info(params?.userID));
    const data = await response.json();

    setUserData(data);
  };

  const handleTagClick = (value) => {
    // console.log('handleTagClick', handleTagClick)
    router.push(`/?key=${value}`);
  };

  useEffect(() => {
    const userID = params?.userID || "";
    if (userID) {
      fetchUserInfo();
      fetchUserPosts();
    }
    return () => {};
  }, [JSON.stringify(params)]);

  return (
    <Profile
      profileData={userData}
      desc={`Welcome to ${userData?.username} personalized profile page`}
      prompts={userPosts}
      handleTagClick={handleTagClick}
    />
  );
};

export default ProfilePage;

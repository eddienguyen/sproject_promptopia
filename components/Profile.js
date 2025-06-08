import React from "react";
import PromptCard from "./PromptCard";

const Profile = ({
  profileData = {},
  desc = "",
  prompts = [],
  handleEditPost = null,
  handleDeletePost = null,
  handleTagClick = null,
}) => {
  const name = profileData?.name || profileData?.username || "";
  return (
    <section className="w-full">
      <h1 className="head_text">
        <span className="blue_gradient">{name} Profile</span>
      </h1>
      <p className="desc text-left">{desc}</p>
      <div className="mt-10 prompt_layout">
        {prompts.length > 0 &&
          prompts.map((post) => (
            <PromptCard
              data={post}
              key={post?._id}
              onEditClick={handleEditPost}
              onDeleteClick={handleDeletePost}
              onTagClick={handleTagClick}
            />
          ))}
      </div>
    </section>
  );
};

export default Profile;

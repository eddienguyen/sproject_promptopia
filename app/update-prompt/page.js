"use client";

import { useEffect, useState } from "react";

import Form from "@components/Form";
import { PostType } from "@constants/prompts";
import { useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";

import API_ROUTES from "@constants/api_routes";

const EditPromptPage = () => {
  const searchParams = useSearchParams();
  const postID = searchParams.get("id");
  const { data: session } = useSession({
    required: true,
    onUnauthenticated: () => {
      console.log("unauthenticated!");
    },
  });
  const router = useRouter();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [promptData, setPromptData] = useState({
    prompt: "",
    tag: "",
    _id: "",
  });

  const handleSubmitPrompt = async (event) => {
    event.preventDefault();

    if (!postID) {
      alert("No prompt ID found!");
      return;
    }

    setIsSubmitting(true);
    console.log("[submitPrompt] event:", event);

    try {
      const response = await fetch(API_ROUTES.PROMPT.edit(promptData?._id), {
        method: "PATCH",
        body: JSON.stringify({
          prompt: promptData.prompt,
          tag: promptData.tag,
        }),
      });
      console.log("response", response);

      if (response.ok) {
        router.push("/");
      }
    } catch (error) {
      console.log("[handleSubmitPrompt] error: ", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    const getPostData = async (_id) => {
      const response = await fetch(API_ROUTES.PROMPT.getOne(_id));
      if (response) {
        const _data = await response.json();
        setPromptData(_data);
      }
    };
    if (postID) {
      getPostData(postID);
    }
    return () => {};
  }, [postID]);

  return (
    <Form
      type={PostType.EDIT}
      isSubmitting={isSubmitting}
      setData={setPromptData}
      data={promptData}
      handleSubmit={handleSubmitPrompt}
    >
      EditPrompt form
    </Form>
  );
};

export default EditPromptPage;

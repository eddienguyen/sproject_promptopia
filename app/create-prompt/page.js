"use client";

import { useState } from "react";

import Form from "@components/Form";
import { PostType } from "@constants/prompts";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import API_ROUTES from "@constants/api_routes";

const CreatePromptPage = () => {
  const { data: session } = useSession({
    required: true,
    onUnauthenticated: () => {
      console.log("unauthenticated!")
    }
  });
  const router = useRouter();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [promptData, setPromptData] = useState({
    prompt: "",
    tag: "",
  });

  const handleSubmitPrompt = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    console.log("[submitPrompt] event:", event);

    try {
      const response = await fetch(API_ROUTES.PROMPT.create(), {
        method: "POST",
        body: JSON.stringify({
          prompt: promptData.prompt,
          tag: promptData.tag,
          userID: session?.user.id,
        }),
      });
      if (response.ok) {
        router.push("/");
      }
    } catch (error) {
      console.log("[handleSubmitPrompt] error: ", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form
      type={PostType.CREATE}
      isSubmitting={isSubmitting}
      setData={setPromptData}
      data={promptData}
      handleSubmit={handleSubmitPrompt}
    >
      CreatePrompt form
    </Form>
  );
};

export default CreatePromptPage;

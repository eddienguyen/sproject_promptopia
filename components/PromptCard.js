"use client";

import Image from "next/image";
import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

const PromptCard = ({
  data = {},
  onTagClick = null,
  onEditClick = null,
  onDeleteClick = null,
}) => {
  const router = useRouter();
  const pathName = usePathname();
  const { data: session } = useSession();

  const [copied, setCopied] = useState(""); // clipboard content

  const handleCopyClicked = (e) => {
    // e.preventDefault();
    setCopied(data?.prompt);
    console.log("navigator.clipboard", navigator.clipboard);
    navigator.clipboard.writeText(data?.prompt?.toString());
    setTimeout(() => {
      setCopied("");
    }, 3000);
  };

  const onUserClicked = (userID) => {
    if (userID === session?.user?.id) {
      router.push(`/profile`);
    } else {
      router.push(`/profile/${userID}`);
    }
  };

  return (
    <div className="prompt_card">
      <div className="flex justify-between items-start gap-5">
        <div
          className="flex-1 flex items-center gap-3 cursor-pointer transition hover:underline"
          onClick={(e) => onUserClicked(data?.creator?._id)}
        >
          <Image
            src={data?.creator?.image}
            width={40}
            height={40}
            alt={"user-image"}
            className="rounded-full object-contain"
          />
          <div className="flex flex-col">
            <h3 className="text-gray-900 font-semibold font-satoshi">
              {data?.creator?.username}
            </h3>
            <p className="text-gray-500 text-sm font-inter">
              {data?.creator?.email}
            </p>
          </div>
        </div>
        <div className="copy_btn" onClick={handleCopyClicked}>
          <Image
            width={12}
            height={12}
            alt="copy-btn"
            src={
              copied === data?.prompt
                ? "/assets/icons/tick.svg"
                : "/assets/icons/copy.svg"
            }
          />
        </div>
      </div>
      <p className="my-4 font-satoshi text-sm text-gray-700 italic">
        "{data?.prompt}"
      </p>
      <p
        className="font-inter text-sm blue_gradient cursor-pointer"
        onClick={(e) => onTagClick && onTagClick(data?.tag)}
      >
        #{data?.tag}
      </p>
      {session?.user?.id === data?.creator?._id && pathName === "/profile" && (
        <div className="mt-5 flex-center gap-4 pt-3 border-t border-gray-200">
          <p
            className="font-inter text-sm cursor-pointer green_gradient"
            onClick={(e) => onEditClick && onEditClick(data?._id)}
          >
            Edit
          </p>
          <p
            className="font-inter text-sm cursor-pointer orange_gradient"
            onClick={(e) => onDeleteClick && onDeleteClick(data?._id)}
          >
            Delete
          </p>
        </div>
      )}
    </div>
  );
};

export default PromptCard;

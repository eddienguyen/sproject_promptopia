"use client";

import React from "react";
import { PostType } from "@constants/prompts";
import Link from "next/link";

const Form = ({
  type = PostType.CREATE,
  isSubmitting = false,
  setData = null,
  data = {},
  handleSubmit = null,
}) => {
  return (
    <section className="w-full max-w-full flex-start flex-col">
      <h1 className="head_text text-left capitalize">
        <span className="blue_gradient">{type} post</span>
      </h1>
      <p className="desc max-w-md">
        {type} and share amazing prompts with the world, and let your
        imagination run wild with any AI-powered platform.
      </p>
      <form
        action=""
        onSubmit={handleSubmit}
        className="w-full mt-10 max-w-2xl flex flex-col gap-7 glassmorphism"
      >
        <label htmlFor="prompt_name">
          <span className="font-satoshi font-semibold text-base text-gray-700">
            Your AI prompt
          </span>
          <textarea
            placeholder="Write your prompt here"
            name="prompt_name"
            className="form_textarea"
            value={data.prompt}
            onChange={(e) => setData({ ...data, prompt: e.target.value })}
            required
          />
        </label>

        <label htmlFor="prompt_tag">
          <span className="font-satoshi font-semibold text-base text-gray-700">
            Tag
            <span className="font-normal"> (#ai, #webdevelopment, ...)</span>
          </span>
          <input
            placeholder="#tag"
            name="prompt_tag"
            className="form_input"
            value={data.tag}
            onChange={(e) => setData({ ...data, tag: e.target.value })}
            required
          />
        </label>
        <div className="flex-end gap-4 mx-3 mb-5">
          <Link href={"/"} className="text-gray-500 text-sm">
            Cancel
          </Link>
          <button 
          type="submit"
          className="capitalize text-sm rounded-full px-5 py-1.5 bg-primary-orange text-white hover:bg-slate-600 transition-all" disabled={isSubmitting}>
            {isSubmitting ? `${type}...` : type}
          </button>
        </div>
      </form>
    </section>
  );
};

export default Form;

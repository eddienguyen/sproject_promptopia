"use client";

import { useEffect, useRef, useState } from "react";
import PromptCard from "./PromptCard";
import API_ROUTES from "@constants/api_routes";
import { debounceMore } from "@plugins/helpers/helpers";
import { useSearchParams } from "next/navigation";
import * as _ from "lodash";

const List = ({ data = [], onTagClick = null }) => {
  return (
    <div className="mt-16 prompt_layout">
      {data.map((post) => (
        <PromptCard data={post} key={post?._id} onTagClick={onTagClick} />
      ))}
    </div>
  );
};

const Feed = () => {
  const timerRef = useRef(null); // we can save timer in useRef and pass it to child
  const searchParams = useSearchParams();
  const key = searchParams.get("key");

  const [searchText, setSearchText] = useState("");
  const [posts, setPosts] = useState([]);
  const [isFetching, setIsFetching] = useState(false);

  const handleSearchChange = (e) => {
    setIsFetching(true);

    setSearchText(e.target?.value);
    submitSearch(e.target?.value);
  };

  const handleTagClick = (value) => {
    setIsFetching(true);

    setSearchText(value);
    submitSearch(value);
  };

  const debounce = (callback, delay = 1000) => {
    return function () {
      if (timerRef.current) clearTimeout(timerRef.current);
      timerRef.current = setTimeout(
        () => callback.apply(this, arguments),
        delay
      );
    };
  };

  const fetchPosts = async (queryString = "") => {
    let queries = {};
    if (queryString && queryString.trim()) {
      queries = { keyword: queryString };
    }

    const serialized = new URLSearchParams(queries);
    const response = await fetch(API_ROUTES.PROMPT.getAll(`?${serialized}`));
    const data = await response.json();

    setPosts(data);
    setIsFetching(false);
  };

  const submitSearch = debounce((ee) => {
    fetchPosts(ee);
  }, 1000);

  useEffect(() => {
    // console.log("searchParams", searchParams);
    console.log("key", key);
    if (key) {
      fetchPosts(key);
    } else {
      fetchPosts();
    }
    setSearchText(key);

    return () => {};
  }, [JSON.stringify(key)]);

  return (
    <section className="feed">
      <form className="relative w-full flex-center">
        <input
          type="text"
          name="name"
          id="name"
          placeholder="Search for a tag or a username"
          className="search_input peer"
          onChange={handleSearchChange}
          value={searchText}
        />
      </form>
      {isFetching ? (
        <p className="my-4 text-sm orange_gradient">loading...</p>
      ) : (
        <List
          data={posts}
          onTagClick={(tag) => {
            handleTagClick(tag);
          }}
        />
      )}
    </section>
  );
};

export default Feed;

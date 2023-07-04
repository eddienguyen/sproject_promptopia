"use client";

import { useEffect, useState } from "react";
import PromptCard from "./PromptCard";
import API_ROUTES from "@constants/api_routes";
import { debounce } from "@plugins/helpers/helpers";
import { useSearchParams } from "next/navigation";

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

  const submitSearch = debounce(1000, fetchPosts);

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

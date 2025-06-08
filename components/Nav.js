"use client";

import Image from "next/image";
import Link from "next/link";
import { getProviders, signIn, signOut, useSession } from "next-auth/react";
import { useEffect, useState } from "react";

const Nav = () => {
  const { data: session } = useSession();

  const [providers, setProviders] = useState(null);
  const [toggleDropdown, setToggleDropdown] = useState(false);

  useEffect(() => {
    const _setProviders = async () => {
      const providers = await getProviders();
      console.log("providers", providers);

      setProviders(providers);
    };

    _setProviders();

    return () => {};
  }, []);
  
  return (
    <nav className="z-10 w-full flex-between mb-16 pt-3">
      <Link href="/" className=" flex-center gap-2">
        <Image
          src={"/assets/images/logo.svg"}
          width={30}
          height={30}
          className="object-contain"
          alt="promptopia logo"
        />
        <p className="logo_text flex justify-center from-zinc-200 ">
          <code className="font-mono font-bold">Promptopia</code>
        </p>
      </Link>

      {/* Desktop Navigation */}
      <div className="hidden sm:flex ">
        {session?.user ? (
          <div className="flex gap-3 md:gap-5">
            <Link href={"/create-prompt"} className="black_btn">
              Create Post
            </Link>
            <button className="outline_btn" type="button" onClick={signOut}>
              Sign out
            </button>
            <Link href="/profile">
              <Image
                src={session.user.image || "/assets/images/avatar.png"}
                width={37}
                height={37}
                alt="profile-image"
                className="rounded-full"
              />
            </Link>
          </div>
        ) : (
          providers &&
          Object.values(providers).map((provider) => (
            <button
              type="button"
              className="black_btn"
              key={provider.id}
              onClick={() => {
                signIn(provider.id);
              }}
            >
              Sign in
            </button>
          ))
        )}
      </div>

      {/* Mobile navigation */}
      <div className="sm:hidden flex relative">
        {session?.user ? (
          <div className="flex">
            <Image
              src={session.user.image || "/assets/images/avatar.png"}
              width={37}
              height={37}
              className="object-contain cursor-pointer rounded-full"
              alt="profile"
              onClick={() => setToggleDropdown((prevState) => !prevState)}
            />

            {toggleDropdown && (
              <div className="dropdown">
                <Link
                  href={"/profile"}
                  className="dropdown_link"
                  onClick={() => setToggleDropdown(false)}
                >
                  My Profile
                </Link>
                <Link
                  href={"/create-prompt"}
                  className="dropdown_link"
                  onClick={() => setToggleDropdown(false)}
                >
                  Create prompt
                </Link>
                <button
                  className="mt-5 w-full black_btn"
                  type="button"
                  onClick={() => {
                    setToggleDropdown(false);
                    signOut();
                  }}
                >
                  Sign out
                </button>
              </div>
            )}
          </div>
        ) : (
          providers &&
          Object.values(providers).map((provider) => (
            <button
              type="button"
              className="black_btn"
              key={provider.id}
              onClick={() => {
                signIn(provider.id);
              }}
            >
              Sign in
            </button>
          ))
        )}
      </div>
    </nav>
  );
};

export default Nav;

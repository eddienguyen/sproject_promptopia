"use client";

import CONFIG from "@web.config";
import { SessionProvider } from "next-auth/react";

const Provider = ({ children, session }) => {
  return (
    <SessionProvider
      session={session}
      basePath={`${CONFIG.getBasePath()}/api/auth`}
      // refetchInterval={5 * 60} // Re-fetch session every 5 minutes
    >
      {children}
    </SessionProvider>
  );
};

export default Provider;

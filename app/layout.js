import { Inter } from "next/font/google";
import localFont from "next/font/local";

import Nav from "@components/Nav";
import Provider from "@components/Provider";
import "@styles/global.css";
import { Suspense } from "react";
// const inter = Inter({ subsets: ["latin"] });

// load local font(s)
const satoshi = localFont({
  preload: true,
  src: "../public/fonts/Satoshi-Regular.woff2",
  // src: [
  //   {
  //     path: `../public/fonts/Satoshi-Regular.eot?#iefix format("embedded-opentype")`,
  //   },
  // ],
  style: "normal",
  weight: "400",
  display: "swap",
  variable: "--Satoshi",
  subsets: ["latin"],
});

export const metadata = {
  title: "Promptopia",
  description: "Discover and share AI prompts",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        // className={inter.className}
        className={`${satoshi.variable}`}
      >
        <Provider>
          <div className="bg">
            <div className="gradient"></div>
          </div>
          <main className="app">
            <Nav />
            {children}
          </main>
        </Provider>
        <Suspense fallback={null} />
      </body>
    </html>
  );
}

import React from "react";
import { uuid } from "uuidv4";
import { isMobile } from "react-device-detect";

const SignIn = () => {
  const setUuid = () => {
    if (isMobile) {
      const state = "71892479128571289123-12391412960142923";
      sessionStorage.setItem("state", state);
    } else {
      sessionStorage.setItem("state", uuid());
    }

    window.location.href = `https://www.reddit.com/api/v1/authorize?client_id=${
      process.env.REACT_APP_CLIENT_ID
    }&response_type=code&state=${sessionStorage.getItem(
      "state"
    )}&redirect_uri=${
      process.env.NODE_ENV === "development"
        ? process.env.REACT_APP_DEV_REDIRECT_URI
        : process.env.REACT_APP_REDIRECT_URI
    }&duration=temporary&scope=history identity save
    `;
  };
  return (
    <div className="grid md:grid-cols-2 bg-gray-100 min-h-screen">
      <div className="flex items-center justify-center md:mb-32">
        <div className="pt-32 md:pt-0 ">
          <h1 className="text-4xl md:text-6xl font-bold text-orange-600">
            RedditRem
          </h1>
          <span className="block text-gray-800">View your saved content.</span>
        </div>
      </div>
      <div className="flex items-center flex-col justify-center md:mb-32">
        <div className="pb-32 md:pb-0 flex flex-col items-left">
          <button
            className="text-xl md:text-2xl tracking-wider border-2 rounded-md border-orange-600 hover:bg-orange-600 hover:text-white font-bold text-orange-600 py-4 px-6 md:py-6 md:px-8"
            onClick={setUuid}
          >
            LOG IN
          </button>
          <span className="block pt-2 text-gray-800">
            Using your reddit account.
          </span>
        </div>
      </div>
    </div>
  );
};

export default SignIn;

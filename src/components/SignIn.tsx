import React from "react";
import { uuid } from "uuidv4";
import { isMobile } from "react-device-detect";
/* import { connect } from "react-redux";
 *  */
export const SignIn = ({ errorMessage }: any) => {
  const setUuid = () => {
    if (isMobile) {
      /* const state = process.env.REACT_APP_MOBILE_STATE; */
      const state = "somestring";
      localStorage.setItem("state", state);
      window.location.href = `https://www.reddit.com/api/v1/authorize.compact?client_id=${
        process.env.REACT_APP_CLIENT_ID
      }&response_type=code&state=${localStorage.getItem(
        "state"
      )}&redirect_uri=${
        process.env.NODE_ENV === "development"
          ? process.env.REACT_APP_DEV_REDIRECT_URI
          : process.env.REACT_APP_REDIRECT_URI
      }&duration=temporary&scope=history identity save
    `;
    } else {
      localStorage.setItem("state", uuid());
      window.location.href = `https://www.reddit.com/api/v1/authorize?client_id=${
        process.env.REACT_APP_CLIENT_ID
      }&response_type=code&state=${localStorage.getItem(
        "state"
      )}&redirect_uri=${
        process.env.NODE_ENV === "development"
          ? process.env.REACT_APP_DEV_REDIRECT_URI
          : process.env.REACT_APP_REDIRECT_URI
      }&duration=temporary&scope=history identity save
    `;
    }
  };

  return (
    <div className="flex flex-col md:justify-center justify-around bg-gray-100 min-h-screen">
      <div className="error-message">
        <span
          className={
            errorMessage ? `block text-red-800 font-semibold` : `hidden`
          }
        >
          {errorMessage}
        </span>
      </div>
      <div className="flex items-center justify-center md:mb-32">
        <div className="">
          <h1 className="text-4xl md:text-6xl font-bold text-orange-600">
            RedditRem
          </h1>
          <span className="block text-gray-800 text-center">
            View your saved content.
          </span>
        </div>
      </div>
      <div className="flex items-center flex-col justify-center md:mb-32">
        <div className="md:pb-0 flex flex-col items-left">
          <button
            className="text-xl md:text-2xl tracking-wider border-2 rounded-md border-orange-600 hover:bg-orange-600 hover:text-white font-bold text-orange-600 py-4 px-6 md:py-6 md:px-8"
            onClick={setUuid}
          >
            SIGN IN
          </button>
          <span className="block pt-2 text-gray-800">
            Using your reddit account.
          </span>
        </div>
      </div>
    </div>
  );
};

/* const mapStateToProps = (state: any) => {
 *   return {
 *     errorMessage: state.error.errorMessage,
 *   };
 * };
 *
 * export default connect(mapStateToProps)(SignIn); */
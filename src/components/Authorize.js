import React from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

import Loading from "./Loading";

const Authorize = (props) => {
  const history = useHistory();
  const params = new URLSearchParams(props.location.search).get("state");
  const error = new URLSearchParams(props.location.search).get("error");
  const code = new URLSearchParams(props.location.search).get("code");
  // const [loading, setLoading] = React.useState(true)
  const encode = window.btoa(
    `${process.env.REACT_APP_CLIENT_ID}:${process.env.REACT_APP_SECRET}`
  );

  if (error === "access_denied") {
    history.push("/");
  }

  if (
    params === sessionStorage.getItem("uuidState") &&
    error !== "access_denied"
  ) {
    const authorize = async () => {
      const token = await axios.post(
        `https://www.reddit.com/api/v1/access_token`,
        `grant_type=authorization_code&code=${code}&redirect_uri=${
          process.env.NODE_ENV === "development"
            ? process.env.REACT_APP_DEV_REDIRECT_URI
            : process.env.REACT_APP_REDIRECT_URI
        }`,
        {
          headers: {
            Authorization: `Basic ${encode}`,
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );
      const data = await token.data;
      if (data.access_token && !data.error) {
        sessionStorage.setItem("token", data.access_token);
        history.push("/home");
      } else if (data.error === "invalid_grant") {
        sessionStorage.clear();
        history.push("/");
      }
    };
    authorize();
  }

  return <Loading text={"Authorizing your token..."} />;
};

export default Authorize;

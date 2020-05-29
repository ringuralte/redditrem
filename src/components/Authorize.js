import React from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

import Loading from "./Loading";

const Authorize = (props) => {
  console.log("here");
  const history = useHistory();
  const state = new URLSearchParams(props.location.search).get("state");
  const error = new URLSearchParams(props.location.search).get("error");
  const code = new URLSearchParams(props.location.search).get("code");
  // const [loading, setLoading] = React.useState(true)
  const encode = window.btoa(
    `${process.env.REACT_APP_CLIENT_ID}:${process.env.REACT_APP_SECRET}`
  );

  console.log(state)
  console.log(error)
  console.log(code)

  React.useEffect(() => {
    if (state === sessionStorage.getItem("uuidState") && error !== "access_denied") {
      axios
        .post(
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
        )
        .then((res) => {
          console.log(res)
          sessionStorage.setItem("token", res.data.access_token);
          history.push("/home");
        })
        .catch((error) => {
          sessionStorage.clear();
          history.push("/");
        });
    } else if (error === "access_denied") {
      history.push("/");
    }
  }, []);

  return <Loading text={"Authorizing your token..."} />;
};

export default Authorize;

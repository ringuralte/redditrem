import React from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { isMobile } from "react-device-detect";

import Loading from "./Loading";

const Authorize = (props) => {
  const history = useHistory();
  const state = new URLSearchParams(props.location.search).get("state");
  const error = new URLSearchParams(props.location.search).get("error");
  const code = new URLSearchParams(props.location.search).get("code");
  const encode = window.btoa(
    `${process.env.REACT_APP_CLIENT_ID}:${process.env.REACT_APP_SECRET}`
  );
  const [stateError, setStateError] = React.useState(false);

  React.useEffect(() => {
    let stateCheck
    if (isMobile) {
      stateCheck = "71892479128571289123-12391412960142923";
    } else {
      stateCheck = sessionStorage.getItem("state");
    }
    console.log(stateCheck)
    if (state === stateCheck && error !== "access_denied") {
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
          sessionStorage.setItem("token", res.data.access_token);
          history.push("/home");
        })
        .catch((error) => {
          localStorage.clear();
          sessionStorage.clear();
          history.push("/");
        });
    } else if (state !== stateCheck) {
      setStateError(true);
    } else if (error === "access_denied") {
      history.push("/");
    }
  }, []);

  return stateError ? (
    <div>
      Error with state, if you are on mobile try setting your default reddit app
      to not open reddit links by default.
    </div>
  ) : (
    <Loading text={"Authorizing your token..."} />
  );
};

export default Authorize;

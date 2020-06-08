import React from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { isMobile } from "react-device-detect";
import { connect } from "react-redux";

import { errorMessageForHomePage } from "../store/error/errorActions";

import Loading from "./Loading";

const Authorize = ({ declined, ...props }) => {
  const history = useHistory();
  const state = new URLSearchParams(props.location.search).get("state");
  const error = new URLSearchParams(props.location.search).get("error");
  const code = new URLSearchParams(props.location.search).get("code");
  const encode = window.btoa(
    `${process.env.REACT_APP_CLIENT_ID}:${process.env.REACT_APP_SECRET}`
  );
  const [stateError, setStateError] = React.useState(false);

  React.useEffect(() => {
    let stateCheck;

    if (isMobile) {
      stateCheck = process.env.REACT_APP_MOBILE_STATE;
    } else {
      stateCheck = localStorage.getItem("state");
    }

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
          localStorage.setItem("token", res.data.access_token);
          history.push("/home");
        })
        .catch((error) => {
          localStorage.clear();
          declined("Error authorizing token")
          history.push("/");
        });
    } else if (state !== stateCheck) {
      setStateError(true);
    } else if (error === "access_denied") {
      declined("You have declined to give access")
      history.push("/");
    }
  }, [code, encode, error, history, state, declined ]);

  return stateError ? (
    <div>
      Error with state, if you are on mobile try setting your default reddit app
      to not open reddit links by default.
    </div>
  ) : (
    <Loading text={"Authorizing your token..."} />
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    declined: (errorMessage) => dispatch(errorMessageForHomePage(errorMessage)),
  };
};

export default connect(null, mapDispatchToProps)(Authorize);

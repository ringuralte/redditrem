import React from "react";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { fetchUser } from "../store/user/userActions";
import { fetchSavedContent } from "../store/savedContents/savedContentActions";

import Loading from "./Loading";
import Content from "./Content";

const Home = ({
  loadingUsername,
  loadingSavedContent,
  fetchSavedContent,
  error,
  fetchUser,
  username,
}) => {
  const history = useHistory();

  React.useEffect(() => {
    if (!username) {
      fetchUser();
    } else {
      fetchSavedContent(username);
    }
  }, [username, fetchSavedContent, fetchUser, error]);

  if (error) {
    console.log(error);
    sessionStorage.clear();
    history.push("/");
  }
  if (loadingUsername || loadingSavedContent) {
    return <Loading text={"Fetching your data..."} />;
  } else return <Content />;
};

const mapStateToProps = (state) => {
  return {
    loadingUsername: state.user.loadingUsername,
    loadingSavedContent: state.savedContent.loadingContent,
    username: state.user.user,
    error: state.user.error,
    content: state.savedContent.content.data,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchUser: () => dispatch(fetchUser()),
    fetchSavedContent: (user) => dispatch(fetchSavedContent(user)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);

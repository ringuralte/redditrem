import React from "react";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { fetchUser } from "../store/user/userActions";
import { fetchSavedContent } from "../store/savedContents/savedContentActions";
import { extractSubreddits } from "../store/sidebar/sidebarActions";
import { showAll } from "../store/mainView/mainViewActions";

import Loading from "./Loading";
import Content from "./Content";

const Home = ({
  loadingUsername,
  loadingSavedContent,
  fetchSavedContent,
  error,
  fetchUser,
  username,
  content,
  contentError,
  extractSubreddits,
  showAll,
}) => {
  const history = useHistory();

  React.useEffect(() => {
    if (!username) {
      fetchUser();
    } else {
      fetchSavedContent(username);
    }
  }, [username, fetchSavedContent, fetchUser]);

  React.useEffect(() => {
    if (error || contentError) {
  localStorage.clear();
      history.push("/");
    }
    if (content.children.length) {
      showAll()
      extractSubreddits();
    } else {
      return undefined;
    }
  }, [content, error, contentError]);

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
    contentError: state.savedContent.error,
    content: state.savedContent.content.data,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchUser: () => dispatch(fetchUser()),
    fetchSavedContent: (user) => dispatch(fetchSavedContent(user)),
    extractSubreddits: (subreddits) => dispatch(extractSubreddits(subreddits)),
    showAll: () => dispatch(showAll()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);

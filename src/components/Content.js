import React from "react";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import Sidebar from "./Sidebar";
import Header from "./Header";
import MainView from "./MainView";
import { fetchMore } from "../store/savedContents/savedContentActions";
import { showAll } from "../store/mainView/mainViewActions";

const Content = (props) => {
  const history = useHistory();

  React.useEffect(() => {
    if (props.error) {
      history.push("/");
    }
  }, [props.error]);

  const [sidebar, setSidebar] = React.useState(false);

  return (
    <div>
      <div className="min-h-screen">
        <Header sidebar={sidebar} setSidebar={setSidebar} />
        <Sidebar sidebar={sidebar} setSidebar={setSidebar} />
        <div
          className={
            !sidebar
              ? "container mx-auto px-1 py-2"
              : "pointer-events-none container mx-auto px-1 py-2"
          }
        >
          <MainView />
        </div>
      </div>
      <div className="bottom-0 mb-2 flex justify-center w-full">
        {props.content.after ? (
          props.loadingMore ? (
            <div className="spinner-mini">
              <div className="rect1"></div>
              <div className="rect2"></div>
              <div className="rect3"></div>
              <div className="rect4"></div>
              <div className="rect5"></div>
            </div>
          ) : (
            <button
              className="border-2 border-gray-800 rounded-lg px-4 py-2"
              onClick={() => {
                props.fetchMore(props.username, props.content.after);
              }}
            >
              Load More...
            </button>
          )
        ) : (
          <div></div>
        )}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    username: state.user.user,
    content: state.savedContent.content.data,
    loadingMore: state.savedContent.loadingMore,
    error: state.savedContent.error,
    viewContent: state.mainView.content,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchMore: (username, after) => dispatch(fetchMore(username, after)),
    showAll: () => dispatch(showAll()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Content);
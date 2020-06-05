import React from "react";
import { connect } from "react-redux";
import { extractSubreddits } from "../store/sidebar/sidebarActions";
import {
  showAll,
  showComments,
  showNsfw,
  showSubreddit,
} from "../store/mainView/mainViewActions";

const Sidebar = (props) => {
  const [inputState, setInputState] = React.useState("");

  const handleChange = (e) => {
    setInputState(e.target.value);
  };

  return (
    <div
      id="sidebar"
      className={
        props.sidebar ? "sidenav w-3/4 lg:w-2/5 relative sidebar-shadow" : "sidenavhide"
      }
    >
      <button
        onClick={() => props.setSidebar(false)}
        className={
          props.sidebar
            ? `fixed top-0 right-0 bottom-0 left-0 h-full w-full cursor-default`
            : `hidden`
        }
      />
      <ul className="pt-6 absolute w-full bg-white h-full">
        <input
          className="sticky top-0 border border-orange-600 w-11/12 p-2 m-2"
          type="text"
          value={inputState}
          onChange={handleChange}
          placeholder="Search"
        />
        <li className="px-6 py-2 hover:bg-orange-500 hover:text-white">
          <button
            className="w-full text-left"
            onClick={() => {
              props.showAll();
              props.setSidebar(!props.sidebar);
              window.scrollTo(0, 0);
            }}
          >
            All
          </button>
        </li>

        <li className="px-6 py-2 hover:bg-orange-500 hover:text-white">
          <button
            className="w-full text-left"
            onClick={() => {
              props.showOnlyComments();
              props.setSidebar(!props.sidebar);
              window.scrollTo(0, 0);
            }}
          >
            Comments
          </button>
        </li>

        <li className="px-6 py-2 hover:bg-orange-500 hover:text-white">
          <button
            className="w-full text-left"
            onClick={() => {
              props.showOnlyNsfw();
              props.setSidebar(!props.sidebar);
              window.scrollTo(0, 0);
            }}
          >
            NSFW
          </button>
        </li>

        <div className="block w-full h-1 bg-gray-400" />

        {inputState
          ? Object.keys(props.sidebarData)
              .filter((key) =>
                key.toLowerCase().includes(inputState.toLowerCase())
              )
              .map((key) => {
                return (
                  <li
                    className="px-6 py-2 hover:bg-orange-500 hover:text-white"
                    key={key}
                  >
                    <button
                      className="w-full text-left"
                      onClick={() => {
                        props.showOnlySub(key);
                        props.setSidebar(!props.sidebar);
                        window.scrollTo(0, 0);
                      }}
                    >
                      r/{`${key} ${props.sidebarData[key]}`}
                    </button>
                  </li>
                );
              })
          : Object.keys(props.sidebarData).map((key) => {
              return (
                <li
                  className="px-6 py-2 hover:bg-orange-500 hover:text-white"
                  key={key}
                >
                  <button
                    className="w-full text-left"
                    onClick={() => {
                      props.showOnlySub(key);
                      props.setSidebar(!props.sidebar);
                      window.scrollTo(0, 0);
                    }}
                  >
                    r/{`${key} (${props.sidebarData[key]})`}
                  </button>
                </li>
              );
            })}
      </ul>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    sidebarData: state.sidebar.subreddits,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    extractSubreddits: () => dispatch(extractSubreddits()),
    showOnlyComments: () => dispatch(showComments()),
    showAll: () => dispatch(showAll()),
    showOnlyNsfw: () => dispatch(showNsfw()),
    showOnlySub: (subreddit) => dispatch(showSubreddit(subreddit)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);

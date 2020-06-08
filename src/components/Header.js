import React from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import { showAll } from "../store/mainView/mainViewActions";
import { fetchMore } from "../store/savedContents/savedContentActions";

const Header = ({ username, showAll, content, sidebar, setSidebar }) => {
  const history = useHistory();
  const [dropdownOpen, setDropdownOpen] = React.useState(false);

  return (
    <nav className="flex sticky top-0 items-center bg-orange-500 justify-between flex-wrap py-6 px-1 lg:px-6">
      <div className="flex items-center flex-shrink-0 text-white mr-6">
        <div className="inline-block mr-2">
          <button
            className="flex items-center px-3 py-2 border-2 rounded text-white border-white"
            onClick={() => setSidebar(!sidebar)}
          >
            <svg
              className="fill-current h-3 w-3"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <title>Menu</title>
              <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
            </svg>
          </button>
        </div>
        <button
          onClick={() => {
            showAll();
            window.scrollTo(0, 0);
          }}
          className="font-semibold text-md lg:text-2xl tracking-tight"
        >
          RedditRem
        </button>
      </div>
      <div className="inline-block relative">
        <button
          className="mr-4 py-2 leading-none mt-0 text-white text-sm font-semibold"
          onClick={() => setDropdownOpen(!dropdownOpen)}
        >
          {`u/${username}`}
        </button>
        <button
          onClick={() => setDropdownOpen(false)}
          className={
            dropdownOpen
              ? `fixed top-0 right-0 bottom-0 left-0 h-full w-full cursor-default`
              : "hidden"
          }
        />
        <div
          className={
            dropdownOpen
              ? `bg-white rounded-lg absolute shadow-2xl right-0 mr-2 w-48`
              : `hidden`
          }
        >
          <a
            className="block w-full text-left p-2 hover:bg-orange-500 hover:text-white overflow-hidden"
            href={`https://reddit.com/user/${username}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            u/{username}
          </a>
          <button
            onClick={() => {
              localStorage.clear();
              history.push("/");
            }}
            className="block w-full text-left p-2 hover:bg-orange-500 hover:text-white"
          >
            Sign Out
          </button>
          <div className="block text-sm text-gray-700 w-full text-left p-2">
            Current: {Object.keys(content).length}
          </div>
        </div>
      </div>
    </nav>
  );
};

const mapStateToProps = (state) => {
  return {
    username: state.user.user,
    content: state.mainView.content,
    after: state.savedContent.content.data.after,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    showAll: () => dispatch(showAll()),
    fetchMore: (username, after) => dispatch(fetchMore(username, after)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);

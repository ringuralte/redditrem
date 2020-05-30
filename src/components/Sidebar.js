import React from "react";
import { connect } from "react-redux";
import { extractSubreddits } from "../store/sidebar/sidebarActions";
const Sidebar = (props) => {
  const node = React.useRef();
  const handleClick = (e) => {
    if (node.current.contains(e.target)) {
      return;
    }
    props.setSidebar(false);
  };

  const [inputState, setInputState] = React.useState("");

  const handleChange = (e) => {
    setInputState(e.target.value);
  };

  React.useEffect(() => {
    document.addEventListener("mousedown", handleClick);

    return () => {
      document.removeEventListener("mousedown", handleClick);
    };
  }, []);

  return (
    <div
      ref={node}
      id="sidebar"
      className={props.sidebar ? "sidenav w-3/4 lg:w-2/5" : "sidenavhide"}
    >
      <ul className="pt-6">
        <input
          className="border border-pink-600 w-11/12 p-2 m-2"
          type="text"
          value={inputState}
          onChange={handleChange}
          placeholder="Search"
        />
        <li className="px-6 py-2 lg:hidden">
          <button
            className="lg:inline-block lg:mt-0 mr-4 lg:text-white lg:text-lg lg:font-medium"
            onClick={() => {
              props.setState({
                all: true,
                comments: false,
                nsfw: false,
                bySub: "",
              });
              props.setSidebar(!props.sidebar);
            }}
          >
            All
          </button>
        </li>

        <li className="px-6 py-2 lg:hidden">
          <button
            className="lg:inline-block lg:mt-0 mr-4 lg:text-white lg:text-lg lg:font-medium"
            onClick={() => {
              props.setState({
                all: false,
                comments: true,
                nsfw: false,
                bySub: "",
              });
              props.setSidebar(!props.sidebar);
            }}
          >
            Comments
          </button>
        </li>

        <li className="px-6 py-2 lg:hidden">
          <button
            className="lg:inline-block lg:mt-0 mr-4 lg:text-white lg:text-lg lg:font-medium"
            onClick={() => {
              props.setState({
                all: false,
                comments: false,
                nsfw: true,
                bySub: "",
              });
              props.setSidebar(!props.sidebar);
            }}
          >
            NSFW
          </button>
        </li>

        <div className="block lg:hidden w-full h-1 bg-gray-400" />

        {inputState
          ? Object.keys(props.sidebarData)
              .filter((key) => key.toLowerCase().includes(inputState.toLowerCase()))
              .map((key) => {
                return (
                  <li className="px-6 py-2" key={key}>
                    <button
                      onClick={() => {
                        props.setState({
                          all: false,
                          comments: false,
                          nsfw: false,
                          bySub: key,
                        });
                        props.setSidebar(!props.sidebar);
                      }}
                    >
                      r/{`${key} ${props.sidebarData[key]}`}
                    </button>
                  </li>
                );
              })
          : Object.keys(props.sidebarData).map((key) => {
              return (
                <li className="px-6 py-2" key={key}>
                  <button
                    onClick={() => {
                      props.setState({
                        all: false,
                        comments: false,
                        nsfw: false,
                        bySub: key,
                      });
                      props.setSidebar(!props.sidebar);
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
    subreddits: state.savedContent.content.data,
    sidebarData: state.sidebar,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    extractSubreddits: (subreddits) => dispatch(extractSubreddits(subreddits)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);

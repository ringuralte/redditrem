import React from "react";
import { connect } from "react-redux";
const Sidebar = (props) => {
  const node = React.useRef();
  const handleClick = (e) => {
    // console.log(e.target)
    if (node.current.contains(e.target)) {
      return;
    }
    props.setSidebar(false);
  };

  React.useEffect(() => {
    document.addEventListener("mousedown", handleClick);

    return () => {
      document.removeEventListener("mousedown", handleClick);
    };
  }, []);
  const reduceCounter = Object.keys(props.subreddits.children)
    .map((key) => {
      return props.subreddits.children[key].data.subreddit;
    })
    .reduce((allSubreddits, subreddit) => {
      if (subreddit in allSubreddits) {
        allSubreddits[subreddit]++;
      } else {
        allSubreddits[subreddit] = 1;
      }
      return allSubreddits;
    }, {});

  return (
    <div ref={node} id="sidebar" className={props.sidebar ? "sidenav w-3/4 lg:w-2/5" : "sidenavhide"}>
      <ul className="pt-6">
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

        {Object.keys(reduceCounter)
          .sort(Intl.Collator().compare)
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
                  r/{`${key} (${reduceCounter[key]})`}
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
  };
};

export default connect(mapStateToProps)(Sidebar);

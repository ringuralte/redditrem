import React from "react";
import qs from "qs";
import { connect } from "react-redux";
import axios from "axios";
import arrowTop from "../assets/icon-arrow-up.svg";

const MainView = (props) => {
  const [inputState, setInputState] = React.useState("");
  const [scrollButton, setScrollButton] = React.useState(false);
  const handleChange = (e) => {
    setInputState(e.target.value);
  };

  const scrollToTop = () => {
    window.scrollTo(0, 0);
  };

  const handleScroll = (e) => {
    const y = window.pageYOffset || document.documentElement.scrollTop;

    if (y > 80) {
      setScrollButton(true);
    } else {
      setScrollButton(false);
    }
  };

  React.useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  });

  return props.loading ? (
    <div></div>
  ) : (
    <div>
      <input
        className="border border-orange-600 w-full p-2"
        type="text"
        value={inputState}
        onChange={handleChange}
        placeholder="Search"
      />
      <ul>
        {inputState
          ? Object.keys(props.content)
              .filter((key) => {
                if (props.content[key].data.body) {
                  return (
                    props.content[key].data.link_title
                      .toLowerCase()
                      .includes(inputState.toLowerCase()) ||
                    props.content[key].data.body
                      .toLowerCase()
                      .includes(inputState.toLowerCase())
                  );
                } else {
                  return props.content[key].data.title
                    .toLowerCase()
                    .includes(inputState.toLowerCase());
                }
              })
              .map((key) => {
                return (
                  <li key={key} className="py-2">
                    <div className="flex justify-between">
                      <div>
                        <a
                          target="_blank"
                          rel="noopener noreferrer"
                          href={`https://www.reddit.com/${props.content[key].data.permalink}`}
                          className="text-indigo-900 hover:text-orange-500 font-semibold"
                        >
                          {props.content[key].data.body
                            ? props.content[key].data.link_title
                            : props.content[key].data.title}
                        </a>
                      </div>
                      <div>
                        <img
                          className="image-width"
                          src={props.content[key].data.thumbnail}
                          alt=""
                        />
                      </div>
                    </div>
                    {props.content[key].data.body ? (
                      <div className="block text-gray-900 text-sm mt-4 pb-4 overflow-x-auto">
                        {props.content[key].data.body}
                      </div>
                    ) : (
                      <div></div>
                    )}
                    <div className="text-sm py-2">
                      <span className="mr-2">
                        by{" "}
                        <a
                          target="_blank"
                          rel="noopener noreferrer"
                          href={`https://www.reddit.com/user/${props.content[key].data.author}`}
                          className="text-indigo-900 hover:text-orange-500"
                        >
                          u/{props.content[key].data.author}
                        </a>
                      </span>
                      <span className="mr-2">
                        on{" "}
                        <a
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-indigo-900 hover:text-orange-500"
                          href={`https://www.reddit.com/${props.content[key].data.subreddit_name_prefixed}`}
                        >
                          {props.content[key].data.subreddit_name_prefixed}
                        </a>
                      </span>
                      <span className="mr-2 text-indigo-900 hover:text-orange-500">
                        <button
                          className="font-semibold"
                          onClick={() => {
                            axios.post(
                              `https://oauth.reddit.com/api/unsave`,
                              qs.stringify({
                                api_type: "json",
                                id: props.content[key].data.name,
                              }),
                              {
                                headers: {
                                  Authorization: `bearer ${localStorage.getItem(
                                    "token"
                                  )}`,
                                },
                              }
                            );
                          }}
                        >
                          ( unsave )
                        </button>
                      </span>
                      <span className="text-red-900 font-semibold">
                        {props.content[key].data.over_18 ? "nsfw" : ""}
                      </span>
                    </div>
                    <div className="block w-full h-px bg-gray-400" />
                  </li>
                );
              })
          : Object.keys(props.content).map((key) => {
              return (
                <li key={key} className="py-2">
                  <div className="flex justify-between">
                    <div>
                      <a
                        target="_blank"
                        rel="noopener noreferrer"
                        href={`https://www.reddit.com/${props.content[key].data.permalink}`}
                        className="text-indigo-900 hover:text-orange-500 font-semibold"
                      >
                        {props.content[key].data.body
                          ? props.content[key].data.link_title
                          : props.content[key].data.title}
                      </a>
                    </div>
                    <div>
                      <img
                        className="image-width"
                        src={props.content[key].data.thumbnail}
                        alt=""
                      />
                    </div>
                  </div>
                  {props.content[key].data.body ? (
                    <div className="block text-gray-900 text-sm mt-4 pb-4 overflow-x-auto">
                      {props.content[key].data.body}
                    </div>
                  ) : (
                    <div></div>
                  )}
                  <div className="text-sm py-2">
                    <span className="mr-2">
                      by{" "}
                      <a
                        target="_blank"
                        rel="noopener noreferrer"
                        href={`https://www.reddit.com/user/${props.content[key].data.author}`}
                        className="text-indigo-900 hover:text-orange-500"
                      >
                        u/{props.content[key].data.author}
                      </a>
                    </span>
                    <span className="mr-2">
                      on{" "}
                      <a
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-indigo-900 hover:text-orange-500"
                        href={`https://www.reddit.com/${props.content[key].data.subreddit_name_prefixed}`}
                      >
                        {props.content[key].data.subreddit_name_prefixed}
                      </a>
                    </span>
                    <span className="mr-2 text-indigo-900 hover:text-orange-500">
                      <button
                        className="font-semibold"
                        onClick={() => {
                          axios.post(
                            `https://oauth.reddit.com/api/unsave`,
                            qs.stringify({
                              api_type: "json",
                              id: props.content[key].data.name,
                            }),
                            {
                              headers: {
                                Authorization: `bearer ${localStorage.getItem(
                                  "token"
                                )}`,
                              },
                            }
                          );
                        }}
                      >
                        ( unsave )
                      </button>
                    </span>
                    <span className="text-red-900 font-bold">
                      {props.content[key].data.over_18 ? "nsfw" : ""}
                    </span>
                  </div>
                  <div className="block w-full h-px bg-gray-400" />
                </li>
              );
            })}
      </ul>
      <div className="fixed bottom-0 right-0">
        <button
          className={
            scrollButton ? "block text-orange-600 font-semibold p-1" : "hidden"
          }
          onClick={scrollToTop}
        >
          Top{" "}
          <img
            className="inline-block font-semibold"
            src={arrowTop}
            alt="Go Top"
          />
        </button>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    loading: state.mainView.loading,
    content: state.mainView.content,
  };
};

export default connect(mapStateToProps)(MainView);

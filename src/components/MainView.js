import React from "react";
import { connect } from "react-redux";

const MainView = (props) => {
  if (props.state.all === true) {
    return Object.keys(props.content.children).map((key) => {
      if (props.content.children[key].kind === "t3") {
        return (
          <li key={key} className="py-2">
            <div className="flex justify-between">
              <div>
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href={`https://www.reddit.com/${props.content.children[key].data.permalink}`}
                  className="text-indigo-900 font-semibold"
                >
                  {props.content.children[key].data.title}
                </a>
              </div>
              <div>
                <img
                  className="image-width"
                  src={props.content.children[key].data.thumbnail}
                  alt=""
                />
              </div>
            </div>
            <div className="text-sm py-2">
              <span className="mr-2">
                by{" "}
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href={`https://www.reddit.com/user/${props.content.children[key].data.author}`}
                  className="text-indigo-900"
                >
                  u/{props.content.children[key].data.author}
                </a>
              </span>
              <span className="mr-2">
                on{" "}
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-indigo-900"
                  href={`https://www.reddit.com/${props.content.children[key].data.subreddit_name_prefixed}`}
                >
                  {props.content.children[key].data.subreddit_name_prefixed}
                </a>
              </span>
              <span className="text-red-900 font-semibold">
                {props.content.children[key].data.over_18 ? "nsfw" : ""}
              </span>
            </div>
            <div className="block w-full h-px bg-gray-400" />
          </li>
        );
      }

      if (props.content.children[key].kind === "t1") {
        return (
          <li key={key} className="py-2">
            <div>
              <a
                target="_blank"
                href={`https://www.reddit.com/${props.content.children[key].data.permalink}`}
                rel="noopener noreferrer"
                className="text-indigo-900 font-semibold"
              >
                {props.content.children[key].data.link_title}
              </a>
            </div>
            <div className="block text-gray-900 text-sm mt-4 pb-4 overflow-x-auto">
              {props.content.children[key].data.body}
            </div>
            <div className="text-sm py-2">
              <span className="mr-2">
                by{" "}
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href={`https://www.reddit.com/user/${props.content.children[key].data.author}`}
                  className="text-indigo-900"
                >
                  u/{props.content.children[key].data.author}
                </a>
              </span>
              <span className="mr-2">
                on{" "}
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-indigo-900"
                  href={`https://www.reddit.com/${props.content.children[key].data.subreddit_name_prefixed}`}
                >
                  {props.content.children[key].data.subreddit_name_prefixed}
                </a>
              </span>
              <span className="text-red-900 font-semibold">
                {props.content.children[key].data.over_18 ? "nsfw" : ""}
              </span>
            </div>
            <div className="block w-full h-px bg-gray-400" />
          </li>
        );
      }
      return null;
    });
  }

  if (props.state.comments === true) {
    return Object.keys(props.content.children)
      .filter((key) => props.content.children[key].kind === "t1")
      .map((key) => {
        return (
          <li key={key} className="py-2">
            <div>
              <a
                target="_blank"
                href={`https://www.reddit.com/${props.content.children[key].data.permalink}`}
                rel="noopener noreferrer"
                className="text-indigo-900 font-semibold"
              >
                {props.content.children[key].data.link_title}
              </a>
            </div>
            <div className="block text-gray-900 text-sm mt-4 pb-4 overflow-x-auto">
              {props.content.children[key].data.body}
            </div>
            <div className="text-sm py-2">
              <span className="mr-2">
                by{" "}
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href={`https://www.reddit.com/user/${props.content.children[key].data.author}`}
                  className="text-indigo-900"
                >
                  u/{props.content.children[key].data.author}
                </a>
              </span>
              <span>
                on{" "}
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-indigo-900"
                  href={`https://www.reddit.com/${props.content.children[key].data.subreddit_name_prefixed}`}
                >
                  {props.content.children[key].data.subreddit_name_prefixed}
                </a>
              </span>
            </div>
            <div className="block w-full h-px bg-gray-400" />
          </li>
        );
      });
  }

  if (props.state.nsfw === true) {
    return Object.keys(props.content.children)
      .filter((key) => props.content.children[key].data.over_18 === true)
      .map((key) => {
        if (props.content.children[key].kind === "t3") {
          return (
            <li key={key} className="py-2">
              <div className="flex justify-between">
                <div>
                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    href={`https://www.reddit.com/${props.content.children[key].data.permalink}`}
                    className="text-indigo-900 font-semibold"
                  >
                    {props.content.children[key].data.title}
                  </a>
                </div>
                <div>
                  <img
                    className="image-width"
                    src={props.content.children[key].data.thumbnail}
                    alt=""
                  />
                </div>
              </div>
              <div className="text-sm py-2">
                <span className="mr-2">
                  by{" "}
                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    href={`https://www.reddit.com/user/${props.content.children[key].data.author}`}
                    className="text-indigo-900"
                  >
                    u/{props.content.children[key].data.author}
                  </a>
                </span>
                <span>
                  on{" "}
                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-indigo-900"
                    href={`https://www.reddit.com/${props.content.children[key].data.subreddit_name_prefixed}`}
                  >
                    {props.content.children[key].data.subreddit_name_prefixed}
                  </a>
                </span>
              </div>
              <div className="block w-full h-px bg-gray-400" />
            </li>
          );
        }

        if (props.content.children[key].kind === "t1") {
          return (
            <li key={key} className="py-2">
              <div>
                <a
                  target="_blank"
                  href={`https://www.reddit.com/${props.content.children[key].data.permalink}`}
                  rel="noopener noreferrer"
                  className="text-indigo-900 font-semibold"
                >
                  {props.content.children[key].data.link_title}
                </a>
              </div>
              <div className="block text-gray-900 text-sm mt-4 pb-4 overflow-x-auto">
                {props.content.children[key].data.body}
              </div>
              <div className="text-sm py-2">
                <span className="mr-2">
                  by{" "}
                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    href={`https://www.reddit.com/user/${props.content.children[key].data.author}`}
                    className="text-indigo-900"
                  >
                    u/{props.content.children[key].data.author}
                  </a>
                </span>
                <span>
                  on{" "}
                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-indigo-900"
                    href={`https://www.reddit.com/${props.content.children[key].data.subreddit_name_prefixed}`}
                  >
                    {props.content.children[key].data.subreddit_name_prefixed}
                  </a>
                </span>
              </div>
              <div className="block w-full h-px bg-gray-400" />
            </li>
          );
        }
        return null;
      });
  }

  if (props.state.bySub) {
    return Object.keys(props.content.children)
      .filter(
        (key) =>
          props.content.children[key].data.subreddit === props.state.bySub
      )
      .map((key) => {
        if (props.content.children[key].kind === "t3") {
          return (
            <li key={key} className="py-2">
              <div className="flex justify-between">
                <div>
                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    href={`https://www.reddit.com/${props.content.children[key].data.permalink}`}
                    className="text-indigo-900 font-semibold"
                  >
                    {props.content.children[key].data.title}
                  </a>
                </div>
                <div>
                  <img
                    className="image-width"
                    src={props.content.children[key].data.thumbnail}
                    alt=""
                  />
                </div>
              </div>
              <div className="text-sm py-2">
                <span className="mr-2">
                  by{" "}
                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    href={`https://www.reddit.com/user/${props.content.children[key].data.author}`}
                    className="text-indigo-900"
                  >
                    u/{props.content.children[key].data.author}
                  </a>
                </span>
                <span>
                  on{" "}
                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-indigo-900"
                    href={`https://www.reddit.com/${props.content.children[key].data.subreddit_name_prefixed}`}
                  >
                    {props.content.children[key].data.subreddit_name_prefixed}
                  </a>
                </span>
              </div>
              <div className="block w-full h-px bg-gray-400" />
            </li>
          );
        }

        if (props.content.children[key].kind === "t1") {
          return (
            <li key={key} className="py-2">
              <div>
                <a
                  target="_blank"
                  href={`https://www.reddit.com/${props.content.children[key].data.permalink}`}
                  rel="noopener noreferrer"
                  className="text-indigo-900 font-semibold"
                >
                  {props.content.children[key].data.link_title}
                </a>
              </div>
              <div className="block text-gray-900 text-sm mt-4 pb-4 overflow-x-auto">
                {props.content.children[key].data.body}
              </div>
              <div className="text-sm py-2">
                <span className="mr-2">
                  by{" "}
                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    href={`https://www.reddit.com/user/${props.content.children[key].data.author}`}
                    className="text-indigo-900"
                  >
                    u/{props.content.children[key].data.author}
                  </a>
                </span>
                <span>
                  on{" "}
                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-indigo-900"
                    href={`https://www.reddit.com/${props.content.children[key].data.subreddit_name_prefixed}`}
                  >
                    {props.content.children[key].data.subreddit_name_prefixed}
                  </a>
                </span>
              </div>
              <div className="block w-full h-px bg-gray-400" />
            </li>
          );
        }
        return null;
      });
  }
};
const mapStateToProps = (state) => {
  return {
    content: state.savedContent.content.data,
  };
};

export default connect(mapStateToProps)(MainView);

import React from "react";
import Button from "./Button";
const Header = (props) => {
  return (
    <nav className="flex sticky top-0 items-center bg-orange-500 justify-between flex-wrap py-6 px-1 lg:px-6">
      <div className="flex items-center flex-shrink-0 text-white mr-6">
        <div className="inline-block mr-2">
          <Button sidebar={props.sidebar} setSidebar={props.setSidebar} />
        </div>
        <button
          onClick={() =>
            props.setState({
              all: true,
              comments: false,
              nsfw: false,
              bySub: "",
            })
          }
          className="font-semibold text-md lg:text-2xl tracking-tight"
        >
          RedditRem
        </button>
      </div>
      <div className="inline-block lg:hidden">
        <span className="px-4 py-2 leading-none mt-0 text-white text-sm font-semibold">
          {/* <a
            target="_blank"
            rel="noopener noreferrer"
            href={`https://www.reddit.com/user/${props.username}`}
          > */}
          {`u/${props.username}`}
          {/* </a> */}
        </span>
      </div>
      <div className="hidden lg:block lg:flex lg:flex-grow lg:items-center lg:w-auto">
        <div className="flex-grow">
          <span className="inline-block mt-0 mr-4 text-white text-lg font-medium">
            Filters :
          </span>
          <button
            className="inline-block mt-0 mr-4 text-white text-lg font-medium"
            onClick={() =>
              props.setState({
                all: true,
                comments: false,
                nsfw: false,
                bySub: "",
              })
            }
          >
            All
          </button>
          <button
            className="inline-block mt-0 mr-4 text-white text-lg font-medium"
            onClick={() =>
              props.setState({
                all: false,
                comments: true,
                nsfw: false,
                bySub: "",
              })
            }
          >
            Comments
          </button>
          <button
            className="inline-block mt-0 mr-4 text-white text-lg font-medium"
            onClick={() =>
              props.setState({
                all: false,
                comments: false,
                nsfw: true,
                bySub: "",
              })
            }
          >
            NSFW
          </button>
        </div>
        <div>
          <span className="inline-block px-4 py-2 leading-none mt-0 text-white font-semibold">
            {/* <a
              target="_blank"
              rel="noopener noreferrer"
              href={`https://www.reddit.com/user/${props.username}`}
            > */}
            {`u/${props.username}`}
            {/* </a> */}
          </span>
        </div>
      </div>
    </nav>
  );
};

export default Header;

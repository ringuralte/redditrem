import React from "react";

const Loading = (props) => {
  return (
    <div className="flex flex-col font-bold items-center justify-center mt-48">
      <h2 className="text-xl text-gray-800">{props.text}</h2>
      <div className="spinner">
        <div className="rect1"></div>
        <div className="rect2"></div>
        <div className="rect3"></div>
        <div className="rect4"></div>
        <div className="rect5"></div>
      </div>
    </div>
  );
};

export default Loading;

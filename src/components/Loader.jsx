import React from "react";
import { Bars } from "react-loader-spinner";

const Loader = () => {
  return (
    <div className="loader-container">
      <Bars
        height="80"
        width="80"
        color="#4fa94d"
        ariaLabel="bars-loading"
        visible={true}
      />
    </div>
  );
};

export default Loader;

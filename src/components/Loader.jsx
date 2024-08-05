import React, { useEffect, useRef } from "react";
import { Bars } from "react-loader-spinner";

const Loader = () => {
  const loaderRef = useRef(null);

  useEffect(() => {
    if (loaderRef.current) {
      loaderRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  return (
    <div className="loader-container" ref={loaderRef}>
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

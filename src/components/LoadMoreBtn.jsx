import React from "react";
import PropTypes from "prop-types";

const LoadMoreBtn = ({ onClick }) => {
  return (
    <button onClick={onClick} className="load-more-btn">
      Load More
    </button>
  );
};

LoadMoreBtn.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default LoadMoreBtn;

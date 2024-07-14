import * as React from "react";
import { useState } from "react";
import PropTypes from "prop-types";

const containerStyle = {
  display: "flex",
  alignItems: "center",
  gap: "16px",
  justifyContent: "center",
};

const starContainerStyle = {
  display: "flex",
  direction: "ltr",
};

StarRating.propTypes = {
  maxRating: PropTypes.number,
  defaultRating: PropTypes.number,
  color: PropTypes.string,
  size: PropTypes.number,
  className: PropTypes.string,
  onSetRating: PropTypes.func,
};

export default function StarRating({
  maxRating = 5,
  color = "#fcc419",
  size = 48,
  className = "",
  messages = [],
  defaultRating = 3,
  onSetRating,
  rating,
}) {
  const [tempRating, setTempRating] = useState(0);
  function handleRating(rating) {
    onSetRating(rating);
  }

  const textStyle = {
    margin: "0",
    color,
    fontSize: `${size / 1.5}px`,
    lineHeight: "30px",
  };

  return (
    <div style={containerStyle} className={className}>
      <p style={textStyle}>
        {messages.length === maxRating
          ? messages[tempRating ? tempRating - 1 : rating - 1]
          : tempRating || rating || ""}
      </p>
      <div style={starContainerStyle}>
        {Array.from({ length: maxRating }, (_, i) => (
          <Star
            key={i}
            full={tempRating ? tempRating >= i + 1 : rating >= i + 1}
            onRate={() => handleRating(i + 1)}
            onHoverIn={() => setTempRating(i + 1)}
            onHoverOut={() => setTempRating(0)}
            color={color}
            size={size}
          />
        ))}
      </div>
    </div>
  );
}

function Star({ onRate, full, onHoverIn, onHoverOut, color, size }) {
  const starStyle = {
    width: `${size}px`,
    height: `${size}px`,
    display: "flex",
    cursor: "pointer",
    alignItems: "center",
    justifyContent: "center",
  };

  return (
    <span
      role="button"
      style={starStyle}
      onClick={onRate}
      onMouseEnter={onHoverIn}
      onMouseLeave={onHoverOut}
    >
      {full ? (
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill={color}
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M7.36064 1.72601C8.03121 0.313336 9.96871 0.313333 10.6393 1.72601L11.7982 4.16749C12.0645 4.72846 12.5792 5.11728 13.1746 5.20724L15.7661 5.59875C17.2655 5.82528 17.8642 7.74112 16.7792 8.84074L14.9041 10.7412C14.4732 11.1778 14.2766 11.807 14.3783 12.4235L14.821 15.107C15.0771 16.6596 13.5096 17.8437 12.1685 17.1106L9.85065 15.8437C9.31808 15.5526 8.68184 15.5526 8.14927 15.8437L5.83143 17.1106C4.49029 17.8437 2.92281 16.6596 3.17895 15.107L3.62162 12.4235C3.72333 11.807 3.52672 11.1778 3.09586 10.7412L1.22069 8.84074C0.135681 7.74113 0.734399 5.82528 2.23384 5.59875L4.82527 5.20724C5.4207 5.11728 5.93543 4.72846 6.20172 4.16749L7.36064 1.72601Z"
            stroke={color}
            stroke-opacity="0.8"
            strokeLinejoin="round"
          />
        </svg>
      ) : (
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M7.36064 1.72601C8.03121 0.313336 9.96871 0.313333 10.6393 1.72601L11.7982 4.16749C12.0645 4.72846 12.5792 5.11728 13.1746 5.20724L15.7661 5.59875C17.2655 5.82528 17.8642 7.74112 16.7792 8.84074L14.9041 10.7412C14.4732 11.1778 14.2766 11.807 14.3783 12.4235L14.821 15.107C15.0771 16.6596 13.5096 17.8437 12.1685 17.1106L9.85065 15.8437C9.31808 15.5526 8.68184 15.5526 8.14927 15.8437L5.83143 17.1106C4.49029 17.8437 2.92281 16.6596 3.17895 15.107L3.62162 12.4235C3.72333 11.807 3.52672 11.1778 3.09586 10.7412L1.22069 8.84074C0.135681 7.74113 0.734399 5.82528 2.23384 5.59875L4.82527 5.20724C5.4207 5.11728 5.93543 4.72846 6.20172 4.16749L7.36064 1.72601Z"
            stroke="#101316"
            stroke-opacity="0.8"
            strokeLinejoin="round"
          />
        </svg>
      )}
    </span>
  );
}

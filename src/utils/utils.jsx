import { Link } from "react-router-dom";
import React from "react";
export function processText(text) {
  return text.split(" ").map((word, index) => {
    if (word.startsWith("#")) {
      return (
        <Link to="/home/trends" key={index} className="text-blue-500 font-bold">
          {word}
        </Link>
      );
    }
    return (
      <span key={index}>
        {" "}{word}{" "}
      </span>
    );
  });
}

export function processText2(text) {
  return text.split(" ").map((word, index) => {
    if (word.startsWith("#")) {
      return (
        <Link
          to="/sughome/sugtrends"
          key={index}
          className="text-blue-500 font-bold"
        >
          {word}
        </Link>
      );
    }
    return (
      <span key={index}>
        {" "}{word}{" "}
      </span>
    );
  });
}

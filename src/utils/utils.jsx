import { Link } from "react-router-dom";
import React from "react";

// export function processText(text) {
//  const truncatedText = text.length > 100 ? text.slice(0, 100) + "..." : text;
//  return truncatedText
// }


export const processText = (inputText) => {
  const hashtagRegex = /#\w+/g;

  // Split the text and insert hashtags as clickable links
  return inputText.split(hashtagRegex).reduce((acc, part, index) => {
    const match = inputText.match(hashtagRegex)?.[index]; // Get the matched hashtag
    if (match) {
      acc.push(
        <Link
          key={`hashtag-${index}`}
          to="/home/trends"
          className="text-blue-500 hover:underline"
        >
          {match}
        </Link>
      );
    }
    acc.push(part);
    return acc;
  }, []);
};
export const processTextSug = (inputText) => {
  const hashtagRegex = /#\w+/g;

  // Split the text and insert hashtags as clickable links
  return inputText.split(hashtagRegex).reduce((acc, part, index) => {
    const match = inputText.match(hashtagRegex)?.[index]; // Get the matched hashtag
    if (match) {
      acc.push(
        <Link
          key={`hashtag-${index}`}
          to="/sughome/sugtrends"
          className="text-blue-500 hover:underline"
        >
          {match}
        </Link>
      );
    }
    acc.push(part);
    return acc;
  }, []);
};



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

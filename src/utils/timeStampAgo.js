

export const timeStampAgo = (createdAt) => {
  const now = new Date();
  const createdDate = new Date(createdAt);
  const differenceInSeconds = Math.floor((now - createdDate) / 1000);

  if (differenceInSeconds < 60) {
    return `${differenceInSeconds} sec${differenceInSeconds !== 1 ? "s" : ""}`;
  } else if (differenceInSeconds < 3600) {
    const minutes = Math.floor(differenceInSeconds / 60);
    return `${minutes} min${minutes !== 1 ? "s" : ""}`;
  } else if (differenceInSeconds < 86400) {
    const hours = Math.floor(differenceInSeconds / 3600);
    return `${hours} hr${hours !== 1 ? "s" : ""}`;
  } else if (differenceInSeconds < 604800) {
    // less than a week
    const days = Math.floor(differenceInSeconds / 86400);
    return `${days} day${days !== 1 ? "s" : ""}`;
  } else if (differenceInSeconds < 2419200) {
    // less than a month
    const weeks = Math.floor(differenceInSeconds / 604800);
    return `${weeks} wk${weeks !== 1 ? "s" : ""}`;
  } else if (differenceInSeconds < 29030400) {
    // less than a year
    const months = Math.floor(differenceInSeconds / 2419200);
    return `${months} mo${months !== 1 ? "s" : ""}`;
  } else {
    const years = Math.floor(differenceInSeconds / 29030400);
    return `${years} yr${years !== 1 ? "s" : ""}`;
  }
};

export const timeAgo = (createdAt) => {
  const now = new Date();
  const createdDate = new Date(createdAt);
  const differenceInSeconds = Math.floor((now - createdDate) / 1000);

  const isYesterday =
    differenceInSeconds >= 86400 && differenceInSeconds < 172800;
  if (isYesterday) {
    return "Yesterday";
  }

  if (differenceInSeconds < 60) {
    return `${differenceInSeconds} second${
      differenceInSeconds !== 1 ? "s" : ""
    } ago`;
  } else if (differenceInSeconds < 3600) {
    const minutes = Math.floor(differenceInSeconds / 60);
    return `${minutes} minute${minutes !== 1 ? "s" : ""} ago`;
  } else if (differenceInSeconds < 86400) {
    const hours = Math.floor(differenceInSeconds / 3600);
    return `${hours} hour${hours !== 1 ? "s" : ""} ago`;
  } else if (differenceInSeconds < 604800) {
    // less than a week
    const days = Math.floor(differenceInSeconds / 86400);
    return `${days} day${days !== 1 ? "s" : ""} ago`;
  } else if (differenceInSeconds < 2419200) {
    // less than a month
    const weeks = Math.floor(differenceInSeconds / 604800);
    return `${weeks} week${weeks !== 1 ? "s" : ""} ago`;
  } else if (differenceInSeconds < 29030400) {
    // less than a year
    const months = Math.floor(differenceInSeconds / 2419200);
    return `${months} month${months !== 1 ? "s" : ""} ago`;
  } else {
    const years = Math.floor(differenceInSeconds / 29030400);
    return `${years} year${years !== 1 ? "s" : ""} ago`;
  }
};








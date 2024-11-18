import React, { useState, useEffect } from "react";

export default function PostLoader({ isLoading, isSuccessful }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let interval;
    if (isLoading) {
      // Simulate loading progress
      interval = setInterval(() => {
        setProgress((prev) => (prev < 90 ? prev + 10 : prev)); // Increment until 90%
      }, 300);
    }

    if (isSuccessful) {
      setProgress(100); // Instantly fill the loader on success
    }

    return () => clearInterval(interval);
  }, [isLoading, isSuccessful]);

  return (
    <div className="loader-container">
      <div className="loader-progress" style={{ width: `${progress}%` }}></div>
    </div>
  );
}

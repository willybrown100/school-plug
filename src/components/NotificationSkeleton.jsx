import React from "react";
export function NotificationSkeleton() {
  return (
    <li className="flex gap-3 py-3 animate-pulse">
      <div className="bg-gray-300 rounded-full h-10 w-10"></div>
      <div className="flex flex-col gap-2 flex-1">
        <div className="bg-gray-300 h-4 rounded w-3/4"></div>
        <div className="bg-gray-300 h-3 rounded w-1/2"></div>
      </div>
    </li>
  );
}

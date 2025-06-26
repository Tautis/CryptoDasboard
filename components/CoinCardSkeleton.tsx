import React from "react";

type Props = {
  count?: number;
  size?: "sm" | "md";
};

export default function CoinCardSkeleton({ count = 1, size = "md" }: Props) {
  const cardClass = size === "sm" ? "p-4 gap-2 w-48" : "p-6 gap-3 w-full";
  const imgClass = size === "sm" ? "w-12 h-12" : "w-14 h-14";
  return (
    <>
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className={`flex flex-col items-center bg-white dark:bg-gray-900 rounded-lg shadow ${cardClass} border border-gray-200 dark:border-gray-700 animate-pulse`}
        >
          <div
            className={`${imgClass} bg-gray-200 dark:bg-gray-700 rounded-full mb-2`}
          />
          <div className="h-6 w-28 bg-gray-200 dark:bg-gray-700 rounded mb-1" />
          <div className="h-4 w-16 bg-gray-200 dark:bg-gray-700 rounded mb-1" />
          <div className="h-4 w-32 bg-gray-200 dark:bg-gray-700 rounded mb-1" />
          <div className="h-4 w-24 bg-gray-200 dark:bg-gray-700 rounded mb-1" />
        </div>
      ))}
    </>
  );
}

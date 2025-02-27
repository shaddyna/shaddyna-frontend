import React from "react";

export const highlightMatch = (text: string, query: string) => {
  if (!query) return text;

  const regex = new RegExp(`(${query.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&")})`, "gi");

  const parts = text.split(regex);

  return parts.map((part, i) =>
    part.toLowerCase() === query.toLowerCase() ? (
      <span key={i} className="bg-yellow-300 text-black px-1 rounded">{part}</span>
    ) : (
      part
    )
  );
};


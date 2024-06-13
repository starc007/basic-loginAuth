import React from "react";

const BarLoader = ({ bar = 10 }: { bar?: number }) => {
  return (
    <div className="space-y-4">
      {[...Array(bar)].map((_, i) => (
        <div
          key={i}
          className="bg-gray-200 animate-pulse h-10 w-full rounded-tl-none"
        />
      ))}
    </div>
  );
};

export default BarLoader;

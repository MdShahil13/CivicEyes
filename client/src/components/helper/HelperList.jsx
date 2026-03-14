import React from "react";
import HelperCard from "./HelperCard";

const HelperList = ({ helpers }) => {
  if (!helpers || helpers.length === 0) {
    return (
      <div className="bg-white rounded-3xl p-6 text-center shadow-sm">
        <p className="text-lg font-semibold text-slate-800">
          No helpers found nearby
        </p>
        <p className="text-sm text-slate-600 mt-2">
          Try again or search in a larger area
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
      {helpers.map((helper) => (
        <HelperCard key={helper.id} helper={helper} />
      ))}
    </div>
  );
};

export default HelperList;
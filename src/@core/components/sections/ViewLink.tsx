"use client";

import React from "react";

/**
 * CreateLink renders a form section for creating or editing a link.
 */

const ViewLink: React.FC<any> = ({ item }) => {
  return (
    <div
      className={`flex flex-col bg-background-white w-full p-5 rounded-lg mb-4  `}
    >
      <label>Platform</label>
      <div className="bg-light-gray py-2 px-4 w-full rounded text-black mb-6">
        {item?.platform}
      </div>
      <label>Link</label>
      <div className="bg-light-gray py-2 px-4 w-full my-2 rounded text-black">
        {item?.link}
      </div>
    </div>
  );
};

export default ViewLink;

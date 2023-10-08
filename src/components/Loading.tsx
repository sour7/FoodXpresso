import React from "react";
import Image from "next/image";

const Loading = () => {
  return (
    <div
      className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-[rgba(0,0,0,0.8)]"
      style={{ zIndex: 9999 }}
    >
      <div className="w-full text-center flex justify-center">
        <Image src="/loading.gif" width={100} height={100} alt="loading" />
      </div>
    </div>
  );
};

export default Loading;

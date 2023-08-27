import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <div className="h-12 md:h-24 p-4 lg:px-20 xl:px-40 text-red-500 flex items-center justify-between bg-pink-100">
      <Link href="/" className="font-bold text-xl">
        FOOD-XPRESOO
      </Link>
      <p>© ALL RIGHTS RESERVED. 2023</p>
    </div>
  );
};

export default Footer;

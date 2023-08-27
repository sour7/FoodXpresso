import { pizzas } from "@/data";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Category = () => {
  return (
    <div className="flex flex-wrap text-red-500 gap-4 justify-center">
      {pizzas.map((item) => (
        <Link className="w-5/6 h-[60vh] sm:w-1/2 lg:w-[30%] p-4 flex flex-col justify-between group odd:bg-fuchsia-50 shadow-lg shadow-red-500/50 rounded-lg" href={`/product/${item.id}`} key={item.id}>
          {/* IMAGE CONTAINER */}
          {item.img && (
            <div className="relative h-[80%]">
              <Image src={item.img} alt="" fill className="object-contain"/>
            </div>
          )}
          {/* TEXT CONTAINER */}
          <div className="flex items-center justify-between font-bold">
            <h1 className="text-2xl uppercase p-2">{item.title}</h1>
            <h2 className="group-hover:hidden text-xl">${item.price}</h2>
            <button className="hidden group-hover:block uppercase bg-red-500 text-white p-2 rounded-md hover:scale-110 transform transition-transform duration-300">Add to Cart</button>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default Category;
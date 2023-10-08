"use client";

import Loading from "@/components/Loading";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { ChangeEvent, useState } from "react";
import { toast } from "react-toastify";

type Inputs = {
  title: string;
  desc: string;
  price: number;
};

type Option = {
  title: string;
  additionalPrice: number;
};

const AddPage = () => {
  const { data: session, status } = useSession();
  const [inputs, setInputs] = useState<Inputs>({
    title: "",
    desc: "",
    price: 0,
  });
  const [isFeatured, setIsFeatured] = useState(false);
  const [catSlug, setCatSlug] = useState("");

  const [option, setOption] = useState<Option>({
    title: "",
    additionalPrice: 0,
  });

  const [options, setOptions] = useState<Option[]>([]);
  const [file, setFile] = useState<File>();
  const [previewUrl, setPreviewUrl] = useState<string | null>(null); // State for image preview
  // State to track the selected category
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);

  if (status === "loading") {
    return <Loading />;
  }

  if (status === "unauthenticated" || !session?.user.isAdmin) {
    router.push("/");
  }

  // Function to handle checkbox change
  const handleCheckboxChange = () => {
    setIsFeatured(!isFeatured); // Toggle the checkbox's value
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setInputs((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };
  const changeOption = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOption((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const handleChangeImg = (e: ChangeEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;
    const item = (target.files as FileList)[0];
    setFile(item);
    // Create a preview URL for the selected image
    const imageUrl = URL.createObjectURL(item);
    setPreviewUrl(imageUrl);
  };

  const upload = async () => {
    if (!file) return null;
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "food-expresso");

    const res = await fetch(
      "https://api.cloudinary.com/v1_1/dsby9dncp/image/upload",
      {
        method: "POST",
        headers: {},
        body: data,
      },
    );
    const resData = await res.json();
    console.log("Response from Cloudinary:", resData);
    return resData.url;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      const url = await upload();
      console.log({ url, ...inputs, isFeatured, catSlug, options });
      const res = await fetch("http://localhost:3000/api/products", {
        method: "POST",
        body: JSON.stringify({
          img: url,
          ...inputs,
          isFeatured,
          catSlug,
          options,
        }),
      });

      const data = await res.json();
      setLoading(false);
      toast.success("New product added");
      router.push(`/product/${data.id}`);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="p-4 lg:px-20 xl:px-40 flex items-center justify-center text-red-500 relative">
      <form onSubmit={handleSubmit} className="flex flex-wrap gap-6">
        <h1 className="text-xl underline text-gray-600 font-bold">
          Add New Product
        </h1>
        <div className="w-full flex flex-col gap-1 ">
          <label
            className="text-sm cursor-pointer flex gap-2 items-center"
            htmlFor="file"
          >
            <Image src="/upload.png" alt="" width={30} height={20} />
            <span>Upload Image</span>
          </label>
          <input
            type="file"
            onChange={handleChangeImg}
            id="file"
            className="hidden"
          />
          {previewUrl && (
            <Image src={previewUrl} alt="Preview" width={100} height={100} />
          )}
        </div>
        <div className="w-full flex flex-col">
          <label className="text-sm">Title</label>
          <input
            className="ring-1 ring-red-200 p-1 rounded-sm placeholder:text-red-200 outline-none"
            type="text"
            placeholder="Bella Napoli"
            name="title"
            onChange={handleChange}
          />
        </div>
        <div className="w-full flex flex-col gap-2">
          <label className="text-sm">Description</label>
          <textarea
            rows={2}
            className="ring-1 ring-red-200 p-1 rounded-sm placeholder:text-red-200 outline-none"
            placeholder="A timeless favorite with a twist, showcasing a thin crust topped with sweet tomatoes, fresh basil and creamy mozzarella."
            name="desc"
            onChange={handleChange}
          />
        </div>
        <div className="w-full flex flex-col gap-1">
          <label className="text-sm">Price</label>
          <input
            className="ring-1 ring-red-200 p-1 rounded-sm placeholder:text-red-200 outline-none"
            type="number"
            placeholder="299"
            name="price"
            onChange={handleChange}
          />
        </div>
        <div className="w-full flex flex-col gap-1">
          <label className="text-sm">Category</label>
          <select
            className="ring-1 ring-red-200 p-1 rounded-sm placeholder:text-red-200 outline-none"
            value={catSlug}
            onChange={(e) => setCatSlug(e.target.value)}
          >
            <option value="select">Select a category</option>
            <option value="pizzas">pizzas</option>
            <option value="pastas">pastas</option>
            <option value="burgers">burgers</option>
          </select>
        </div>
        <div className="w-full flex flex-col gap-2">
          <label className="text-sm">Options</label>
          <div className="flex">
            <input
              className="ring-1 ring-red-200 p-1 rounded-sm placeholder:text-red-200 outline-none"
              type="text"
              placeholder="Title"
              name="title"
              onChange={changeOption}
            />
            <input
              className="ring-1 ring-red-200 p-1 rounded-sm placeholder:text-red-200 outline-none"
              type="number"
              placeholder="Additional Price"
              name="additionalPrice"
              onChange={changeOption}
            />
            <button
              type="button"
              className="bg-gray-500 p-1 text-white"
              onClick={() => setOptions((prev) => [...prev, option])}
            >
              Add Option
            </button>
          </div>
          <div className="flex flex-wrap gap-4 mt-2">
            {options.map((opt) => (
              <div
                key={opt.title}
                className="p-2  rounded-md cursor-pointer bg-gray-200 text-gray-400"
                onClick={() =>
                  setOptions((prev) =>
                    prev.filter((item) => item.title !== opt.title),
                  )
                }
              >
                <span>{opt.title}</span>
                <span className="text-xs"> (+ ₹{opt.additionalPrice})</span>
              </div>
            ))}
          </div>
          <label className="flex items-center space-x-2 cursor-pointer">
            <input
              type="checkbox"
              checked={isFeatured}
              onChange={handleCheckboxChange}
              className="w-6 h-6 text-red-500 focus:ring-0" // Adjust size and color
            />
            <span className="text-red-500">isFreatured</span>
          </label>
        </div>
        <button
          type="submit"
          className="bg-red-500 p-1 text-white w-36 rounded-md relative h-10 flex items-center justify-center"
        >
          Submit
        </button>
      </form>
      {loading && <Loading />}
    </div>
  );
};

export default AddPage;

import React from "react";
import Link from "next/link";

const houseData = [
  {
    id: 1,
    name: "Rumah 1",
    price: 100000000,
    location: "Bandung",
    image: "/interior_image.jpg",
    link: "/interior_image",
  },
  {
    id: 2,
    name: "Rumah 2",
    price: 100000000,
    location: "Bandung",
    image: "/house_image1.jpg",
    link: "/house_image1",
  },
  {
    id: 3,
    name: "Rumah 3",
    price: 100000000,
    location: "Bandung",
    image: "/house_image2.jpg",
    link: "/house_image2",
  },
  {
    id: 4,
    name: "Rumah 4",
    price: 100000000,
    location: "Bandung",
    image: "/house_image3.jpg",
    link: "/house_image3",
  },
];

const page = () => (
  <main className="relative flex min-h-screen flex-col items-center justify-between p-24 w-full py-32">
    <div className="flex-col items-center justify-center w-4/6 py-8 bg-white shadow-md rounded-lg px-6 ">
      <form className="flex mb-5">
        <input
          type="text"
          placeholder="Search for properties"
          className="w-full focus:outline-none focus:ring-2 focus:ring-teal-600 border border-gray-300 rounded-md py-2 px-3"
        />
        <button
          type="submit"
          className="ml-2 bg-teal-600 hover:bg-emerald-700 text-white font-semibold rounded-md px-4 py-2 transition duration-300"
        >
          Search
        </button>
      </form>
      {/* <form className=" flex items-end">
        <div className="mr-4">
          <label
            htmlFor="property-type"
            className="block text-gray-700 font-semibold mb-2"
          >
            Property Type
          </label>
          <select
            id="property-type"
            className="w-full focus:outline-none focus:ring-2 focus:ring-teal-600 border border-gray-300 rounded-md py-2 px-3"
          >
            <option value="">All</option>
            <option value="house">House</option>
            <option value="apartment">Apartment</option>
            <option value="condo">Condo</option>
          </select>
        </div>
        <div>
          <label
            htmlFor="price-range"
            className="block text-gray-700 font-semibold mb-2"
          >
            Price Range
          </label>
          <select
            id="price-range"
            className="w-full focus:outline-none focus:ring-2 focus:ring-teal-600 border border-gray-300 rounded-md py-2 px-3"
          >
            <option value="">All</option>
            <option value="0-500">0 - 500</option>
            <option value="501-1000">501 - 1000</option>
            <option value="1001-1500">1001 - 1500</option>
            <option value="1501-2000">1501 - 2000</option>
          </select>
        </div>
        <button
          type="submit"
          className="ml-2 bg-teal-600 hover:bg-emerald-700 text-white font-semibold rounded-md px-4 py-2 max-h-20 transition duration-300"
        >
          Apply
        </button>
      </form> */}
    </div>

    <div className="fixed right-14 top-16 mt-3  flex items-center justify-center  py-8">
      <div className="max-w-md w-full">
        <form className="bg-white shadow-md rounded-lg px-6 py-4 flex-col">
          <div className="mr-4 mb-4">
            <label
              htmlFor="property-type"
              className="block text-gray-700 font-semibold mb-2"
            >
              Property Type
            </label>
            <select
              id="property-type"
              className="w-full focus:outline-none focus:ring-2 focus:ring-teal-600 border border-gray-300 rounded-md py-2 px-3"
            >
              <option value="">All</option>
              <option value="house">House</option>
              <option value="apartment">Apartment</option>
              <option value="condo">Condo</option>
            </select>
          </div>
          <div className="mb-4">
            <label
              htmlFor="price-range"
              className="block text-gray-700 font-semibold mb-2"
            >
              Price Range
            </label>
            <select
              id="price-range"
              className="w-full focus:outline-none focus:ring-2 focus:ring-teal-600 border border-gray-300 rounded-md py-2 px-3"
            >
              <option value="">All</option>
              <option value="0-500">0 - 500</option>
              <option value="501-1000">501 - 1000</option>
              <option value="1001-1500">1001 - 1500</option>
              <option value="1501-2000">1501 - 2000</option>
            </select>
          </div>
          <button
            type="submit"
            className="ml-2 bg-teal-600 hover:bg-emerald-700 text-white font-semibold rounded-md px-4 py-2 transition duration-300"
          >
            Apply
          </button>
        </form>
      </div>
    </div>

    {houseData.map((house) => (
      <div className="  w-4/6 h-36 mx-auto bg-white rounded-lg overflow-hidden shadow-md flex my-5">
        <img
          src={house.image}
          alt="Property Image"
          className="w-1/3 object-fill"
        />
        <div className="flex-1 p-4">
          <h3 className="text-xl font-semibold mb-2">{house.name}</h3>
          <p className="text-gray-700 text-sm mb-4">{house.location}</p>
          <div className="flex items-center justify-between">
            <span className="text-gray-900 font-semibold">
              Rp{house.price}/month
            </span>
            <Link href={`properti${house.link}`}>
              <button className="bg-teal-600 hover:bg-emerald-700 text-white font-semibold rounded-md px-4 py-2 transition duration-300">
                View Details
              </button>
            </Link>
          </div>
        </div>
      </div>
    ))}
  </main>
);

export default page;

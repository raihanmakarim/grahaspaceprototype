import Image from "next/image";
import React from "react";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 w-full">
      <div
        className="grid grid-cols-4 grid-rows-2 gap-4  w-4/5  padding p-4"
        style={{ height: "600px" }}
      >
        <div className="relative h-full w-full bg-red-300 bg-cover bg-center row-span-2 col-span-2 rounded ">
          <Image
            src="/interior_image.jpg"
            fill={true}
            alt="interior_image"
            loading="lazy"
            style={{
              objectFit: "cover",
              minWidth: "100%",
              minHeight: "100%",
              transform: "scaleX(-1)",
            }}
          />
          <div className="absolute top-4 left-4 p-4">
            <div className="flex items-center logo-container-grey gap-3">
              <Image
                src="/home.svg"
                alt="home"
                loading="lazy"
                width={20}
                height={20}
                quality={100}
              />

              <span className="text-zinc-600 font-bold text-lg">
                Cari Rumah
              </span>
            </div>
            <h2 className="text-3xl text-zinc-600 mt-2">Discover</h2>
            <div className="flex gap-2">
              <h2 className="text-3xl text-zinc-600 mt-2">Your</h2>

              <h2 className="text-3xl text-zinc-600 mt-2 font-extrabold">
                Dream House
              </h2>
            </div>
          </div>
          <div className="absolute bottom-4 left-4 p-4">
            <button className="bg-neutral-400 hover:bg-emerald-700 hover:text-white text-black px-5 p-5 font-bold py-2 px-4 rounded">
              Check Product
            </button>
          </div>
        </div>

        <div className="h-full w-full row-span-1 col-span-2  rounded ">
          <div className=" bg-cover bg-center h-full flex items-center justify-center rounded relative text-white">
            <Image
              src="/house_image1.jpg"
              alt="house_image1"
              fill={true}
              loading="lazy"
              style={{
                objectFit: "cover",
                minWidth: "100%",
                minHeight: "100%",
              }}
            />
            <h2 className="text-3xl absolute top-4 left-4 p-4">Best Sales</h2>
          </div>
        </div>

        <div className="h-full w-full row-span-1 col-span-1 rounded ">
          <div className="bg-cover bg-center h-full flex items-center justify-center rounded relative text-white">
            <Image
              src="/house_image2.jpg"
              alt="house_image2"
              fill={true}
              style={{
                objectFit: "cover",
                minWidth: "100%",
                minHeight: "100%",
              }}
            />
            <h2 className="text-3xl absolute bottom-4 left-4 p-4">
              Best Sales
            </h2>
          </div>
        </div>

        <div className="h-full w-full row-span-1 col-span-1 rounded ">
          <div className="bg-cover bg-center h-full flex items-center justify-center rounded relative text-white">
            <Image
              src="/house_image3.jpg"
              fill={true}
              alt="house_image3"
              loading="lazy"
              style={{
                objectFit: "cover",
                minWidth: "100%",
                minHeight: "100%",
              }}
            />
            <h2 className="text-3xl absolute bottom-4 left-4 p-4">
              Type of House
            </h2>
          </div>
        </div>
      </div>
    </main>
  );
}

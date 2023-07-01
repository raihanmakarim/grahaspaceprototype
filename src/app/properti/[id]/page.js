import React from "react";
import Image from "next/image";
import Calculator from "../../component/Calculator";

export default function Page({ params }) {
  console.log("asdads", params);
  return (
    <main className=" mx-auto py-12 ">
      <div className="relative bg-gray-900  w-full  mt-4">
        <Image
          src={`/${params.id}.jpg`}
          alt="hero image"
          loading="lazy"
          width={1920}
          height={1080}
          style={{
            objectFit: "cover",
            width: "100%",
            minHeight: "100%",
            height: "600px",
          }}
        />
        <div className="absolute   inset-0 bg-black bg-opacity-50">
          <h1 className="text-6xl mt-20 text-white font-semibold text-center pt-20">
            {params.id}
          </h1>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-8  w-2/3 mx-auto absolute-container -mt-32 ">
        <h2 className="text-2xl font-semibold mb-4">Property Information</h2>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <h3 className="font-semibold mb-2">Address</h3>
            <p className="text-gray-700">1234 Elm Street, City, State</p>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Price</h3>
            <p className="text-gray-700">$2,500/month</p>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Bedrooms</h3>
            <p className="text-gray-700">3</p>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Bathrooms</h3>
            <p className="text-gray-700">2</p>
          </div>
        </div>
        <p className="text-gray-700 mt-4">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam
          efficitur gravida orci, sit amet maximus nibh elementum ut. Proin ut
          quam id orci maximus fringilla. Donec vehicula luctus ligula, non
          vulputate nulla. Nam nec semper tortor. Aliquam ac eleifend justo, id
          convallis leo. Sed consequat consectetur dolor sed hendrerit. Nulla eu
          purus eu urna ullamcorper iaculis. Mauris at pretium dolor, vitae
          tempor lacus.
        </p>
      </div>

      <div className="bg-white rounded-lg shadow-md p-8 flex  w-2/3 mx-auto mt-64 px-20 gap-4">
        <iframe
          src="https://www.google.com/maps/d/u/0/embed?mid=1SQn2DlLSLLhichXo1RGfh50IAlTKjlY&ehbc=2E312F"
          width={600}
          height={400}
          className="rounded-lg"
        ></iframe>
        <div className="my-auto">
          <h1 className="text-2xl font-bold mb-2">Rumah Sakit</h1>
          <h1 className="text-2xl font-bold mb-2">Rumah Makan</h1>
          <h1 className="text-2xl font-bold mb-2">Rumah Hiburan</h1>
          <h1 className="text-2xl font-bold mb-2">Sasana Boxing</h1>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-8 flex  w-2/3 mx-auto mt-8 px-20 gap-4">
        <Calculator />
      </div>
    </main>
  );
}

"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { PieChart } from "react-minimal-pie-chart";

const Card = ({
  image,
  title,
  subtitle,
  content,
  setIndex,
  number,
  handleShow,
  handleHide,
  transportationScore = 0,
  showMRT,
  showTrain,
  showHalte,
  showToll,
  handleShowHalte,
  handleShowToll,
  handleShowTrain,
  handleShowMRT,
  handleShowCoordinates,
  focusIndex,
  locationScore = 0,
  showWorship,
  showSchool,
  showDining,
  showPlaza,
  showMarket,
  handleShowWorship,
  handleShowSchool,
  handleShowDining,
  handleShowPlaza,
  handleShowMarket,
}) => {
  const [expanded, setExpanded] = useState(false);

  const toggleExpand = () => {
    setIndex(number);
  };

  useEffect(() => {
    if (focusIndex === number) {
      setExpanded(true);
    } else {
      setExpanded(false);
    }
  }, [focusIndex]);

  useEffect(() => {
    handleShowCoordinates();

    if (expanded) {
      handleShow();
    } else if (!expanded) {
      handleHide();
    }
  }, [expanded]);

  return (
    <div
      className={`overflow-hidden max-w-sm rounded overflow-hidden shadow-lg `}
      style={{
        borderRadius: "12.785px",
        width: "300px",
        height: "max-content",
        background: "#f7f7f7",
        boxShadow: "0px 0px 15px 0px rgba(0, 0, 0, 0.25)",
      }}
      onClick={toggleExpand}
    >
      <Image
        className="w-full"
        src="/interior_image.jpg"
        alt="Sunset in the mountains"
        width={500}
        height={500}
        onClick={() => setExpanded(!expanded)}
      />
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">Rp23.000.000,-</div>
        <p className="text-gray-700 text-base">24 m2 - Studio</p>
        <p className="text-gray-400 w-11/12 mr-0 text-sm font-lights">
          Jl. Haji Nawi, Keluarahan Pejompongan, Jakart..
        </p>
      </div>
      {expanded && (
        <div className="flex justify-center gap-4 items-start  px-6 pt-4 pb-2">
          <div>
            <PieChart
              startAngle={270}
              totalValue={100}
              data={[
                {
                  title: "One",
                  value: locationScore,
                  color: "#6FBECA",
                },
              ]}
              lineWidth={25}
              label={({ dataEntry }) => dataEntry.value + "%"}
              labelPosition={0}
            />
            <div
              className={`flex justify-center my-4 py-2 ${
                showMarket ? "bg-[#1F363D]" : "bg-slate-500"
              } text-white`}
              onClick={handleShowMarket}
            >
              Market
            </div>
            <div
              className={`flex justify-center my-4 py-2 ${
                showDining ? "bg-[#1F363D]" : "bg-slate-500"
              } text-white`}
              onClick={handleShowDining}
            >
              Dining
            </div>
            <div
              className={`flex justify-center my-4 py-2 ${
                showSchool ? "bg-[#1F363D]" : "bg-slate-500"
              } text-white`}
              onClick={handleShowSchool}
            >
              School
            </div>
            <div
              className={`flex justify-center my-4 py-2 ${
                showWorship ? "bg-[#1F363D]" : "bg-slate-500"
              } text-white`}
              onClick={handleShowWorship}
            >
              Worship
            </div>
            <div
              className={`flex justify-center my-4 py-2 ${
                showPlaza ? "bg-[#1F363D]" : "bg-slate-500"
              } text-white`}
              onClick={handleShowPlaza}
            >
              Plaza
            </div>
          </div>

          <div>
            <PieChart
              startAngle={270}
              totalValue={100}
              data={[
                {
                  title: "One",
                  value: transportationScore,
                  color: "#6FBECA",
                },
              ]}
              lineWidth={25}
              label={({ dataEntry }) => dataEntry.value + "%"}
              labelPosition={0}
            />
            <div
              className={`flex justify-center my-4 py-2 ${
                showTrain ? "bg-[#1F363D]" : "bg-slate-500"
              } text-white`}
              onClick={handleShowTrain}
            >
              KRL
            </div>
            <div
              className={`flex justify-center my-4 py-2 ${
                showMRT ? "bg-[#1F363D]" : "bg-slate-500"
              } text-white`}
              onClick={handleShowMRT}
            >
              MRT
            </div>
            <div
              className={`flex justify-center my-4 py-2 ${
                showHalte ? "bg-[#1F363D]" : "bg-slate-500"
              } text-white`}
              onClick={handleShowHalte}
            >
              Halte
            </div>
            <div
              className={`flex justify-center my-4 py-2 ${
                showToll ? "bg-[#1F363D]" : "bg-slate-500"
              } text-white`}
              onClick={handleShowToll}
            >
              Toll
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Card;

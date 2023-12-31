"use client";
import React, { useState, useEffect } from "react";
import "./component.css";
import { bungaSyariah } from "../constant";

function pmt(principal, interestRate, totalMonths) {
  // Convert annual interest rate to monthly interest rate
  const monthlyInterestRate = interestRate / 12 / 100;

  // Calculate the monthly payment using the formula for an amortizing loan
  const numerator = principal * monthlyInterestRate * Math.pow(1 + monthlyInterestRate, totalMonths);
  const denominator = Math.pow(1 + monthlyInterestRate, totalMonths) - 1;

  const monthlyPayment = numerator / denominator;
  return Math.round(monthlyPayment);
}

function calculateCumulativeInterest(principal, monthlyInterestRate, totalMonths, startPeriod, endPeriod) {
  let cumulativeInterest = 0;

  console.log("principal",principal)
  console.log("monthlyInterestRate",monthlyInterestRate)
  console.log("totalMonths",totalMonths)
  console.log("startPeriod",startPeriod)
  console.log("endPeriod",endPeriod)


  for (let period = startPeriod; period <= endPeriod; period++) {
    const interestPayment = principal * monthlyInterestRate;
    cumulativeInterest += interestPayment;
    
    const principalPayment = pmt(principal, monthlyInterestRate, totalMonths) - interestPayment;
    console.log("principalPayment",principalPayment)
    principal -= principalPayment;
  }

  return cumulativeInterest * -1;
}

const Calculator = () => {
  const [hargaRumah, setHargaRumah] = useState(0);
  const [persenBunga, setPersenBunga] = useState(0);
  const [jumlahTahun, setJumlahTahun] = useState(0);
  const [jumlahCicilan, setJumlahCicilan] = useState(0);
  const [jumlahCicilan35, setJumlahCicilan35] = useState({
    tahun1_2: 0,
    tahun3_5: 0,
  });
  const [jumlahCicilan620, setJumlahCicilan620] = useState({
    tahun1_3: 0,
    tahun4_5: 0,
    tahun6_20: 0,
  });
  const [isSyariah, setIsSyariah] = useState(false);
  const calculateSingleCicilan = (persenBunga) => (((hargaRumah * persenBunga) / 100) + hargaRumah) / (jumlahTahun * 12);
  const calculateSubCicilan = (persenBunga,tahun) => (((hargaRumah * persenBunga) / 100) + hargaRumah) / (tahun * 12);

  const calculateCicilan = () => {
    const newJumlahBulan = jumlahTahun * 12;
    const persenBunga = isSyariah ? bungaSyariah[jumlahTahun] : persenBunga;

    const calculateSingleCicilan = (persenBunga) => (((hargaRumah * persenBunga) / 100) + hargaRumah) / newJumlahBulan;

    setJumlahCicilan(calculateSingleCicilan(persenBunga));
  };

  const calculateCicilanKonvensional = () => {
    let persenBunga;

    if (jumlahTahun <= 3) {
      persenBunga = 3.85;
    }
    else if (jumlahTahun <= 21) {
      persenBunga = 5.75;
    }

    if (persenBunga !== undefined) {
      setJumlahCicilan(calculateSingleCicilan(persenBunga));
    }

    if (jumlahTahun > 3 && jumlahTahun <= 5) {
      const cicilan35 = calculateSingleCicilan(4.15);
      setJumlahCicilan35({
        tahun1_2: cicilan35,
        tahun3_5: cicilan35,
      });
    }

    if (jumlahTahun > 5 && jumlahTahun <= 20) {
      const pmt13 = pmt(hargaRumah, 4.25, jumlahTahun*12);

      const cumi = -calculateCumulativeInterest(hargaRumah, 4.25 / 12 / 100, jumlahTahun*12, 1, 35);
      const reduc = (pmt13*36)-cumi;
      const pmt45 = pmt( hargaRumah-reduc , 7.55, jumlahTahun*12 - 36);
      const cumi620 = -calculateCumulativeInterest(hargaRumah, 7.55 / 12 / 100, jumlahTahun*12, 36, 60);
      const reduc620 = (pmt*60)-cumi620;
      const sisaPokok45 = hargaRumah-reduc;
      const sisaPokok620 = sisaPokok45;
      console.log("reduc",reduc);
      console.log("cumi",cumi);
      console.log("hkjajks",hargaRumah-reduc)
      setJumlahCicilan620({
        tahun1_3: pmt13,
        tahun4_5: pmt45,
        tahun6_20: pmt(hargaRumah-reduc , 9.55, jumlahTahun*12 - 60),
      });
    }
  };

  useEffect(() => {
    if (isSyariah) {
      calculateCicilan();
    }
    else {
      calculateCicilanKonvensional();
    }
  }, [jumlahTahun, isSyariah, bungaSyariah, persenBunga, hargaRumah]);

  










  // const bank = [
  //   {
  //     name: "Bank BCA",
  //     logo: "/bca.png",
  //     link: "/",
  //   },
  //   {
  //     name: "Bank Mandiri",
  //     logo: "/mandiri.png",
  //     link: "/",
  //   },
  //   {
  //     name: "Bank BNI",
  //     logo: "/bni.png",
  //     link: "/",
  //   },
  //   {
  //     name: "Bank BRI",
  //     logo: "/bri.png",
  //     link: "/",
  //   },
  //   {
  //     name: "Bank CIMB Niaga",
  //     logo: "/cimb.png",
  //     link: "/",
  //   },
  //   {
  //     name: "Bank BTN",
  //     logo: "/btn.png",
  //     link: "/",
  //   },
  // ];



  return (
    <div className="container mx-auto p-8">
      <h2 className="text-2xl font-semibold mb-4">
        Kalkulator Cicilan Per Bulan
      </h2>
      <div className="flex justify-between ">
        <div className="grid grid-cols-1 w-1/2 gap-4">
          <div>
            <label htmlFor="hargaRumah" className="font-semibold">
              Harga Rumah
            </label>
            <input
              type="number"
              id="hargaRumah"
              className="w-full border-gray-300 rounded-lg p-2 mt-4 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              style={{ border: "1px solid #ccc" }}
              value={hargaRumah}
              onChange={(e) => setHargaRumah(parseFloat(e.target.value))}
            />
          </div>
          <div>
            <label htmlFor="persenBunga" className="font-semibold">
              Down Payment
            </label>
            <input
              type="number"
              id="persenBunga"
              className="w-full border-gray-300 rounded-lg p-2 mt-4 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              style={{ border: "1px solid #ccc" }}
              value={persenBunga}
              onChange={(e) => hargaRumah> 0 && setHargaRumah(hargaRumah - parseFloat(e.target.value))}
            />
          </div>
          <div>
            <label htmlFor="jumlahTahun" className="font-semibold">
              jumlahTahun
            </label>
            <input
              type="number"
              id="jumlahTahun"
              className="w-full border-gray-300 rounded-lg p-2 mt-4 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              style={{ border: "1px solid #ccc" }}
              value={jumlahTahun}
              onChange={(e) => setJumlahTahun(parseFloat(e.target.value))}
            />
          </div>

          {/* <div>
            <label htmlFor="jumlahBulan" className="font-semibold">
              Loan Program
            </label>
            <input
              type="number"
              id="jumlahBulan"
              className="w-full border-gray-300 rounded-lg p-2 mt-4 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              style={{ border: "1px solid #ccc" }}
              value={jumlahBulan}
              onChange={(e) => setJumlahBulan(parseFloat(e.target.value))}
            />
          </div> */}
        </div>

        
      </div>

      <label htmlFor="jumlahBulan" className="font-semibold">
        Syariah ?
      </label>
      <label className="checker">
        <input type="checkbox" className="checkbox" onClick={() => setIsSyariah(!isSyariah)} />
        <div className="check-bg"></div>
        <div className="checkmark">
          <svg viewBox="0 0 100 100">
            <path
              strokeLinejoin="round"
              strokeLinecap="round"
              strokeWidth="15"
              stroke="#FFF"
              fill="none"
              d="M20,55 L40,75 L77,27"
            ></path>
          </svg>
        </div>
      </label>

      <button className="mt-4 bg-teal-600 hover:bg-emerald-700 text-white font-semibold py-2 px-4 rounded">
        Hitung
      </button>
      <div className="mt-4">
        <div>
          {isSyariah && <p>Jumlah Cicilan: {jumlahCicilan}</p>}

          {!isSyariah && jumlahCicilan35.tahun1_2 !== 0 && (
            <div>
              <p>Jumlah Cicilan Tahun 1-2: {jumlahCicilan35.tahun1_2}</p>
              <p>Jumlah Cicilan Tahun 3-5: {jumlahCicilan35.tahun3_5}</p>
            </div>
          )}

          {!isSyariah && jumlahCicilan620.tahun1_3 !== 0 && (
            <div>
              <p>Jumlah Cicilan Tahun 1-3: {jumlahCicilan620.tahun1_3}</p>
              <p>Jumlah Cicilan Tahun 4-5: {jumlahCicilan620.tahun4_5}</p>
              <p>Jumlah Cicilan Tahun 6-20: {jumlahCicilan620.tahun6_20}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Calculator;

"use client";
import React, { useState } from "react";

const Calculator = () => {
  const [hargaRumah, setHargaRumah] = useState(0);
  const [persenBunga, setPersenBunga] = useState(0);
  const [jumlahTahun, setJumlahTahun] = useState(0);
  const [jumlahBulan, setJumlahBulan] = useState(0);

  const calculateCicilan = () => {
    const bungaTahunan = (persenBunga / 100) * hargaRumah * jumlahTahun;
    const cicilanBulanan = (hargaRumah + bungaTahunan) / jumlahBulan;

    return cicilanBulanan.toFixed(2);
  };

  return (
    <div className="container mx-auto p-8">
      <h2 className="text-2xl font-semibold mb-4">
        Kalkulator Cicilan Per Bulan
      </h2>
      <div className="grid grid-cols-2 gap-4">
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
            Persen Bunga Tahunan
          </label>
          <input
            type="number"
            id="persenBunga"
            className="w-full border-gray-300 rounded-lg p-2 mt-4 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
            style={{ border: "1px solid #ccc" }}
            value={persenBunga}
            onChange={(e) => setPersenBunga(parseFloat(e.target.value))}
          />
        </div>
        <div>
          <label htmlFor="jumlahTahun" className="font-semibold">
            Jumlah Tahun
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
        <div>
          <label htmlFor="jumlahBulan" className="font-semibold">
            Jumlah Bulan
          </label>
          <input
            type="number"
            id="jumlahBulan"
            className="w-full border-gray-300 rounded-lg p-2 mt-4 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
            style={{ border: "1px solid #ccc" }}
            value={jumlahBulan}
            onChange={(e) => setJumlahBulan(parseFloat(e.target.value))}
          />
        </div>
      </div>
      <button className="mt-4 bg-teal-600 hover:bg-emerald-700 text-white font-semibold py-2 px-4 rounded">
        Hitung
      </button>
      <div className="mt-4">
        <strong>Cicilan per Bulan:</strong> Rp {calculateCicilan()}
      </div>
    </div>
  );
};

export default Calculator;

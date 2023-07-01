import React from "react";
import Image from "next/image";

const Footer = () => {
  const socialMedia = [
    { logo: "/logo-tiktok.svg", link: "/" },

    { logo: "/logo-twitter.svg", link: "/" },

    { logo: "/logo-facebook.svg", link: "/" },
    { logo: "/logo-youtube.svg", link: "/" },
    { logo: "/logo-linkedin.svg", link: "/" },
  ];

  return (
    <footer className="bg-white text-black px-20">
      <div className="container mx-auto px-4 py-8 text-sm font-medium">
        <div className="">
          <div className="flex flex-row w-full py-8 ">
            <div className="w-2/6">
              <div className="flex gap-1  items-center rounded font-bold logo-container">
                <Image
                  src="/home.svg"
                  loading="lazy"
                  width={20}
                  height={20}
                  quality={100}
                  alt="home"
                />
                <h1
                  className="text-2xl font-extrabold "
                  style={{ color: "var(--primary)" }}
                >
                  GrahaSpace
                </h1>
                <div
                  className=" w-24 h-full text-white flex justify-center items-center rounded font-bold px-1"
                  style={{ background: "var(--primary)" }}
                >
                  PROTOTYPE
                </div>
              </div>
              <p className="text-gray-400">Content for Section 1</p>
            </div>
            <div className="w-1/6">
              <h4 className="text-lg font-bold mb-2">Fitur</h4>
              <p className="text-gray-400">Peta Properti</p>
              <p className="text-gray-400">Kalkulator KPR</p>
              <p className="text-gray-400">360 Viewer</p>
              <p className="text-gray-400">Spatial Analysis</p>
            </div>
            <div className="w-1/6">
              <h4 className="text-lg font-bold mb-2">Tentang Kami</h4>
              <p className="text-gray-400">Profil GrahaSpace</p>
              <p className="text-gray-400">Kerja Sama</p>
              <p className="text-gray-400">Bantuan Pengguna</p>
              <p className="text-gray-400">Syarat & Ketentuan</p>
            </div>
            <div className="w-2/6 flex flex-col pl-8">
              <div className="flex justify-end items-end ">
                <div>
                  <h4 className="text-lg font-bold mb-2">Stay up to date</h4>

                  <input
                    type="text"
                    placeholder="Masukan Email"
                    className="bg-white border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>
                <button
                  className=" text-white px-4 py-2 rounded-lg ml-2"
                  style={{ background: "var(--primary)" }}
                >
                  Subscribe
                </button>
              </div>
            </div>
          </div>
          <div className="w-full  border-gray-200 border-t-2  pt-4 flex flex-row w-full py-8  justify-between">
            <p className=" text-gray-400 mb-2">
              @ 2023 GrahaSpace. All Right Reserved.
            </p>
            <div className="flex gap-2 logo-container-light-grey">
              {socialMedia.map((item) => (
                <Image
                  src={item.logo}
                  loading="lazy"
                  width={20}
                  height={20}
                  quality={100}
                  alt="logo"
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

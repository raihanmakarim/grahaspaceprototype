import React from "react";
import Link from "next/link";
import Image from "next/image";

const Navbar = () => {
  const navbarItems = [
    {
      name: "Home",
      logo: "/home-outline.svg",
      link: "/",
    },
    {
      name: "Cari Rumah",
      logo: "/search-outline.svg",
      link: "/cari-rumah",
    },

    {
      name: "Bantuan",
      logo: "/heart-outline.svg",
      link: "/bantuan",
    },
    {
      name: "homemap",
      logo: "/heart-outline.svg",
      link: "/homemap",
    },
  ];

  return (
    <header
      className="w-full text-primary flex justify-between items-center px-20 h-16 bg-white shadow-md translate-y-2 "
      style={{
        position: "absolute",
        top: "-15px",
        zIndex: "100",
      }}
    >
      <Link href="/">
        <div className="flex gap-1 justify-center items-center rounded font-bold logo-container">
          <Image
            src="/home.svg"
            loading="lazy"
            alt="home"
            width={20}
            height={20}
            quality={100}
          />
          <h1 className="text-2xl font-extrabold ">GrahaSpace</h1>
          <div
            className=" w-full h-full text-white flex justify-center items-center rounded font-bold px-1"
            style={{ background: "var(--primary)" }}
          >
            PROTOTYPE
          </div>
        </div>
      </Link>
      <div className="flex justify-between items-center gap-8 logo-container">
        {navbarItems.map((item) => (
          <Link
            href={item.link}
            className=" font-bold flex justify-center items-center gap-3"
          >
            {/* <IonIcon name={item.name} size="24" /> */}
            <Image
              src={item.logo}
              loading="lazy"
              width={20}
              height={20}
              quality={100}
              alt="logo"
            />
            <h1>{item.name}</h1>
          </Link>
        ))}
        <Link href="/daftar">
          <button
            className="flex justify-center items-center gap-3 hover:bg-orange-500 text-white font-bold py-2 px-4 rounded logo-container-white"
            style={{ background: "var(--primary)" }}
          >
            <Image
              src="/person.svg"
              loading="lazy"
              width={20}
              alt="person"
              height={20}
              quality={100}
            />
            Daftar/Masuk
          </button>
        </Link>
      </div>
    </header>
  );
};

export default Navbar;

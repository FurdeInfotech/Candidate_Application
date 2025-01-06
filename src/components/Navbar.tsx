import React from "react";
import logo from "../../public/fitmain.png";
import Image from "next/image";
function Navbar() {
  return (
    <nav className=" w-full relative pt-4 flex md:justify-start sm:gap-0 gap-5 justify-between items-center flex-col md:flex-row">
      <Image src={logo} alt="Furde Infotech" className=" w-28 md:w-40" />
      <h1 className=" md:absolute md:left-[50%] md:-translate-x-[50%] block font-bold md:text-3xl text-2xl">
        Application Form
      </h1>
    </nav>
  );
}

export default Navbar;

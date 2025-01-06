import React from "react";
import logo from "../../public/fitmain.png";
import Image from "next/image";
function Navbar() {
  return (
    <nav className=" w-full relative pt-4 flex sm:justify-start gap-0 justify-between items-center flex-row">
      <Image src={logo} alt="Furde Infotech" className=" w-24 sm:w-40" />
      <h1 className=" sm:absolute sm:left-[50%] sm:-translate-x-[50%] block font-bold sm:text-3xl text-2xl">
        Application Form
      </h1>
    </nav>
  );
}

export default Navbar;

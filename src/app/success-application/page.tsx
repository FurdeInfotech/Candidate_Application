"use client";
import React, { useEffect, useState } from "react";
import { useWindowSize } from "react-use";
import Confetti from "react-confetti";
import SuccessSVG from "@/components/SuccessSVG";
import { Button } from "@/components/ui/button";
import { Globe } from "lucide-react";
import Link from "next/link";

const Page: React.FC = () => {
  const { width, height } = useWindowSize();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true); // Ensure rendering only happens after the client is ready
  }, []);

  const handleClose = () => {
    // Try to close the current window/tab
   
      window.close();

  };

  return (
    <div className="w-full min-h-screen relative flex flex-col justify-center items-center">
      {isClient && width > 0 && height > 0 && (
        <Confetti
          width={width}
          recycle={false}
          height={height}
          style={{ zIndex: 2, position: "absolute", pointerEvents: "none" }}
        />
      )}
      <SuccessSVG />
      <h1 className=" font-bold md:text-2xl text-lg">
        Thank you for your application!
      </h1>
      <p className=" mt-2 text-sm font-semibold">
        We&apos;ll review it and contact you if you&apos;re selected!
      </p>
      <p className=" mt-2 text-sm">You can close this window now.</p>
      <div className=" mt-5 flex flex-row justify-center items-center">
        <Button
          size="sm"
          variant="outline"
          className=" mr-5"
          onClick={handleClose}
        >
          Close
        </Button>
        <Link href="https://www.furdeinfotech.com/">
          <Button size="sm">
            <Globe /> Visit Website
          </Button>
        </Link>
      </div>
    </div>
  );
};
export default Page;

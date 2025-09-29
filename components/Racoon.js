"use client"; 

import { useState } from "react";

export default function Racoon() {
  const [happy, setHappy] = useState(false);

  return (
    <div className="flex flex-col items-center">
      <img
        src={happy ? "/raccon_guia.png" : "/racoon_globo.png"}
        alt="Mascot"
        className="w-8 h-8 transition-transform duration-300 hover:scale-110 cursor-pointer"
        onMouseEnter={() => setHappy(true)}
        onMouseLeave={() => setHappy(false)}
      />
    </div>
  );
}
"use client";

import { Bars } from "react-loader-spinner";


export default function Loader() {

  return (
      <div className="min-h-[500px] flex flex-col items-center justify-center gap-4">
        <Bars height="80" width="80" color="#000" />
        <p className="text-md text-black text-shadow-md animate-pulse">
          Please wait, loading...
        </p>
      </div>
    );
}

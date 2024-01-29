import { useMemo, useState } from "react";
import { LogoImage } from "./LogoImage";

export const Appbar = () => {
    // const [userName , setUserName] = useState("");
    const userData = useMemo(() => {
      // console.log("rendering");
        return JSON.parse(localStorage.getItem("userName"))
    } , []);

  return (
    <div className="shadow h-14 flex justify-between pr-10 bg-zinc-700">
      <div className="flex flex-col justify-center h-full ml-4">
        <LogoImage
          width="w-2/4"
          src="https://www.paytmbank.com/_next/static/media/paytmbank-logo.4ba3db09.svg"
        />
      </div>
      <div className="flex">
        <div className="flex flex-col justify-center h-full mr-4"> {userData} </div>
        <div className="rounded-full h-12 w-12 bg-slate-200 flex justify-center mt-1 mr-2">
          <div className="flex flex-col justify-center h-full text-xl"> {userData[0].toUpperCase()} </div>
        </div>
      </div>
    </div>
  );
};

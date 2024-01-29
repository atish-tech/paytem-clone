import React from "react";

export const LogoImage = ({ src, width }) => {
  return (
    <div className="w-full flex justify-center">
      <img src={src} className={width} />
    </div>
  );
};

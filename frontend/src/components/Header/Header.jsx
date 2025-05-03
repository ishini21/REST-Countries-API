import React from "react";

function Header() {
  return (
    <div className="m-4 w-full h-[450px] mb-[30px] bg-[url('/images/bg1.jpg')] bg-no-repeat bg-[center_30%] bg-cover relative rounded-lg overflow-hidden">
      <div className="absolute inset-0 bg-black/20"></div>

      <div className="absolute flex flex-col items-start gap-4 md:gap-6 max-w-[90%] md:max-w-[80%] bottom-[15%] left-[5vw] md:left-[10vw] animate-fadeIn">
        <h2 className="font-bold text-white text-3xl md:text-5xl lg:text-6xl leading-tight">
          Discover the World's Countries
        </h2>
        <p className="text-white text-base md:text-xl lg:text-2xl max-w-[90%] md:max-w-[80%]">
          Our Guide to Global Information
        </p>
      </div>
    </div>
  );
}

export default Header;

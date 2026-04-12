import React, { useState } from "react";
import Navbar from "../sections/Navbar";
import Footer from "../sections/Footer";
import Lottie from "lottie-react";
import { asset } from "../config";
import animationData from "../lotties/check-mark-primary.json";

const ContactPage = () => {
  return (
    <>
      <Navbar />
      <div className="mt-14 w-full h-[550px] bg-cover flex"
        style={{ backgroundImage: `url(${asset("ContactHeader.png")})` }}>
        <div className="ml-auto flex flex-col px-4 sm:px-20 lg:px-40 justify-center items-start text-left">
          <h1 className="text-white text-xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold py-4">
            Thank you for reaching out!
          </h1>
          <p className="text-white font-light text-sm px-2"></p>
        </div>
      </div>
      <div className="w-full h-cover px-4 sm:px-20 py-32 flex flex-col justify-center items-center mb-22">
        <div className="bg-gray-200 w-[930px] h-[525px] rounded-md flex flex-col items-center justify-center">
          <svg
            width="162"
            height="162"
            viewBox="0 0 162 162"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="mb-12"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M68.0675 110.221C67.9061 110.382 67.6444 110.382 67.483 110.221L35.8328 78.5705C35.6714 78.4091 35.6714 78.1475 35.8328 77.9861V77.9861C35.9942 77.8247 36.2558 77.8247 36.4172 77.9861L68.0675 109.636C68.2289 109.798 68.2289 110.059 68.0675 110.221V110.221Z"
              fill="#048162"
              stroke="#048162"
              stroke-width="4"
            />
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M126.167 51.5371C126.329 51.6985 126.329 51.9602 126.167 52.1216L68.0681 110.221C67.9067 110.382 67.645 110.382 67.4836 110.221V110.221C67.3222 110.059 67.3222 109.798 67.4836 109.636L125.583 51.5371C125.744 51.3757 126.006 51.3757 126.167 51.5371V51.5371Z"
              fill="#048162"
              stroke="#048162"
              stroke-width="4"
            />
            <circle cx="81" cy="81" r="79" stroke="#048464" stroke-width="4" />
          </svg>
          <h1 className="text-primary font-light mt-14 text-xl">
            Your message has been sent. We will email you for confirmation.
          </h1>
        </div>
      </div>
    </>
  );
};

export default ContactPage;

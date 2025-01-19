// import React from "react";
import { Link } from "react-router-dom";

const PaymentSuccess = () => {
  return (
    <div className="flex pt-20 justify-center h-screen">
      <div className="p-4 rounded w-96 h-auto shadow-lg bg-white">
        <div className="flex flex-col items-center p-4 space-y-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="text-green-600 w-16 h-16"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M10 0C4.477 0 0 4.477 0 10s4.477 10 10 10 10-4.477 10-10S15.523 0 10 0zm3.707 7.293a1 1 0 00-1.414-1.414l-3 3a1 1 0 00-.293.707V12a1 1 0 102 0v-2.586l2.293-2.293zM8 12a1 1 0 112 0v3a1 1 0 11-2 0v-3z"
              clipRule="evenodd"
            />
          </svg>
          <h1 className="text-3xl font-bold text-gray-800">
            Payment Successful!
          </h1>
          <p className="text-gray-600">
            Thank you for booking your appointment with Medicare.
          </p>
          <Link
            to="/"
            className="inline-flex items-center  justify-center px-4 py-2 mt-[55px] text-white bg-indigo-600 border border-transparent rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;


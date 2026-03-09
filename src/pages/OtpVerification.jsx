import React, { useState, useRef } from "react";

const OtpVerification = () => {
  const [otp, setOtp] = useState(new Array(6).fill(""));

  const inputRefs = useRef([]);

  // Handling Input Change
  const handleChange = (e, index) => {
    const value = e.target.value;
    if (isNaN(value)) return;

    const newOtp = [...otp];

    newOtp[index] = value.substring(value.length - 1);
    setOtp(newOtp);

    if (value && index < 5) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  // Handling Form Submission
  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(otp.join(""));
  };

  return (
    <div className="min-h-screen w-full flex justify-center items-center bg-gray-50">
      <form
        onSubmit={handleSubmit}
        className="w-full sm:w-xl space-y-6 p-7 rounded-3xl shadow-xl bg-white"
      >
        <div className="space-y-2 mb-5">
          <h2 className="font-semibold text-2xl text-gray-800 tracking-tight">
            Enter Your OTP
          </h2>
          <p className="text-sm text-gray-400">
            Enter the 6 Digit OTP that has been sent to your mail
          </p>
        </div>

        <div className="flex justify-center gap-3">
          {otp.map((digit, index) => (
            <input
              key={index}
              type="text"
              maxLength="1"
              value={digit}
              ref={(el) => (inputRefs.current[index] = el)}
              onChange={(e) => handleChange(e, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              className="w-12 h-12 text-center text-xl font-bold rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-btn-100 outline-none transition-all"
            />
          ))}
        </div>

        <button
          type="submit"
          className="w-full bg-btn-100 hover:bg-btn-200 text-white font-bold py-3.5 rounded-xl shadow-lg shadow-cyan-500/30 hover:shadow-cyan-500/40 transform hover:-translate-y-0.5 transition-all"
        >
          Verify
        </button>
      </form>
    </div>
  );
};

export default OtpVerification;

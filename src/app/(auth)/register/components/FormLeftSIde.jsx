import Image from "next/image";
import React from "react";

const FormLeftSIde = () => {
  return (
    <div className="hidden lg:flex lg:w-1/2 flex-col justify-center-safe items-center-safe bg-back dark:bg-gray-700 p-10">
      <div className="flex items-center justify-center w-50 h-25 rounded-lg overflow-hidden">
        <Image
          src="/logo.png"
          alt="Logo"
          height={300}
          width={300}
          priority
          className="w-full object-cover"
        />
      </div>
      {/* <h2 className="text-2xl font-extrabold text-text dark:text-white mb-2">
        AutoBizz
      </h2> */}
      <p className="text-gray-500 dark:text-gray-400 max-w-xs mb-10">
        The all-in-one platform to scale your business operations.
      </p>

      {/* Features */}
      <ul className="space-y-5 text-gray-500 font-medium p-5">
        {/* 1 . */}
        <li className="flex justify-center-safe items-center-safe space-x-2 rounded-2xl">
          <Image
            src="/businessAutomation.png"
            alt="Business Automation Icon"
            className="object-contain size-20"
            height={300}
            width={300}
          />

          <div>
            <p className="text-lg dark:text-white">Business Automation</p>
            <p className="text-xs break-all text-justify line-clamp-2 dark:text-gray-400">
              Users register and upload business context. The system utilizes
              Generative AI to create training videos and organize compliance
              data.
            </p>
          </div>
        </li>

        {/* 2 . */}
        <li className="flex justify-center-safe items-center-safe space-x-2 rounded-2xl mb-7">
          <Image
            src="/customerService.png"
            alt="Customer Service Icon"
            className="object-contain size-20"
            height={300}
            width={300}
          />

          <div>
            <p className="text-lg dark:text-white">Customer Service</p>
            <p className="text-xs break-all text-justify line-clamp-2 dark:text-gray-400">
              Provisioning of a unique phone number where an AI Voice Assistant
              handles customer inquiries 24/7 based on the business&apos;s
              specific context.
            </p>
          </div>
        </li>

        {/* 3 . */}
        <li className="flex justify-center-safe items-center-safe space-x-2 rounded-2xl ">
          <Image
            src="/salesLeadManagement.png"
            alt="Sales & Lead Management Icon"
            className="object-contain size-20"
            height={300}
            width={300}
          />

          <div>
            <p className="text-lg dark:text-white">Sales & Lead Management</p>
            <p className="text-xs break-all text-justify line-clamp-2 dark:text-gray-400">
              Auto-generating product listings and uses AI to qualify leads
              through text or voice, scheduling high-scoring prospects directly
              onto the user&apos;s calendar.
            </p>
          </div>
        </li>
      </ul>
    </div>
  );
};

export default FormLeftSIde;

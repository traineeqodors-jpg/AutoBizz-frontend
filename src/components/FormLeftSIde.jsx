import React from "react";

const FormLeftSIde = () => {
  return (
    <div className="hidden lg:flex lg:w-1/2 flex-col justify-center-safe items-center-safe bg-back p-10 ">
     
       <div className="bg-white flex items-center justify-center size-35 rounded-full shadow-inner mb-2 overflow-hidden">
              <img
                src="/autoBizz.png"
                alt="Logo"
                className="size-35 object-cover"
              />
            </div>
      <h2 className="text-2xl font-extrabold text-text mb-2">AutoBizz</h2>
      <p className="text-gray-500 max-w-xs mb-10">
        The all-in-one platform to scale your business operations.
      </p>

      {/* Features */}
      <ul className="space-y-5 text-gray-500 font-medium p-5">
        {/* 1 . */}
        <li className="flex justify-center-safe items-center-safe space-x-5  rounded-2xl">
          <img
            src="https://cdn-icons-png.flaticon.com/128/11921/11921783.png"
            alt=""
            className="object-contain size-20 opacity-70"
          />

          <div>
            <p className="text-lg">Business Automation</p>
            <p className="text-xs break-all text-justify line-clamp-2">
              Users register and upload business context. The system utilizes
              Generative AI to create training videos and organize compliance
              data.
            </p>
          </div>
        </li>

        {/* 2 . */}
        <li className="flex justify-center-safe items-center-safe space-x-5 rounded-2xl mb-7">
          <img
            src="https://cdn-icons-png.flaticon.com/128/8163/8163243.png"
            alt=""
            className="object-contain size-20 opacity-70"
          />

          <div>
            <p className="text-lg">Customer Service</p>
            <p className="text-xs break-all text-justify line-clamp-2">
              Provisioning of a unique phone number where an AI Voice Assistant
              handles customer inquiries 24/7 based on the business's specific
              context.
            </p>
          </div>
        </li>

        {/* 3 . */}
        <li className="flex justify-center-safe items-center-safe space-x-5 rounded-2xl ">
          <img
            src="https://cdn-icons-png.flaticon.com/128/1389/1389181.png"
            alt=""
            className="object-contain size-20 opacity-70"
          />

          <div>
            <p className="text-lg">Sales & Lead Management</p>
            <p className="text-xs break-all text-justify line-clamp-2">
              Auto-generating product listings and uses AI to qualify leads
              through text or voice, scheduling high-scoring prospects directly
              onto the user's calendar.
            </p>
          </div>
        </li>
      </ul>
    </div>
  );
};

export default FormLeftSIde;

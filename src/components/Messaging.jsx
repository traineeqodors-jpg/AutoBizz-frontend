import React from 'react'
import { IoSend } from 'react-icons/io5';
import { RiRobot3Fill } from 'react-icons/ri';
import { RxCross2 } from 'react-icons/rx';

function Messaging({setChatIsOpen}) {
  return (
    <>
      <div className="flex flex-col gap-2 w-full">
        <div className="flex gap-2 justify-between items-center">
          <h3 className="font-bold flex gap-2 justify-center items-center">
            <span>Ask AI</span>
            <span>
              <RiRobot3Fill className="text-btn-100" />
            </span>
          </h3>
          <RxCross2
            className="hover:scale-105"
            onClick={() => setChatIsOpen(false)}
          />
        </div>
        <div className=" h-[50vh] bg-white inset-shadow-sm/20"></div>
        <div className="flex flex-row gap-1 w-full bg-white rounded-2xl p-2 items-center justify-center">
          <form className="flex flex-row gap-1 w-full items-center justify-center">
            <input
              className="w-full px-2 py-3 placeholder:text-slate-500 border-0 outline-0"
              placeholder="Type Message..."
            />
            <IoSend className="text-btn-200 size-5" />
          </form>
        </div>
      </div>
    </>
  );
}

export default Messaging
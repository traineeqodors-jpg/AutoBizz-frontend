import React, { useState } from 'react'
import { IoChatbox } from 'react-icons/io5';
import { RxCross2 } from 'react-icons/rx';
import Messaging from './Messaging';

function AIChat() {
    const [chatIsOpen, setChatIsOpen] = useState(false);
  return (
    <>
      <div
        className={`absolute bottom-16 lg:right-16 h-fit md:right-10 right-4 z-50 inline bg-back p-3 ${!chatIsOpen ? `rounded-full` : `rounded-2xl`}  shadow-lg inset-shadow-sm/10 hover:inset-shadow-sm/20`}
      >
        {!chatIsOpen ? (
          <IoChatbox
            className="size-10 text-btn-200"
            onClick={() => setChatIsOpen(true)}
          />
        ) : (
          <Messaging setChatIsOpen={setChatIsOpen} />
        )}
      </div>
    </>
  );
}

export default AIChat
import React, { useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { FaCalendarCheck, FaExclamationTriangle, FaHeart } from 'react-icons/fa';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import FormLeftSIde from './LoginAndSignUp/FormLeftSIde'; 
import { useConfirmMeetingMutation } from '../features/slices/meetingSlice';


 
const LeadResponsePage = () => {
  const [searchParams] = useSearchParams();
  
  
  const [params, setParams] = useState({ token: null, interested: null });
  const hasCalled = useRef(false);
  
  const [confirmMeeting, { isLoading, isError, error, isSuccess, data }] = useConfirmMeetingMutation();

  useEffect(() => {
    const token = searchParams.get('token');
    const interestedParam = searchParams.get('interested');


    if (!token || interestedParam === null) {
      window.location.replace("https://www.qodors.com");
      return;
    }

    
    const isInterested = interestedParam === 'true';
    setParams({ token, interested: isInterested });
    
    
    
    window.history.replaceState({}, document.title, "/confirm-meeting");

   
    if (!hasCalled.current) {
      confirmMeeting({ token, interested: isInterested });
      hasCalled.current = true;
    }
  }, [searchParams, confirmMeeting]);


  if (!hasCalled.current && !isLoading && !isSuccess && !isError) {
    return null;
  }

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gray-50 dark:bg-gray-800 p-4">
    
      <div className="w-full sm:max-w-lg lg:max-w-5xl flex flex-col md:flex-row bg-white dark:bg-gray-900 rounded-3xl shadow-2xl overflow-hidden min-h-137.5">
   
        <FormLeftSIde />

        
        <div className="flex-1 flex flex-col justify-center items-center p-8 sm:p-10 text-center">
          
        
          {isLoading && (
            <div className="space-y-6">
              <AiOutlineLoading3Quarters className="animate-spin text-btn-100 mx-auto" size={60} />
              <h1 className="text-2xl font-bold text-text dark:text-white tracking-tight">
                Processing Request...
              </h1>
              <p className="text-gray-500 dark:text-gray-400">
                Updating your meeting preferences, please wait.
              </p>
            </div>
          )}

          {isSuccess && (
            <div className="w-full max-w-sm space-y-8 animate-in fade-in zoom-in duration-500">
              <div className="flex justify-center">
                {data?.data?.interested ? ( 
                  <div className="p-6 bg-green-50 dark:bg-green-900/20 rounded-full">
                    <FaCalendarCheck size={60} className="text-green-500" />
                  </div>
                ) : (
                  <div className="p-6 bg-blue-50 dark:bg-blue-900/20 rounded-full">
                    <FaHeart size={60} className="text-blue-500" />
                  </div>
                )}
              </div>

              <div className="space-y-3">
                <h1 className="text-3xl font-bold text-text dark:text-white tracking-tight">
                  {data?.data?.interested ? 'Meeting Confirmed!' : 'Preference Recorded'}
                </h1>
                <p className="text-gray-500 dark:text-gray-400 text-lg leading-relaxed">
                  {data?.data?.interested 
                    ? (data?.data?.alreadyScheduled 
                        ? "You already have a meeting scheduled. Please check your email for the invite link." 
                        : "Great choice! We've sent a calendar invite with the meeting link to your inbox.") 
                    : "Thank you for letting us know. We've updated our records and won't schedule a meeting right now."}
                </p>
              </div>
            </div>
          )}

          
          {isError && (
            <div className="w-full max-w-sm space-y-6 animate-in slide-in-from-bottom-4 duration-300">
              <div className="p-6 bg-red-50 dark:bg-red-900/20 rounded-full inline-block">
                <FaExclamationTriangle size={60} className="text-red-500 mx-auto" />
              </div>
              <h1 className="text-2xl font-bold text-text dark:text-white tracking-tight">
                Request Failed
              </h1>
              <p className="text-gray-500 dark:text-gray-400 leading-relaxed">
                {error?.data?.message || "This confirmation link is invalid or has expired. Please contact support."}
              </p>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default LeadResponsePage;

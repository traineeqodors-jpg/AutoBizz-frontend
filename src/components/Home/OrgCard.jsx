import React from 'react'

function OrgCard({user}) {
  return (
    <div className="h-40 w-full shadow-md/10 rounded-2xl p-5 bg-white dark:bg-gray-900   space-y-3">
      <h2 className="text-text dark:text-white text-lg font-semibold">
        Organization Details
      </h2>
      <ul className="text-text/60 dark:text-gray-400 text-sm">
        <li>Business Name : {user?.businessName}</li>
        <li>Business Size : {user?.businessSize}</li>
        <li>Location : {user?.country}</li>
      </ul>
    </div>
  );
}

export default OrgCard


function OrgCard({user}) {
  return (
    <div className="h-40 w-full shadow-md/10 rounded-2xl p-5 bg-white space-y-3">
    <h1 className="text-lg sm:text-xl font-black text-text tracking-tight">
        Organization Details
      </h1>
      <ul className="text-text/60 text-sm">
        <li>Business Name : {user?.businessName}</li>
        <li>Business Size : {user?.businessSize}</li>
        <li>Location : {user?.country}</li>
      </ul>
    </div>
  );
}

export default OrgCard
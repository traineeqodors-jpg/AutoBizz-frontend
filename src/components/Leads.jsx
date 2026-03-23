import React from 'react'

function Leads() {
  return (
    <div className="bg-white md:w-[50%] w-full md:flex-1 flex-3 rounded-2xl shadow-sm p-5 border border-gray-100">
      <div className="flex justify-between items-center mb-6">
        <h3 className="font-bold text-gray-800 text-lg">Recent Leads</h3>
        <button className="text-blue-600 text-sm font-medium hover:underline">
          View All
        </button>
      </div>

      <div className="space-y-4">
        {/* Lead Item 1 */}
        <div className="flex sm:flex-row flex-col items-center justify-between p-3 hover:bg-gray-50 rounded-xl transition-colors border border-transparent hover:border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold">
              JD
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-900">John Doe</p>
              <p className="text-xs text-gray-500 font-medium">
                john@example.com
              </p>
            </div>
          </div>
          <div className="text-right">
            <span className="px-2 py-1 text-[10px] font-bold uppercase tracking-wider rounded-full bg-green-100 text-green-700">
              High Intent
            </span>
            <p className="text-xs font-bold text-gray-700 mt-1">Score: 92</p>
          </div>
        </div>

        {/* Lead Item 2 */}
        <div className="flex sm:flex-row flex-col items-center justify-between p-3 hover:bg-gray-50 rounded-xl transition-colors border border-transparent hover:border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 font-bold">
              AS
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-900">Alice Smith</p>
              <p className="text-xs text-gray-500 font-medium">
                alice.s@techcorp.io
              </p>
            </div>
          </div>
          <div className="text-right">
            <span className="px-2 py-1 text-[10px] font-bold uppercase tracking-wider rounded-full bg-yellow-100 text-yellow-700">
              Nurturing
            </span>
            <p className="text-xs font-bold text-gray-700 mt-1">Score: 65</p>
          </div>
        </div>

        {/* Lead Item 3 */}
        <div className="flex sm:flex-row flex-col items-center justify-between p-3 hover:bg-gray-50 rounded-xl transition-colors border border-transparent hover:border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 font-bold">
              RK
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-900">Robert King</p>
              <p className="text-xs text-gray-500 font-medium">
                r.king@outlook.com
              </p>
            </div>
          </div>
          <div className="text-right">
            <span className="px-2 py-1 text-[10px] font-bold uppercase tracking-wider rounded-full bg-blue-100 text-blue-700">
              New Lead
            </span>
            <p className="text-xs font-bold text-gray-700 mt-1">Score: 48</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Leads
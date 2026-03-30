import { IoCallOutline, IoEyeSharp, IoTrashOutline } from 'react-icons/io5'

const MobileCallLogView = ({processedLogs , setSelectedLog , openDeleteModal}) => {
  return (
   <>
   <div className="md:hidden flex flex-col gap-4 p-2">
           {processedLogs.map((log) => (
             <div key={log.id} className="bg-white dark:bg-gray-800 dark:border p-6 rounded-3xl border border-gray-100 shadow-sm space-y-4">
               <div className="flex justify-between items-center">
                 <div className="flex items-center gap-3">
                    <div className="p-2 bg-gray-50 text-btn-100 rounded-xl"><IoCallOutline size={18}/></div>
                    <p className="font-bold text-text dark:text-white text-sm">{log.from}</p>
                 </div>
                 <span className={`px-2 py-1 rounded-lg text-[8px] font-bold uppercase ${log.status === 'completed' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>{log.status}</span>
               </div>
               <div className="flex justify-between text-[11px] text-gray-500 px-1 font-medium">
                 <span>{new Date(log.createdAt).toLocaleString()}</span>
                 <span>{log.duration}s</span>
               </div>
               <div className="grid grid-cols-2 gap-3">
                 <button onClick={() => setSelectedLog(log)} className="flex items-center justify-center gap-2 py-3 bg-gray-50 dark:bg-gray-700 dark:border-0 dark:text-white text-text font-bold rounded-xl text-xs border border-gray-100 active:scale-95 transition-all"><IoEyeSharp/> View</button>
                 <button onClick={() => openDeleteModal(log)} className="flex items-center justify-center gap-2 py-3 bg-red-50 text-red-600 font-bold rounded-xl text-xs active:scale-95 transition-all"><IoTrashOutline/> Delete</button>
               </div>
             </div>
           ))}
         </div>
   </>
  )
}

export default MobileCallLogView
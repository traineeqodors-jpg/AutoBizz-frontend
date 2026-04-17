const ReusableTable = ({
  isDocPage,
  columns = [],
  data = [],
  renderRow,
  emptyState,
  isLoading,
}) => {
  return (
    <div className={`${isDocPage ? "" : "hidden"} md:block overflow-x-auto`}>
      <table className="w-full text-center border-separate border-spacing-0">
        {/* HEADER */}
        <thead className="bg-slate-50/80 dark:bg-gray-700 sticky top-0 z-10">
          <tr className="text-slate-500 text-[11px] dark:text-gray-100 uppercase tracking-widest font-bold">
            {columns.map((col, i) => (
              <th key={i} className="px-6 py-4 border-b">
                {col}
              </th>
            ))}
          </tr>
        </thead>

        {/* BODY */}
        <tbody className="divide-y divide-slate-100">
          {isLoading ? (
            <tr>
              <td colSpan={columns.length} className="py-20">
                Loading...
              </td>
            </tr>
          ) : data && data.length > 0 ? (
            data.map((item, index) => renderRow(item, index))
          ) : (
            <tr>
              <td
                colSpan={columns.length}
                className="py-20 text-slate-500 font-medium"
              >
                {emptyState || "No data found"}
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ReusableTable;

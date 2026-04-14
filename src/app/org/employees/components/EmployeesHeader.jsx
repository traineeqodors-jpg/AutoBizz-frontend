import { IoMdAdd } from "react-icons/io";
import AddEmployeeDialog from "./AddEmployeeDialog";

function EmployessHeader({
  dialogRef,
  input,
  handleChange,
  handleSubmit,
  errors,
}) {
  return (
    <>
      <div className="flex flex-col w-full md:flex-row md:items-center justify-between gap-4 bg-surface p-6 rounded-3xl shadow-sm border border-white dark:border-gray-900 dark:shadow-sm dark:shadow-gray-700/30">
        <div>
          <h1 className="text-2xl font-extrabold text-heading dark:text-white tracking-tight">
            Employees Management
          </h1>
          <p className="text-sm text-text/50 dark:text-gray-500 font-medium">
            Add and manage your Employees
          </p>
        </div>

        <button
          onClick={() => dialogRef.current?.showModal()}
          className="flex px-4 cursor-pointer py-3 rounded-xl text-sm font-semibold bg-btn-100 dark:bg-btn-200 text-white gap-1 hover:bg-btn-200 hover:inset-shadow-sm/40 justify-center items-center"
        >
          Add Employee
          <IoMdAdd size={18} />
        </button>
      </div>

      <AddEmployeeDialog
        dialogRef={dialogRef}
        input={input}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        errors={errors}
      />
    </>
  );
}

export default EmployessHeader;

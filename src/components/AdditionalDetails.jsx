import  { useEffect, useRef, useState } from 'react'
import { TbInfoCircleFilled } from "react-icons/tb";
import businessesCategory from "../JSON data/businesses.json"; 
import {DatePicker} from 'react-datepicker'
import { useAddOrgDetailsMutation, useGetOrgDetailsQuery } from '../features/slices/orgDetailsSlice';
import { toast } from 'react-toastify';
import LoadingElement from './LoadingElement';


function AdditionalDetails() {

 
  const [status, setStatus] = useState("");
  const { data, isLoading, refetch } = useGetOrgDetailsQuery();
  const [updateInfo, { isLoading: updateLoading }] = useAddOrgDetailsMutation(); 

   const [description, setDescription] = useState(null);
  const [category, setCategory] = useState(null);
  const [year, setYear] = useState(null);
  
  const timeoutRef = useRef(null)



 

  async function handleInformationChange(e) {
    const { name, value } = e.target;
    
    if (name === "description") {
      setDescription(value);
      setStatus("Saving...");
      if (timeoutRef.current) clearTimeout(timeoutRef.current);

      timeoutRef.current = setTimeout(async () => {
        try {
          await updateInfo({ description: value }).unwrap();
          setStatus("Saved");
        } catch (err) {
          setStatus("Failed")
          console.error("Failed to save:", err);
        }
      }, 2000);
    }

    else if (name === "category") {
      setCategory(value);

      try {
        await updateInfo({ orgCategory: value });
        toast.success('Category updated successfully!')
      } catch (error) {
        toast.error('Failed to update!' , error);
        refetch();
      }
    }
  }

  async function handleYearChange(year) {
    
    const dateObj = new Date(year);
    const date = dateObj.getFullYear(); 
    
    try {
      
      const response = await updateInfo({ startedInYear: Number(date) });
      console.log(response);
      
      if (!updateLoading && !response?.data?.success) {
        toast.error("Failed to update!");
      }
      setYear(date);
      
      toast.success("Started year updated!");
    } catch (error) {
      toast.error("Failed to update!" , error);
    }
  }
  

  return (
    <div className="w-full bg-white rounded-2xl shadow-md/10 gap-5 overflow-hidden">
      <h3 className="text-xl text-text flex gap-2 p-4 bg-gray-50 border-b items-center border-gray-300 w-full">
        <div className="flex flex-row gap-3 items-center">
          <TbInfoCircleFilled className="size-5 text-btn-100" />
          <p className="font-bold">Additional Informations</p>
        </div>
      </h3>
      {isLoading ? (
        <LoadingElement />
      ) : (
        <div className="p-5 flex flex-col gap-4">
          <form>
            <div className="relative w-full">
              <textarea
                name="description"
                className="w-full bg-transparent border px-4 border-gray-300 focus:outline-none focus:border-btn-100 font-medium py-3 tracking-wide mt-1 rounded-lg"
                rows={5}
                placeholder="Describe your business..."
                 value={description !== null ? description : (data?.data?.description || "")}
                onChange={handleInformationChange}
              />
              <div className="absolute bottom-2 right-2 text-xs font-semibold bg-white px-1">
                {status === "Saving..." && (
                  <span className="text-orange-500 animate-pulse">
                    Saving...
                  </span>
                )}
                {status === "Saved" && (
                  <span className="text-green-600">Saved!</span>
                )}
                {status === "Error saving" && (
                  <span className="text-red-500">Failed to save</span>
                )}
              </div>
            </div>
            <div className="flex md:flex-row flex-col gap-3">
              <div className="flex flex-col flex-2 gap-1">
                <label className="text-xs text-text/60">
                  Business Category
                </label>
                <select
                  name="category"
                  value={category !== null ? category : (data?.data?.orgCategory || "")}
                  onChange={handleInformationChange}
                  className="flex-1 bg-transparent border px-4 border-gray-300 focus:outline-none focus:border-btn-100 font-medium py-2 rounded-lg"
                >
                  <option value="" disabled>
                    - Category -
                  </option>
                  {businessesCategory.business_categories.map((b) => (
                    <option key={b.id} value={b.id}>
                      {b.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex flex-col flex-1 gap-1">
                <label className="text-xs text-text/60">Started in year</label>
                <DatePicker
                  calendarClassName="custom-calendar-style"
                  className="w-full bg-transparent border px-4 border-gray-300 focus:outline-none focus:border-btn-100 font-medium py-2 rounded-lg"
                  selected={new Date(year || data?.data?.startedInYear || new Date().getFullYear(), 0, 1)}
                  maxDate={new Date()}
                  filterDate={(date) =>
                    date.getFullYear() <= new Date().getFullYear()
                  }
                  onChange={(date) => handleYearChange(date)}
                  showYearPicker
                  dateFormat="yyyy"
                />
              </div>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

export default AdditionalDetails
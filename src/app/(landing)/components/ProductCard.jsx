"use client";

import { useRef } from "react";
import InfoDialog from "./InfoDialog";
import Image from "next/image";

const ProductCard = ({ img, title, desc, features }) => {
  const dialogRef = useRef(null);

  return (
    <div className="group flex flex-col bg-surface rounded-3xl overflow-hidden border border-slate-100 dark:border-gray-400 shadow-sm hover:shadow-xl hover:shadow-btn-100/5 transition-all dark:transition-none duration-500 h-full">
      <div className="h-44 w-full overflow-hidden bg-slate-50 dark:bg-gray-500 flex items-center justify-center">
        <Image
          src={img}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          width={500}
          height={500}
          alt={title}
        />
      </div>

      <div className="p-5 flex flex-col flex-1">
        <div className="mb-2">
          <h3 className="text-lg font-bold text-text leading-tight group-hover:text-btn-100 transition-colors">
            {title}
          </h3>
        </div>
        <p className="text-text/50 dark:text-gray-400 text-xs leading-relaxed line-clamp-2 mb-4 flex-1">
          {desc}
        </p>
        <button
          onClick={() => dialogRef.current?.showModal()}
          className="w-full py-2 bg-back dark:bg-gray-700 group-hover:bg-btn-100 dark:group-hover:bg-btn-100 group-hover:text-white dark:group-hover:text-white text-text text-sm font-bold rounded-xl transition-all duration-300 cursor-pointer"
        >
          Learn More
        </button>
      </div>

      <InfoDialog dialogRef={dialogRef} title={title} features={features} />
    </div>
  );
};

export default ProductCard;

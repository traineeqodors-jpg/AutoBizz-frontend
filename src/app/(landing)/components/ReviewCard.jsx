import { IoStar } from "react-icons/io5";

export default function ReviewCard({ name, role, text }) {
  return (
    <>
      <div className="bg-surface p-8 rounded-3xl border border-slate-100 shadow-sm space-y-4">
        <div className="flex gap-1 text-yellow-400">
          {[...Array(5)].map((_, i) => (
            <IoStar key={i} />
          ))}
        </div>
        <p className="text-text/70 dark:text-gray-300 ital  ic text-sm leading-relaxed">
          &quot;{text}&quot;
        </p>
        <div>
          <p className="font-bold text-text dark:text-gray-300 text-sm">
            {name}
          </p>
          <p className="text-text/40 dark:text-gray-400 text-[10px] uppercase font-bold tracking-widest">
            {role}
          </p>
        </div>
      </div>
    </>
  );
}

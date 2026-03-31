import { useSelector } from "react-redux";

const LoadingElement = () => {
  const isDark = useSelector((state) => state.theme.isDark);
  return (
    <div className="min-h-screen dark:bg-gray-800 flex justify-center-safe items-center-safe">
      {isDark ? (
        <div className="relative flex items-center justify-center">
          <div className="w-12 h-12 border-4 border-btn-100/20 border-t-btn-100 rounded-full animate-spin"></div>
        </div>
      ) : (
        <div className="loader"></div>
      )}
    </div>
  );
};

export default LoadingElement;

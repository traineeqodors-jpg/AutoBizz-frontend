const CustomTooltip = ({
  index,
  step,
  backProps,
  primaryProps,
  skipProps,
  tooltipProps,
  isLastStep,
  size,
}) => {
  
  const { style, ref, zIndex: _discard, ...safeProps } = tooltipProps;


  const manualZIndex = step.styles?.options?.zIndex || 1000000;

  return (
    <div
      {...safeProps} 
      ref={ref}
      style={{
        ...style,
        zIndex: manualZIndex,
      }}
      className="bg-surface text-text p-5 rounded-xl shadow-2xl border border-gray-700 w-80 max-w-[90vw] transition-all"
    >
      <div className="flex justify-between items-center mb-3 text-xs">
        <span className="font-bold text-blue-400 uppercase tracking-widest">
          Step {index + 1} / {size}
        </span>
        <button
          {...skipProps}
          className="text-gray-400 hover:text-text transition"
        >
          Skip
        </button>
      </div>

      <h3 className="text-lg font-semibold mb-2">{step.title}</h3>
      <div className="text-text text-sm leading-relaxed">{step.content}</div>

      <div className="flex justify-between items-center mt-6">
        <div>
          {index > 0 && (
            <button
              {...backProps}
              className="text-gray-400 hover:text-white transition"
            >
              Back
            </button>
          )}
        </div>
        <button
          {...primaryProps}
          className="px-5 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-sm font-bold shadow-lg"
        >
          {isLastStep ? "Finish" : "Next"}
        </button>
      </div>
    </div>
  );
};
export default CustomTooltip;

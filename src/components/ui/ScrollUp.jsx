import { FaChevronCircleUp } from 'react-icons/fa';

function ScrollUp({ scrollToTop }) {
  return (
    <div
      className={`absolute bottom-40 lg:right-22 h-fit md:right-12 right-8 z-50 inline`}
    >
      <FaChevronCircleUp className="text-btn-50/30 dark:text-white/30 size-8 hover:border-2 hover:border-btn-50 rounded-full" onClick={scrollToTop} />
    </div>
  );
}

export default ScrollUp
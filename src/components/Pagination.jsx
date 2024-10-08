import { ArrowLongLeftIcon, ArrowLongRightIcon } from '@heroicons/react/20/solid';

export default function Pagination({ limit, totalPage, skip, setSkip }) {
  
  const currentPage = Math.floor(skip / limit) + 1;
  
  const goToPage = (page) => {
    setSkip((page - 1) * limit);
  };

  const handleNext = () => {
    if (currentPage < totalPage) {
      setSkip(skip + limit);
    }
  };

  const handlePrevious = () => {
    if (currentPage > 1) {
      setSkip(skip - limit);
    }
  };

  return (
    <nav className="flex items-center justify-between border-t border-gray-200 px-4 sm:px-0">
      <div className="-mt-px flex w-0 flex-1">
        <button
          onClick={handlePrevious}
          disabled={currentPage === 1}
          className={`inline-flex items-center border-t-2 border-transparent pr-1 pt-4 text-sm font-medium ${currentPage === 1 ? 'text-gray-300' : 'text-gray-500 hover:border-gray-300 hover:text-gray-700'}`}
        >
          <ArrowLongLeftIcon aria-hidden="true" className="mr-3 h-5 w-5" />
          Previous
        </button>
      </div>
      <div className="hidden md:-mt-px md:flex">
        {[...Array(totalPage)].map((_, idx) => {
          const page = idx + 1;
          return (
            <button
              key={page}
              onClick={() => goToPage(page)}
              className={`inline-flex items-center border-t-2 px-4 pt-4 text-sm font-medium ${currentPage === page ? 'border-indigo-500 text-indigo-600' : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'}`}
            >
              {page}
            </button>
          );
        })}
      </div>
      <div className="-mt-px flex w-0 flex-1 justify-end">
        <button
          onClick={handleNext}
          disabled={currentPage === totalPage}
          className={`inline-flex items-center border-t-2 border-transparent pl-1 pt-4 text-sm font-medium ${currentPage === totalPage ? 'text-gray-300' : 'text-gray-500 hover:border-gray-300 hover:text-gray-700'}`}
        >
          Next
          <ArrowLongRightIcon aria-hidden="true" className="ml-3 h-5 w-5" />
        </button>
      </div>
    </nav>
  );
}

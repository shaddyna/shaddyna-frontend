import { FC } from 'react';

interface PaginationProps {
  total: number;
  currentPage: number;
}

const Pagination: FC<PaginationProps> = ({ total, currentPage }) => {
  return (
    <div className="flex justify-center items-center gap-4 mt-6">
      <button
        className="px-6 py-2 bg-[#ff199c] text-white rounded-xl"
        disabled={currentPage === 1}
      >
        Previous
      </button>
      <span className="text-lg text-[#182155]">
        {currentPage} of {Math.ceil(total / 10)}
      </span>
      <button
        className="px-6 py-2 bg-[#ff199c] text-white rounded-xl"
        disabled={currentPage === Math.ceil(total / 10)}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;

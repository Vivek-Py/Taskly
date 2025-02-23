import React, {useEffect, useState} from 'react';
import Button from './Button';
import {PaginationProps} from './type';

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalItems,
  itemsPerPage,
  onPageChange,
  setItemsPerPage
}) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const [pageInput, setPageInput] = useState(currentPage);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      onPageChange(page);
      setPageInput(page);
    }
  };

  const handlePageInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (/^\d*$/.test(value)) {
      setPageInput(Number(value));
    }
  };

  const handlePageInputBlur = () => {
    if (pageInput >= 1 && pageInput <= totalPages) {
      handlePageChange(pageInput);
    } else {
      setPageInput(currentPage);
    }
  };

  useEffect(() => {
    setPageInput(1);
  }, [totalItems]);

  return (
    <div className="flex flex-row justify-between items-center">
      <div className="space-x-2">
        <span>Items per page</span>
        <select
          id="items-per-page-select"
          value={itemsPerPage}
          onChange={(e) => setItemsPerPage(Number(e.target.value))}
          className="min-w-[60px] border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring focus:border-blue-300"
        >
          <option value={5}>5</option>
          <option value={10}>10</option>
          <option value={20}>20</option>
          <option value={50}>50</option>
        </select>
      </div>
      <div className="flex items-center space-x-2">
        <span>Page</span>
        <input
          type="number"
          value={pageInput}
          onChange={handlePageInputChange}
          onBlur={handlePageInputBlur}
          className="w-12 border border-gray-300 rounded-md px-2 py-1 focus:outline-none focus:ring focus:border-blue-300"
        />
        <span>{`of ${totalPages || 1}`}</span>
      </div>
      <div className="flex flex-row space-x-2">
        <Button
          id="previous-page-btn"
          btnType="tertiary"
          label="Previous"
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </Button>
        <Button
          id="next-page-btn"
          label="Next"
          btnType="tertiary"
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default Pagination;

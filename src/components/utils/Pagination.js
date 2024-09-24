import React, { useState, useEffect } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const Pagination = ({ items, itemsPerPage }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pages, setPages] = useState([]);

  useEffect(() => {
    const totalPages = Math.ceil(items.length / itemsPerPage);
    setPages(Array.from({ length: totalPages }, (_, i) => i + 1));
  }, [items, itemsPerPage]);

  const displayedItems = () => {
    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    return items.slice(start, end);
  };

  const displayedPages = () => {
    if (currentPage === 1) {
      return pages.slice(0, 5);
    } else if (currentPage === pages.length) {
      return pages.slice(-5);
    } else if (currentPage >= 4 && currentPage <= pages.length - 3) {
      return pages.slice(currentPage - 2, currentPage + 3);
    } else {
      return pages.slice(0, 5);
    }
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const nextPage = () => {
    if (currentPage < pages.length) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div>
      <ul>
        {displayedItems().map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
      
      <ul className="pagination">
        <li onClick={prevPage} className={currentPage === 1 ? 'disabled' : ''}>
          <FaChevronLeft />
        </li>

        {currentPage > 3 && <li onClick={() => handlePageChange(1)}>1</li>}
        {currentPage > 3 && <li>...</li>}

        {displayedPages().map((pageNumber) => (
          <li
            key={pageNumber}
            onClick={() => handlePageChange(pageNumber)}
            className={currentPage === pageNumber ? 'active' : ''}
          >
            {pageNumber}
          </li>
        ))}

        {currentPage < pages.length - 2 && <li>...</li>}
        {currentPage < pages.length - 2 && (
          <li onClick={() => handlePageChange(pages.length)}>{pages.length}</li>
        )}

        <li onClick={nextPage} className={currentPage === pages.length ? 'disabled' : ''}>
          <FaChevronRight />
        </li>
      </ul>
    </div>
  );
};

export default Pagination;
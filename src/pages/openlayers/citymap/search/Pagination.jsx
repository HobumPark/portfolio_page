import React, { useState, useEffect } from 'react';
import '../css/Pagination.css';  // css 임포트

const Pagination = ({ totalItems, itemsPerPage = 16, currentPage, setCurrentPage }) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  // 페이지 번호 클릭 핸들러
  const handlePageClick = (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  // 페이지 번호 배열 생성 (간단하게 1~totalPages)
  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  if (totalPages === 0) return null;

  return (
    <div style={{ marginTop: 20, textAlign: 'center' }}>
      <button
        onClick={() => handlePageClick(currentPage - 1)}
        disabled={currentPage === 1}
      >
        이전
      </button>

      {pageNumbers.map((page) => (
        <button
          key={page}
          onClick={() => handlePageClick(page)}
          style={{
            margin: '0 5px',
            fontWeight: page === currentPage ? 'bold' : 'normal',
          }}
        >
          {page}
        </button>
      ))}

      <button
        onClick={() => handlePageClick(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        다음
      </button>
    </div>
  );
};

export default Pagination;

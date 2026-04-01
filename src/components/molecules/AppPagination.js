import React from 'react';
import { Pagination } from 'react-bootstrap';

export default function AppPagination({ currentPage, totalPages, onPageChange }) {
  if (totalPages <= 1) return null;

  let items = [];
  for (let number = 1; number <= totalPages; number++) {
    items.push(
      <Pagination.Item key={number} active={number === currentPage} onClick={() => onPageChange(number)}>
        {number}
      </Pagination.Item>
    );
  }

  return <Pagination className="justify-content-center mt-4">{items}</Pagination>;
}
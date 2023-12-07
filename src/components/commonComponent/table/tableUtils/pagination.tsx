import React from "react";
import { Pagination } from "react-bootstrap";

interface PaginationComponentProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (pageNumber: number) => void;
}

const PaginationComponent: React.FC<PaginationComponentProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  return (
    <Pagination>
      <div className={`paginationContainer`}>
        <Pagination.First
          disabled={currentPage === 1}
          onClick={() => onPageChange(1)}
        >
          First
        </Pagination.First>
        <Pagination.Prev
          disabled={currentPage === 1}
          onClick={() => onPageChange(currentPage - 1)}
        >
          Prev
        </Pagination.Prev>

        {[...Array(totalPages)].map((_, index) => (
          <Pagination.Item
            key={index + 1}
            active={index + 1 === currentPage}
            onClick={() => onPageChange(index + 1)}
            className="cursor-pointer"
          >
            {index + 1}
          </Pagination.Item>
        ))}

        <Pagination.Next
          disabled={currentPage === totalPages}
          onClick={() => onPageChange(currentPage + 1)}
        >
          Next
        </Pagination.Next>
        <Pagination.Last
          disabled={currentPage === totalPages}
          onClick={() => onPageChange(totalPages)}
        >
          Last
        </Pagination.Last>
      </div>
    </Pagination>
  );
};

export default PaginationComponent;

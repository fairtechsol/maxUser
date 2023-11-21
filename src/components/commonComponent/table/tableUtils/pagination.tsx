import React from "react";
import { Pagination } from "react-bootstrap";
import CustomButton from "../../button";

interface PaginationComponentProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (pageNumber: number) => void;
  itemCount: number;
  rowPerPage: number;
}

const PaginationComponent: React.FC<PaginationComponentProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  itemCount,
  rowPerPage,
}) => {
  return (
    <Pagination>
      <div className="title-14">
        Showing {currentPage === 1 ? 1 : (currentPage - 1) * rowPerPage + 1} to{" "}
        {Math.min(currentPage * rowPerPage, itemCount)} of {itemCount} entries
      </div>
      <div className="paginationContainer">
        <CustomButton
          variant="primary"
          disabled={currentPage === 1}
          onClick={() => onPageChange(currentPage - 1)}
          className="paginationBtn"
        >
          Previous
        </CustomButton>
        {[...Array(totalPages)].map((_, index) => (
          <Pagination.Item
            key={index + 1}
            active={index + 1 === currentPage}
            onClick={() => onPageChange(index + 1)}
          >
            {index + 1}
          </Pagination.Item>
        ))}
        <CustomButton
          variant="primary"
          disabled={currentPage === totalPages}
          onClick={() => onPageChange(currentPage + 1)}
          className="paginationBtn"
        >
          Next
        </CustomButton>
      </div>
    </Pagination>
  );
};

export default PaginationComponent;

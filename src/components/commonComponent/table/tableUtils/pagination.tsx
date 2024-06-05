import React, { useEffect, useState } from "react";
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
  const [pageComp, setPageComp] = useState([]);

  useEffect(() => {
    let isPageNumberOutOfRange: Boolean;
    const pageNumbers: any = [...new Array(totalPages)].map((_, index) => {
      const pageNumber = index + 1;
      const isPageNumberFirst = pageNumber === 1;
      const isPageNumberLast = pageNumber === totalPages;
      const isCurrentPageWithinTwoPageNumbers =
        Math.abs(pageNumber - currentPage) < 1;

      if (
        isPageNumberFirst ||
        isPageNumberLast ||
        isCurrentPageWithinTwoPageNumbers
      ) {
        isPageNumberOutOfRange = false;
        return (
          <Pagination.Item
            key={pageNumber}
            onClick={() => onPageChange(pageNumber)}
            active={pageNumber === currentPage}
          >
            {pageNumber}
          </Pagination.Item>
        );
      }

      if (!isPageNumberOutOfRange) {
        isPageNumberOutOfRange = true;
        return <Pagination.Ellipsis key={pageNumber} className="muted" />;
      }

      return null;
    });

    setPageComp(pageNumbers);
  }, [totalPages, currentPage]);

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

        {pageComp?.map((item) => item)}

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

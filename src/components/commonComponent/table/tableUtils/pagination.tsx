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
  console.log(currentPage, "totalPages", totalPages);
  return (
    <div className="d-flex flex-row">
      <Pagination>
        <div className={`paginationContainer`}>
          <Pagination.First
            disabled={currentPage <= 1 ? true : false}
            onClick={() => onPageChange(1)}
          >
            First
          </Pagination.First>
          <Pagination.Prev
            disabled={currentPage <= 1 ? true : false}
            onClick={() => onPageChange(currentPage - 1)}
          >
            Previous
          </Pagination.Prev>
          <Pagination.Next
            disabled={totalPages === 0 ? true : currentPage === totalPages}
            onClick={() => onPageChange(currentPage + 1)}
          >
            Next
          </Pagination.Next>
          <Pagination.Last
            disabled={totalPages === 0 ? true : currentPage === totalPages}
            onClick={() => onPageChange(totalPages)}
          >
            Last
          </Pagination.Last>

          <div className="title-16 d-flex justify-content-center align-items-center ms-2">
            Page
            <span className="fbold ms-1 me-2">
              {currentPage} of {totalPages}
            </span>{" "}
            | Go to Page{" "}
            <input
              type="number"
              value={currentPage}
              onChange={(e: any) => onPageChange(e.target.value)}
              min={1}
              max={totalPages}
              style={{ width: "100px", height: "38px" ,border:"1px solid #dbdbdb",padding:"5px",marginLeft:"5px"}}
            />
          </div>
        </div>
      </Pagination>
    </div>
  );
};

export default PaginationComponent;

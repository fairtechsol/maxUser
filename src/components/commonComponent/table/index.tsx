// CustomTable.tsx
import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { Column } from "../../../models/tableInterface";
import isMobile from "../../../utils/screenDimension";
import "./style.scss";
import TableHeader from "./tableHeader";
import PaginationComponent from "./tableUtils/pagination"; // Import the PaginationComponent
import SortIcon from "./tableUtils/sort";

interface SortConfig {
  key: string | null | number;
  direction: "asc" | "desc";
}

interface CustomTableProps {
  columns: Column[];
  customClass?: string;
  isPagination?: boolean;
  isSort?: boolean;
  children?: any;
  itemCount: number;
  setTableConfig: any;
  isSearch?: boolean;
  enablePdfExcel?: boolean;
  tHeadTheme?: string;
  tBodyTheme?: string;
  bordered?: boolean;
  striped?: boolean;
  paginationCount?: boolean;
}

const CustomTable: React.FC<CustomTableProps> = ({
  columns,
  itemCount,
  customClass,
  isPagination,
  isSort,
  children,
  isSearch,
  setTableConfig,
  enablePdfExcel,
  tHeadTheme,
  tBodyTheme,
  paginationCount,
  ...props
}) => {
  // State for sorting configuration and current page
  const [sortConfig, setSortConfig] = useState<SortConfig>({
    key: null,
    direction: "asc",
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [rowPerPage, setRowPerPage] = useState(10);

  // Handle column click to change the sorting configuration
  const handleSort = (key: string | number) => {
    setSortConfig((prevSortConfig) => ({
      key,
      direction:
        prevSortConfig.key === key && prevSortConfig.direction === "asc"
          ? "desc"
          : "asc",
    }));
  };

  // Handle pagination item click to set the current page
  const onPageChange = (pageNumber: number) => setCurrentPage(pageNumber);

  //   for api fetching when sort or page change
  useEffect(() => {
    setTableConfig((prev: any) => {
      return {
        ...prev,
        page: currentPage,
        sort: sortConfig,
        rowPerPage: rowPerPage,
      };
    });
    // alert(tHeadTheme);
  }, [currentPage, sortConfig, rowPerPage]);
  return (
    <div className={`${customClass ?? ""} customTable`}>
      <TableHeader
        enablePdfExcel={enablePdfExcel}
        isPagination={isPagination}
        isSearch={isSearch}
        setTableConfig={setTableConfig}
        rowPerPage={rowPerPage}
        setRowPerPage={setRowPerPage}
        paginationCount={paginationCount}
      />
      {/* Table for displaying data */}
      <Table {...props} responsive>
        <thead>
          <tr>
            {/* Table header with sorting icons */}
            {columns.map((column, index) => (
              <th
                className={`${tHeadTheme} text-center ${
                  isMobile ? "bg-secondary title-12 f800 p-1" : "f600"
                }`}
                key={index}
              >
                {column.label}
                {/* Display sorting icons based on the sorting configuration */}
                {isSort && (
                  <SortIcon
                    isActive={sortConfig.key === column.id}
                    isAscending={sortConfig.direction === "asc"}
                    clickHandler={handleSort}
                    id={column.id}
                  />
                )}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="text-center">
          {/* Table body with sorted data */}
          {itemCount === 0 ? (
            <tr className="text-center">
              <td
                className={`${tBodyTheme ?? ""} ${isMobile && "bg-white"}`}
                colSpan={columns?.length}
              >
                <p className={`${isMobile ? "title-12 f500" : "title-14"}`}>
                  No data available in table
                </p>
              </td>
            </tr>
          ) : (
            children
          )}
        </tbody>
      </Table>
      {/* Pagination component for navigating through pages */}
      {isPagination && (
        <PaginationComponent
          currentPage={currentPage}
          totalPages={Math.ceil(itemCount / rowPerPage)}
          onPageChange={onPageChange}
        />
      )}
    </div>
  );
};

export default CustomTable;

// CustomTable.tsx
import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { Column } from "../../../models/tableInterface";
import { isMobile } from "../../../utils/screenDimension";
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
  width?: any;
  placeHolder?: any;
}

const CustomTable2: React.FC<CustomTableProps> = ({
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
  width,
  placeHolder,
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
  }, [currentPage, sortConfig, rowPerPage]);

  useEffect(() => {
    setCurrentPage(1);
    setTableConfig((prev: any) => {
      return {
        ...prev,
        page: 1,
      };
    });
  }, [rowPerPage]);
  return (
    <div className={`${customClass ?? ""}`}>
      <TableHeader
        enablePdfExcel={enablePdfExcel}
        isPagination={isPagination}
        isSearch={isSearch}
        setTableConfig={setTableConfig}
        rowPerPage={rowPerPage}
        setRowPerPage={setRowPerPage}
        paginationCount={paginationCount}
        placeHolder={placeHolder}
      />
      {/* Table for displaying data */}
      <div className="w-100" >
        <Table {...props} responsive style={width ? { width: width } : {}}>
          <thead style={{ border: "1px solid #aaa" }}>
            <tr>
              {/* Table header with sorting icons */}
              {columns.map((column, index) => (
                <th
                  className={`${tHeadTheme} text-start ${isMobile ? " title-12 f800 p-1" : "title-16 f600"
                    }`}
                  key={index}
                  style={{ borderRight: "1px solid #aaa", backgroundColor: "#eee" }}
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
          <tbody className="text-center" style={{ border: "1px solid #aaa" }}>
            {/* Table body with sorted data */}
            {itemCount === 0 ? (
              <tr className="text-center ">
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
      </div>
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

export default CustomTable2;

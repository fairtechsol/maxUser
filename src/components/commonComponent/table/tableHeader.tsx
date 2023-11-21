import React, { useEffect, useState } from "react";
import { FaRegFileExcel, FaRegFilePdf } from "react-icons/fa";
import CustomButton from "../button";
import RowPerPage from "./tableUtils/rowPerPage";
import SearchBox from "./tableUtils/search";

interface TableHeaderProps {
  enablePdfExcel?: boolean;
  isPagination?: boolean;
  isSearch?: boolean;
  setTableConfig: any;
  rowPerPage: number;
  setRowPerPage: any;
}

const TableHeader: React.FC<TableHeaderProps> = ({
  enablePdfExcel,
  isPagination,
  isSearch,
  setTableConfig,
  rowPerPage,
  setRowPerPage,
}) => {
  const [keyword, setKeyword] = useState("");
  useEffect(() => {
    setTableConfig((prev: any) => {
      return { ...prev, keyword: keyword };
    });
  }, []);

  return (
    <div className="d-flex justify-content-between align-items-center">
      {enablePdfExcel && (
        <div className="d-flex gap-2 mb-2">
          <CustomButton className="d-flex gap-1 align-items-center pdf border-0">
            <FaRegFilePdf />
            PDF
          </CustomButton>
          <CustomButton className="d-flex gap-1 align-items-center excel border-0">
            <FaRegFileExcel />
            Excel
          </CustomButton>
        </div>
      )}
      {isPagination && (
        <RowPerPage value={rowPerPage} onChange={setRowPerPage} />
      )}
      {isSearch && <SearchBox value={keyword} onSearch={setKeyword} />}
    </div>
  );
};

export default TableHeader;

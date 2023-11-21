// SortIcon.tsx
import React from "react";
import { FaSort, FaSortDown, FaSortUp } from "react-icons/fa";

interface SortIconProps {
  isActive: boolean;
  isAscending: boolean;
  clickHandler: (id: string | number) => void;
  id: string | number;
}

const SortIcon: React.FC<SortIconProps> = ({
  isActive,
  isAscending,
  clickHandler,
  id,
}) => {
  return (
    <span
      className={`sortIcon ${
        isActive
          ? isAscending
            ? "sortIconDark"
            : "sortIconDark"
          : "sortIconGray"
      }`}
      onClick={() => clickHandler(id)}
    >
      {isActive ? isAscending ? <FaSortUp /> : <FaSortDown /> : <FaSort />}
    </span>
  );
};

export default SortIcon;

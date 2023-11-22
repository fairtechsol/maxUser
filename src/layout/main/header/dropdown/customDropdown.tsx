import React from "react";
import { FaChevronDown } from "react-icons/fa";

const CustomDropDown = React.forwardRef(
  ({ children, onClick }: any, ref: any) => (
    <span
      ref={ref}
      className="white-text text-decoration-none d-flex gap-2 align-items-center"
      onClick={(e) => {
        e.preventDefault();
        onClick(e);
      }}
    >
      {children}
      <FaChevronDown />
    </span>
  )
);

export default CustomDropDown;

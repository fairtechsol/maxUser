import React from "react";
import "../style.scss";
import { FaLock } from "react-icons/fa";
const Overlay = ({ title, children, active }) => {
  return (
    <div
      className={`${active ? "suspended-o" : ""} d-flex w-75`}
      style={{ position: "relative" }}
    >
      {active && (
        <div className="">
          {title && title !== "Lock" && (
            <h5 className="text-uppercase">
              {title === "active" ? "" : title}
            </h5>
          )}
          {title === "Lock" && <FaLock />}
        </div>
      )}
      {children}
    </div>
  );
};

export default Overlay;

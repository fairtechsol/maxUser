import React from "react";
import "../style.scss";
import { FaLock } from "react-icons/fa";
const Overlay = ({ title, children, active }) => {
  return (
<div className={`${active ? "suspended-o" : ""} d-flex w-75`}>
  {active && title && title !== "Lock" && (
    <h5 className="overlay-title text-uppercase">
      {title === "active" ? "" : title}
    </h5>
  )}
  {children}
</div>

  );
};

export default Overlay;

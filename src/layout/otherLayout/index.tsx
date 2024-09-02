import { Outlet } from "react-router-dom";

export default function OtherLayout() {
  return (
    <div className="main-container">
      <div className="content-wrapper">
        <Outlet />
      </div>
    </div>
  );
}

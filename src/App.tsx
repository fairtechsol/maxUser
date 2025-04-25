import "bootstrap/dist/css/bootstrap.min.css";
import { RouterProvider } from "react-router-dom";
import { ToastContainer, Zoom } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./assets/common.scss";
import routes from "./routes";
import "./theme/theme.css";
import LogoutTimer from "./utils/LogoutTimer";
import { isMobile } from "./utils/screenDimension";

const contextClass = {
  success: "bg-blue-600",
  error: "bg-red-600",
  info: "bg-gray-600",
  warning: "bg-orange-400",
  default: "bg-indigo-600",
  dark: "bg-white-600 font-gray-300",
};
function App() {
  if (process.env.NODE_ENV === "production") console.log = () => { };
  return (
    <>
      <LogoutTimer />
      <RouterProvider router={routes()} />
      <ToastContainer
        toastClassName={(context) =>
          contextClass[context?.type || "default"] +
          " relative lh-1 flex p-1 min-h-10 rounded-md justify-between overflow-hidden cursor-pointer custom-toast"
        }
        bodyClassName={"text-sm font-white"}
        position="top-center"
        autoClose={1500}
        transition={Zoom}
        closeButton={false}
        closeOnClick={false}
        draggable={false}
        hideProgressBar={true}
        style={{
          width: "300px",
          height: "100px",
          ...(isMobile ? { width: "100%", marginTop: "1%" } : {}),
        }}
      />
    </>
  );
}

export default App;

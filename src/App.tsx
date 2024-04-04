import "bootstrap/dist/css/bootstrap.min.css";
import { RouterProvider } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./assets/common.scss";
import routes from "./routes";
import "./theme/theme.css";
import LogoutTimer from "./utils/LogoutTimer";

function App() {
  if (process.env.NODE_ENV === "production") console.log = () => {};
  return (
    <>
      <LogoutTimer/>
      <RouterProvider router={routes()} />
      <ToastContainer />
    </>
  );
}

export default App;

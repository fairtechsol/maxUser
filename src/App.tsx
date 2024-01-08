import "bootstrap/dist/css/bootstrap.min.css";
import { RouterProvider } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./assets/common.scss";
import routes from "./routes";
import "./theme/theme.css";

function App() {
  return (
    <>
      <RouterProvider router={routes()} />
      <ToastContainer />
    </>
  );
}

export default App;

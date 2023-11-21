import "bootstrap/dist/css/bootstrap.min.css";
import { RouterProvider } from "react-router-dom";
import "./assets/common.scss";
import routes from "./routes";
import "./theme/theme.css";
// import "./theme/color-theme.css";

function App() {
  return <RouterProvider router={routes()} />;
}

export default App;

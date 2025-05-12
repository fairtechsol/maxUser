import { createBrowserRouter } from "react-router-dom";
// routes
import config from "../../config";
import AuthRoutes from "./authRoutes";
import ExternalRoutes from "./externalRoutes";
import MainRoutes from "./mainRoutes";
import OtherRoutes from "./otherRoutes";
// ==============================|| ROUTING RENDER ||============================== //

export default function routes() {
  return createBrowserRouter(
    [AuthRoutes, MainRoutes, OtherRoutes, ExternalRoutes],
    {
      basename: config.BASE_NAME,
    }
  );
}

import { createBrowserRouter } from "react-router-dom";
// routes
import config from "../../config";
import AuthRoutes from "./authRoutes";
import MainRoutes from "./mainRoutes";
import OtherRoutes from "./otherRoutes";
import ExternalRoutes from "./externalRoutes";
// ==============================|| ROUTING RENDER ||============================== //

export default function routes() {
  return createBrowserRouter([AuthRoutes, MainRoutes, OtherRoutes,ExternalRoutes], {
    basename: config.BASE_NAME,
  });
}

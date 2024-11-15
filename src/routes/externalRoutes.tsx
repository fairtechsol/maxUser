import { Navigate } from "react-router-dom";
import OtherLayout from "../layout/otherLayout";
import Terms from "../pages/public/TermsCondition";
import ResponsibleGaming from "../pages/public/ResponsibleGaming";

const ExternalRoutes = {
  path: "/",
  element: <OtherLayout />,
  children: [
    { index: true, element: <Navigate to={"/login"} replace /> },
    {
      path: "terms-and-conditions",
      element: <Terms />,
    },
    {
      path: "responsible-gaming",
      element: <ResponsibleGaming />,
    },
    {
      path: "*",
      element: <Navigate to={"/login"} replace />,
    },
  ],
};
export default ExternalRoutes;

import { Navigate } from "react-router-dom";
import VideoPage from "../pages/public/VideoPage";
import ScoreBoardPage from "../pages/public/ScoreBoardPage";
import OtherLayout from "../layout/otherLayout";

const OtherRoutes = {
  path: "/",
  element: <OtherLayout />,
  children: [
    { index: true, element: <Navigate to={"/login"} replace /> },
    {
      path: "videoPage/:vidId",
      element: <VideoPage />,
    },
    {
      path: "scoreBoardPage/:vidId",
      element: <ScoreBoardPage />,
    },
    {
      path: "*",
      element: <Navigate to={"/login"} replace />,
    },
  ],
};
export default OtherRoutes;

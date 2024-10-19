import { Navigate } from "react-router-dom";
import VideoPage from "../pages/public/VideoPage";
import ScoreBoardPage from "../pages/public/ScoreBoardPage";
import OtherLayout from "../layout/otherLayout";
import LiveStreamPage from "../pages/public/liveStreamPage";

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
      path: "liveStream/:vidId/:sportId",
      element: <LiveStreamPage />,
    },
    {
      path: "scoreBoardPage/:vidId/:sportsId",
      element: <ScoreBoardPage />,
    },
    {
      path: "*",
      element: <Navigate to={"/login"} replace />,
    },
  ],
};
export default OtherRoutes;

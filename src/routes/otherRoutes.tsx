import { Navigate } from "react-router-dom";
import OtherLayout from "../layout/otherLayout";
import LiveStreamPage from "../pages/public/liveStreamPage";
import LiveStreamPageInternal from "../pages/public/liveStreamPage/indexInternal";
import LiveStreamPageCricket from "../pages/public/liveStreamPageCricket";
import LiveStreamPageCricketInternal from "../pages/public/liveStreamPageCricket/pageInternal";
import ScoreBoardPage from "../pages/public/ScoreBoardPage";
import VideoPage from "../pages/public/VideoPage";
import SecurityAuth from "../pages/security";

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
      path: "liveStreamCricket/:vidId",
      element: <LiveStreamPageCricket />,
    },
    {
      path: "liveStreamCricketInt/:vidId",
      element: <LiveStreamPageCricketInternal />,
    },
    {
      path: "liveStreamInternal/:vidId/:sportId",
      element: <LiveStreamPageInternal />,
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
      path: "verify",
      element: <SecurityAuth />,
    },
    {
      path: "*",
      element: <Navigate to={"/login"} replace />,
    },
  ],
};
export default OtherRoutes;

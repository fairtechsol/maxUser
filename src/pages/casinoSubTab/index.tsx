import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import LiveCasinoDesktop from "../../components/liveCasino/desktop";
import LiveCasinoMobile from "../../components/liveCasino/mobile";
import { liveCasinoList } from "../../store/actions/cards/cardDetail";
import { AppDispatch } from "../../store/store";
import { isMobile } from "../../utils/screenDimension";

const LiveCasino = () => {
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();
  const { state } = useLocation();

  useEffect(() => {
    dispatch(liveCasinoList(""));
  }, []);

  useEffect(() => {
    if (isMobile) {
      if (state?.key) {
        navigate("/live-casinom", {
          state: {
            key: state.key,
          },
        });
      } else navigate("/live-casinom");
    }
  }, []);

  return isMobile ? <LiveCasinoMobile /> : <LiveCasinoDesktop />;
};

export default LiveCasino;

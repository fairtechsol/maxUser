import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import { useDispatch } from "react-redux";
import { liveCasinoList } from "../../store/actions/cards/cardDetail";
import { isMobile } from "../../utils/screenDimension";
import LiveCasinoMobile from "../../components/liveCasino/mobile";
import LiveCasinoDesktop from "../../components/liveCasino/desktop";
import { useLocation, useNavigate } from "react-router-dom";

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

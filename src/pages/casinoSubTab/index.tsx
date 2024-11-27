import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import { useDispatch } from "react-redux";
import { liveCasinoList } from "../../store/actions/cards/cardDetail";
import { isMobile } from "../../utils/screenDimension";
import LiveCasinoMobile from "../../components/liveCasino/mobile";
import LiveCasinoDesktop from "../../components/liveCasino/desktop";
import { useNavigate } from "react-router-dom";

const LiveCasino = () => {
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(liveCasinoList(""));
  }, []);

  useEffect(() => {
    if (isMobile) {
      navigate("/live-casinom");
    }
  }, []);

  return isMobile ? <LiveCasinoMobile /> : <LiveCasinoDesktop />;
};

export default LiveCasino;

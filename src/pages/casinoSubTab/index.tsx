import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import { useDispatch } from "react-redux";
import { liveCasinoList } from "../../store/actions/cards/cardDetail";
import { isMobile } from "../../utils/screenDimension";
import LiveCasinoMobile from "../../components/liveCasino/mobile";
import LiveCasinoDesktop from "../../components/liveCasino/desktop";

const LiveCasino = () => {
  const dispatch: AppDispatch = useDispatch();

  const { loading } = useSelector((state: RootState) => state.card);


  useEffect(() => {
    dispatch(liveCasinoList("asbd"));
  },[]);


  if (loading) {
    return (
      <div className="w-100 d-flex justify-content-center align-items-center">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    isMobile ? <LiveCasinoMobile/> : <LiveCasinoDesktop/> 
  );
};

export default LiveCasino;

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import MatchList from "../../components/home";
import { expertSocketService, socketService } from "../../socketManager";
import { getMatchList } from "../../store/actions/match/matchListAction";
import { AppDispatch, RootState } from "../../store/store";
import CustomModal from "../../components/commonComponent/modal";
import Desktop from "../../components/rules/desktop";
import { rulesModalShowFalse } from "../../store/actions/authAction";

const Home = () => {
  const dispatch: AppDispatch = useDispatch();
  const { rulesPopShow } = useSelector((state: RootState) => state.auth);
  const [matchType, setMatchType] = useState("cricket");
  const [show, setShow] = useState(false);

  const getMatchListService = () => {
    try {
      dispatch(
        getMatchList({
          matchType: matchType,
        })
      );
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    try {
      expertSocketService.match.matchAdded(getMatchListService);
      socketService.userBalance.matchResultDeclared(getMatchListService);
      socketService.userBalance.matchResultUnDeclared(getMatchListService);
      return () => {
        expertSocketService.match.matchAddedOff();
      };
    } catch (e) {
      console.log(e);
    }
  }, []);

  useEffect(() => {
    if (matchType) {
      getMatchListService();
    }
  }, [matchType]);

  useEffect(() => {
    rulesPopShow ? setShow(true) : setShow(false);
  }, []);

  const popUpClose = () => {
    setShow(false);
    dispatch(rulesModalShowFalse());
  };

  return (
    <div>
      <MatchList setMatchType={setMatchType} />
      <CustomModal
        customClass="modalFull-90 rule-popup"
        show={show}
        setShow={popUpClose}
        title={"Rules"}
      >
        <Desktop />
      </CustomModal>
    </div>
  );
};

export default Home;

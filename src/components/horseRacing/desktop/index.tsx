import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useState } from "react";
import { Tab } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getHorseRacingMatchList } from "../../../store/actions/horseRacing/horseMatchListAction";
import { AppDispatch, RootState } from "../../../store/store";
import CommonTabs from "../../commonComponent/tabs";
import "./style.scss";
import RaceDetails from "./raceDetails";

const HorseRacingTabsDesktop = () => {
  const { countryWiseList, racingList } = useSelector(
    (state: RootState) => state.horseRacing.matchList
  );
  const [activeTab, setActiveTab] = useState("");
  const dispatch: AppDispatch = useDispatch();
  const handleSelect = (key: any) => {
    setActiveTab(key);
  };

  useEffect(() => {
    if (countryWiseList && countryWiseList?.length > 0 && activeTab === "") {
      setActiveTab(countryWiseList[0]?.countryCode);
    }
    if (activeTab !== "") {
      dispatch(getHorseRacingMatchList({ countryCode: activeTab }));
    }
  }, [activeTab, countryWiseList]);

  return (
    <CommonTabs
      callback={handleSelect}
      defaultActive={activeTab}
      id={activeTab}
    >
      {countryWiseList?.map((item: any) => (
        <Tab
          key={item?.countryCode}
          eventKey={item?.countryCode}
          tabClassName="match-list-tabs title-12"
          title={item?.countryCode}
          style={{ padding: "0px" }}
        >
          {Object.entries(racingList)?.map(([matchName, item]: any) => (
            <RaceDetails matchName={matchName} item={item} />
          ))}
        </Tab>
      ))}
    </CommonTabs>
  );
};

export default HorseRacingTabsDesktop;

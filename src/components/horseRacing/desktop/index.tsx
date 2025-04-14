import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useState } from "react";
import { Tab } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getHorseRacingMatchList } from "../../../store/actions/horseRacing/horseMatchListAction";
import { AppDispatch, RootState } from "../../../store/store";
import CommonTabs from "../../commonComponent/tabs";
import "../../commonStyle.scss";
import RaceListItems from "./raceDetails";

const HorseRacingListTabsDesktop = ({ matchType }: any) => {
  const { countryWiseList, racingList } = useSelector(
    (state: RootState) => state.horseRacing.matchList
  );
  const [activeTab, setActiveTab] = useState("");
  const dispatch: AppDispatch = useDispatch();
  const handleSelect = (key: any) => {
    setActiveTab(key);
  };

  useEffect(() => {
    if (countryWiseList?.length > 0 && activeTab === "") {
      setActiveTab(countryWiseList[0]?.countryCode);
    }
  }, [countryWiseList, matchType]);

  useEffect(() => {
    if (activeTab !== "") {
      dispatch(
        getHorseRacingMatchList({
          countryCode: activeTab,
          matchType: matchType,
        })
      );
    }
  }, [activeTab, countryWiseList, matchType]);

  return (
    <div className="horseRacingTab">
      <CommonTabs
        callback={handleSelect}
        defaultActive={activeTab}
        id={activeTab}
      >
        {countryWiseList?.map((item: any) => (
          <Tab
            key={item?.countryCode}
            eventKey={item?.countryCode}
            tabClassName="match-tabs title-12"
            title={item?.countryCode}
            style={{ padding: "0px" }}
          >
            {Object.entries(racingList)?.map(([matchName, item]: any) => (
              <RaceListItems matchName={matchName} item={item} />
            ))}
          </Tab>
        ))}
      </CommonTabs>
    </div>
  );
};

export default HorseRacingListTabsDesktop;

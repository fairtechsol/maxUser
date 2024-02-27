import { Tab } from "react-bootstrap";
import CommonTabs from "../../commonComponent/tabs";
import MobileMatchList from "../matchList/mobile";
import SportsFilterJson from "./sportsFilters.json";
import { useState } from "react";
import MatchListJson from "../matchList/matchList.json";

const SportsFilters = ({ type,setMatchType }: any) => {
  const [selectedTab, setSelectedTab] = useState("sports"); 
  return (
    <div className="m-0 p-0 w-100 ">
      {" "}
      <CommonTabs
        customClass="overflow-x-auto overflow-y-hidden no-wrap"
        defaultActive="inPlay"
        fill={true}
        callback={setSelectedTab}
        justify={true}
      >
        {SportsFilterJson()
        ?.filter((item) => item?.id == "inPlay" || !type)
    
        ?.map((item) => {
          const isCricketTab = item.id === "cricket" && selectedTab === "inPlay" && MatchListJson().some((match) => match.id === "cricket");

          return (
            <Tab
              key={item?.id}
              eventKey={item?.id}
              tabClassName="m-tab"
              title={item?.name}
            >
              {(item.id === "inPlay" || isCricketTab) &&<MobileMatchList setMatchType={setMatchType} type={type} />}
            </Tab>
          );
        })}
        
      </CommonTabs>
  
    </div>
        
  );
};

export default SportsFilters;

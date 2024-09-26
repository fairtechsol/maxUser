import { Tab } from "react-bootstrap";
import CommonTabs from "../../commonComponent/tabs";
import MobileMatchList from "../matchList/mobile";
import SportsFilterJson from "./sportsFilters.json";
import LatestEvent from "../latestEvents";
import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";

const SportsFilters = ({ type, setMatchType }: any) => {

  const [selectedItem, setSelectedItem] = useState(null);

  const { tabList} = useSelector(
    (state: RootState) => state.match.matchList
  );
  const handleClick = (id:any) => {
    setSelectedItem(id);
    // Perform any additional actions you want on item click
  };
  return (
    <div className="m-0 p-0 w-100 ">
     <LatestEvent events={tabList}/>
      {" "}
      <CommonTabs
        customClass="overflow-x-auto overflow-y-hidden no-wrap lh-1"
        defaultActive={
          location.pathname.split("/")[1] === "home"
            ? "inPlay"
            : location.pathname.split("/")[1]
        }
        fill={true}
        justify={true}
      >
        {SportsFilterJson()?.map((item) => {
          const tabTitleStyle = {
            fontWeight: "700",
            fontSize: "12px",
            justifyContent: "center",
            display: "flex",
          };
          return (
            <Tab
              key={item?.id}
              eventKey={item?.id}
              tabClassName="m-tab"
              title={
                <span>
                  <span style={tabTitleStyle}>{item?.name}</span>
                </span>
              }
            ></Tab>
          );
        })}
      </CommonTabs>
      <MobileMatchList setMatchType={setMatchType} type={type} />
    </div>
  );
};

export default SportsFilters;

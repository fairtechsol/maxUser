import { Tab } from "react-bootstrap";
import CommonTabs from "../../commonComponent/tabs";
import MobileMatchList from "../matchList/mobile";
import SportsFilterJson from "./sportsFilters.json";

const SportsFilters = ({ data }: any) => {
  return (
    <div className="m-0 p-0 w-100 ">
      {" "}
      <CommonTabs
        customClass="overflow-x-auto overflow-y-hidden no-wrap"
        defaultActive="inPlay"
        fill={true}
      >
        {SportsFilterJson()?.map((item) => {
          return (
            <Tab
              key={item?.id}
              eventKey={item?.id}
              tabClassName="m-tab"
              title={<div>{item?.name}</div>}
            >
              {item?.id === "inPlay" ? <MobileMatchList data={data} /> : ""}
            </Tab>
          );
        })}
      </CommonTabs>
    </div>
  );
};

export default SportsFilters;

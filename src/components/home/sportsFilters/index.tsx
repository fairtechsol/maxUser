import { Tab } from "react-bootstrap";
import CommonTabs from "../../commonComponent/tabs";
import MobileMatchList from "../matchList/mobile";
import SportsFilterJson from "./sportsFilters.json";

const SportsFilters = ({ type, setMatchType }: any) => {
  return (
    <div className="m-0 p-0 w-100 ">
      {" "}
      <CommonTabs
        customClass="overflow-x-auto overflow-y-hidden no-wrap"
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
            fontWeight: "normal",
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
            >
              <MobileMatchList setMatchType={setMatchType} type={type} />
            </Tab>
          );
        })}
      </CommonTabs>
    </div>
  );
};

export default SportsFilters;

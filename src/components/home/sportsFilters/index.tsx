import { Tab } from "react-bootstrap";
import CommonTabs from "../../commonComponent/tabs";
import MobileMatchList from "../matchList/mobile";
import SportsFilterJson from "./sportsFilters.json";
import TrendsFilters from "../latestEvents";
const eventsData = [
  { id: 1, iconId: 40, eventId: 715926745, name: 'USA - Presidential Election 2024' },
  { id: 2, iconId: 4, eventId: 780263321, name: 'Caribbean Premier League - Winner' },
  { id: 3, iconId: 2, eventId: 505412737, name: 'E Ruse v P Badosa' },
  { id: 4, iconId: 2, eventId: 707383007, name: 'Svitolina v Gauff' },
  { id: 5, iconId: 1, eventId: 718966835, name: 'Venezia v Torino' },
];
const SportsFilters = ({ type, setMatchType }: any) => {
  return (
    <div className="m-0 p-0 w-100 ">
     <TrendsFilters events={eventsData}/>
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
            ></Tab>
          );
        })}
      </CommonTabs>
      <MobileMatchList setMatchType={setMatchType} type={type} />
    </div>
  );
};

export default SportsFilters;

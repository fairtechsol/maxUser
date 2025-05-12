import { Tab } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { liveCasinoList } from "../../../store/actions/cards/cardDetail";
import { AppDispatch, RootState } from "../../../store/store";
import CommonTabs from "../../commonComponent/tabs";
import LatestEvent from "../latestEvents";
import MobileMatchList from "../matchList/mobile";
import SportsFilterJson from "./sportsFilters.json";

const SportsFilters = ({ type, setMatchType, matchType }: any) => {
  const dispatch: AppDispatch = useDispatch();
  const { tabList } = useSelector((state: RootState) => state.match.matchList);
  const handleClick = (data: any) => {
    if (data?.onClick) {
      dispatch(liveCasinoList(""));
    }
  };
  return (
    <div className="m-0 p-0 w-100 ">
      <LatestEvent events={tabList} />
      <CommonTabs
        customClass="overflow-x-auto overflow-y-hidden no-wrap lh-1"
        defaultActive={
          location.pathname.split("/")[1] === "home"
            ? "inPlay"
            : location.pathname.split("/")[1]
        }
        fill={true}
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
              tabClassName="m-tab px-0"
              title={
                <span style={tabTitleStyle} onClick={() => handleClick(item)}>
                  {item?.name}
                </span>
              }
             />
          );
        })}
      </CommonTabs>
      <MobileMatchList
        setMatchType={setMatchType}
        type={type}
        matchType={matchType}
      />
    </div>
  );
};

export default SportsFilters;

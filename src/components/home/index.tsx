import isMobile from "../../utils/screenDimension";
import DesktopMatchList from "./matchList/desktop";
import SportsFilters from "./sportsFilters";

const MatchList = () => {
  return (
    <>
      {isMobile ? (
        <SportsFilters
          data={[
            {
              id: "ball",
              name: "balls",
            },
            {
              id: "ball",
              name: "balls",
            },
            {
              id: "ball",
              name: "balls",
            },
            {
              id: "ball",
              name: "balls",
            },
            {
              id: "ball",
              name: "balls",
            },
            {
              id: "ball",
              name: "balls",
            },
          ]}
        />
      ) : (
        <DesktopMatchList
          data={[
            {
              id: "ball",
              name: "balls",
            },
            {
              id: "ball",
              name: "balls",
            },
          ]}
        />
      )}
    </>
  );
};

export default MatchList;

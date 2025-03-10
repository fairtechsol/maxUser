import moment from "moment";
import React, { useEffect, useState } from "react";
import { Accordion } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { liveCasinoList } from "../../../store/actions/cards/cardDetail";
import {
  getCompetitionDates,
  getCompetitionList,
  getCompetitionMatches,
} from "../../../store/actions/match/matchListAction";
import { AppDispatch, RootState } from "../../../store/store";

interface Props {
  item: any;
  setMenuItemList: any;
  menuItemList: any;
}

const MenuItemChild: React.FC<{ data: any; handleClick?: any }> = ({
  data,
  handleClick,
}) => (
  <div
    className={
      data.type === "liveItem" ? "sidebar-menu-items px-3" : "nested-menu-item"
    }
    onClick={() => handleClick(data)}
  >
    <Link
      className={`title-14 text-decoration-none text-black ${
        data.blink ? "blinking-text" : ""
      }`}
      to={`${data.path}`}
    >
      {data.name}
    </Link>
  </div>
);

const MenuCollapse: React.FC<{
  data: any;
  menuItemList?: any;
  setMenuItemList?: any;
  selectedMatchIndex: number;
}> = ({ data, menuItemList, setMenuItemList, selectedMatchIndex }) => {
  const [selectedCompetition, setSelectedCompetition] = useState("");
  const [selectedDate, setSelectedDate] = useState("");

  const dispatch: AppDispatch = useDispatch();

  const { competitionDates, competitionMatches } = useSelector(
    (state: RootState) => state.match.sidebarList
  );

  useEffect(() => {
    try {
      if (selectedCompetition !== "") {
        const tempList = [...menuItemList];
        const selectedMatchChildren =
          tempList[1].children[selectedMatchIndex].children;
        const competitionIndex = selectedMatchChildren.findIndex(
          (item: any) => item?.id === selectedCompetition
        );
        selectedMatchChildren[competitionIndex].children =
          competitionDates?.map((item: any) => ({
            name: moment.utc(item?.startdate).format("YYYY/MM/DD"),
            id: item?.startdate,
            type: "collapse",
            children: [],
          }));
        setMenuItemList(tempList);
      }
    } catch (error) {
      console.log(error);
    }
  }, [competitionDates, selectedCompetition, selectedMatchIndex]);

  useEffect(() => {
    try {
      if (selectedDate !== "") {
        const tempList = [...menuItemList];
        const selectedMatchChildren =
          tempList[1].children[selectedMatchIndex].children;
        const competitionIndex = selectedMatchChildren.findIndex(
          (item: any) => item?.id === selectedCompetition
        );
        const dateIndex = selectedMatchChildren[
          competitionIndex
        ].children.findIndex((item: any) => item?.id === selectedDate);
        selectedMatchChildren[competitionIndex].children[dateIndex].children =
          competitionMatches?.data?.map((item: any) => ({
            name: item?.title,
            id: item?.id,
            type: "item",
            path: `/${
              competitionMatches?.matchType === "cricket"
                ? "game-detail"
                : "other-game-detail"
            }/${competitionMatches?.matchType}/${item?.id}`,
            children: [],
          }));
        setMenuItemList(tempList);
      }
    } catch (error) {
      console.log(error);
    }
  }, [
    competitionMatches,
    selectedDate,
    selectedCompetition,
    selectedMatchIndex,
  ]);

  return (
    <Accordion.Item className="accordion-item-collapse" eventKey="0">
      <Accordion.Header
        className="accordion-header-collapse title-14"
        style={{
          backgroundColor: "#bbbbbb",
          borderBottom: "1px solid #9e9e9e",
          padding: "4px 2px",
        }}
      >
        {data?.name}
      </Accordion.Header>
      <Accordion.Body className="py-0">
        {data?.children?.map((sideBarChild: any, index: number) => (
          <Accordion
            onSelect={(e: any) => {
              if (e == 0) {
                setSelectedCompetition(sideBarChild?.id);
                dispatch(getCompetitionDates(sideBarChild?.id));
              }
            }}
            key={index}
            defaultActiveKey={[]}
          >
            <Accordion.Item className="accordion-item-collapse" eventKey="0">
              <Accordion.Header className="accordion-header-collapse">
                {sideBarChild?.name}
              </Accordion.Header>
              <Accordion.Body className="py-0">
                {sideBarChild?.children?.map(
                  (menuItemChild: any, indexes: number) => (
                    <Accordion
                      onSelect={(e: any) => {
                        if (e == 0) {
                          setSelectedDate(menuItemChild?.id);
                          setSelectedCompetition(sideBarChild?.id);
                          dispatch(
                            getCompetitionMatches({
                              date: menuItemChild?.id,
                              id: sideBarChild?.id,
                              matchType: data?.id,
                            })
                          );
                        }
                      }}
                      key={indexes}
                      defaultActiveKey={[]}
                    >
                      <Accordion.Item
                        className="accordion-item-collapse"
                        eventKey="0"
                      >
                        <Accordion.Header className="accordion-header-collapse">
                          {menuItemChild?.name}
                        </Accordion.Header>
                        <Accordion.Body className="py-0">
                          {menuItemChild?.children?.map(
                            (matches: any, matchIndex: number) => (
                              <MenuItemChild key={matchIndex} data={matches} />
                            )
                          )}
                        </Accordion.Body>
                      </Accordion.Item>
                    </Accordion>
                  )
                )}
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        ))}
      </Accordion.Body>
    </Accordion.Item>
  );
};

const MenuGroup: React.FC<{
  data: any;
  menuItemList: any;
  setMenuItemList: any;
}> = ({ data, menuItemList, setMenuItemList }) => {
  const [selectedMatch, setSelectedMatch] = useState("");
  const [selectedMatchIndex, setSelectedMatchIndex] = useState(0);

  const dispatch: AppDispatch = useDispatch();

  const { competitionList } = useSelector(
    (state: RootState) => state.match.sidebarList
  );

  useEffect(() => {
    try {
      if (selectedMatch !== "") {
        const tempList = [...menuItemList];
        const matchIndex = tempList[1].children.findIndex(
          (item: any) => item?.id === selectedMatch
        );
        tempList[1].children[matchIndex].children = competitionList?.map(
          (item: any) => ({
            name: item?.competitionName,
            id: item?.competitionId,
            type: "collapse",
            children: [],
          })
        );
        setSelectedMatchIndex(matchIndex);
        setMenuItemList(tempList);
      }
    } catch (error) {
      console.log(error);
    }
  }, [competitionList, selectedMatch]);

  const handleClick = (data: any) => {
    if (data?.onClick) {
      dispatch(liveCasinoList("asbd"));
    }
  };
  return (
    <>
      {data?.type === "item" || data?.type === "liveItem" ? (
        <MenuItemChild data={data} handleClick={handleClick} />
      ) : (
        <Accordion.Item className="accordion-item-group  border-0" eventKey="0">
          <Accordion.Header className="accordion-header-group">
            {data?.name}
          </Accordion.Header>
          <Accordion.Body className="p-0 ">
            {data?.children?.map((sideBarChild: any) => (
              <Accordion
                onSelect={(e: any) => {
                  if (e == 0) {
                    setSelectedMatch(sideBarChild?.id);
                    dispatch(getCompetitionList(sideBarChild?.id));
                  }
                }}
                key={sideBarChild?.id}
                defaultActiveKey={[]}
              >
                {sideBarChild?.type === "group" ? (
                  <MenuGroup
                    data={sideBarChild}
                    menuItemList={menuItemList}
                    setMenuItemList={setMenuItemList}
                  />
                ) : sideBarChild?.type === "item" ||
                  sideBarChild?.type === "liveItem" ? (
                  <MenuItemChild
                    data={sideBarChild}
                    handleClick={handleClick}
                  />
                ) : (
                  <MenuCollapse
                    data={sideBarChild}
                    selectedMatchIndex={selectedMatchIndex}
                    menuItemList={menuItemList}
                    setMenuItemList={setMenuItemList}
                  />
                )}
              </Accordion>
            ))}
          </Accordion.Body>
        </Accordion.Item>
      )}
    </>
  );
};

export const MenuItem: React.FC<Props> = ({
  item,
  setMenuItemList,
  menuItemList,
}) => {
  return (
    <>
      {item?.type === "item" || item?.type === "liveItem" ? (
        <MenuItemChild data={item} />
      ) : item?.type === "group" ? (
        <MenuGroup
          data={item}
          menuItemList={menuItemList}
          setMenuItemList={setMenuItemList}
        />
      ) : (
        ""
      )}
    </>
  );
};


// {
//   "id": "slotgame",
//   "name": "Slot Game",
//   "type": "liveItem",
//   "path": "/contact-admin/91"
// },
// {
//   "id": "race2020",
//   "name": "Race 20-20",
//   "type": "liveItem",
//   "path": "/race20"
// },
// {
//   "id": "dragontiger",
//   "name": "Dragon Tiger",
//   "type": "liveItem",
//   "path": "/card3-list/dragonTiger"
// },
// {
//   "id": "sportscasino",
//   "name": "Sports Casino",
//   "type": "liveItem",
//   "path": "/card3-list/sportCasino"
// },
// {
//   "id": "andarbahar",
//   "name": "Andar Bahar",
//   "type": "liveItem",
//   "path": "/card3-list/abj"
// },
// {
//   "id": "bollywoodcasino",
//   "name": "Bollywood Casino",
//   "type": "liveItem",
//   "path": "/card3-list/bollywoodCasino"
// },
// {
//   "id": "casinowar",
//   "name": "Casino War",
//   "type": "liveItem",
//   "path": "/war"
// },
// {
//   "id": "worli",
//   "name": "Worli",
//   "type": "liveItem",
//   "path": "/card3-list/worli"
// },
// {
//   "id": "lottery",
//   "name": "Lottery",
//   "type": "liveItem",
//   "path": "/contact-admin/11"
// },
// {
//   "id": "3cardsjudgement",
//   "name": "3 Cards Judgement",
//   "type": "liveItem",
//   "path": "/card3-list/3cardj"
// },
// {
//   "id": "queen",
//   "name": "Queen",
//   "type": "liveItem",
//   "path": "/queen"
// },
// {
//   "id": "virtual_sport",
//   "name": "Virtual Sport",
//   "type": "liveItem",
//   "path": "/contact-admin/56"
// },
// {
//   "id": "cricketcasino",
//   "name": "Cricket Casino",
//   "type": "liveItem",
//   "path": "/contact-admin/55"
// }
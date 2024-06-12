import {
  Nav,
  NavItem,
  NavLink,
  Tab,
  TabContainer,
  TabContent,
  TabPane,
} from "react-bootstrap";
import CommonTabs from "../tabs";
import React from "react";

const RulesHead = () => {
  return (
    <div>
      <div className="casino-header">
        <CommonTabs defaultActive="odds" className="color">
          {[
            {
              id: "game",
              name: "GAME",
            },
            {
              id: "matchedBet",
              name: `MATCHED BET()`,
            },
          ]?.map((item, index) => {
            return (
              <Tab
                key={item?.id}
                eventKey={item?.id}
                tabClassName="m-tab"
                title={<div className="font p-1 px-2">{item?.name}</div>}
              >
                {/* <div className="float-right text-right round pr-2 lh-1">
                  <span className="d-flex">
                    <a href="#" className="ml-1" role="button">
                      Rules
                    </a>
                  </span>
                  <span className="d-block">
                    Round ID: <span>240506131817</span>
                  </span>
                </div> */}
              </Tab>
            );
          })}
        </CommonTabs>
      </div>
      <div className="casino-title">
        <span>20-20 Teenpatti</span>
      </div>
    </div>
  );
};
export default RulesHead;

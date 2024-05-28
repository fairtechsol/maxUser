import { useState } from "react";
import { Tab, Nav } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./style.scss";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";

const raceData = [
  {
    id: 1,
    gameDetails: [
      {
        gameName: "Le Lion Dangers",
        races: [
          { link: "/race/:id", time: "16:03" },
          { link: "/race/:id", time: "16:38" },
          { link: "/race/:id", time: "17:00" },
          { link: "/race/:id", time: "17:30" },
          // Add more race details here
        ],
      },
      {
        gameName: "Another Game Name",
        races: [
          { link: "/race/:id", time: "17:00" },
          { link: "/race/:id", time: "17:30" },
          { link: "/race/:id", time: "17:00" },
          { link: "/race/:id", time: "17:30" },
          // Add more race details here
        ],
      },
      {
        gameName: "Another Game Name",
        races: [
          { link: "/race/:id", time: "17:00" },
          { link: "/race/:id", time: "17:30" },
          { link: "/race/:id", time: "17:00" },
          { link: "/race/:id", time: "17:30" },
          // Add more race details here
        ],
      },
    ],
  },
  {
    id: 2,
    gameDetails: [
      {
        gameName: "ParisLongchamp",
        races: [
          { link: "/race-detail/10/712776540", time: "20:08" },
          { link: "/race-detail/10/497753989", time: "20:43" },
          { link: "/race/:id", time: "17:00" },
          { link: "/race/:id", time: "17:30" },
          // Add more race details here
        ],
      },
      {
        gameName: "Another Game Name",
        races: [
          { link: "/race/:id", time: "17:00" },
          { link: "/race/:id", time: "17:30" },
          { link: "/race/:id", time: "17:00" },
          { link: "/race/:id", time: "17:30" },
          // Add more race details here
        ],
      },
      {
        gameName: "Another Game Name",
        races: [
          { link: "/race/:id", time: "17:00" },
          { link: "/race/:id", time: "17:30" },
          { link: "/race/:id", time: "17:00" },
          { link: "/race/:id", time: "17:30" },
        ],
      },
    ],
  },
];

const HorseRacingTabsDesktop = () => {
  const [activeTab, setActiveTab] = useState(raceData[0].id);

  const handleSelect = (key: any) => {
    setActiveTab(key);
  };

  const { countryWiseList } = useSelector(
    (state: RootState) => state.horseRacing.matchList
  );
  const RaceDetails = ({ gameDetails }: any) => {
    return gameDetails.map((gameDetail: any, index: any) => (
      <div className="coupon-card coupon-card-first" key={index}>
        <div className="card-content">
          <table className="table coupon-table table-bordered">
            <tbody>
              <tr>
                <td style={{ width: "30%" }}>
                  <a className="text-dark">{gameDetail.gameName}</a>
                </td>
                <td>
                  <div className="horse-time-detail">
                    {gameDetail.races.map((race: any, index: any) => (
                      <a href={race.link} key={index}>
                        <span>{race.time}</span>
                      </a>
                    ))}
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    ));
  };
  return (
    <>
      <Tab.Container defaultActiveKey={countryWiseList[0].countryCode}>
        <Nav variant="tabs" className="navi-tabs mt-2">
          {countryWiseList.map((item: any) => (
            <Nav.Item key={item?.countryCode} className="navi-item">
              <Nav.Link eventKey={item.countryCode} className="navi-link">
                {item.countryCode}
              </Nav.Link>
            </Nav.Item>
          ))}
        </Nav>
        <Tab.Content>
          {raceData.map((race) => (
            <Tab.Pane eventKey={race.id.toString()} key={race.id}>
              <RaceDetails gameDetails={race.gameDetails} />
            </Tab.Pane>
          ))}
        </Tab.Content>
      </Tab.Container>
    </>
  );
};

export default HorseRacingTabsDesktop;

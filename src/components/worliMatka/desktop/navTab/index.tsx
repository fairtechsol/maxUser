import { Nav, Tab } from "react-bootstrap";
import { useSelector } from "react-redux";
import { RootState } from "../../../../store/store";
import Abr from "../Abr";
import Card64 from "../Card64";
import CardBox from "../CardBox";
import CardBox2 from "../CardBox2";
import CardDp from "../CardDp";
import CardSp from "../CardSP";
import Card56 from "../Chart56";
import ColorDp from "../ColorDp";
import CommonDp from "../CommonDp";
import CommonSp from "../CommonSp";
import Cycle from "../Cycle";
import MotorSp from "../MotorSp";
import "../style.scss";
import Trio from "../Trio";
const MatkaNavTab = ({ data, odds, cards }: any) => {
  const { dragonTigerDetail } = useSelector((state: RootState) => state.card);
  return (
    <div className="">
      <Tab.Container defaultActiveKey="single">
        <Nav variant="pills" className="navmain">
          <Nav.Item className="nav-pills-worli">
            <Nav.Link eventKey="single" className="nav-link-worli">
              Single
            </Nav.Link>
          </Nav.Item>
          <Nav.Item className="nav-pills-worli">
            <Nav.Link eventKey="pana" className="nav-link-worli">
              Pana
            </Nav.Link>
          </Nav.Item>
          <Nav.Item className="nav-pills-worli">
            <Nav.Link eventKey="sp" className="nav-link-worli">
              SP
            </Nav.Link>
          </Nav.Item>
          <Nav.Item className="nav-pills-worli">
            <Nav.Link eventKey="dp" className="nav-link-worli">
              DP
            </Nav.Link>
          </Nav.Item>

          <Nav.Item className="nav-pills-worli">
            <Nav.Link eventKey="trio" className="nav-link-worli">
              Trio
            </Nav.Link>
          </Nav.Item>
          <Nav.Item className="nav-pills-worli">
            <Nav.Link eventKey="cycle" className="nav-link-worli">
              Cycle
            </Nav.Link>
          </Nav.Item>
          <Nav.Item className="nav-pills-worli">
            <Nav.Link eventKey="motorsp" className="nav-link-worli">
              Motor SP
            </Nav.Link>
          </Nav.Item>
          <Nav.Item className="nav-pills-worli">
            <Nav.Link eventKey="56" className="nav-link-worli">
              56 Charts
            </Nav.Link>
          </Nav.Item>
          <Nav.Item className="nav-pills-worli">
            <Nav.Link eventKey="64" className="nav-link-worli">
              64 Charts
            </Nav.Link>
          </Nav.Item>
          <Nav.Item className="nav-pills-worli">
            <Nav.Link eventKey="abr" className="nav-link-worli">
              ABR
            </Nav.Link>
          </Nav.Item>
          <Nav.Item className="nav-pills-worli">
            <Nav.Link eventKey="commonsp" className="nav-link-worli">
              Common SP
            </Nav.Link>
          </Nav.Item>
          <Nav.Item className="nav-pills-worli">
            <Nav.Link eventKey="commondp" className="nav-link-worli">
              Common DP
            </Nav.Link>
          </Nav.Item>
          <Nav.Item className="nav-pills-worli">
            <Nav.Link eventKey="colordp" className="nav-link-worli">
              Color DP
            </Nav.Link>
          </Nav.Item>
        </Nav>

        <Tab.Content>
          <Tab.Pane eventKey="single">
            <div className="mt-1">
              <CardBox
                odds={odds && odds[0]}
                data={dragonTigerDetail}
                cards={dragonTigerDetail?.cardInfo}
              />
            </div>
          </Tab.Pane>
          <Tab.Pane eventKey="pana">
            <div className=" mt-1">
              <CardBox2
                odds={odds && odds[1]}
                data={dragonTigerDetail}
                cards={dragonTigerDetail?.cardInfo}
              />
            </div>
          </Tab.Pane>
          <Tab.Pane eventKey="sp">
            <CardSp odds={odds && odds[2]} data={data} cards={cards} />
          </Tab.Pane>
          <Tab.Pane eventKey="dp">
            <CardDp odds={odds && odds[3]} data={data} cards={cards} />
          </Tab.Pane>

          <Tab.Pane eventKey="trio">
            <Trio odds={odds && odds[4]} data={data} cards={cards} />
          </Tab.Pane>
          <Tab.Pane eventKey="cycle">
            <Cycle odds={odds && odds[5]} data={data} cards={cards} />
          </Tab.Pane>
          <Tab.Pane eventKey="motorsp">
            <MotorSp odds={odds && odds[6]} data={dragonTigerDetail} />
          </Tab.Pane>
          <Tab.Pane eventKey="56">
            <Card56 />
          </Tab.Pane>

          <Tab.Pane eventKey="64">
            <Card64 />
          </Tab.Pane>
          <Tab.Pane eventKey="abr">
            <Abr />
          </Tab.Pane>
          <Tab.Pane eventKey="commonsp">
            <CommonSp
              odds={odds && odds[11]}
              data={dragonTigerDetail}
              cards={dragonTigerDetail?.cardInfo}
            />
          </Tab.Pane>
          <Tab.Pane eventKey="commondp">
            <CommonDp
              odds={odds && odds[11]}
              data={dragonTigerDetail}
              cards={dragonTigerDetail?.cardInfo}
            />
          </Tab.Pane>
          <Tab.Pane eventKey="colordp">
            <ColorDp />
          </Tab.Pane>
        </Tab.Content>
      </Tab.Container>
    </div>
  );
};

export default MatkaNavTab;

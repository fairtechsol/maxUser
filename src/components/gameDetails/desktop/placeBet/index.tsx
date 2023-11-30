import { Col, Container, Row, Table } from "react-bootstrap";
import { ImCross } from "react-icons/im";

import CustomButton from "../../../commonComponent/button";
import RightPanelContainer from "../rightPanelContainer";
import "./style.scss";
const placeBetHeader = [
  {},
  {
    id: "betId",
    name: "(Bet for)",
  },
  {
    id: "odds",
    name: "Odds",
  },
  {
    id: "stake",
    name: "Stake",
  },
  {
    id: "profit",
    name: "Profit",
  },
];

const btnValue = [
  { name: "100", value: 100 },
  { name: "200", value: 200 },
  { name: "300", value: 300 },
  { name: "400", value: 400 },
  { name: "500", value: 500 },
  { name: "600", value: 600 },
  { name: "700", value: 700 },
  { name: "800", value: 800 },
  { name: "900", value: 900 },
  { name: "1000", value: 1000 },
  { name: "1100", value: 1100 },
  { name: "1200", value: 1200 },
];

const PlacedBet = () => {
  return (
    <RightPanelContainer title="Place Bet">
        <Table className="w-full">
          <thead>
            <tr className="bg-darkGrey">
              {placeBetHeader?.map((item,index) => (
                <th key={index} className="title-12 text-start bg-darkGrey">
                  {item?.name}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr className="place-bet-table-row">
              <td>
                <span className=" text-danger title-12">
                  <ImCross />
                </span>
              </td>
              <td>
                <span className="f600 title-12">
                  5 over runs BAN(BAN vs NZ)adv/100
                </span>
              </td>
              <td>
                <input type="number" placeholder="" className="p-0 h-25 w-25" />
              </td>
              <td>
                <input type="number" placeholder="" className="p-0 h-25 w-50" />
              </td>
              <td>
                <span className="f600">0</span>
              </td>
            </tr>
            <tr className="place-bet-table-row">
              <td colSpan={5}>
                <Container fluid>
                  <Row>
                    {btnValue?.map((item,index) => (
                      <Col className="p-1" key={index} md={3}>
                        <CustomButton
                          className="w-100 bg-darkGrey border-0 text-black"
                          size="sm"
                        >
                          {item?.name}
                        </CustomButton>
                      </Col>
                    ))}
                    <Col md={6}>
                      <CustomButton
                        className="bg-danger border-0 py-2"
                        size="sm"
                      >
                        Reset
                      </CustomButton>
                    </Col>
                    <Col md={6} className="text-end">
                    <CustomButton
                        className=" bg-success border-0 py-2"
                        size="sm"
                      >
                        Submit
                      </CustomButton>
                    </Col>
                  </Row>
                </Container>
              </td>
            </tr>
          </tbody>
        </Table>
        </RightPanelContainer>
  );
};

export default PlacedBet;

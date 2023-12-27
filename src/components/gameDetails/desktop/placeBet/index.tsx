import { Col, Container, Row, Table } from "react-bootstrap";
import { ImCross } from "react-icons/im";

import CustomButton from "../../../commonComponent/button";
import RightPanelContainer from "../rightPanelContainer";
import "./style.scss";
import { RootState } from "../../../../store/store";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
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


const PlacedBet = () => {

  const [valueLabel, setValueLabel] = useState([
    { label: "", value: "" },
    { label: "", value: "" },
    { label: "", value: "" },
    { label: "", value: "" },
    { label: "", value: "" },
    { label: "", value: "" },
    { label: "", value: "" },
    { label: "", value: "" },
  ])
  const { buttonValues } = useSelector(
    (state: RootState) => state.user.profile
  );

  useEffect(() => {
    let updatedBtnValue = buttonValues?.value;
  
    // Check if updatedBtnValue is not undefined before parsing
    if (updatedBtnValue) {
      try {
        const jsonObj = JSON.parse(updatedBtnValue);
        const updated = valueLabel?.map((item: any, index) => ({
          ...item,
          label: Object.keys(jsonObj)[index],
          value: Object.keys(jsonObj)[index],
        }));
  
        setValueLabel(updated);
      } catch (error) {
        console.error('Error parsing JSON:', error);
      }
    }
  }, [buttonValues]);

  console.log(valueLabel)
  return (
    <RightPanelContainer title="Place Bet">
      <Table className="w-full">
        <thead>
          <tr className="bg-darkGrey">
            {placeBetHeader?.map((item, index) => (
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
                  {valueLabel?.map((item: any, index: any) => (
                    <Col className="p-1" key={index} md={3}>
                      <CustomButton
                        className="w-100 bg-darkGrey border-0 text-black"
                        size="sm"
                      >
                        {item?.label}
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

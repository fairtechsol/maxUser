import { Col, Container, Row, Table } from "react-bootstrap";
import { ImCross } from "react-icons/im";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectedBetAction } from "../../../../store/actions/match/matchListAction";
import { AppDispatch, RootState } from "../../../../store/store";
import { matchBettingType } from "../../../../utils/constants";
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

const PlacedBet = () => {
  const [stake, setStake] = useState<any>(0);
  const [valueLabel, setValueLabel] = useState<any>([]);
  const { buttonValues } = useSelector(
    (state: RootState) => state.user.profile
  );

  const { selectedBet } = useSelector(
    (state: RootState) => state.match.matchList
  );

  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    let updatedBtnValue = buttonValues?.value;

    // Check if updatedBtnValue is not undefined before parsing
    if (updatedBtnValue) {
      try {
        const jsonObj = JSON.parse(updatedBtnValue);
        let data = Object.keys(jsonObj)?.map((item: string) => {
          return {
            label: item,
            value: jsonObj[item],
          };
        });

        setValueLabel(data);
      } catch (error) {
        console.error("Error parsing JSON:", error);
      }
    }
  }, [buttonValues]);

  useEffect(() => {
    setStake(selectedBet?.team?.stake);
  }, [selectedBet]);

  return (
    <RightPanelContainer title="Place Bet">
      {selectedBet ? (
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
            <tr
              className={
                selectedBet?.team?.type == "lay" ||
                selectedBet?.team?.type == "no"
                  ? "place-bet-table-red"
                  : "place-bet-table-blue"
              }
            >
              <td>
                <span
                  className=" text-danger title-12 cursor-pointer"
                  onClick={() => {
                    dispatch(selectedBetAction(null));
                  }}
                >
                  <ImCross />
                </span>
              </td>
              <td>
                <span className="f600 title-12">{selectedBet?.team?.name}</span>
              </td>
              <td>
                <input
                  disabled
                  placeholder=""
                  className="p-0 h-25 w-25"
                  value={selectedBet?.team?.rate}
                />
              </td>
              <td>
                <input
                  value={stake}
                  onChange={(e) => {
                    dispatch(
                      selectedBetAction({
                        ...selectedBet,
                        team: { ...selectedBet?.team, stake: e.target.value },
                      })
                    );
                  }}
                  type="number"
                  placeholder=""
                  className="p-0 h-25 w-50"
                />
              </td>
              <td>
                <span className="f600">
                  {selectedBet?.data?.type == matchBettingType.matchOdd ||
                  selectedBet?.data?.type == matchBettingType.tiedMatch1 ||
                  selectedBet?.data?.type == matchBettingType.completeMatch
                    ? stake * (parseInt(selectedBet?.team?.rate) - 1)
                    : selectedBet?.data?.yesRate
                    ? 0
                    : stake * (parseInt(selectedBet?.team?.rate) / 100)}
                </span>
              </td>
            </tr>
            <tr
              className={
                selectedBet?.team?.type == "lay" ||
                selectedBet?.team?.type == "no"
                  ? "place-bet-table-red"
                  : "place-bet-table-blue"
              }
            >
              <td colSpan={5}>
                <Container fluid>
                  <Row>
                    {valueLabel?.map((item: any, index: any) => (
                      <Col className="p-1" key={index} md={3}>
                        <CustomButton
                          className="w-100 bg-darkGrey border-0 text-black"
                          size="sm"
                          onClick={() => {
                            dispatch(
                              selectedBetAction({
                                ...selectedBet,
                                team: {
                                  ...selectedBet?.team,
                                  stake: item?.value,
                                },
                              })
                            );
                          }}
                        >
                          {item?.label}
                        </CustomButton>
                      </Col>
                    ))}
                  </Row>
                  <Row>
                    <Col md={6}>
                      <CustomButton
                        className="bg-danger border-0 py-2"
                        size="sm"
                        onClick={() => {
                          dispatch(selectedBetAction(null));
                        }}
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
      ) : (
        ""
      )}
    </RightPanelContainer>
  );
};

export default PlacedBet;

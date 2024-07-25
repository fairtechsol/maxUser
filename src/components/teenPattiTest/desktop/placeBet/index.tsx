import { Col, Container, Row, Table } from "react-bootstrap";
import { ImCross } from "react-icons/im";

import axios from "axios";
import { useEffect, useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import {
  betPlaceSuccessReset,
  placeBet,
} from "../../../../store/actions/betPlace/betPlaceActions";
import { selectedBetAction } from "../../../../store/actions/match/matchListAction";
import { AppDispatch, RootState } from "../../../../store/store";
import { ApiConstants } from "../../../../utils/constants";
import CustomButton from "../../../commonComponent/button";
import CustomLoader from "../../../commonComponent/customLoader/CustomLoader";
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
  const [browserInfo, setBrowserInfo] = useState<any>(null);
  const [matchOddLoading, setMatchOddLoading] = useState<any>(false);
  const [ipAddress, setIpAddress] = useState("192.168.1.100");
  const [matchOddRate, setMatchOddRate] = useState<any>(null);
  const { buttonValues } = useSelector(
    (state: RootState) => state.user.profile
  );

  const { success, loading, error } = useSelector(
    (state: RootState) => state.match.bet
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
    if (selectedBet?.team?.stake) {
      setStake(selectedBet?.team?.stake || 0);
    } else {
      setStake(0);
    }
  }, [selectedBet]);

  useEffect(() => {
    setMatchOddRate(selectedBet?.team?.odd);
  }, [selectedBet]);
  useEffect(() => {
    // Get browser information
    const { userAgent, appName, appVersion, platform } = navigator;
    const info: any = { userAgent, appName, appVersion, platform };
    setBrowserInfo(info);
    const fetchData = async () => {
      try {
        const { data } = await axios.get("https://geolocation-db.com/json/");
        if (data) {
          setIpAddress(data?.IPv4);
        }
      } catch (e) {
        console.log(e);
      }
    };
    fetchData();
  }, []);
  useEffect(() => {
    if (success) {
      dispatch(selectedBetAction(null));
      dispatch(betPlaceSuccessReset());
      setMatchOddLoading(false);
    }
    if (error) {
      setMatchOddLoading(false);
    }
  }, [success, error]);

  const handleKeyDown = (e: any) => {
    if (e.key === "e" || e.key === "E") {
      e.preventDefault();
    }
  };
  return (
    <>
      <div className="loader-container">
        {(loading || matchOddLoading) && <CustomLoader />}
        <RightPanelContainer title="Place Bet">
          {selectedBet ? (
            <Table className="w-full">
              <thead>
                <tr className="bg-darkGrey">
                  {placeBetHeader?.map((item, index) => (
                    <th
                      key={index}
                      className="title-12 bg-darkGrey"
                      style={{
                        textAlign: item?.name === "Profit" ? "end" : "start",
                      }}
                    >
                      {item?.name}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr className={"place-bet-table-blue"}>
                  <td width={"8%"}>
                    <span
                      className=" text-danger title-12 cursor-pointer"
                      onClick={() => {
                        dispatch(selectedBetAction(null));
                      }}
                    >
                      <ImCross />
                    </span>
                  </td>
                  <td width={"34%"}>
                    <span className="f600 title-14">
                      {selectedBet?.team?.name}
                    </span>
                  </td>
                  <td width={"20%"}>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        height: "24px",
                      }}
                    >
                      <input
                        // disabled
                        placeholder=""
                        className="p-0 w-75 br-0"
                        style={{ border: "2px solid #f0f0f0" }}
                        value={matchOddRate}
                      />
                      <div
                        style={{
                          backgroundColor: "#bfd6e7",
                          display: "flex",
                          flexDirection: "column",
                          width: "15px",
                          height: "100%",
                          justifyContent: "space-around",
                        }}
                      >
                        <FaChevronUp
                          color="#a6b2bb"
                          style={{
                            width: "8px",
                            height: "10px",
                            marginLeft: "3px",
                          }}
                        />
                        <FaChevronDown
                          color="#a6b2bb"
                          style={{
                            width: "8px",
                            height: "10px",
                            marginLeft: "3px",
                          }}
                        />
                      </div>
                    </div>
                  </td>
                  <td width={"20%"}>
                    <input
                      value={stake}
                      min={0}
                      onChange={(e) => {
                        dispatch(
                          selectedBetAction({
                            ...selectedBet,
                            team: {
                              ...selectedBet?.team,
                              stake: +e.target.value,
                            },
                          })
                        );
                      }}
                      type="number"
                      onKeyDown={handleKeyDown}
                      placeholder=""
                      className="p-0 h-25 w-100 br-0"
                      style={{ border: "2px solid #f0f0f0" }}
                    />
                  </td>
                  <td width={"18%"} style={{ textAlign: "end" }}>
                    <span className="f500" style={{ textAlign: "end" }}>
                      0
                    </span>
                  </td>
                </tr>
                <tr className={"place-bet-table-blue"}>
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
                                      stake: +item?.value,
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
                              setStake(0);
                            }}
                          >
                            Reset
                          </CustomButton>
                        </Col>
                        <Col md={6} className="text-end">
                          <CustomButton
                            className="bg-success border-0 py-2"
                            size="sm"
                            onClick={() => {
                              if (loading) {
                                return;
                              } else {
                                let payload: any = {
                                  bettingType: selectedBet?.team?.bettingType,
                                  browserDetail: browserInfo?.userAgent,
                                  matchId: selectedBet?.team?.matchId,
                                  ipAddress:
                                    ipAddress === "Not found" || !ipAddress
                                      ? "192.168.1.100"
                                      : ipAddress,
                                  odd: parseFloat(selectedBet?.team?.odd),
                                  stake: selectedBet?.team?.stake,
                                  matchBetType: selectedBet?.team?.matchBetType,
                                  betOnTeam: selectedBet?.team?.betOnTeam,
                                  bettingName: selectedBet?.team?.bettingName,
                                  selectionId: selectedBet?.team?.selectionId,
                                };
                                
                                setMatchOddLoading(true);
                                dispatch(
                                  placeBet({
                                    url: ApiConstants.CARDS.MATCH.PLACE_BET,
                                    data: JSON.stringify(payload),
                                  })
                                );
                                setStake(0);
                              }
                            }}
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
      </div>
    </>
  );
};

export default PlacedBet;

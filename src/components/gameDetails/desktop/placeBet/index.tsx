import { Col, Container, Row, Table } from "react-bootstrap";
import { ImCross } from "react-icons/im";

import axios from "axios";
import { useEffect, useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  betPlaceSuccessReset,
  placeBet,
} from "../../../../store/actions/betPlace/betPlaceActions";
import { selectedBetAction } from "../../../../store/actions/match/matchListAction";
import { AppDispatch, RootState } from "../../../../store/store";
import { ApiConstants, matchBettingType } from "../../../../utils/constants";
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
  const { buttonValues, getProfile } = useSelector(
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
    setMatchOddRate(selectedBet?.team?.rate);
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

  const handleProfit = (value: any) => {
    let profit;
    if (selectedBet?.data?.type === "session") {
      profit =
        selectedBet?.team?.type === "no"
          ? value
          : (value * selectedBet?.team?.percent) / 100;
    } else if (
      selectedBet?.data?.type === matchBettingType.matchOdd ||
      selectedBet?.data?.type === matchBettingType.tiedMatch1 ||
      selectedBet?.data?.type === matchBettingType.completeMatch ||
      selectedBet?.data?.type === matchBettingType.halfTime ||
      selectedBet?.data?.type.includes("overUnder") ||
      selectedBet?.data?.type.includes("firstHalfGoal") ||
      selectedBet?.data?.type.includes("setWinner")
    ) {
      profit =
        selectedBet?.team?.type === "back"
          ? (value * ((matchOddRate - 1) * 100)) / 100
          : value;
    } else {
      profit =
        selectedBet?.team?.type === "back"
          ? (value * matchOddRate) / 100
          : value;
    }
    return parseFloat(profit).toFixed(2);
  };
  const handleUp = () => {
    if (selectedBet?.team?.matchBetType == "matchOdd") {
      setMatchOddRate(matchOddRate + 0.01);
    }
  };
  const handleDown = () => {
    if (selectedBet?.team?.matchBetType == "matchOdd") {
      setMatchOddRate(matchOddRate - 0.01);
    }
  };
  const handleName = (selected: any) => {
    let name;
    if (selected?.data?.name?.includes(".5")) {
      const parts = selected?.data?.name?.split("_");
      name = selected?.team?.betOnTeam + " " + parts[parts?.length - 1];
    } else {
      name = selected?.team?.betOnTeam ?? selected?.team?.name;
    }
    return name;
  };
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
                <tr
                  className={
                    selectedBet?.team?.type == "lay" ||
                    selectedBet?.team?.type == "no"
                      ? "place-bet-table-red"
                      : "place-bet-table-blue"
                  }
                >
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
                      {selectedBet?.team?.eventType === "horseRacing"
                        ? "MATCH_ODDS"
                        : handleName(selectedBet)}
                      {/* {selectedBet?.team?.name ?? selectedBet?.team?.betOnTeam} */}
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
                          backgroundColor: "#f0f0f0",
                          display: "flex",
                          flexDirection: "column",
                          width: "15px",
                          height: "100%",
                          justifyContent: "space-around",
                        }}
                      >
                        <FaChevronUp
                          style={{ width: "8px", height: "10px" }}
                          onClick={handleUp}
                        />
                        <FaChevronDown
                          style={{ width: "8px", height: "10px" }}
                          onClick={handleDown}
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
                      {selectedBet?.team?.eventType === "horseRacing" ||
                      selectedBet?.team?.eventType === "greyHound"
                        ? 0
                        : handleProfit(stake)}
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
                              if (
                                selectedBet?.team?.stake <
                                (selectedBet?.data?.minBet ||
                                  selectedBet?.data?.min)
                              ) {
                                toast.error(
                                  "Stake value must be greater or equal to min bet"
                                );
                                return;
                              } else if (
                                selectedBet?.team?.stake >
                                (selectedBet?.data?.maxBet ||
                                  selectedBet?.data?.max)
                              ) {
                                toast.error(
                                  "Stake value must be smaller or equal to max bet"
                                );
                                return;
                              }
                              if (loading || matchOddLoading) {
                                return;
                              } else {
                                let payloadForSession: any = {
                                  betId: selectedBet?.team?.betId,
                                  betType:
                                    selectedBet?.team?.type.toUpperCase(),
                                  browserDetail: browserInfo?.userAgent,
                                  eventName: selectedBet?.team?.name,
                                  eventType: selectedBet?.team?.eventType,
                                  matchId: selectedBet?.team?.matchId,
                                  ipAddress:
                                    ipAddress === "Not found" || !ipAddress
                                      ? "192.168.1.100"
                                      : ipAddress,
                                  odds: selectedBet?.team?.rate,
                                  ratePercent: selectedBet?.team?.percent,
                                  stake: selectedBet?.team?.stake,
                                };
                                let payloadForBettings: any = {
                                  betId: selectedBet?.team?.betId,
                                  teamA: selectedBet?.team?.teamA,
                                  teamB: selectedBet?.team?.teamB,
                                  teamC: selectedBet?.team?.teamC,
                                  bettingType:
                                    selectedBet?.team?.type.toUpperCase(),
                                  browserDetail: browserInfo?.userAgent,
                                  matchId: selectedBet?.team?.matchId,
                                  ipAddress:
                                    ipAddress === "Not found" || !ipAddress
                                      ? "192.168.1.100"
                                      : ipAddress,
                                  odd: matchOddRate,
                                  stake: selectedBet?.team?.stake,
                                  matchBetType: selectedBet?.team?.matchBetType,
                                  betOnTeam: selectedBet?.team?.betOnTeam,
                                  placeIndex: selectedBet?.team?.placeIndex,
                                  bettingName: selectedBet?.data?.name,
                                  gameType: selectedBet?.team?.eventType,
                                };
                                let payloadForRace: any = {
                                  betId: selectedBet?.team?.betId,
                                  bettingType:
                                    selectedBet?.team?.type.toUpperCase(),
                                  browserDetail: browserInfo?.userAgent,
                                  matchId: selectedBet?.team?.matchId,
                                  ipAddress:
                                    ipAddress === "Not found" || !ipAddress
                                      ? "192.168.1.100"
                                      : ipAddress,
                                  odd: matchOddRate,
                                  stake: selectedBet?.team?.stake,
                                  matchBetType: selectedBet?.team?.matchBetType,
                                  betOnTeam: selectedBet?.team?.betOnTeam,
                                  placeIndex: selectedBet?.team?.placeIndex,
                                  bettingName: selectedBet?.team?.bettingName,
                                  selectionId: selectedBet?.team?.selectionId,
                                  runnerId: selectedBet?.team?.runnerId,
                                };
                                if (
                                  selectedBet?.data?.type === "matchOdd" ||
                                  selectedBet?.team?.matchBetType === "matchOdd"
                                ) {
                                  setMatchOddLoading(true);
                                  if (
                                    selectedBet?.team?.eventType ===
                                      "horseRacing" ||
                                    selectedBet?.team?.eventType === "greyHound"
                                  ) {
                                    setTimeout(() => {
                                      dispatch(
                                        placeBet({
                                          url: ApiConstants.BET
                                            .PLACEBETRACEBETTING,
                                          data: JSON.stringify(payloadForRace),
                                        })
                                      );
                                    }, getProfile?.delayTime * 1000);
                                  } else {
                                    setTimeout(() => {
                                      dispatch(
                                        placeBet({
                                          url:
                                            selectedBet?.data?.type ===
                                              "session" ||
                                            selectedBet?.data?.SelectionId
                                              ? ApiConstants.BET.PLACEBETSESSION
                                              : selectedBet?.team?.gameType ===
                                                "other"
                                              ? ApiConstants.BET
                                                  .PLACEBETMATCHBETTINGOTHER
                                              : ApiConstants.BET
                                                  .PLACEBETMATCHBETTING,
                                          data:
                                            selectedBet?.data?.type ===
                                              "session" ||
                                            selectedBet?.data?.SelectionId
                                              ? JSON.stringify(
                                                  payloadForSession
                                                )
                                              : JSON.stringify(
                                                  payloadForBettings
                                                ),
                                        })
                                      );
                                    }, getProfile?.delayTime * 1000);
                                  }
                                } else {
                                  dispatch(
                                    placeBet({
                                      url:
                                        selectedBet?.data?.type === "session" ||
                                        selectedBet?.data?.SelectionId
                                          ? ApiConstants.BET.PLACEBETSESSION
                                          : selectedBet?.team?.gameType ===
                                            "other"
                                          ? ApiConstants.BET
                                              .PLACEBETMATCHBETTINGOTHER
                                          : ApiConstants.BET
                                              .PLACEBETMATCHBETTING,
                                      data:
                                        selectedBet?.data?.type === "session" ||
                                        selectedBet?.data?.SelectionId
                                          ? JSON.stringify(payloadForSession)
                                          : JSON.stringify(payloadForBettings),
                                    })
                                  );
                                }
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

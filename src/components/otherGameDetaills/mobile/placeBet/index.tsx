import axios from "axios";
import { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
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
import Loader from "../../../commonComponent/loader";
import CustomModal from "../../../commonComponent/modal";
import "./styles.scss";

interface PlaceBetProps {
  show: boolean;
  setShow: any;
}

const FootballPlaceBet = ({ show }: PlaceBetProps) => {
  const [stake, setStake] = useState<any>(0);
  const [valueLabel, setValueLabel] = useState<any>([]);
  const [browserInfo, setBrowserInfo] = useState<any>(null);
  const [matchOddLoading, setMatchOddLoading] = useState<any>(false);
  const [ipAddress, setIpAddress] = useState("192.168.1.100");
  const { buttonValues, getProfile } = useSelector(
    (state: RootState) => state.user.profile
  );

  const { selectedBet } = useSelector(
    (state: RootState) => state.match.matchList
  );
  const { success, loading, error } = useSelector(
    (state: RootState) => state.match.bet
  );
  const { otherMatchDetails } = useSelector(
    (state: RootState) => state.otherGames.matchDetail
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
          ? (value * ((selectedBet?.team?.rate - 1) * 100)) / 100
          : -(value * ((selectedBet?.team?.rate - 1) * 100)) / 100;
    } else {
      profit =
        selectedBet?.team?.type === "back"
          ? (value * selectedBet?.team?.rate) / 100
          : -(value * selectedBet?.team?.rate) / 100;
    }
    return isNaN(profit) ? 0 : parseFloat(profit).toFixed(2) ?? 0;
  };

  const handleTeamRates = (team: string, type: string) => {
    let rate;
    if (team?.includes(".5")) {
      let name = team?.split("_");
      rate =
        otherMatchDetails?.profitLossDataMatch[
          `${type === "A" ? "yes" : "no"}RateUnderOver${name[name?.length - 1]}`
        ];
    } else if (team?.includes("set_winner")) {
      let name =
        team?.length == 11
          ? `userTeam${type}RateSetWinner${team[10]}`
          : `userTeam${type}RateSetWinner${team[10] + team[11]}`;
      rate = otherMatchDetails?.profitLossDataMatch[name];
    } else {
      rate = otherMatchDetails?.profitLossDataMatch[`team${type}Rate`];
    }
    return rate || 0;
  };
  const handleProLoss = (data: any, name: any, type: string) => {
    let profit: any;
    if (data?.betOnTeam === data[`team${type}`]) {
      profit = (
        Number(handleProfit(stake)) + Number(handleTeamRates(name, type))
      ).toFixed(2);
    } else {
      profit =
        data?.type === "back"
          ? (
              -Number(data?.stake) + Number(handleTeamRates(name, type))
            ).toFixed(2)
          : (Number(data?.stake) + Number(handleTeamRates(name, type))).toFixed(
              2
            );
    }
    return isNaN(profit)
      ? Number(handleTeamRates(name, type)).toFixed(2)
      : parseFloat(profit).toFixed(2);
  };
  const handleName = (selected: any) => {
    let name;
    if (selected?.data?.name?.includes(".5")) {
      const parts = selected?.data?.name?.split("_");
      name = selected?.team?.betOnTeam + " " + parts[parts?.length - 1];
    } else {
      name = selected?.team?.betOnTeam;
    }
    return name;
  };
  return (
    <>
      <CustomModal
        title={"Place Bet"}
        show={show && selectedBet}
        setShow={() => {
          dispatch(selectedBetAction(null));
        }}
      >
        <Container
          className={`${
            selectedBet?.team?.type === "lay" ||
            selectedBet?.team?.type === "no"
              ? "bg-red1"
              : "bg-blue1"
          }`}
          fluid
        >
          <Row className="row-cols-md-3 g-2 align-items-center">
            <Col xs={8} className="f600 title-14">
              {handleName(selectedBet)}
            </Col>
            <Col xs={4} className="d-flex justify-content-end">
              <CustomButton
                onClick={() => {
                  if (selectedBet?.team?.matchBetType !== "matchOdd") {
                    return true;
                  }
                  dispatch(
                    selectedBetAction({
                      ...selectedBet,
                      team: {
                        ...selectedBet?.team,
                        rate:
                          parseInt(selectedBet?.team?.rate) == 0
                            ? 0
                            : parseInt(selectedBet?.team?.rate) - 1,
                      },
                    })
                  );
                }}
                className="bg-secondary py-0 br-0"
              >
                <span className="f900 text-black">-</span>
              </CustomButton>
              <input
                min={0}
                value={+selectedBet?.team?.rate || 0}
                type="number"
                className="w-50 br-0"
                style={{ border: "1px solid #000" }}
              />
              <CustomButton
                onClick={() => {
                  if (selectedBet?.team?.matchBetType !== "matchOdd") {
                    return true;
                  }
                  dispatch(
                    selectedBetAction({
                      ...selectedBet,
                      team: {
                        ...selectedBet?.team,
                        rate: parseInt(selectedBet?.team?.rate) + 1,
                      },
                    })
                  );
                }}
                className="bg-secondary f900 text-black br-0"
              >
                <span className="f900 text-black">+</span>
              </CustomButton>
            </Col>
            <Col xs={4}>
              {" "}
              <input
                value={stake}
                min={0}
                onChange={(e) => {
                  dispatch(
                    selectedBetAction({
                      ...selectedBet,
                      team: {
                        ...selectedBet?.team,
                        stake: parseFloat(e.target.value),
                      },
                    })
                  );
                }}
                // disabled
                type="number"
                placeholder=""
                className="w-100 br-0"
                style={{ border: "0.5px solid #000" }}
              />
            </Col>

            <Col xs={4} className="f800 title-12">
              <CustomButton
                className="f400 w-100 br-0"
                onClick={() => {
                  try {
                    if (
                      ![
                        "bookmaker",
                        "bookmaker1",
                        "bookmaker2",
                        "quickbookmaker1",
                        "quickbookmaker2",
                        "quickbookmaker3",
                      ].includes(selectedBet?.team?.matchBetType)
                    ) {
                      if (
                        selectedBet?.team?.stake <
                        (selectedBet?.data?.minBet || selectedBet?.data?.min)
                      ) {
                        toast.error(
                          "Stake value must be greater or equal to min bet"
                        );
                        return;
                      } else if (
                        selectedBet?.team?.stake >
                        (selectedBet?.data?.maxBet || selectedBet?.data?.max)
                      ) {
                        toast.error(
                          "Stake value must be smaller or equal to max bet"
                        );
                        return;
                      }
                    }
                    if (loading || matchOddLoading) {
                      return;
                    }
                    let payloadForSession: any = {
                      betId: selectedBet?.team?.betId,
                      betType: selectedBet?.team?.type.toUpperCase(),
                      browserDetail: browserInfo?.userAgent,
                      eventName: selectedBet?.team?.name,
                      eventType: selectedBet?.team?.eventType,
                      matchId: selectedBet?.team?.matchId,
                      ipAddress:
                        ipAddress === "Not found" ? "192.168.1.100" : ipAddress,
                      odds: selectedBet?.team?.rate,
                      ratePercent: selectedBet?.team?.percent,
                      stake: selectedBet?.team?.stake,
                    };
                    let payloadForBettings: any = {
                      betId: selectedBet?.team?.betId,
                      teamA: selectedBet?.team?.teamA,
                      teamB: selectedBet?.team?.teamB,
                      teamC: selectedBet?.team?.teamC,
                      bettingType: selectedBet?.team?.type.toUpperCase(),
                      browserDetail: browserInfo?.userAgent,
                      matchId: selectedBet?.team?.matchId,
                      ipAddress:
                        ipAddress === "Not found" ? "192.168.1.100" : ipAddress,
                      odd: selectedBet?.team?.rate,
                      stake: selectedBet?.team?.stake,
                      matchBetType: selectedBet?.team?.matchBetType,
                      betOnTeam: selectedBet?.team?.betOnTeam,
                      placeIndex: selectedBet?.team?.placeIndex,
                      bettingName: selectedBet?.data?.name,
                      gameType: selectedBet?.team?.eventType,
                    };
                    if (
                      selectedBet?.data?.type === "matchOdd" ||
                      selectedBet?.team?.matchBetType === "matchOdd"
                    ) {
                      setMatchOddLoading(true);
                      setTimeout(() => {
                        dispatch(
                          placeBet({
                            url:
                              selectedBet?.data?.type === "session" ||
                              selectedBet?.data?.SelectionId
                                ? ApiConstants.BET.PLACEBETSESSION
                                : ApiConstants.BET.PLACEBETMATCHBETTINGOTHER,
                            data:
                              selectedBet?.data?.type === "session" ||
                              selectedBet?.data?.SelectionId
                                ? JSON.stringify(payloadForSession)
                                : JSON.stringify(payloadForBettings),
                          })
                        );
                      }, getProfile?.delayTime * 1000);
                    } else {
                      dispatch(
                        placeBet({
                          url:
                            selectedBet?.data?.type === "session" ||
                            selectedBet?.data?.SelectionId
                              ? ApiConstants.BET.PLACEBETSESSION
                              : ApiConstants.BET.PLACEBETMATCHBETTINGOTHER,
                          data:
                            selectedBet?.data?.type === "session" ||
                            selectedBet?.data?.SelectionId
                              ? JSON.stringify(payloadForSession)
                              : JSON.stringify(payloadForBettings),
                        })
                      );
                    }
                  } catch (e) {
                    console.log(e);
                  }
                }}
              >
                <span
                  style={{
                    height: "15px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {" "}
                  Submit
                </span>
              </CustomButton>
            </Col>
            <Col xs={4} className="title-12 text-center">
              {handleProfit(stake)}
            </Col>
            {valueLabel?.map((item: any, index: number) => (
              <Col key={index} xs={4}>
                <CustomButton
                  className="w-100 border-0 bg-secondary f600 text-black"
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
            <div className="container d-flex justify-content-between mt-2">
              {selectedBet?.data?.type &&
                selectedBet.data.type !== "session" &&
                selectedBet.team.matchBetType !== "apiSession" && (
                  <>
                    <div className="row">
                      <div className="col-md-4 flex-start">
                        <div className="row">
                          <div className="col-md-12">
                            <span className="f400 title-12">
                              {selectedBet?.team?.teamA}
                            </span>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-md-12">
                            <span className="f400 title-12">
                              {selectedBet?.team?.teamB}
                            </span>
                          </div>
                        </div>
                        {selectedBet?.team?.teamC && (
                          <div className="row">
                            <div className="col-md-12">
                              <span className="f400 title-12">
                                {selectedBet?.team?.teamC}
                              </span>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="row row5">
                      <div className="col-md-4">
                        <div className="row">
                          <div className="col-md-12">
                            <span className="f600 title-12">
                              {handleTeamRates(selectedBet?.data?.name, "A")}
                            </span>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-md-12">
                            <span className="f600 title-12">
                              {handleTeamRates(selectedBet?.data?.name, "B")}
                            </span>
                          </div>
                        </div>
                        {selectedBet?.team?.teamC && (
                          <div className="row">
                            <div className="col-md-12">
                              <span className="f600 title-12">
                                {handleTeamRates(selectedBet?.data?.name, "C")}
                              </span>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-4">
                        <div className="row">
                          <div className="col-md-12">
                            <span
                              style={{ fontSize: "12px", fontWeight: "600" }}
                              className={
                                Number(
                                  handleProLoss(
                                    selectedBet?.team,
                                    selectedBet?.data?.name,
                                    "A"
                                  )
                                ) > 0
                                  ? "color-green"
                                  : "color-red"
                              }
                            >
                              {handleProLoss(
                                selectedBet?.team,
                                selectedBet?.data?.name,
                                "A"
                              )}
                              {/* {selectedBet?.team?.betOnTeam ===
                              selectedBet?.team?.teamA
                                ? handleProfit(stake)
                                : selectedBet?.team?.type === "back"
                                ?  isNaN(selectedBet?.team?.stake) ? 0 : -selectedBet?.team?.stake
                                : isNaN(selectedBet?.team?.stake) ? 0 :  selectedBet?.team?.stake} */}
                            </span>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-md-12">
                            <span
                              style={{ fontSize: "12px", fontWeight: "600" }}
                              className={
                                Number(
                                  handleProLoss(
                                    selectedBet?.team,
                                    selectedBet?.data?.name,
                                    "B"
                                  )
                                ) > 0
                                  ? "color-green"
                                  : "color-red"
                              }
                            >
                              {handleProLoss(
                                selectedBet?.team,
                                selectedBet?.data?.name,
                                "B"
                              )}
                              {/* {selectedBet?.team?.betOnTeam ===
                              selectedBet?.team?.teamB
                                ? handleProfit(stake)
                                : selectedBet?.team?.type === "back"
                                ? isNaN(selectedBet?.team?.stake) ? 0 : -selectedBet?.team?.stake
                                : isNaN(selectedBet?.team?.stake) ? 0 : selectedBet?.team?.stake} */}
                            </span>
                          </div>
                        </div>

                        {selectedBet?.team?.teamC && (
                          <div className="row">
                            <div className="col-md-12">
                              <span
                                style={{ fontSize: "12px", fontWeight: "600" }}
                                className={
                                  Number(
                                    handleProLoss(
                                      selectedBet?.team,
                                      selectedBet?.data?.name,
                                      "C"
                                    )
                                  ) > 0
                                    ? "color-green"
                                    : "color-red"
                                }
                              >
                                {handleProLoss(
                                  selectedBet?.team,
                                  selectedBet?.data?.name,
                                  "C"
                                )}
                                {/* {selectedBet?.team?.betOnTeam ===
                                selectedBet?.team?.teamC
                                  ? handleProfit(stake)
                                  : selectedBet?.team?.type === "back"
                                  ? isNaN(selectedBet?.team?.stake) ? 0 : -selectedBet?.team?.stake
                                  : isNaN(selectedBet?.team?.stake) ? 0 : selectedBet?.team?.stake} */}
                              </span>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </>
                )}
            </div>
          </Row>
        </Container>
      </CustomModal>
      {(loading || matchOddLoading) && <Loader />}
    </>
  );
};

export default FootballPlaceBet;

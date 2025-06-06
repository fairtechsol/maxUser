import axios from "axios";
import { useEffect, useState } from "react";
import { Col, Container, Modal, Row } from "react-bootstrap";
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
import ButtonValues from "../buttonValues";
import "./style.scss";
interface PlaceBetProps {
  show: boolean;
  setShow: any;
}

const PlacedBet = ({ show }: PlaceBetProps) => {
  const [stake, setStake] = useState<any>();
  const [valueLabel, setValueLabel] = useState<any>([]);
  const [browserInfo, setBrowserInfo] = useState<any>(null);
  const [matchOddLoading, setMatchOddLoading] = useState<any>(false);
  const [ipAddress, setIpAddress] = useState("192.168.1.100");
  const [shown, setShow] = useState(false);
  const { buttonValues, getProfile } = useSelector(
    (state: RootState) => state.user.profile
  );

  const { selectedBet, matchDetails } = useSelector(
    (state: RootState) => state.match.matchList
  );
  const { success, loading, error } = useSelector(
    (state: RootState) => state.match.bet
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
    setStake(selectedBet?.team?.stake === 0 ? "" : selectedBet?.team?.stake);
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
      dispatch(betPlaceSuccessReset());
      setMatchOddLoading(false);
    }
    if (error) {
      setMatchOddLoading(false);
    }
  }, [success, error]);

  const handleProfit = (value: any) => {
    let profit;
    if (selectedBet?.team?.matchBetType === "session") {
      profit = 0;
    } else if (
      selectedBet?.data?.type === matchBettingType.matchOdd ||
      selectedBet?.data?.type === matchBettingType.tiedMatch1 ||
      selectedBet?.data?.type === matchBettingType.completeMatch ||
      selectedBet?.data?.type === matchBettingType.halfTime ||
      selectedBet?.data?.type?.includes("overUnder") ||
      selectedBet?.data?.type?.includes("firstHalfGoal") ||
      selectedBet?.data?.type?.includes("setWinner")
    ) {
      profit =
        selectedBet?.team?.type === "back" || selectedBet?.team?.type === "BACK"
          ? (value * ((selectedBet?.team?.rate - 1) * 100)) / 100
          : -(value * ((selectedBet?.team?.rate - 1) * 100)) / 100;
    } else {
      profit =
        selectedBet?.team?.type === "back" || selectedBet?.team?.type === "BACK"
          ? (value * selectedBet?.team?.rate) / 100
          : -(value * selectedBet?.team?.rate) / 100;
    }
    return isNaN(profit) ? 0 : parseFloat(profit).toFixed(2) ?? 0;
  };

  const handleProLoss = (data: any, type: string) => {
    let profit: any;
    if (data?.betOnTeam === data[`team${type}`]) {
      profit = (
        Number(handleProfit(parseFloat(stake))) +
        Number(handleTeamRates(data?.matchBetType, type))
      ).toFixed(2);
    } else {
      profit =
        data?.type === "back" || data?.type === "BACK"
          ? (
            -Number(data?.stake) +
            Number(handleTeamRates(data?.matchBetType, type))
          ).toFixed(2)
          : (
            Number(data?.stake) +
            Number(handleTeamRates(data?.matchBetType, type))
          ).toFixed(2);
    }
    return isNaN(profit)
      ? Number(
        handleTeamRates(data?.matchBetType, type)
          ? Number(handleTeamRates(data?.matchBetType, type))
          : 0
      ).toFixed(2)
      : parseFloat(profit).toFixed(2);
  };

  const handleTeamRates = (type: any, team: string) => {
    let rate;
    if (
      type === "matchOdd" ||
      type === "bookmaker" ||
      type === "bookmaker2" ||
      type === "quickbookmaker1" ||
      type === "quickbookmaker2" ||
      type === "quickbookmaker3"
    ) {
      rate =
        matchDetails?.profitLossDataMatch[
        `team${team}Rate_${matchDetails?.id}`
        ];
    } else if (
      type === "completeMatch" ||
      type === "completeMatch1" ||
      type === "completeManual"
    ) {
      rate =
        team === "A"
          ? matchDetails?.profitLossDataMatch[
          `yesRateComplete_${matchDetails?.id}`
          ]
          : matchDetails?.profitLossDataMatch[
          `noRateComplete_${matchDetails?.id}`
          ];
    } else {
      rate =
        team === "A"
          ? matchDetails?.profitLossDataMatch[`yesRateTie_${matchDetails?.id}`]
          : matchDetails?.profitLossDataMatch[`noRateTie_${matchDetails?.id}`];
    }
    return rate || 0;
  };
  const handleProfitLoss = (id: any, r_id: any) => {
    const key = `${id}_profitLoss_${matchDetails.id}`;

    const profitLossJson = matchDetails?.profitLossDataMatch?.[key];

    const profitLossObj = profitLossJson ? JSON.parse(profitLossJson) : 0;
    return profitLossObj?.[r_id];
  };
  const handleKeyDown = (e: any) => {
    if (e.key === "e" || e.key === "E") {
      e.preventDefault();
    }
  };
  const formatNumber = (num: any) => {
    if (num >= 1000 && num < 1000000) {
      return (num / 1000).toFixed(1).replace(/\.0$/, "") + "K";
    } else if (num >= 100000) {
      return (num / 100000).toFixed(1).replace(/\.0$/, "") + "L";
    }
    return num.toString();
  };

  const handleSubmit = () => {
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
          toast.error("Stake value must be greater or equal to min bet");
          return;
        } else if (
          selectedBet?.team?.stake >
          (selectedBet?.data?.maxBet || selectedBet?.data?.max)
        ) {
          toast.error("Stake value must be smaller or equal to max bet");
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
        ipAddress: ipAddress === "Not found" ? "192.168.1.100" : ipAddress,
        odds: selectedBet?.team?.rate,
        ratePercent: selectedBet?.team?.percent,
        stake: selectedBet?.team?.stake,
        betPlaceIndex: selectedBet?.team?.betPlaceIndex,
        mid: selectedBet?.team?.mid,
        teamName: selectedBet?.team?.teamName,
      };
      let payloadForTournament: any = {
        betId: selectedBet?.team?.betId,
        bettingType: selectedBet?.team?.type.toUpperCase(),
        browserDetail: browserInfo?.userAgent,
        matchId: selectedBet?.team?.matchId,
        ipAddress:
          ipAddress === "Not found" || !ipAddress ? "192.168.1.100" : ipAddress,
        odd: selectedBet?.team?.rate,
        stake: selectedBet?.team?.stake,
        matchBetType: selectedBet?.team?.matchBetType,
        betOnTeam: selectedBet?.team?.betOnTeam,
        placeIndex: selectedBet?.team?.placeIndex,
        bettingName: selectedBet?.data?.name,
        gType: selectedBet?.team?.eventType,
        mid: selectedBet?.team?.mid,
        selectionId: selectedBet?.team?.selectionId,
        runnerId: selectedBet?.team?.runnerId,
      };
      let payloadForBettings: any = {
        betId: selectedBet?.team?.betId,
        teamA: selectedBet?.team?.teamA,
        teamB: selectedBet?.team?.teamB,
        teamC: selectedBet?.team?.teamC,
        bettingType: selectedBet?.team?.type.toUpperCase(),
        browserDetail: browserInfo?.userAgent,
        matchId: selectedBet?.team?.matchId,
        ipAddress: ipAddress === "Not found" ? "192.168.1.100" : ipAddress,
        odd: selectedBet?.team?.rate,
        stake: selectedBet?.team?.stake,
        matchBetType: selectedBet?.team?.matchBetType,
        betOnTeam: selectedBet?.team?.betOnTeam,
        placeIndex: selectedBet?.team?.placeIndex,
        bettingName: selectedBet?.data?.name,
        gameType: selectedBet?.team?.eventType,
        mid: selectedBet?.team?.mid,
        selectionId: selectedBet?.team?.selectionId,
      };
      let payloadForRace: any = {
        betId: selectedBet?.team?.betId,
        bettingType: selectedBet?.team?.type.toUpperCase(),
        browserDetail: browserInfo?.userAgent,
        matchId: selectedBet?.team?.matchId,
        ipAddress:
          ipAddress === "Not found" || !ipAddress ? "192.168.1.100" : ipAddress,
        odd: selectedBet?.team?.rate,
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
          selectedBet?.team?.eventType === "horseRacing" ||
          selectedBet?.team?.eventType === "greyHound"
        ) {
          setTimeout(() => {
            dispatch(
              placeBet({
                url: ApiConstants.BET.PLACEBETRACEBETTING,
                data: JSON.stringify(payloadForRace),
              })
            );
          }, getProfile?.delayTime * 1000);
        } else {
          setTimeout(() => {
            dispatch(
              placeBet({
                url:
                  selectedBet?.data?.type === "session" ||
                    selectedBet?.data?.SelectionId
                    ? ApiConstants.BET.PLACEBETSESSION
                    : selectedBet?.team?.gameType === "other"
                      ? ApiConstants.BET.PLACEBETMATCHBETTINGOTHER
                      : ApiConstants.BET.PLACEBETMATCHBETTING,
                data:
                  selectedBet?.data?.type === "session" ||
                    selectedBet?.data?.SelectionId
                    ? JSON.stringify(payloadForSession)
                    : JSON.stringify(payloadForBettings),
              })
            );
          }, getProfile?.delayTime * 1000);
        }
      } else if (selectedBet?.team?.matchBetType === "tournament") {
        setMatchOddLoading(true);
        if (selectedBet?.data?.name == "MATCH_ODDS") {
          setTimeout(() => {
            dispatch(
              placeBet({
                url: ApiConstants.BET.PLACEBETTOURNAMENT,
                data: JSON.stringify(payloadForTournament),
              })
            );
            setMatchOddLoading(false);
          }, getProfile?.delayTime * 1000);
        } else {
          dispatch(
            placeBet({
              url: ApiConstants.BET.PLACEBETTOURNAMENT,
              data: JSON.stringify(payloadForTournament),
            })
          );
        }
      } else {
        dispatch(
          placeBet({
            url:
              selectedBet?.team?.matchBetType === "session" ||
                selectedBet?.data?.SelectionId
                ? ApiConstants.BET.PLACEBETSESSION
                : ApiConstants.BET.PLACEBETMATCHBETTING,
            data:
              selectedBet?.team?.matchBetType === "session" ||
                selectedBet?.data?.SelectionId
                ? JSON.stringify(payloadForSession)
                : JSON.stringify(payloadForBettings),
          })
        );
      }
      dispatch(selectedBetAction(null));
    } catch (e) {
      console.log(e);
    }
  };
  const handleTounamentProLoss = (data: any, id: any) => {
    let profit: any;
    if (stake === 0) {
      return false;
    }
    if (data?.runnerId === id) {
      profit =
        parseFloat(stake) * (parseFloat(data?.rate) - 1) +
        parseFloat(handleProfitLoss(data?.runners?.parentBetId || data?.runners?.id, id));
    } else {
      profit =
        parseFloat(handleProfitLoss(data?.runners?.parentBetId || data?.runners?.id, id)) - parseFloat(stake);
    }

    return profit ? profit : "";
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
          className={`${selectedBet?.team?.type === "lay" ||
            selectedBet?.team?.type === "LAY" ||
            selectedBet?.team?.type === "no"
            ? "bg-red1"
            : "placeBet-bg-blue"
            }`}
          fluid
        >
          <Row className="row-cols-md-3 g-2 align-items-center">
            <Col xs={8} className="title-12 fbold">
              {selectedBet?.team?.eventType === "horseRacing"
                ? "MATCH_ODDS"
                : handleName(selectedBet)}
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
                <span className="f600 title-16 text-white">-</span>
              </CustomButton>
              <input
                min={0}
                value={+selectedBet?.team?.rate || 0}
                type="number"
                className="w-50 br-0"
                style={{
                  border:
                    selectedBet?.team?.type === "lay" ||
                      selectedBet?.team?.type === "LAY" ||
                      selectedBet?.team?.type === "no"
                      ? "1px solid #faa9ba"
                      : "1px solid #72bbef",
                  backgroundColor:
                    selectedBet?.team?.type === "lay" ||
                      selectedBet?.team?.type === "LAY" ||
                      selectedBet?.team?.type === "no"
                      ? "#f7dde2"
                      : "#cbe3f3",
                }}
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
                className="bg-secondary f900 text-white br-0"
                style={{ border: 0 }}
              >
                <span className="f600 title-16 text-white">+</span>
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
                        stake: +e.target.value,
                      },
                    })
                  );
                }}
                // disabled
                type="number"
                onKeyDown={handleKeyDown}
                placeholder=""
                className="w-100 br-0"
                style={{ border: "0.5px solid #000" }}
              />
            </Col>

            <Col xs={4} className="f800 title-12">
              <CustomButton
                style={{ height: "28px" }}
                className={`f600 w-100 br-5 ${selectedBet?.team?.stake === 0 ? "btnbg-red" : "btnbg-blue"
                  }`}
                onClick={handleSubmit}
                disabled={selectedBet?.team?.stake === 0 ? true : false}
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
              {selectedBet?.team?.eventType === "horseRacing" ||
                selectedBet?.team?.eventType === "greyHound"
                ? 0
                : handleProfit(stake)}
            </Col>
            {valueLabel?.map((item: any, index: number) => (
              <Col key={index} xs={4}>
                <CustomButton
                  className="w-100 border-0 br-0 bg-secondary f600 text-black"
                  size="sm"
                  onClick={() => {
                    dispatch(
                      selectedBetAction({
                        ...selectedBet,
                        team: {
                          ...selectedBet?.team,
                          stake: parseFloat(item?.value),
                        },
                      })
                    );
                  }}
                >
                  <span style={{ color: "#fff" }}>
                    {formatNumber(item?.label)}
                  </span>
                </CustomButton>
              </Col>
            ))}
            <Col xs={12} className="d-flex justify-content-between">
              <div className="d-flex align-items-center justify-content-start">
                <span className="fbold title-12 text-black">
                  Range: {selectedBet?.team?.min} to{" "}
                  {formatNumber(parseFloat(selectedBet?.team?.max))}
                </span>
              </div>
              <div
                style={{
                  width: "50px",
                  height: "38px",
                  backgroundColor: "#097c93",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  color: "#fff",
                  fontSize: "16px",
                  borderRadius: "3px",
                }}
                onClick={() => setShow(true)}
              >
                Edit
              </div>
            </Col>
            {selectedBet?.team?.matchBetType === "tournament" ? (
              selectedBet?.team?.runners?.runners?.map((item: any) => {
                return (
                  <>
                    <div className="container d-flex justify-content-between mt-2">
                      <div className="row" style={{ width: "40%" }}>
                        <div className="col-md-4 flex-start">
                          <div className="row">
                            <div className="col-md-12">
                              <span className="f400 title-12">{item?.nat}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="row row5" style={{ width: "30%" }}>
                        <div className="col-md-4">
                          <div className="row">
                            <div className="col-md-12 text-center">
                              <span
                                className={`f400 title-12 ${handleProfitLoss(
                                  selectedBet?.team?.runners?.parentBetId || selectedBet?.team?.runners?.id,
                                  item?.parentRunnerId || item?.id
                                ) < 0
                                  ? "color-red"
                                  : "color-green"
                                  }`}
                              >
                                {Number(handleProfitLoss(
                                  selectedBet?.team?.runners?.parentBetId || selectedBet?.team?.runners?.id,
                                  item?.parentRunnerId || item?.id
                                )).toFixed(2)}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="row" style={{ width: "30%" }}>
                        <div className="col-md-4">
                          <div className="row">
                            <div className="col-md-12 text-end">
                              <span
                                style={{ fontSize: "12px", fontWeight: "400" }}
                                className={
                                  Number(
                                    handleTounamentProLoss(
                                      selectedBet?.team,
                                      item?.parentRunnerId || item?.id
                                    )
                                  ) > 0
                                    ? "color-green"
                                    : "color-red"
                                }
                              >
                                {Number(handleTounamentProLoss(
                                  selectedBet?.team,
                                  item?.parentRunnerId || item?.id
                                )).toFixed(2)}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                );
              })
            ) : (
              <div className="container d-flex justify-content-between mt-2">
                {selectedBet?.data?.type &&
                  selectedBet.data.type !== "session" &&
                  selectedBet.team.matchBetType !== "apiSession" &&
                  selectedBet?.team?.eventType !== "horseRacing" &&
                  selectedBet?.team?.eventType !== "greyHound" && (
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
                              <span className="f400 title-12">
                                {handleTeamRates(
                                  selectedBet?.team?.matchBetType,
                                  "A"
                                )}
                              </span>
                            </div>
                          </div>
                          <div className="row">
                            <div className="col-md-12">
                              <span className="f400 title-12">
                                {handleTeamRates(
                                  selectedBet?.team?.matchBetType,
                                  "B"
                                )}
                              </span>
                            </div>
                          </div>
                          {selectedBet?.team?.teamC && (
                            <div className="row">
                              <div className="col-md-12">
                                <span className="f400 title-12">
                                  {handleTeamRates(
                                    selectedBet?.team?.matchBetType,
                                    "C"
                                  )}
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
                                style={{ fontSize: "12px", fontWeight: "400" }}
                                className={
                                  Number(
                                    handleProLoss(selectedBet?.team, "A")
                                  ) > 0
                                    ? "color-green"
                                    : "color-red"
                                }
                              >
                                {selectedBet?.team?.stake > 0
                                  ? handleProLoss(selectedBet?.team, "A")
                                  : ""}
                                {/* {selectedBet?.team?.betOnTeam ===
                             selectedBet?.team?.teamA
                               ? selectedBet?.team?.stake ? (Number(handleProfit(stake)) + Number(matchDetails?.profitLossDataMatch?.teamARate)).toFixed(2) : 0
                               : selectedBet?.team?.type === "back"
                               ? isNaN(selectedBet?.team?.stake) ? 0 : -selectedBet?.team?.stake
                               : isNaN(selectedBet?.team?.stake) ? 0 : selectedBet?.team?.stake} */}
                              </span>
                            </div>
                          </div>
                          <div className="row">
                            <div className="col-md-12">
                              <span
                                style={{ fontSize: "12px", fontWeight: "400" }}
                                className={
                                  Number(
                                    handleProLoss(selectedBet?.team, "B")
                                  ) > 0
                                    ? "color-green"
                                    : "color-red"
                                }
                              >
                                {selectedBet?.team?.stake > 0
                                  ? handleProLoss(selectedBet?.team, "B")
                                  : ""}
                                {/* {selectedBet?.team?.betOnTeam ===
                             selectedBet?.team?.teamB
                               ? selectedBet?.team?.stake ? (Number(handleProfit(stake)) + Number(matchDetails?.profitLossDataMatch?.teamBRate)).toFixed(2) : 0
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
                                  style={{
                                    fontSize: "12px",
                                    fontWeight: "600",
                                  }}
                                  className={
                                    Number(
                                      handleProLoss(selectedBet?.team, "C")
                                    ) > 0
                                      ? "color-green"
                                      : "color-red"
                                  }
                                >
                                  {selectedBet?.team?.stake > 0
                                    ? handleProLoss(selectedBet?.team, "C")
                                    : ""}
                                  {/* {selectedBet?.team?.betOnTeam ===
                               selectedBet?.team?.teamC
                                 ? selectedBet?.team?.stake ? (Number(handleProfit(stake)) + Number(matchDetails?.profitLossDataMatch?.teamCRate)).toFixed(2) : 0
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
            )}
          </Row>
        </Container>
      </CustomModal>
      <Modal show={shown} onHide={() => setShow(false)}>
        <Modal.Header
          className="bg-primary rounded-0"
          style={{ zIndex: "999" }}
        >
          <Modal.Title>
            <span
              style={{ color: "#fff", fontSize: "16px", fontWeight: "bold" }}
            >
              Set Button Value
            </span>
          </Modal.Title>
          <button
            type="button"
            className="btn-close btn-close-white"
            aria-label="Close"
            onClick={() => setShow(false)}
          ></button>
        </Modal.Header>
        <Modal.Body className="p-0 mt-2 mb-2 rounded-0">
          <ButtonValues setShow={setShow} />
        </Modal.Body>
        {/* {footer ? <Modal.Footer>{footer}</Modal.Footer> : ""} */}
      </Modal>
      {(loading || matchOddLoading) && <Loader />}
    </>
  );
};

export default PlacedBet;

import { Col, Container, Row, Table } from "react-bootstrap";
import { ImCross } from "react-icons/im";

import axios from "axios";
import { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { formatNumber } from "../../../../../helpers";
import {
  betPlaceSuccessReset,
  placeBet,
} from "../../../../../store/actions/betPlace/betPlaceActions";
import { selectedBetAction } from "../../../../../store/actions/match/matchListAction";
import { AppDispatch, RootState } from "../../../../../store/store";
import { ApiConstants, cardGamesType } from "../../../../../utils/constants";
import ButtonValues from "../../../../gameDetails/mobile/buttonValues";
import CustomButton from "../../../button";
import CustomLoader from "../../../customLoader/CustomLoader";
import RightPanelContainer from "../rightPanelContainer";
import "./style.scss";

const placeBetHeader = [
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

const DesktopPlacedBet = ({ type }: any) => {
  const [stake, setStake] = useState<any>(0);
  const [valueLabel, setValueLabel] = useState<any>([]);
  const [browserInfo, setBrowserInfo] = useState<any>(null);
  const [matchOddLoading, setMatchOddLoading] = useState<any>(false);
  const [ipAddress, setIpAddress] = useState("192.168.1.100");
  const [matchOddRate, setMatchOddRate] = useState<any>(null);
  const [shown, setShow] = useState(false);
  const { buttonValues2 } = useSelector(
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
    let updatedBtnValue = buttonValues2?.value;

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
  }, [buttonValues2]);

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

  const handleSubmit = () => {
    if (loading) {
      return;
    } else {
      let payload: any = {
        bettingType: selectedBet?.team?.bettingType,
        browserDetail: browserInfo?.userAgent,
        matchId: selectedBet?.team?.matchId,
        ipAddress:
          ipAddress === "Not found" || !ipAddress ? "192.168.1.100" : ipAddress,
        odd: parseFloat(selectedBet?.team?.odd),
        stake: [
          "Line1 Single",
          "Line2 Single",
          "ODD Single",
          "EVEN Single",
        ].includes(selectedBet?.team?.betOnTeam)
          ? selectedBet?.team?.stake * 5
          : selectedBet?.team?.stake,
        matchBetType: selectedBet?.team?.matchBetType,
        betOnTeam: selectedBet?.team?.betOnTeam,
        bettingName: selectedBet?.team?.bettingName,
        selectionId: selectedBet?.team?.selectionId,
      };

      if (
        selectedBet?.data?.type === "3cardj" &&
        selectedBet?.team?.betOnTeam.split(" ")[1].length < 3
      ) {
        return;
      }

      setMatchOddLoading(true);
      dispatch(
        placeBet({
          url: ApiConstants.CARDS.MATCH.PLACE_BET,
          data: JSON.stringify(payload),
        })
      );
      setStake(0);
    }
  };

  return (
    <>
      <div className="loader-container">
        {(loading || matchOddLoading) && <CustomLoader />}
        {selectedBet ? (
          <>
            <RightPanelContainer title="Place Bet">
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
                    className={`
                    ${type === cardGamesType.andarBahar1
                        ? selectedBet?.team?.name?.includes("Andar")
                          ? "game-type-andar"
                          : "game-type-bahar"
                        : selectedBet?.team?.bettingType === "LAY"
                          ? "place-bet-table-red"
                          : "place-bet-table-blue"
                      }
                  `}
                  >
                    {/* <td width={"8%"}>
                    <span
                      className=" text-danger title-12 cursor-pointer"
                      onClick={() => {
                        dispatch(selectedBetAction(null));
                      }}
                    >
                      <ImCross />
                    </span>
                  </td> */}
                    <td width={"34%"}>
                      <span className=" text-danger title-12 cursor-pointer">
                        <ImCross />
                      </span>
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
                          className="p-0 w-75 br-0 title-13"
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
                          />
                          <FaChevronDown
                            style={{ width: "8px", height: "10px" }}
                          />
                        </div>
                      </div>
                    </td>
                    <td width={"25%"}>
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          height: "24px",
                        }}
                      >
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
                          className="p-0 w-100 br-0 title-13"
                          style={{ border: "2px solid #f0f0f0" }}
                        />
                      </div>
                    </td>
                    <td width={"18%"} style={{ textAlign: "end" }}>
                      <span
                        className="f500"
                        style={{ textAlign: "end" }}
                      ></span>
                    </td>
                  </tr>
                  <tr
                    className={`
                  ${type === cardGamesType.andarBahar1
                        ? selectedBet?.team?.bettingType === "BACK"
                          ? "game-type-andar"
                          : "game-type-bahar"
                        : selectedBet?.team?.bettingType === "LAY"
                          ? "place-bet-table-red"
                          : "place-bet-table-blue"
                      }
                `}
                  >
                    <td colSpan={5}>
                      <div>
                        <Row style={{ padding: "0.5rem" }}>
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
                                <span
                                  style={{
                                    fontSize: "14px",
                                    fontWeight: "bold",
                                  }}
                                >
                                  {formatNumber(item?.label)}
                                </span>
                              </CustomButton>
                            </Col>
                          ))}
                        </Row>
                        <div className="w-100 d-flex flex-row justify-content-between">
                          <div>
                            <div
                              style={{
                                width: "80px",
                                height: "38px",
                                backgroundColor: "#097c93",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                color: "#fff",
                                fontSize: "14px",
                                borderRadius: "3px",
                              }}
                              onClick={() => setShow(true)}
                            >
                              Edit
                            </div>
                          </div>

                          <div className="reset1-submit1-btn-container">
                            <button
                              className="reset-buttonn1"
                              onClick={() => {
                                dispatch(selectedBetAction(null));
                              }}
                              style={{
                                fontSize: "13px",
                              }}
                            >
                              Reset
                            </button>
                            <button
                              disabled={
                                selectedBet?.team?.stake == 0
                                  ? true
                                  : false &&
                                  (selectedBet?.team?.isActive != undefined
                                    ? selectedBet?.team?.isActive
                                    : true)
                              }
                              className="submit-buttonn1"
                              onClick={handleSubmit}
                              style={{
                                backgroundColor:
                                  selectedBet?.team?.stake == 0 ||
                                    (selectedBet?.team?.isActive != undefined
                                      ? !selectedBet?.team?.isActive
                                      : false)
                                    ? "#198754"
                                    : "#086f3f",
                                fontSize: "13px",
                              }}
                            >
                              Submit
                            </button>
                          </div>
                        </div>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </Table>
            </RightPanelContainer>
          </>
        ) : (
          ""
        )}
      </div>
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
          <ButtonValues />
        </Modal.Body>
        {/* {footer ? <Modal.Footer>{footer}</Modal.Footer> : ""} */}
      </Modal>
    </>
  );
};

export default DesktopPlacedBet;

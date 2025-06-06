import axios from "axios";
import { useEffect, useState } from "react";
import { Col, Container, Modal, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { formatNumber } from "../../../../../helpers";
import {
  betPlaceSuccessReset,
  placeBet,
} from "../../../../../store/actions/betPlace/betPlaceActions";
import { selectedBetAction } from "../../../../../store/actions/match/matchListAction";
import { AppDispatch, RootState } from "../../../../../store/store";
import { ApiConstants } from "../../../../../utils/constants";
import ButtonValues from "../../../../gameDetails/mobile/buttonValues";
import CustomButton from "../../../button";
import Loader from "../../../loader";
import CustomModal from "../../../modal";
import "./style.scss";

interface PlaceBetProps {
  show: boolean;
  setShow: any;
  // type: any;
}

const MobilePlacedBet = ({ show }: PlaceBetProps) => {
  const [stake, setStake] = useState<any>();
  const [valueLabel, setValueLabel] = useState<any>([]);
  const [browserInfo, setBrowserInfo] = useState<any>(null);
  const [matchOddLoading, setMatchOddLoading] = useState<any>(false);
  const [ipAddress, setIpAddress] = useState("192.168.1.100");
  const [shown, setShow] = useState(false);
  const { buttonValues2 } = useSelector(
    (state: RootState) => state.user.profile
  );

  const { selectedBet } = useSelector(
    (state: RootState) => state.match.matchList
  );
  const { success, loading, error } = useSelector(
    (state: RootState) => state.match.bet
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
    setStake(selectedBet?.team?.stake < 1 ? "" : selectedBet?.team?.stake);
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
      setMatchOddLoading(false);
      dispatch(betPlaceSuccessReset());

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
      <CustomModal
        title={"Place Bet"}
        show={show || selectedBet}
        setShow={() => {
          dispatch(selectedBetAction(null));
        }}
      >
        <Container
          className={`${selectedBet?.team?.bettingType === "LAY" ||
              selectedBet?.team?.bettingType === "NO"
              ? "bg-red1"
              : "placeBet-bg-blue"
            }`}
          fluid
        >
          <Row className="row-cols-md-3 g-2 align-items-center">
            <Col xs={8} className="f600 title-14">
              {selectedBet?.team?.name}
            </Col>
            <Col xs={4} className="d-flex justify-content-end">
              <CustomButton className="bg-secondary py-0 br-0">
                <span className="f900 text-white">-</span>
              </CustomButton>
              <input
                min={0}
                value={+selectedBet?.team?.odd || 0}
                type="number"
                className="w-50 br-0"
                style={{ border: "1px solid #000" }}
              />
              <CustomButton className="bg-secondary f900 text-black br-0">
                <span className="f900 text-white">+</span>
              </CustomButton>
            </Col>
            <Col xs={4}>
              {" "}
              <input
                value={stake}
                // min={5}
                onChange={(e) => {
                  const value = e.target.value === "" ? "" : +e.target.value;
                  setStake(value); // Update stake state

                  dispatch(
                    selectedBetAction({
                      ...selectedBet,
                      team: {
                        ...selectedBet?.team,
                        stake: value,
                      },
                    })
                  );
                }}
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
                className={`f600 w-100 br-5 ${selectedBet?.team?.stake < 1 ? "btnbg-red" : "btnbg-blue"
                  }`}
                disabled={selectedBet?.team?.stake < 1 ? true : false}
                onClick={() => {
                  try {
                    if (loading || matchOddLoading) {
                      return;
                    }
                    let payload: any = {
                      bettingType: selectedBet?.team?.bettingType,
                      browserDetail: browserInfo?.userAgent,
                      matchId: selectedBet?.team?.matchId,
                      ipAddress:
                        ipAddress === "Not found" || !ipAddress
                          ? "192.168.1.100"
                          : ipAddress,
                      odd: parseFloat(selectedBet?.team?.odd),
                      stake: [
                        "Line1 Single",
                        "Line2 Single",
                        "ODD Single",
                        "EVEN Single",
                      ].includes(selectedBet?.team?.betOnTeam)
                        ? selectedBet?.team?.stake * 5
                        : parseFloat(selectedBet?.team?.stake),
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
                    // setTimeout(() => {
                    dispatch(selectedBetAction(null));
                    // }, 500);
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
            <Col xs={4} className="title-12 text-center"></Col>
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
                  <span style={{ color: "#fff" }}>
                    {formatNumber(item?.label)}
                  </span>
                </CustomButton>
              </Col>
            ))}
            <Col
              xs={12}
              className="d-flex justify-content-between align-items-center"
            >
              <span className="text-black fbold title-12">
                Range:{" "}
                {formatNumber(selectedBet?.team?.min || 0) +
                  " to " +
                  formatNumber(selectedBet?.team?.max || 0)}
              </span>
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
            <div className="container d-flex justify-content-between mt-2"></div>
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
          <ButtonValues />
        </Modal.Body>
        {/* {footer ? <Modal.Footer>{footer}</Modal.Footer> : ""} */}
      </Modal>
      {(loading || matchOddLoading) && <Loader />}
    </>
  );
};

export default MobilePlacedBet;

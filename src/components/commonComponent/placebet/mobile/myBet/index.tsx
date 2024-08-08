import axios from "axios";
import { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  betPlaceSuccessReset,
  placeBet,
} from "../../../../../store/actions/betPlace/betPlaceActions";
import { selectedBetAction } from "../../../../../store/actions/match/matchListAction";
import "./style.scss";
import { AppDispatch, RootState } from "../../../../../store/store";
import CustomModal from "../../../modal";
import CustomButton from "../../../button";
import { ApiConstants } from "../../../../../utils/constants";
import Loader from "../../../loader";

interface PlaceBetProps {
  show: boolean;
  setShow: any;
}

const MobilePlacedBet = ({ show }: PlaceBetProps) => {
  const [stake, setStake] = useState<any>(0);
  const [valueLabel, setValueLabel] = useState<any>([]);
  const [browserInfo, setBrowserInfo] = useState<any>(null);
  const [matchOddLoading, setMatchOddLoading] = useState<any>(false);
  const [ipAddress, setIpAddress] = useState("192.168.1.100");
  const { buttonValues } = useSelector(
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
          className={`${
            selectedBet?.team?.bettingType === "LAY" ||
            selectedBet?.team?.bettingType === "NO"
              ? "bg-red1"
              : "bg-blue1"
          }`}
          fluid
        >
          <Row className="row-cols-md-3 g-2 align-items-center">
            <Col xs={8} className="f600 title-14">
              {selectedBet?.team?.name}
            </Col>
            <Col xs={4} className="d-flex justify-content-end">
              <CustomButton className="bg-secondary py-0 br-0">
                <span className="f900 text-black">-</span>
              </CustomButton>
              <input
                min={0}
                value={+selectedBet?.team?.odd || 0}
                type="number"
                className="w-50 br-0"
                style={{ border: "1px solid #000" }}
              />
              <CustomButton className="bg-secondary f900 text-black br-0">
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
                className="f600 w-100 br-0"
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
                  {item?.label}
                </CustomButton>
              </Col>
            ))}
            <div className="container d-flex justify-content-between mt-2"></div>
          </Row>
        </Container>
      </CustomModal>
      {(loading || matchOddLoading) && <Loader />}
    </>
  );
};

export default MobilePlacedBet;

import { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { selectedBetAction } from "../../../../store/actions/match/matchListAction";
import { AppDispatch, RootState } from "../../../../store/store";
import { ApiConstants, matchBettingType } from "../../../../utils/constants";
import CustomButton from "../../../commonComponent/button";
import CustomModal from "../../../commonComponent/modal";
import "./style.scss";
import axios from "axios";
import {
  betPlaceSuccessReset,
  placeBet,
} from "../../../../store/actions/betPlace/betPlaceActions";

interface PlaceBetProps {
  show: boolean;
  setShow: any;
}

const PlacedBet = ({ show }: PlaceBetProps) => {
  const [stake, setStake] = useState<any>(0);
  const [valueLabel, setValueLabel] = useState<any>([]);
  const [browserInfo, setBrowserInfo] = useState<any>(null);
  const [ipAddress, setIpAddress] = useState("192.168.1.100");
  const { buttonValues } = useSelector(
    (state: RootState) => state.user.profile
  );

  const { selectedBet } = useSelector(
    (state: RootState) => state.match.matchList
  );
  const { success } = useSelector((state: RootState) => state.match.bet);

  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    let updatedBtnValue = buttonValues[0]?.value;

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
    }
  }, [success]);

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
      selectedBet?.data?.type === matchBettingType.completeMatch
    ) {
      profit =
        selectedBet?.team?.type === "back"
          ? (value * ((selectedBet?.team?.rate - 1) * 100)) / 100
          : value;
    } else {
      profit =
        selectedBet?.team?.type === "back"
          ? (value * selectedBet?.team?.rate) / 100
          : value;
        }
    return isNaN(profit) ? 0 : Number(profit?.toFixed(2));
  };

  return (
    <CustomModal
      title={"Place Bet"}
      show={show && selectedBet}
      setShow={() => {
        dispatch(selectedBetAction(null));
      }}
      
    >
      <Container className={`${selectedBet?.team?.type === 'lay' || selectedBet?.team?.type === 'no' ? 'place-bet-table-redm' : 'place-bet-table-bluem'}`} fluid>
        <Row className="row-cols-md-3 g-2 align-items-center">
          <Col xs={6} className="f800 title-12">
            {selectedBet?.team?.name ?? selectedBet?.team?.betOnTeam}
          </Col>
          <Col xs={6} className="d-flex justify-content-end">
            <CustomButton
              onClick={() => {
                dispatch(
                  selectedBetAction({
                    ...selectedBet,
                    team: {
                      ...selectedBet?.team,
                      stake: parseInt(stake) == 0 ? 0 : parseInt(stake) - 1,
                    },
                  })
                );
              }}
              className="bg-secondary py-0"
            >
              <span className="f900 text-black">-</span>
            </CustomButton>
            <input
              min={0}
              value={+selectedBet?.team?.rate || 0}
              type="number"
              className="w-50"
            />
            <CustomButton
              onClick={() => {
                dispatch(
                  selectedBetAction({
                    ...selectedBet,
                    team: {
                      ...selectedBet?.team,
                      stake: parseInt(stake) + 1,
                    },
                  })
                );
              }}
              className="bg-secondary f900 text-black"
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
                      stake: parseInt(e.target.value),
                    },
                  })
                );
              }}
              // disabled
              type="number"
              placeholder=""
              className="w-100"
            />
          </Col>

          <Col xs={4} className="f800 title-12">
            <CustomButton
              className="f900 w-100"
              onClick={() => {
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
                };
                dispatch(
                  placeBet({
                    url:
                      selectedBet?.data?.type === "session" ||
                      selectedBet?.data?.SelectionId
                        ? ApiConstants.BET.PLACEBETSESSION
                        : ApiConstants.BET.PLACEBETMATCHBETTING,
                    data:
                      selectedBet?.data?.type === "session" ||
                      selectedBet?.data?.SelectionId
                        ? JSON.stringify(payloadForSession)
                        : JSON.stringify(payloadForBettings),
                  })
                );
              }}
            >
              Submit
            </CustomButton>
          </Col>
          <Col xs={4} className="title-12 text-center">
          {handleProfit(stake)}
          </Col>
          {valueLabel?.map((item: any, index: number) => (
            <Col key={index} xs={4}>
              <CustomButton
                className="w-100 border-0 bg-secondary f900 text-black"
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
      </Container>
    </CustomModal>
  );
};

export default PlacedBet;

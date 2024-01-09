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
import { placeBet } from "../../../../store/actions/betPlace/betPlaceActions";

interface PlaceBetProps {
  show: boolean;
  setShow: any;
}

const PlacedBet = ({ show }: PlaceBetProps) => {
  const [stake, setStake] = useState<any>(0);
  const [valueLabel, setValueLabel] = useState<any>([]);
  const [browserInfo, setBrowserInfo] = useState<any>(null);
  const [ipAddress, setIpAddress] = useState(null);
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
    setStake((prev: number) => +prev + +selectedBet?.team?.stake);
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

  return (
    <CustomModal
      title={"Place Bet"}
      show={show && selectedBet}
      setShow={() => {
        dispatch(selectedBetAction(null));
      }}
    >
      <Container className="p-1" fluid>
        <Row className="row-cols-md-3 g-2 align-items-center">
          <Col xs={6} className="f800 title-12">
            {selectedBet?.team?.name}
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
              value={stake}
              onChange={(e) => {
                console.log(e.target.value, "eTarget");
                dispatch(
                  selectedBetAction({
                    ...selectedBet,
                    team: {
                      ...selectedBet?.team,
                      stake: +stake + parseInt(e.target.value),
                    },
                  })
                );
              }}
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
              value={selectedBet?.team?.rate}
              disabled
              type="text"
              className="w-100"
            />
          </Col>

          <Col xs={4} className="f800 title-12">
            <CustomButton
              className="f900 w-100"
              onClick={() => {
                let payload: any = {
                  betId: selectedBet?.team?.betId,
                  betType: selectedBet?.team?.type.toUpperCase(),
                  browserDetail: browserInfo?.userAgent,
                  eventName: selectedBet?.team?.name,
                  eventType: selectedBet?.team?.eventType,
                  matchId: selectedBet?.team?.matchId,
                  ipAddress: ipAddress ? ipAddress : "164.192.1.2",
                  odd: selectedBet?.team?.rate,
                  ratePercent: selectedBet?.team?.percent,
                  stake: selectedBet?.team?.stake,
                };
                dispatch(
                  placeBet({
                    url:
                      selectedBet?.data?.type === "session"
                        ? ApiConstants.BET.PLACEBETSESSION
                        : ApiConstants.BET.PLACEBETMATCHBETTING,
                    data: JSON.stringify(payload),
                  })
                );
              }}
            >
              Submit
            </CustomButton>
          </Col>
          <Col xs={4} className="title-12 text-center">
            {selectedBet?.data?.type == matchBettingType.matchOdd ||
            selectedBet?.data?.type == matchBettingType.tiedMatch1 ||
            selectedBet?.data?.type == matchBettingType.completeMatch
              ? parseInt(stake) * (parseInt(selectedBet?.team?.rate) - 1)
              : selectedBet?.data?.yesRate
              ? 0
              : stake * (parseInt(selectedBet?.team?.rate) / 100)}
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

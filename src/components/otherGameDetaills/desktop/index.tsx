import { useEffect, useRef, useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import BetTableHeader from "../../commonComponent/betTableHeader";
// import "./style.scss";
import CustomModal from "../../commonComponent/modal";
import BetTable from "../../otherGameDetaills/betTable/index";
import PlacedBet from "../../gameDetails/desktop/placeBet";
import { MatchType } from "../../../utils/enum";
import { formatDate } from "../../../utils/dateUtils";
import MyBet from "../../gameDetails/desktop/myBet";
import LiveStreamComponent from "../../commonComponent/liveStreamComponent";
import { getChannelId } from "../../../helpers";

const FootballDesktopGameDetail = () => {
  const placeBetRef = useRef<HTMLDivElement>(null);
  const [isSticky, setIsSticky] = useState(false);
  const [showContactAdmin, setShowContactAdmin] = useState(false);
  const [channelId, setChannelId] = useState<string>("");

  const { otherMatchDetails } = useSelector(
    (state: RootState) => state.otherGames.matchDetail
  );

  useEffect(() => {
    const handleScroll = () => {
      if (placeBetRef?.current && placeBetRef?.current?.offsetTop) {
        const sticky = placeBetRef?.current.offsetTop;
        setIsSticky(window.scrollY > sticky);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    try {
      if (otherMatchDetails?.eventId) {
        const callApiForLiveStream = async () => {
          let result = await getChannelId(otherMatchDetails?.eventId);
          if (result) {
            setChannelId(result?.channelNo);
          }
        };
        callApiForLiveStream();
      }
    } catch (error) {
      console.log(error);
    }
  }, [otherMatchDetails?.id]);

  return (
    <Container fluid>
      <Row>
        <Col md={8}>
          <Container fluid className="p-0">
            <Row>
              <Col md={12}>
                <BetTableHeader
                  customClass="mt-2 py-2"
                  title={otherMatchDetails?.title}
                  rightComponent={
                    <span className="title-16 f500">
                      {/* {formatDate(otherMatchDetails?.startAt)} */}
                      {otherMatchDetails?.startAt &&
                        formatDate(otherMatchDetails?.startAt)}
                    </span>
                  }
                />
              </Col>

              {otherMatchDetails?.matchOdd?.isActive && (
                <Col md={12}>
                  <BetTable
                    title={otherMatchDetails?.matchOdd?.name}
                    type={MatchType.MATCH_ODDS}
                    data={otherMatchDetails?.matchOdd}
                  />
                </Col>
              )}

              {/* {otherMatchDetails?.bookmaker?.isActive && (
                <Col md={12}>
                  <BetTable
                    title={otherMatchDetails?.bookmaker?.name}
                    type={MatchType.MATCH_ODDS}
                    data={otherMatchDetails?.bookmaker}
                  />
                </Col>
              )} */}

              {otherMatchDetails?.quickBookmaker?.length > 0 &&
                otherMatchDetails?.quickBookmaker
                  ?.filter((item: any) => item?.isActive)
                  ?.map((item: any) => (
                    <div key={item?.id}>
                      <Col md={12}>
                        <BetTable
                          title={item?.name}
                          type={MatchType.BOOKMAKER}
                          data={item}
                        />
                      </Col>
                    </div>
                  ))}

              {otherMatchDetails?.setWinner?.length > 0 &&
                otherMatchDetails?.setWinner
                  ?.filter((item: any) => item?.isActive)
                  ?.map((item: any) => (
                    <div key={item?.id}>
                      <Col md={12}>
                        <BetTable
                          title={item?.name}
                          type={MatchType.SET_WINNER}
                          data={item}
                        />
                      </Col>
                    </div>
                  ))}
              {otherMatchDetails?.firstHalfGoal?.length > 0 &&
                otherMatchDetails?.firstHalfGoal
                  ?.filter((item: any) => item?.isActive)
                  ?.map((item: any) => (
                    <div key={item?.id}>
                      <Col md={12}>
                        <BetTable
                          title={item?.name}
                          type={MatchType.UNDER_OVER}
                          data={item}
                        />
                      </Col>
                    </div>
                  ))}

              {otherMatchDetails?.halfTime?.isActive && (
                <Col md={12}>
                  <BetTable
                    title={otherMatchDetails?.halfTime?.name}
                    type={MatchType.MATCH_ODDS}
                    data={otherMatchDetails?.halfTime}
                  />
                </Col>
              )}

              {otherMatchDetails?.overUnder?.length > 0 &&
                otherMatchDetails?.overUnder
                  ?.filter((item: any) => item?.isActive)
                  ?.map((item: any) => (
                    <div key={item?.id}>
                      <Col md={12}>
                        <BetTable
                          title={item?.name}
                          type={MatchType.UNDER_OVER}
                          data={item}
                        />
                      </Col>
                    </div>
                  ))}
            </Row>
          </Container>
        </Col>
        <Col md={4} className="ps-0">
          <Container className="p-0" fluid ref={placeBetRef}>
            <Row
              className={` ${isSticky ? "position-fixed top-0" : ""}`}
              style={{
                width: isSticky
                  ? placeBetRef.current?.offsetWidth + "px"
                  : "100%",
              }}
            >
              {channelId !== "0" && channelId !== "" && (
                <Col md={12}>
                  <LiveStreamComponent channelId={channelId} />
                </Col>
              )}
              <Col md={12}>
                <PlacedBet />
              </Col>
              <Col md={12}>
                <MyBet />
              </Col>
            </Row>
          </Container>
        </Col>
      </Row>
      <CustomModal
        customClass="modalFull-90 rule-popup"
        title={""}
        show={showContactAdmin}
        setShow={setShowContactAdmin}
      >
        <Container className="under-development-container">
          <Row className="mt-5">
            <Col md={{ span: 6, offset: 3 }} className="text-center">
              <h5>Contact Admin</h5>
              <Button
                variant="primary"
                className="mt-3"
                onClick={() => setShowContactAdmin(false)}
              >
                Cancel
              </Button>
            </Col>
          </Row>
        </Container>
      </CustomModal>
    </Container>
  );
};

export default FootballDesktopGameDetail;

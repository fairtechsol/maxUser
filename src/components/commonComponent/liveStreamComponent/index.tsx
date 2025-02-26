import { useState } from "react";
import { Col, Container, Ratio, Row } from "react-bootstrap";
import { getTvData } from "../../../utils/tvUrlGet";
import RightPanelContainer from "./RightPanelContainer";

const LiveStreamComponent = ({ url, eventId, marketType, setTvData }: any) => {
  const [showVideo, setShowVideo] = useState<boolean>(false);
  return (
    <>
      <RightPanelContainer
        title={"Live Stream"}
        setShowVideo={(e: any) => {
          getTvData(eventId, setTvData, marketType, true);
          setShowVideo(e);
        }}
      >
        {!sessionStorage.getItem("isDemo") && showVideo && (
          <Container>
            <Row className="justify-content-md-center">
              <Col md={12} className="p-0">
                <Ratio aspectRatio="16x9">
                  <iframe
                    src={url}
                    title="Live Stream"
                    referrerPolicy={"strict-origin-when-cross-origin"}
                  ></iframe>
                </Ratio>
              </Col>
            </Row>
          </Container>
        )}
      </RightPanelContainer>
    </>
  );
};

export default LiveStreamComponent;

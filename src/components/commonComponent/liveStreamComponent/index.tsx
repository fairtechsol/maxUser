import { Col, Container, Ratio, Row } from "react-bootstrap";
import { ApiConstants } from "../../../utils/constants";
import RightPanelContainer from "./RightPanelContainer";
import { useState } from "react";

const LiveStreamComponent = ({ channelId }: any) => {
  const [showVideo, setShowVideo] = useState<boolean>(false);
  return (
    <>
      <RightPanelContainer title={"Live Stream"} setShowVideo={setShowVideo}>
        {showVideo && (
          <Container>
            <Row className="justify-content-md-center">
              <Col md={12}>
                <Ratio aspectRatio="16x9">
                  <iframe
                    src={`${ApiConstants.LIVESTREAM.GET_VIDEO}?chid=${channelId}`}
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

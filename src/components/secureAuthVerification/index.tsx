import { useState } from "react";
import {
  Col,
  Form,
  Row,
  ToggleButton,
  ToggleButtonGroup,
} from "react-bootstrap";
import { TfiAndroid } from "react-icons/tfi";
import { isMobile } from "../../utils/screenDimension";
import CustomButton from "../commonComponent/button";
import CustomInput from "../commonComponent/input";
import ReportContainer from "../containers/reportContainer";

import { teamStatus } from "../../utils/constants";
import "./style.scss";
import { AppDispatch, RootState } from "../../store/store";
import { useDispatch } from "react-redux";
import { generateAuthToken } from "../../store/actions/authAction";
import { useSelector } from "react-redux";

const SecureAuthVerificationComponent = () => {
  const dispatch: AppDispatch = useDispatch();
  const { authToken } = useSelector((state: RootState) => state.auth);
  const [selectedValue, setSelectedValue] = useState(null);

  const handleChange = (value: any) => {
    if (value === 1) {
      dispatch(generateAuthToken());
    }
    setSelectedValue(value);
  };

  return (
    <ReportContainer title="Secure Auth Verification">
      <div className="secureAuth px-2 mt-md-5 mb-5">
        <Row className="justify-content-center text-center">
          <Col lg={6}>
            <div
              className={`secureAuth-status d-flex align-items-center ${
                isMobile
                  ? "mt-2 justify-content-between"
                  : "justify-content-center"
              } `}
            >
              <h3 className="m-0 me-2 fw-normal title-16">
                Secure Auth Verification Status:{" "}
              </h3>
              <span
                className={`pdf ${
                  isMobile ? "title-14" : "title-16"
                } fw-bold text-white  px-2`}
              >
                Disabled
              </span>
            </div>
            <p className={`${isMobile ? "title-12" : "title-16"} mt-2`}>
              Please select below option to enable secure auth verification
            </p>
            <div id="left-tabs-example">
              <ToggleButtonGroup
                type="radio"
                name="options"
                value={selectedValue}
                onChange={handleChange}
              >
                <ToggleButton
                  className="auth-verification-btn-box"
                  bsPrefix={`auth-verification-btn btn-check ${
                    selectedValue === 1 ? teamStatus.active : ""
                  }`}
                  id="mobileapp"
                  value={1}
                >
                  Enable Using Mobile App
                </ToggleButton>
                <ToggleButton
                  className="auth-verification-btn-box"
                  bsPrefix={`auth-verification-btn btn-check ${
                    selectedValue === 2 ? teamStatus.active : ""
                  }`}
                  id="telegram"
                  value={2}
                >
                  Enable Using Telegram
                </ToggleButton>
              </ToggleButtonGroup>

              {selectedValue === 1 && (
                <>
                  <p className=" title-16 mt-3">
                    Please enter below auth code in your 'Secure Auth
                    Verification App'.
                  </p>
                  <div
                    className="p-1 mb-3"
                    style={{
                      lineHeight: 1,
                      color: "#585858",
                    }}
                  >
                    <span
                      style={{
                        fontSize: "45px",
                        backgroundColor: "#e4e4e4",
                        padding: "10px",
                        width: "auto",
                      }}
                    >
                      {authToken}
                    </span>
                  </div>
                  <b className="title-16">
                    If you haven't downloaded,
                    <span className="d-lg-block">
                      {" "}
                      please download 'Secure Auth Verification App' from below
                      link.{" "}
                    </span>
                  </b>
                  <p className="title-16">
                    Using this app you will receive auth code during login
                    authentication
                  </p>
                  <div className="androidDwnloadCard d-flex align-items-center mx-auto justify-content-center bg-green">
                    <span className="text-white me-3">
                      <TfiAndroid className="title-46 text-white" />
                    </span>
                    <div className="text-left">
                      <h4 className="mb-0">Download</h4>
                      <div className="mt-0 dtext">on the android</div>
                    </div>
                  </div>
                </>
              )}
              {selectedValue === 2 && (
                <>
                  <p className="title-14 mt-3">
                    Please enter your Transaction Password to continue
                  </p>

                  <Form className="getConection w-100">
                    <div className="d-flex  justify-content-center">
                      <CustomInput
                        type="email"
                        placeholder="Enter Transaction"
                      />
                      <CustomButton
                        className={`ms-2 ${!isMobile && "bg-primary"} border-0`}
                      >
                        Get Connection Id
                      </CustomButton>{" "}
                    </div>
                  </Form>
                </>
              )}
            </div>
          </Col>
        </Row>
      </div>
    </ReportContainer>
  );
};

export default SecureAuthVerificationComponent;

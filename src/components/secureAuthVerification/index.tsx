import { useEffect, useState } from "react";
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

import OTPInput from "react-otp-input";
import { useDispatch, useSelector } from "react-redux";
import {
  generateAuthToken,
  getAuthenticator,
  removeAuthenticator,
  resendTokenToDisable,
  resetAuthTokenSuccess,
} from "../../store/actions/authAction";
import { AppDispatch, RootState } from "../../store/store";
import { serviceUrl, teamStatus } from "../../utils/constants";
import "./style.scss";

const SecureAuthVerificationComponent = () => {
  const dispatch: AppDispatch = useDispatch();
  const { authToken, authenticatedData, authTokenSuccess } = useSelector(
    (state: RootState) => state.auth
  );
  const [selectedValue, setSelectedValue] = useState(null);
  const [password, setPassword] = useState("");
  const [showOtp, setShowOtp] = useState(false);
  const [otp, setOtp] = useState("");
  const [showDetails, setShowDetails] = useState(false);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    dispatch(
      generateAuthToken({
        type: 1,
        password: password,
      })
    );
  };

  const handleInputChange = (e: any) => {
    const value = e.target.value;
    setPassword(value);
  };

  const handleOtpChange = (otpValue: any) => {
    setOtp(otpValue);
  };

  const handleChange = (value: any) => {
    if (value === 1) {
      dispatch(
        generateAuthToken({
          type: 2,
        })
      );
    }
    setSelectedValue(value);
    setShowDetails(false);
  };

  useEffect(() => {
    dispatch(getAuthenticator());
  }, []);

  useEffect(() => {
    if (otp.length === 6) {
      dispatch(
        removeAuthenticator({
          authToken: otp,
        })
      );
    }
  }, [otp]);

  useEffect(() => {
    if (authTokenSuccess) {
      setShowDetails(true);
      dispatch(resetAuthTokenSuccess());
    }
  }, [authTokenSuccess]);

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
              <button
                className={`${authenticatedData ? "excel" : "pdf"} ${
                  isMobile ? "title-14" : "title-16"
                } fw-bold text-white px-2`}
                onClick={() => {
                  if (authenticatedData?.type === 1) {
                    dispatch(resendTokenToDisable());
                  }
                  if (authenticatedData) {
                    setShowOtp(true);
                  }
                }}
              >
                {authenticatedData ? "Enabled" : "Disabled"}
              </button>
            </div>
            {showOtp && (
              <div
                className="p-4 d-flex flex-column"
                style={{ backgroundColor: "#fff" }}
              >
                <span
                  className="text-center"
                  style={{ fontSize: "22px", color: "#004a25" }}
                >
                  Security Code Verification
                </span>
                <span className="title-16 text-center">
                  Enter the 6-digit code to disbale Secure Auth
                </span>
                <form onSubmit={handleSubmit}>
                  <OTPInput
                    value={otp}
                    onChange={handleOtpChange}
                    numInputs={6}
                    shouldAutoFocus
                    inputStyle={{
                      width: "60px",
                      height: "60px",
                      margin: "0 0.5rem",
                      fontSize: "1.5rem",
                      textAlign: "center",
                      border: "1px solid #ccc",
                      borderRadius: "4px",
                    }}
                    containerStyle={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      marginTop: "1rem",
                    }}
                    renderInput={(props) => <input {...props} />}
                    inputType="tel"
                  />
                </form>
              </div>
            )}
            {!authenticatedData && (
              <>
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
                          please download 'Secure Auth Verification App' from
                          below link.{" "}
                        </span>
                      </b>
                      <p className="title-16">
                        Using this app you will receive auth code during login
                        authentication
                      </p>
                      <a
                        className="text-white"
                        href={`${serviceUrl}/SecureAuthApp.apk`}
                        target="_blank"
                      >
                        <div className="androidDwnloadCard d-flex align-items-center mx-auto justify-content-center bg-green">
                          <span className="text-white me-3 cursor-pointer">
                            <TfiAndroid className="title-46 text-white" />
                          </span>
                          <div className="text-left">
                            <h4 className="mb-0">Download</h4>
                            <div className="mt-0 dtext">on the android</div>
                          </div>
                        </div>
                      </a>
                    </>
                  )}
                  {selectedValue === 2 && (
                    <>
                      <p className="title-14 mt-3">
                        Please enter your Password to continue
                      </p>

                      <Form
                        className="getConection w-100"
                        onSubmit={(e) => {
                          handleSubmit(e);
                        }}
                      >
                        <div className="d-flex  justify-content-center">
                          <CustomInput
                            type="password"
                            placeholder="Enter Password"
                            value={password}
                            required
                            onChange={handleInputChange}
                          />
                          <CustomButton
                            className={`ms-2 ${
                              !isMobile && "bg-primary"
                            } border-0`}
                            type="submit"
                          >
                            Get Connection Id
                          </CustomButton>{" "}
                        </div>
                      </Form>
                      {showDetails && (
                        <div className="mt-3 follow-instruction">
                          <h4 className="title-20 fbold mb-3">
                            Please follow below instructions for the telegram
                            2-step verification
                          </h4>
                          <p className="title-16">
                            Find{" "}
                            <a
                              target="_blank"
                              href={
                                import.meta.env.VITE_NODE_ENV == "production"
                                  ? "https://t.me/Auth07_bot"
                                  : "https://t.me/max_bet_2_factor_auth_bot"
                              }
                            >
                              {import.meta.env.VITE_NODE_ENV == "production"
                                ? "@Auth07_bot"
                                : "@max_bet_2_factor_auth_bot"}
                            </a>{" "}
                            in your telegram and type<kbd>/start</kbd> command.
                            Bot will respond you.
                          </p>
                          <p className="title-16">
                            After this type <kbd>/connect {authToken}</kbd> and
                            send it to BOT.
                          </p>
                          <p className="title-16">
                            Now your telegram account will be linked with your
                            website account and 2-Step verification will be
                            enabled.
                          </p>

                          <hr />
                          <h4 className="title-20 fbold mb-3">
                            कृपया टेलीग्राम 2-Step verification के लिए नीचे दिए
                            गए निर्देशों का पालन करें:
                          </h4>
                          <p className="title-16">
                            अपने टेलीग्राम में{" "}
                            <a
                              target="_blank"
                              href={
                                import.meta.env.VITE_NODE_ENV == "production"
                                  ? "https://t.me/Auth07_bot"
                                  : "https://t.me/max_bet_2_factor_auth_bot"
                              }
                            >
                              {import.meta.env.VITE_NODE_ENV == "production"
                                ? "@Auth07_bot"
                                : "@max_bet_2_factor_auth_bot"}
                            </a>{" "}
                            खोजें और कमांड<kbd>/start</kbd> टाइप करें. BOT आपको
                            जवाब देगा.
                          </p>
                          <p className="title-16">
                            इसके बाद <kbd>/connect {authToken}</kbd> टाइप करें
                            और इसे BOT पर भेजें.
                          </p>
                          <p className="title-16">
                            अब आपका टेलीग्राम account आपके वेबसाइट account से
                            जुड़ जाएगा और 2-Step veriication चालू हो जाएगा.
                          </p>
                        </div>
                      )}
                    </>
                  )}
                </div>
              </>
            )}
          </Col>
        </Row>
      </div>
    </ReportContainer>
  );
};

export default SecureAuthVerificationComponent;

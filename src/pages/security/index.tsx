import { useEffect, useState } from "react";
import OTPInput from "react-otp-input";
import { maxbetLogo } from "../../assets/images";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store/store";
import {
  resendTokenToDisable,
  verifyAuthToken,
} from "../../store/actions/authAction";
import { useNavigate } from "react-router-dom";
const SecurityAuth = () => {
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();
  const [otp, setOtp] = useState("");

  const handleChange = (otpValue: any) => {
    setOtp(otpValue);
  };
  const handleSubmit = (e: any) => {
    e.preventDefault();
  };

  useEffect(() => {
    if (otp.length === 6) {
      dispatch(
        verifyAuthToken({
          authToken: otp,
        })
      );
    }
  }, [otp]);

  useEffect(() => {
    if (sessionStorage.getItem("isAuthenticator") === "true") {
      navigate("/home");
    }
  }, [sessionStorage.getItem("isAuthenticator")]);

  return (
    <>
      <div className="w-100 d-flex flex-column justify-content-start align-items-center auth-security">
        <div className="mt-4">
          <img
            src={maxbetLogo}
            alt="MAXBET07"
            //   className="img-fluid"
            style={{
              width: "100%",
              minHeight: "90px",
            }}
          />
        </div>
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
            Enter the 6-digit code from your security auth verification app{" "}
            {sessionStorage.getItem("authType") === "1" ? (
              <span
                onClick={() => {
                  dispatch(resendTokenToDisable());
                }}
                style={{ color: "blue" }}
              >
                Resend Code
              </span>
            ) : (
              ""
            )}
          </span>
          <form onSubmit={handleSubmit}>
            <OTPInput
              value={otp}
              onChange={handleChange}
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
      </div>
    </>
  );
};
export default SecurityAuth;

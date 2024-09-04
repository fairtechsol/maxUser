import { useFormik } from "formik";
import { useEffect } from "react";
import { Form } from "react-bootstrap";
// import { FaHandPointDown, FaKey } from "react-icons/fa";
// import { IoPerson } from "react-icons/io5";
import { MdOutlineLogin } from "react-icons/md";
import { AiOutlineLoading } from "react-icons/ai"; // Import the AiOutlineLoading spinner
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import CustomButton from "../../../components/commonComponent/button";
import CustomInput from "../../../components/commonComponent/input";
import ValidationError from "../../../components/commonComponent/validationError";
import {
  authReset,
  login,
  rulesModalShowTrue,
} from "../../../store/actions/authAction";
import { AppDispatch, RootState } from "../../../store/store";
import { loginValidationSchema } from "../../../utils/fieldValidations/auth";
import {isMobile} from "../../../utils/screenDimension";
import "./style.scss";
import { FaHandPointDown, FaKey } from "react-icons/fa";
import { IoPerson } from "react-icons/io5";
import Loader from "../../../components/commonComponent/loader";
import { maxbetLogo } from "../../../assets/images";
import Footer from "../../../layout/main/footer";

const Login = () => {
  // const [loginState, setLoginState] = useState({
  //   userName: "",
  //   password: "",
  //   loginType: "wallet",
  // });
  const initialValues: any = {
    userName: "",
    password: "",
    loginType: "user",
  };
  const { success, forceChangePassword, loading } = useSelector(
    (state: RootState) => state.auth
  );

  const navigate = useNavigate();

  const dispatch: AppDispatch = useDispatch();

  // const handleSubmit = (e: { preventDefault: () => void }) => {
  //   e.preventDefault();
  //   dispatch(login(loginState));
  // };

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: loginValidationSchema,
    onSubmit: (values: any) => {
      dispatch(login(values));
    },
  });

  const { handleSubmit, touched, errors } = formik;

  useEffect(() => {
    if (success) {
      if (forceChangePassword) {
        sessionStorage.setItem("forceChangePassword", "true");
        navigate("/change-password");
      } else {
        dispatch(rulesModalShowTrue());
        navigate("/home");
      }
      dispatch(authReset());
    }
  }, [success]);

  return (
      <Form
        className="auth-main text-center d-flex justify-content-center"
        onSubmit={handleSubmit}
      >
        {loading && <Loader />}
        <div className={isMobile ? "login-form" : "auth-box"}>
          <img
            src={maxbetLogo}
            alt="MAXBET07"
            className="img-fluid"
            style={{
              width: isMobile ? "100%" : "100%",
              height: "70px",
            }}
          />
          <div className="auth-box-form rounded-2 bg-light mt-2">
            <h4 className="auth-title title-24 fw-normal text-center mb-2">
              Login
             <FaHandPointDown />
            </h4>

            <CustomInput
              type="text"
              placeholder="User Name"
              name="userName"
              id="userName"
              value={formik.values.userName}
              onChange={formik.handleChange}
              inputIcon={<IoPerson style={{ fontWeight: "normal", color: '#333', fontSize: isMobile ? '16' : '16px' }} />}
              customStyle="mb-4"
              isUnderlinedInput={isMobile}
            />
            <ValidationError
              touched={touched.userName}
              errors={errors.userName}
            />

            <CustomInput
              type="password"
              placeholder="Password"
              customStyle="mb-3"
              name="password"
              id="password"
              inputIcon={<FaKey style={{ fontWeight: "normal", color: '#333', fontSize: isMobile ? '16' : '16px' }} />}
              isUnderlinedInput={isMobile}
              value={formik.values.password}
              onChange={formik.handleChange}
            />
            <ValidationError
              touched={touched.password}
              errors={errors.password}
            />
            <CustomButton
              className="w-100"
              variant="primary"
              type="submit"
            >
              <div className="button-container">
                <span className="login-text">Login</span>
                {loading ? (
                  <AiOutlineLoading className="spinner-icon" />
                ) : (
                  <i className="fas fa-sign-in-alt float-end mt-1 f600"></i>
                )}
              </div>
            </CustomButton>
            
            <p className={isMobile ? "title-10 d-inline-block mb-2" :"auth-box-descrip mt-1"}>
              This site is protected by reCAPTCHA and the Google
              <br />
              <a
                href="https://policies.google.com/privacy"
                className="text-primaryBlue text-decoration-none "
                target="_blank"
                rel="noopener noreferrer"
              >
                Privacy Policy
              </a>
              and
              <a
                href="https://policies.google.com/terms"
                className="text-primaryBlue text-decoration-none "
                target="_blank"
                rel="noopener noreferrer"
              >
                Terms of Service
              </a>
              apply.
            </p>
          </div>
        </div>
      </Form>
  );
};

export default Login;

import { useFormik } from "formik";
import { useEffect } from "react";
import { Form } from "react-bootstrap";
import { FaHandPointDown, FaKey } from "react-icons/fa";
import { IoPerson } from "react-icons/io5";
import { MdOutlineLogin } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import CustomButton from "../../../components/commonComponent/button";
import CustomInput from "../../../components/commonComponent/input";
import Loader from "../../../components/commonComponent/loader";
import ValidationError from "../../../components/commonComponent/validationError";
import { authReset, login } from "../../../store/actions/authAction";
import { AppDispatch, RootState } from "../../../store/store";
import { loginValidationSchema } from "../../../utils/fieldValidations/auth";
import isMobile from "../../../utils/screenDimension";
import "./style.scss";

const Login = () => {
  // const [loginState, setLoginState] = useState({
  //   userName: "",
  //   password: "",
  //   loginType: "wallet",
  // });
  const initialValues: any = {
    userName: "",
    password: "",
    loginType: "wallet",
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
        localStorage.setItem("forceChangePassword", "true");
        navigate("/change-password");
      } else {
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
      <div className="auth-box ">
        <img src="/logo.webp" alt="fairGame" />
        <div className="auth-box-form rounded-2 bg-light mt-3">
          <h4 className="auth-title title-24 fw-normal text-center">
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
            inputIcon={<IoPerson />}
            customStyle="mb-3"
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
            inputIcon={<FaKey />}
            isUnderlinedInput={isMobile}
            value={formik.values.password}
            onChange={formik.handleChange}
            // onChange={(e: any) => {
            //   setLoginState({ ...loginState, password: e.target.value });
            // }}
          />
          <ValidationError
            touched={touched.password}
            errors={errors.password}
          />
          <CustomButton className="w-100" variant="primary" type="submit">
            Login <MdOutlineLogin />
          </CustomButton>
          {/* <p className="auth-box-descrip mt-1">
            This site is protected by reCAPTCHA and the Google
            <NavLink
              to="/messages"
              className="text-primaryBlue text-decoration-none ps-1 pe-1"
            >
              Privacy Policy
            </NavLink>
            and
            <NavLink
              to="/messages"
              className="text-primaryBlue text-decoration-none ps-1 pe-1"
            >
              Terms of Service
            </NavLink>
            apply.
          </p> */}
        </div>
      </div>
    </Form>
  );
};

export default Login;

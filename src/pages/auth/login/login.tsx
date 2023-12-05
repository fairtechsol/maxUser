import { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { FaHandPointDown, FaKey } from "react-icons/fa";
import { IoPerson } from "react-icons/io5";
import { MdOutlineLogin } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import CustomButton from "../../../components/commonComponent/button";
import CustomInput from "../../../components/commonComponent/input";
import { authReset, login } from "../../../store/actions/authAction";
import { AppDispatch, RootState } from "../../../store/store";
import isMobile from "../../../utils/screenDimension";
import "./style.scss";

const Login = () => {
  const [loginState, setLoginState] = useState({
    userName: "",
    password: "",
    loginType: "user",
  });

  const { success, forceChangePassword } = useSelector(
    (state: RootState) => state.auth
  );

  const navigate = useNavigate();

  const dispatch: AppDispatch = useDispatch();

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    dispatch(login(loginState));
  };

  useEffect(() => {
    if (success) {
      if (forceChangePassword) {
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
      <div className="auth-box ">
        <img src="/logo.webp" alt="fairGame" />
        <div className="auth-box-form rounded-2 bg-light mt-3">
          <h4 className="auth-title text-center">
            Login
            <FaHandPointDown />
          </h4>

          <CustomInput
            type="text"
            placeholder="User Name"
            inputIcon={<IoPerson />}
            required
            customStyle="mb-3"
            isUnderlinedInput={isMobile}
            value={loginState.userName}
            onChange={(e: any) => {
              setLoginState({ ...loginState, userName: e.target.value });
            }}
          />

          <CustomInput
            type="password"
            placeholder="Password"
            customStyle="mb-3"
            required
            inputIcon={<FaKey />}
            isUnderlinedInput={isMobile}
            value={loginState.password}
            onChange={(e: any) => {
              setLoginState({ ...loginState, password: e.target.value });
            }}
          />
          <CustomButton className="w-100" variant="primary" type="submit">
            Login <MdOutlineLogin />
          </CustomButton>
        </div>
      </div>
    </Form>
  );
};

export default Login;

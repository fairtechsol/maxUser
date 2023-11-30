import { Form } from "react-bootstrap";
import { FaHandPointDown, FaKey } from "react-icons/fa";
import { IoPerson } from "react-icons/io5";
import { MdOutlineLogin } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import CustomButton from "../../../components/commonComponent/button";
import CustomInput from "../../../components/commonComponent/input";
import isMobile from "../../../utils/screenDimension";
import "./style.scss";

const Login = () => {
  const navigate = useNavigate();

  const handleSubmit = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    navigate("/home");
  };

  return (
    <Form
      className="auth-main text-center d-flex  justify-content-center"
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
            type="email"
            placeholder="User Name"
            inputIcon={<IoPerson />}
            customStyle="mb-3"
            isUnderlinedInput={isMobile}
          />

          <CustomInput
            type="password"
            placeholder="Password"
            customStyle="mb-3"
            inputIcon={<FaKey />}
            isUnderlinedInput={isMobile}
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

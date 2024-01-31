import { Stack } from "react-bootstrap";
import isMobile from "../../utils/screenDimension";
import CustomButton from "../commonComponent/button";
import CustomInput from "../commonComponent/input";
import ReportContainer from "../containers/reportContainer";

import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import { changePassword } from "../../store/actions/authAction";
import { AppDispatch } from "../../store/store";
import { changePassValidationSchema } from "../../utils/fieldValidations/auth";
import ValidationError from "../commonComponent/validationError";

const ChangePasswordComponent = () => {
  // State object to store the values of input fields
  // const [formData, setFormData] = useState({
  //   currentPassword: "",
  //   newPassword: "",
  //   confirmNewPassword: "",
  // });
  const initialValues: any = {
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  };

  const dispatch: AppDispatch = useDispatch();

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: changePassValidationSchema,
    onSubmit: (values: any) => {
      dispatch(changePassword(values));
    },
  });

  const { handleSubmit, touched, errors } = formik;

  // Handler function to update the state when input values change
  // const handleInputChange = (fieldName: string) => (event: any) => {
  //   setFormData((prevData) => ({
  //     ...prevData,
  //     [fieldName]: event.target.value,
  //   }));
  // };

  // Handler function to handle the "Change Password" button click
  // const handleChangePassword = () => {
  //   // Add logic here to handle the password change
  // };

  return (
    <ReportContainer title="Change Password">
      <form onSubmit={handleSubmit}>
        <Stack gap={3} className={`${isMobile ? "mt-4 " : "w-35 "}`}>
          <CustomInput
            isUnderlinedInput={isMobile}
            title="Current Password"
            customStyle={"flex-column"}
            type="password"
            // value={formik.values.currentPassword}
            id={"oldPassword"}
            name={"oldPassword"}
            onChange={formik.handleChange}
          />
          <ValidationError
            touched={touched.currentPassword}
            errors={errors.currentPassword}
          />
          <CustomInput
            title="New Password"
            isUnderlinedInput={isMobile}
            customStyle={"flex-column"}
            type="password"
            // value={formik.values.newPassword}
            id="newPassword"
            name="newPassword"
            onChange={formik.handleChange}
          />
          <ValidationError
            touched={touched.newPassword}
            errors={errors.newPassword}
          />
          <CustomInput
            title="Confirm New Password"
            isUnderlinedInput={isMobile}
            customStyle={"flex-column"}
            type="password"
            // value={formik.values.confirmPassword}
            id="confirmPassword"
            name="confirmPassword"
            onChange={formik.handleChange}
          />
          <ValidationError
            touched={touched.confirmPassword}
            errors={errors.confirmPassword}
          />
          <CustomButton
            type="submit"
            size={isMobile ? "sm" : "lg"}
            className={`bg-primary border-0 `}
            // onClick={handleChangePassword}
            style={{ maxWidth: "140px" }}
          >
            Change Password
          </CustomButton>
        </Stack>
      </form>
    </ReportContainer>
  );
};

export default ChangePasswordComponent;

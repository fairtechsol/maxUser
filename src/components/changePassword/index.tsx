import { Stack } from "react-bootstrap";
import { isMobile } from "../../utils/screenDimension";
import CustomButton from "../commonComponent/button";
import CustomInput from "../commonComponent/input";
import ReportContainer from "../containers/reportContainer";

import { useFormik } from "formik";
import { debounce } from "lodash";
import { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  changePassword,
  checkOldPassword,
} from "../../store/actions/authAction";
import { AppDispatch, RootState } from "../../store/store";
import { changePasswordValidation } from "../../utils/fieldValidations/auth";
import ValidationError from "../commonComponent/validationError";

const ChangePasswordComponent = () => {
  const initialValues: any = {
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  };

  const dispatch: AppDispatch = useDispatch();
  const { oldPasswordMatched } = useSelector((state: RootState) => state.auth);

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: changePasswordValidation(oldPasswordMatched),
    onSubmit: (values: any) => {
      dispatch(changePassword(values));
    },
  });

  const { handleSubmit, touched, errors } = formik;

  const debouncedInputValue = useMemo(() => {
    return debounce((value) => {
      dispatch(checkOldPassword({ oldPassword: value }));
    }, 500);
  }, []);

  const handleOldPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    formik.handleChange(e);
    debouncedInputValue(query);
  };

  return (
    <ReportContainer title="Change Password">
      <form onSubmit={handleSubmit}>
        <Stack gap={3} className={`${isMobile ? "mt-4 " : "w-35 "}`}>
          <CustomInput
            isUnderlinedInput={isMobile}
            title="Current Password"
            customStyle={"flex-column"}
            type="password"
            onBlur={formik.handleBlur}
            // value={formik.values.currentPassword}
            id={"oldPassword"}
            name={"oldPassword"}
            onChange={handleOldPasswordChange}
          />
          <ValidationError
            touched={touched.oldPassword}
            errors={errors.oldPassword}
          />
          <CustomInput
            title="New Password"
            isUnderlinedInput={isMobile}
            customStyle={"flex-column"}
            type="password"
            onBlur={formik.handleBlur}
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
            onBlur={formik.handleBlur}
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

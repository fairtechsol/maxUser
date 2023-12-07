import { useState } from "react";
import { Stack } from "react-bootstrap";
import isMobile from "../../utils/screenDimension";
import CustomButton from "../commonComponent/button";
import CustomInput from "../commonComponent/input";
import ReportContainer from "../containers/reportContainer";

const ChangePasswordComponent = () => {
  // State object to store the values of input fields
  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });

  // Handler function to update the state when input values change
  const handleInputChange = (fieldName: string) => (event: any) => {
    setFormData((prevData) => ({
      ...prevData,
      [fieldName]: event.target.value,
    }));
  };

  // Handler function to handle the "Change Password" button click
  const handleChangePassword = () => {
    // Add logic here to handle the password change
    console.log("Form Data:", formData);
  };

  return (
    <ReportContainer title="Change Password">
      <Stack gap={3} className={`${isMobile ? "mt-4 " : "w-35 "}`}>
        <CustomInput
          isUnderlinedInput={isMobile}
          title="Current Password"
          customStyle={"flex-column"}
          type="password"
          value={formData.currentPassword}
          onChange={handleInputChange("currentPassword")}
        />
        <CustomInput
          title="New Password"
          isUnderlinedInput={isMobile}
          customStyle={"flex-column"}
          type="password"
          value={formData.newPassword}
          onChange={handleInputChange("newPassword")}
        />
        <CustomInput
          title="Confirm New Password"
          isUnderlinedInput={isMobile}
          customStyle={"flex-column"}
          type="password"
          value={formData.confirmNewPassword}
          onChange={handleInputChange("confirmNewPassword")}
        />
        <CustomButton
          size={isMobile ? "sm" : "lg"}
          className={`bg-primaryBlue border-0 `}
          onClick={handleChangePassword}
          style={{ maxWidth: "140px" }}
        >
          Change Password
        </CustomButton>
      </Stack>
    </ReportContainer>
  );
};

export default ChangePasswordComponent;

import { Stack } from "react-bootstrap";
import isMobile from "../../utils/screenDimension";
import CustomButton from "../commonComponent/button";
import CustomInput from "../commonComponent/input";
import ReportContainer from "../containers/reportContainer";

const ChangePasswordComponent = () => {
  return (
    <ReportContainer title="Change Password">
      <Stack gap={4} className={`${isMobile?"mt-4":"w-35"}`}>
        <CustomInput
          isUnderlinedInput={isMobile}
          title="Current Password"
          customStyle={"flex-column"}
        />
        <CustomInput
          title="New Password"
          isUnderlinedInput={isMobile}
          customStyle={"flex-column"}
        />
        <CustomInput
          title="Confirm New Password"
          isUnderlinedInput={isMobile}
          customStyle={"flex-column"}
        />
        <CustomButton size={isMobile ? "sm" : "lg"}
                className={`${
                  isMobile ? "w-100" : "w-50 bg-primaryBlue"
                } border-0 `}>Change Password</CustomButton>
      </Stack>
    </ReportContainer>
  );
};

export default ChangePasswordComponent;

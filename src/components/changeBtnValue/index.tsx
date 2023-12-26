import { useFormik } from "formik";
import React, { useState } from "react";
import { Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { setButtonValue } from "../../store/actions/user/userAction";
import { AppDispatch, RootState } from "../../store/store";
import isMobile from "../../utils/screenDimension";
import CustomButton from "../commonComponent/button";
import CustomInput from "../commonComponent/input";
import ReportContainer from "../containers/reportContainer";

const ChangeButtonValueComponent = () => {
  const [btnValue, setBtnValue] = useState<any>([
    {
      label: "",
      value: "",
    },
    {
      label: "",
      value: "",
    },
    {
      label: "",
      value: "",
    },
    {
      label: "",
      value: "",
    },
    {
      label: "",
      value: "",
    },
    {
      label: "",
      value: "",
    },
    {
      label: "",
      value: "",
    },
    {
      label: "",
      value: "",
    },
    {
      label: "",
      value: "",
    },
    {
      label: "",
      value: "",
    },
  ]);

  const dispatch: AppDispatch = useDispatch();
  const { getProfile } = useSelector((state: RootState) => state.user.profile);

  const formik = useFormik({
    initialValues: {
      label: "",
      value: "",
      // type: "",
    },
    onSubmit: (values: any) => {
      const convertedData = btnValue.reduce((result: any, item: any) => {
        if (item.value) {
          result[item.label] = item.value;
        }
        return result;
      }, {});
      console.log(JSON.stringify(convertedData));
      const payload = {
        id: getProfile?.id,
        type: "",
        value: convertedData,
      };
      dispatch(setButtonValue(payload));
    },
  });

  const { handleSubmit } = formik;

  return (
    <ReportContainer title="Change Button Values">
      <form onSubmit={handleSubmit}>
        <Row className={` ${isMobile ? "g-1" : "w-50 g-2"}`}>
          <Col md={6} xs={6}>
            <span className={`${isMobile ? "title-12 f800" : "f700"}`}>
              Price Label
            </span>
          </Col>
          <Col md={6} xs={6}>
            <span className={`${isMobile ? "title-12 f800" : "f700"}`}>
              Price Value
            </span>
          </Col>
          {btnValue?.map((item: any, index: number) => {
            return (
              <React.Fragment key={index}>
                <Col md={6} xs={6}>
                  <CustomInput
                    type="text"
                    value={item[index]?.label}
                    onChange={(e: any) => {
                      setBtnValue((prev: any) => {
                        prev[index].label = e.target.value;
                        return prev;
                      });
                    }}
                  />
                </Col>
                <Col md={6} xs={6}>
                  <CustomInput
                    value={item[index]?.value}
                    onChange={(e: any) => {
                      setBtnValue((prev: any) => {
                        prev[index].value = e.target.value;
                        return prev;
                      });
                    }}
                    type="number"
                  />
                </Col>
              </React.Fragment>
            );
          })}
        </Row>
        <CustomButton
          type={"submit"}
          size={isMobile ? "sm" : "lg"}
          className={`${isMobile ? "w-100" : " bg-primaryBlue"} border-0 mt-2`}
        >
          Update
        </CustomButton>
      </form>
    </ReportContainer>
  );
};

export default ChangeButtonValueComponent;

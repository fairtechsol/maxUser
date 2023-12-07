import React, { useState } from "react";
import { Col, Row } from "react-bootstrap";
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
  return (
    <ReportContainer title="Change Button Values">
      <Row className={` ${isMobile ?"g-1": "w-50 g-2"}`}>
        <Col md={6} xs={6}>
          <span className={`${isMobile?"title-12 f800":"f700"}`}>Price Label</span>
        </Col>
        <Col md={6} xs={6}>
          <span className={`${isMobile?"title-12 f800":"f700"}`}>Price Value</span>
        </Col>
        {btnValue?.map((item: any, index: number) => {
          return (
            <React.Fragment key={index}>
              <Col md={6} xs={6}>
                <CustomInput
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
        size={isMobile ? "sm" : "lg"}
        className={`${isMobile ? "w-100" : " bg-primaryBlue"} border-0 mt-2`}
      >
        Update
      </CustomButton>
    </ReportContainer>
  );
};

export default ChangeButtonValueComponent;

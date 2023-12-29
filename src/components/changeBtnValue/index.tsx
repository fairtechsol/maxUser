import { useFormik } from "formik";
import React, { useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  getButtonValue,
  setButtonValue,
} from "../../store/actions/user/userAction";
import { AppDispatch, RootState } from "../../store/store";
import isMobile from "../../utils/screenDimension";
import CustomButton from "../commonComponent/button";
import CustomInput from "../commonComponent/input";
import ReportContainer from "../containers/reportContainer";

interface ButtonProps {
  label: string;
  value: string;
}

const ChangeButtonValueComponent = () => {
  const initialValues = [
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
  ];

  const dispatch: AppDispatch = useDispatch();
  const { buttonValues } = useSelector(
    (state: RootState) => state.user.profile
  );

  const formik = useFormik({
    initialValues: initialValues,
    onSubmit: (value: any) => {
      let result = {};
      value.forEach((item: ButtonProps) => {
        result = { ...result, [item?.label]: item?.value };
      });
      const payload = {
        id: buttonValues?.id,
        type: "Match",
        value: result,
      };
      dispatch(setButtonValue(payload));
    },
  });

  useEffect(() => {
    dispatch(getButtonValue());
  }, []);

  const { handleSubmit, values, setValues, setFieldValue } = formik;

  useEffect(() => {
    if (buttonValues?.value) {
      setValues(
        Object.keys(JSON.parse(buttonValues?.value))?.map((item) => {
          return {
            label: item,
            value: JSON.parse(buttonValues?.value)[item],
          };
        })
      );
    }
  }, [buttonValues]);

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
          {values?.map((_: any, index: number) => {
            return (
              <React.Fragment key={index}>
                <Col md={6} xs={6}>
                  <CustomInput
                    type="text"
                    value={values[index]?.label}
                    onChange={(e: any) => {
                      setFieldValue(`[${index}].label`, e.target.value);
                    }}
                  />
                </Col>
                <Col md={6} xs={6}>
                  <CustomInput
                    value={values[index]?.value}
                    onChange={(e: any) => {
                      setFieldValue(`[${index}].value`, e.target.value);
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

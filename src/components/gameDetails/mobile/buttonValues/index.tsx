import axios from "axios";
import { toast } from "react-toastify";
import {
  betPlaceSuccessReset,
  placeBet,
} from "../../../../store/actions/betPlace/betPlaceActions";
import { selectedBetAction, setButtonValue } from "../../../../store/actions/match/matchListAction";
import { AppDispatch, RootState } from "../../../../store/store";
import { ApiConstants, matchBettingType } from "../../../../utils/constants";
import CustomButton from "../../../commonComponent/button";
import Loader from "../../../commonComponent/loader";
import CustomModal from "../../../commonComponent/modal";
import "./style.scss";
import { getButtonValue } from "../../../../store/actions/user/userAction";
import { isMobile } from "../../../../utils/screenDimension";
import ReportContainer from "../../../containers/reportContainer";
import { useFormik } from "formik";
import React, { useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import CustomInput from "../../../commonComponent/input";

interface ButtonProps {
  label: string;
  value: string;
}

const ButtonValues = () => {
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
        if (item?.label !== "" && item?.value !== "") {
          result = { ...result, [item?.label]: item?.value };
        }
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
    if (buttonValues && buttonValues?.value) {
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
    <>
      <ReportContainer title="">
        <div style={{width:"60%",height:"30px",display:"flex",justifyContent:"space-around",alignItems:"center",marginBottom:"10px"}}>
          <div className="title-16 f-500 text-white" style={{width:"50%",height:"100%",backgroundColor:"#ffc742",display:"flex",justifyContent:"center",alignItems:"center"}}>Game Buttons</div>
          <div className="title-16 f-500 text-black" style={{width:"50%",height:"100%",backgroundColor:"#cccccc",display:"flex",justifyContent:"center",alignItems:"center"}}>Casino Buttons</div>
        </div>
      <form onSubmit={handleSubmit}>
        <Row className={` ${isMobile ? "g-1" : "w-100 g-2"}`}>
          <Col md={6} xs={6}>
            <span className={`${isMobile ? "title-12 f800" : "f700"}`}>
              Price Label:
            </span>
          </Col>
          <Col md={6} xs={6}>
            <span className={`${isMobile ? "title-12 f800" : "f700"}`}>
              Price Value:
            </span>
          </Col>
          {initialValues?.map((_: any, index: number) => {
            return (
              <Row key={index} style={{marginBottom:"10Px"}}>
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
              </Row>
            );
          })}
        </Row>
        <Row style={{marginLeft:!isMobile && "12px",padding:isMobile && "12px"}}>
        <CustomButton
          type={"submit"}
          size={isMobile ? "sm" : "lg"}
          className={`${isMobile ? "w-100" : "w-40 bg-primary"} border-0 mt-2`}
        >
          Update
        </CustomButton>
        </Row>
        
      </form>
    </ReportContainer>
    </>
  );
};

export default ButtonValues;

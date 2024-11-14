import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getButtonValue, getCasinoButtonValue, setButtonValue } from "../../../../store/actions/user/userAction";
import { AppDispatch, RootState } from "../../../../store/store";
import { isMobile } from "../../../../utils/screenDimension";
import CustomButton from "../../../commonComponent/button";
import CustomInput from "../../../commonComponent/input";
import ReportContainer from "../../../containers/reportContainer";
import "./style.scss";

interface ButtonProps {
  label: string;
  value: string;
}

const ButtonValues = ({setShow}:any) => {
  const [casinoBtn, setCasinoBtn] = useState(false)
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
  const { buttonValues,buttonValues2 } = useSelector(
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
        id:casinoBtn?buttonValues2?.id: buttonValues?.id,
        type: casinoBtn?"Casino":"Match",
        value: result,
      };
      dispatch(setButtonValue(payload));
      setShow(false);
    },
  });

  useEffect(() => {
    dispatch(getButtonValue());
    dispatch(getCasinoButtonValue());
  }, []);

  const { handleSubmit, values, setValues, setFieldValue } = formik;
  useEffect(() => {
    if(casinoBtn){
      if (buttonValues2 && buttonValues2?.value) {
        setValues(
          Object.keys(JSON.parse(buttonValues2?.value))?.map((item) => {
            return {
              label: item,
              value: JSON.parse(buttonValues2?.value)[item],
            };
          })
        );
      }
    }else{
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
    }
    
  }, [buttonValues,casinoBtn]);
// console.log(buttonValues,'initialValues',buttonValues2)
  return (
    <>
      <div className="ms-1">
        <div className="ms-1" style={{width:"60%",height:"30px",display:"flex",justifyContent:"space-around",alignItems:"center",marginBottom:"10px"}}>
          <div className={`title-16 f-500 ${casinoBtn ?"text-black":"text-white"}`} style={{width:"50%",height:"100%",backgroundColor:casinoBtn?"#cccccc":"#ffc742",display:"flex",justifyContent:"center",alignItems:"center",cursor:"pointer"}} onClick={()=>setCasinoBtn(false)}>Game Buttons</div>
          <div className={`title-16 f-500 ${casinoBtn ?"text-white":"text-black"}`} style={{width:"50%",height:"100%",backgroundColor:casinoBtn?"#ffc742":"#cccccc",display:"flex",justifyContent:"center",alignItems:"center",cursor:"pointer"}} onClick={()=>setCasinoBtn(true)}>Casino Buttons</div>
        </div>
      <form onSubmit={handleSubmit}>
        <Row className={` ${isMobile ? "g-1" : "w-100 g-2"}`}>
          <Col md={6} xs={6}>
            <span className={`ms-2 ${isMobile ? "title-12 f800" : "f700"}`}>
              Price Label:
            </span>
          </Col>
          <Col md={6} xs={6}>
            <span className={`${isMobile ? "title-12 f800" : "f700"}`}>
              Price Value:
            </span>
          </Col>
          {  initialValues?.map((_: any, index: number) => {
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
    </div>
    </>
  );
};

export default ButtonValues;

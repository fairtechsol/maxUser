import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../../store/store";
import CommonCardImg from "../CommonCardImg";
import { IoInformationCircle } from "react-icons/io5";
import SmoothDropdownModal from "../minMaxModal";
import { useState } from "react";

const CardBox = ({ name, rate }: any) => {
  const dispatch: AppDispatch = useDispatch();
  const [modelOpen, setModelOpen] = useState(false);
  const min = 100;
  const max = 10000;
  return (
    <>
      <div className="cardContainer">
        <div style={{ width: "100%", display: "flex", flexDirection: "row" }}>
          <div style={{ width: "55%", textAlign: "end" }}>
            <span
              style={{
                fontSize: "16px",
                fontWeight: "bolder",
                alignSelf: "center",
              }}
            >
              {parseFloat(rate).toFixed(2)}
            </span>
          </div>
          <div style={{ width: "45%", textAlign: "end" }}>
            {/* <IoInformationCircle
              color="#ffc742"
              onClick={() => setModelOpen(!modelOpen)}
            />
            <SmoothDropdownModal
              min={100}
              max={1000}
              show={modelOpen}
              setShow={() => setModelOpen(false)}
            /> */}
             <span className="minmaxi">
             <IoInformationCircle
              color="#ffc742"
              onClick={() => setModelOpen(!modelOpen)}
            />
            <SmoothDropdownModal
              min={100}
              max={1000}
              show={modelOpen}
              setShow={() => setModelOpen(false)}
            />
                      </span>
          </div>
        </div>
        <div>
          <CommonCardImg />
        </div>
      </div>
    </>
  );
};

export default CardBox;

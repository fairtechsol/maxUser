import { useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../store/store";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { resultDragonTiger } from "../../../store/actions/cards/cardDetail";
import { useState } from "react";
import Modal from "react-bootstrap/Modal";
import { ResultComponent } from "../resultComponent";

const CardResultBox = ({ data, name, type }: any) => {
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();
  const [lgShow, setLgShow] = useState(false);
  const { liveGameResultTop10, resultData } = useSelector(
    (state: RootState) => state.card
  );

  const handleResult = (id: any) => {
    setLgShow(true);
    dispatch(resultDragonTiger(id));
  };

  return (
    <div className="cardResultBoxContainer">
      <div className="cardResultBoxHeader">
        <span style={{ fontSize: "14px" }}>Last Result</span>
        <a>
          <span
            style={{ fontSize: "14px", cursor: "pointer" }}
            onClick={() =>
              navigate("/casino-report", {
                state: { cardType: data?.type },
              })
            }
          >
            View All
          </span>
        </a>
      </div>
      <div className="cardResultBoxRound">
        {liveGameResultTop10?.length > 0 &&
          liveGameResultTop10.map((item: any) => (
            <div
              className="cardResultCircle"
              key={item?.mid}
              style={{
                backgroundColor: "#355e3b",
              }}
              onClick={() => handleResult(item?.mid)}
            >
              {type === "card32" ? (
                <span
                  style={{
                    fontSize: "16px",
                    fontWeight: "600",
                    color: "#ffff33",
                  }}
                >
                  {item?.result === "1"
                    ? name?.[0]
                    : item?.result === "2"
                    ? name?.[1]
                    : item?.result === "3"
                    ? name?.[2]
                    : item?.result === "4"
                    ? name?.[3]
                    : null}
                </span>
              ) : type === "teen20" ? (
                <span
                  style={{
                    fontSize: "16px",
                    fontWeight: "600",
                    color:
                      item?.result === "3"
                        ? "#ffff33"
                        : item?.result === "1"
                        ? "#ff4500"
                        : "#fff",
                  }}
                >
                  {item?.result === "1"
                    ? name?.[0]
                    : item?.result === "3"
                    ? name?.[2]
                    : item?.result === "0"
                    ? name?.[1]
                    : null}
                </span>
              ) : (
                <span
                  style={{
                    fontSize: "16px",
                    fontWeight: "600",
                    color:
                      item?.result === "3" ||
                      item?.result === "41" ||
                      item?.result === "1"
                        ? "#f5cc03"
                        : item?.result === "2" || item?.result === "21"
                        ? "#ff4500"
                        : "#ffffff",
                  }}
                >
                  {type === "teen20"
                    ? item?.result === "0"
                      ? name?.[1]
                      : item?.result === "1"
                      ? name?.[0]
                      : name?.[2]
                    : item?.result === "1"
                    ? name?.[0]
                    : item?.result === "2" || item?.result === "21"
                    ? name?.[1]
                    : name?.[2]
                    ? name?.[2]
                    : ""}
                </span>
              )}
            </div>
          ))}
      </div>
      <Modal
        size="lg"
        show={lgShow}
        onHide={() => setLgShow(false)}
        aria-labelledby="example-modal-sizes-title-lg"
      >
        <Modal.Body style={{ padding: 0 }}>
          <ResultComponent
            data={resultData}
            setfalse={setLgShow}
            type={data?.type}
          />
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default CardResultBox;

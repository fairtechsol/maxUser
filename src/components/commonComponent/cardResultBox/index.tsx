import { useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../store/store";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { resultDragonTiger } from "../../../store/actions/cards/cardDetail";
import { useState } from "react";
import Modal from "react-bootstrap/Modal";
import { ResultComponent } from "../resultComponent";
import { ImClubs } from "react-icons/im";
import { GiSpades } from "react-icons/gi";
import { BiSolidHeart } from "react-icons/bi";
import { ImDiamonds } from "react-icons/im";

const CardResultBox = ({ data, name, type }: any) => {
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();
  const [lgShow, setLgShow] = useState(false);
  let { liveGameResultTop10, resultData } = useSelector(
    (state: RootState) => state.card
  );

  if (liveGameResultTop10?.res) {
    liveGameResultTop10 = liveGameResultTop10?.res;
  }
  const handleResult = (id: any) => {
    setLgShow(true);
    dispatch(resultDragonTiger(id));
  };

  const getBackgroundColor = (item: any, type: any) => {
    switch (type) {
      case "race20":
        return "#d5d5d5";
      case "baccarat2":
        if (item?.result === "1") {
          return "#086CB8";
        } else if (item?.result === "2") {
          return "#AE2130";
        } else {
          return "#355E3B";
        }
      case "baccarat":
        if (item?.result === "1") {
          return "#086CB8";
        } else if (item?.result === "2") {
          return "#AE2130";
        } else {
          return "#355E3B";
        }
      default:
        return "#355e3b";
    }
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
          liveGameResultTop10?.map((item: any) => (
            <div
              className="cardResultCircle"
              key={item?.mid}
              style={{
                backgroundColor: getBackgroundColor(item, type),
                backgroundImage:
                  type === "cmatch20"
                    ? `url(https://versionobj.ecoassetsservice.com/v13/static/front/img/balls/cricket20/ball${item?.result}.png)`
                    : "",
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
              onClick={() => handleResult(item?.mid)}
            >
              {type === "queen" ? (
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
              ) : type === "card32" ? (
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
              ) : type === "teen9" ? (
                <span
                  style={{
                    fontSize: "16px",
                    fontWeight: "600",
                    color:
                      item?.result === "31" ||
                      item?.result === "11" ||
                      item?.result === "21"
                        ? "#f5cc03"
                        : "#ffffff",
                  }}
                >
                  {item?.result === "21"
                    ? name?.[1]
                    : item?.result === "11"
                    ? name?.[0]
                    : item?.result === "31"
                    ? name?.[2]
                    : null}
                </span>
              ) : type === "poker" || type === "poker20" ? (
                <>
                  <span
                    style={{
                      fontSize: "16px",
                      fontWeight: "600",
                      color:
                        item?.result === "11"
                          ? "#f5cc03"
                          : item?.result === "21"
                          ? "#ff4500"
                          : "#ffffff",
                    }}
                  >
                    {item?.result === "11"
                      ? name?.[0]
                      : item?.result === "21"
                      ? name?.[1]
                      : name?.[2]}{" "}
                  </span>
                </>
              ) : type === "card32eu" ? (
                <>
                  <span
                    style={{
                      fontSize: "16px",
                      fontWeight: "600",
                      color: "#f5cc03",
                    }}
                  >
                    {item?.result === "1"
                      ? name?.[0]
                      : item?.result === "2"
                      ? name?.[1]
                      : item?.result === "3"
                      ? name?.[2]
                      : name?.[3]}{" "}
                  </span>
                </>
              ) : type === "race20" ? (
                <>
                  {item?.result === "1" ? (
                    <GiSpades color="#000000" />
                  ) : item?.result === "2" ? (
                    <BiSolidHeart color="#ff0000" />
                  ) : item?.result === "3" ? (
                    <ImClubs color="#000000" />
                  ) : (
                    <ImDiamonds color="#ff0000" />
                  )}
                </>
              ) : type === "poker6" ? (
                <>
                  <span
                    style={{
                      fontSize: "16px",
                      fontWeight: "600",
                      color: item?.result === "0" ? "#ffffff" : "#f5cc03",
                    }}
                  >
                    {item?.result === "0" ? name?.[0] : item?.result?.[1]}
                  </span>
                </>
              ) : type === "cmatch20" ? (
                <span
                  style={{
                    fontSize: "16px",
                    fontWeight: "600",
                    color: "#ffff33",
                  }}
                >
                  {/* {item?.result === "1"
                    ? name?.[0]
                    : item?.result === "2"
                    ? name?.[1]
                    : item?.result === "3"
                    ? name?.[2]
                    : item?.result === "4"
                    ? name?.[3]
                    : item?.result === "5"
                    ? name?.[4]
                    : item?.result === "6"
                    ? name?.[5]
                    : item?.result === "7"
                    ? name?.[6]
                    : item?.result === "8"
                    ? name?.[7]
                    : item?.result === "9"
                    ? name?.[8]
                    : item?.result === "10"
                    ? name?.[9]
                    : null} */}
                </span>
              ) : type === "btable" ? (
                <span
                  style={{
                    fontSize: "16px",
                    fontWeight: "600",
                    color: "#ffff33",
                  }}
                >
                  {name?.[item?.result - 1]}
                </span>
              ) : type === "aaa" ? (
                <span
                  style={{
                    fontSize: "16px",
                    fontWeight: "600",
                    color:
                      item?.result === "1"
                        ? "red"
                        : item?.result === "2"
                        ? "#ffff33"
                        : item?.result === "3"
                        ? "#33c6ff"
                        : "#ffffff",
                  }}
                >
                  {name?.[item?.result - 1]}
                </span>
              ) : type === "worli2" ? (
                <span
                  style={{
                    fontSize: "16px",
                    fontWeight: "600",
                    color: "#ffff33",
                  }}
                >
                  {name?.[0]}
                </span>
              ) : type === "baccarat" || type === "baccarat2" ? (
                <span
                  style={{
                    fontSize: "16px",
                    fontWeight: "600",
                    color:
                      item?.result === "1"
                        ? "#ffffff"
                        : item?.result === "2"
                        ? "#ffffff"
                        : item?.result === "3"
                        ? "#ffffff"
                        : "#ffffff",
                  }}
                >
                  {item?.result === "1"
                    ? name?.[0]
                    : item?.result === "2"
                    ? name?.[1]
                    : name?.[2]}
                </span>
              ) : type === "dtl20" ? (
                <span
                  style={{
                    fontSize: "16px",
                    fontWeight: "600",
                    color:
                      item?.result === "1"
                        ? "#ff4500"
                        : item?.result === "21"
                        ? "#ffff33"
                        : item?.result === "41"
                        ? "#33C6FF"
                        : "#ffffff",
                  }}
                >
                  {item?.result === "1"
                    ? name?.[0]
                    : item?.result === "21"
                    ? name?.[1]
                    : name?.[2]}
                </span>
              ) : type === "dt6" ? (
                <span
                  style={{
                    fontSize: "16px",
                    fontWeight: "600",
                    color:
                      item?.result === "1"
                        ? "#ff4500"
                        : item?.result === "2"
                        ? "#f5cc03"
                        : "#ffffff",
                  }}
                >
                  {item?.result === "1"
                    ? name?.[0]
                    : item?.result === "2"
                    ? name?.[1]
                    : name?.[2]}
                </span>
              ) : type === "cmeter" ? (
                <span
                  style={{
                    fontSize: "16px",
                    fontWeight: "600",
                    color: item?.result === "0" ? "#f5cc03" : "#ff4500",
                  }}
                >
                  {item?.result === "0" ? name?.[0] : name?.[1]}
                </span>
              ) : type === "lucky7" ? (
                <span
                  style={{
                    fontSize: "16px",
                    fontWeight: "600",
                    color:
                      item?.result === "1"
                        ? "#ff4500"
                        : item?.result === "2"
                        ? "#f5cc03"
                        : "#ffffff",
                  }}
                >
                  {item?.result === "1"
                    ? name?.[0]
                    : item?.result === "2"
                    ? name?.[1]
                    : name?.[2]}
                </span>
              ) : type === "superover" ? (
                <span
                  style={{
                    fontSize: "14px",
                    fontWeight: "600",
                    color:
                      item?.result === "1"
                        ? "#ff4500"
                        : item?.result === "2"
                        ? "#f5cc03"
                        : "#ffffff",
                  }}
                >
                  {item?.result === "1"
                    ? name?.[0]
                    : item?.result === "2"
                    ? name?.[1]
                    : name?.[2]}
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
                        : "#ffff33",
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
        <Modal.Body style={{ padding: 0, width: "100%" }}>
          <ResultComponent data={resultData} setfalse={setLgShow} type={type} />
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default CardResultBox;

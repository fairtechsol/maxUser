import React from "react";
import { Container } from "react-bootstrap";
import { HandleCards } from "../../commonComponent/cardsComponent";
import "./style.scss";
import { ImClubs } from "react-icons/im";
import { GiSpades } from "react-icons/gi";
import { BiSolidHeart } from "react-icons/bi";
import { ImDiamonds } from "react-icons/im";
interface Props {
  data: {
    C1: string;
    C2: string;
    C3: string;
    C4: string;
  };
}

const Race20Result: React.FC<Props> = ({ data }: any) => {
  // console.log('data',data)
  const elements = data?.desc?.split(",");

  const ss: any = [];
  const hh: any = [];
  const cc: any = [];
  const dd: any = [];

  elements?.forEach((item: any) => {
    if (item.endsWith("SS")) {
      ss.push(item);
    } else if (item.endsWith("HH")) {
      hh.push(item);
    } else if (item.endsWith("CC")) {
      cc.push(item);
    } else if (item.endsWith("DD")) {
      dd.push(item);
    }
  });

  return (
    (ss?.length > 0 || hh?.length > 0 || cc?.length > 0 || dd?.length > 0)  && (
      <Container style={{ display: "flex", flexDirection: "column" }}>
        <div
        className="mt-2 p-1"
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            gap: "10px",
            background:"#a9a9a996"
          }}
        >
          <div
            style={{ display: "flex", flexDirection: "column", gap: "20px" }}
          >
            <GiSpades color="#000000" size={30} />
            <BiSolidHeart color="#ff0000" size={30} />
            <ImClubs color="#000000" size={30} />
            <ImDiamonds color="#ff0000" size={30} />
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            <div className="result-card-container" style={{height:"40px"}}>
              {hh?.map((item: any) => {
                return <HandleCards card={item} />;
              })}{" "}
              {hh?.length > 0 ? <HandleCards card={"KHH"} /> : ""}{" "}
            </div>
            <div className="result-card-container" style={{height:"40px"}}>
              {dd?.map((item: any) => {
                return <HandleCards card={item} />;
              })}{" "}
              {dd?.length > 0 ? <HandleCards card={"KDD"} /> : ""}{" "}
            </div>
            <div className="result-card-container" style={{height:"40px"}}>
              {cc?.map((item: any) => {
                return <HandleCards card={item} />;
              })}{" "}
              {cc?.length > 0 ? <HandleCards card={"KCC"} /> : ""}{" "}
            </div>
            <div className="result-card-container" style={{height:"40px"}}>
              {ss?.map((item: any) => {
                return <HandleCards card={item} />;
              })}{" "}
              {ss?.length > 0 ? <HandleCards card={"KSS"} /> : ""}{" "}
            </div>
          </div>
        </div>
      </Container>
    )
  );
};

export default Race20Result;

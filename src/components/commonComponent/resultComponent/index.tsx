import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { RxCross2 } from "react-icons/rx";
import { cardGamesType, title } from "../../../utils/constants";
import { handleRoundId } from "../../../utils/formatMinMax";
import { isMobile } from "../../../utils/screenDimension";

import moment from "moment";

interface ResultComponentProps {
  data: any;
  setfalse: any;
  type: keyof typeof title | string;
}

export const ResultComponent: React.FC<ResultComponentProps> = ({
  data,
  setfalse,
  type,
}) => {
  const [date, setDate] = useState<any>();
  useEffect(() => {
    if (!date) {
      setDate(Date.now());
    }
  }, []);

  return (
    <Container style={{ padding: 0, width: "100%" }}>
      <div className="resultModalHeader">
        <span style={{ fontSize: "20px", fontWeight: "bold" }}>
          {title[type]} Result
        </span>
        <RxCross2
          className="cursor-pointer"
          size={25}
          onClick={() => setfalse(false)}
        />
      </div>
      <div
        className="resultModalSubHead pt-0"
        style={{ fontSize: isMobile ? "0.8rem" : "1.1rem" }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "end",
            paddingRight: "15px",
          }}
        >
          <span style={{ fontWeight: "bold" }} className="pe-1">Round Id:</span>
          <span>{handleRoundId(data?.result?.mid)}</span>
        </div>
        <div >
          <span style={{ fontWeight: "bold" }} className="pe-1">Match Time:</span>
          <span>
            {data?.createdAt
              ? moment(data?.createdAt).format("DD/MM/YYYY hh:mm:ss A")
              : moment(date).format("DD/MM/YYYY hh:mm:ss A")}
          </span>
        </div>
      </div>
    </Container>
  );
};

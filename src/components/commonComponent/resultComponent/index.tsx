import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { RxCross2 } from "react-icons/rx";
import moment from "moment";
import { handleRoundId } from "../../../utils/formatMinMax";
import isMobile from "../../../utils/screenDimension";
import { cardGamesType } from "../../../utils/constants";
import Dragon20ResultComponent from "../../dragon20/desktop/resultModalComponent";
import Lucky7ResultComponent from "../../lucky7/desktop/resultModalComponent";
import Teen20ResultComponent from "../../teenPatti20/desktop/resultModalComponent";
import Card32ResultComponent from "../../cards32/desktop/resultModalComponent";
import AbjResultComponent from "../../abj2/desktop/resultModalComponent";
import Lucky7BResultComponent from "../../lucky7B/desktop/resultModalComponent";
import DragonTigerLionResultComponent from "../../dragonTigerLion/desktop/resultModalComponent";
import Dragon202ResultComponent from "../../dragonSecond20/desktop/resultModalComponent";
import DragonTigerOneDayResultComponent from "../../dragonTigerOneDay/desktop/resultModalComponent";

const title = {
  dt20: "20-20 Dragon Tiger",
  teen20: "20-20 Teenpatti",
  lucky7: "Lucky 7 - A",
  Lucky7B: "Lucky 7 - B",
  card32: "32 Cards A",
  abj: "Andar Bahar 2",
  // Add other mappings as needed
};

interface ResultComponentProps {
  data: any;
  setfalse: any;
  type: keyof typeof title;
}

export const ResultComponent: React.FC<ResultComponentProps> = ({
  data,
  setfalse,
  type,
}) => {
  const [date, setDate] = useState<any>()
useEffect(() => {
  if(!date){
    setDate(Date.now())
  }
}, [])

// console.log('first',date)
  return (
    <Container style={{ padding: 0 }}>
      <div className="resultModalHeader">
        <span style={{ fontSize: "20px", fontWeight: "bold" }}>
          {title[type]} Result
        </span>
        <RxCross2 size={25} onClick={() => setfalse(false)} />
      </div>
      <div className="resultModalSubHead" style={{fontSize:isMobile ? "0.8rem" : "1.1rem"}}>
        <div>
          <span style={{fontWeight:"bold"}}>Round Id:</span>
          <span>{handleRoundId(data?.result?.mid)}</span>
        </div>
        <div>
        <span style={{fontWeight:"bold"}}>Match Time:</span>
        <span>{data?.createdAt ? moment(data?.createdAt).format('DD/MM/YYYY hh:mm:ss A'): moment(date).format('DD/MM/YYYY hh:mm:ss A')}</span>
        </div>
      </div>
      {type === cardGamesType?.dragonTiger20 ? (
        <><Dragon20ResultComponent data={data}/></>
      ) : type === cardGamesType?.andarBahar2 ? (
        <><AbjResultComponent data={data}/></>
      ) : type === cardGamesType?.teen20 ? (
        <><Teen20ResultComponent data={data}/></>
      ) : type === cardGamesType?.card32 ? (
        <><Card32ResultComponent data={data}/></>
      ) : type === cardGamesType?.lucky7 ? (
        <><Lucky7ResultComponent data={data}/></>
      ) : type === cardGamesType?.lucky7B ? (
        <><Lucky7BResultComponent data={data}/></>
      ):type === cardGamesType?.dragonTiger202 ? (
        <><Dragon202ResultComponent data={data}/></>
      ):type === cardGamesType?.dragonTigerLion ? (
        <><DragonTigerLionResultComponent data={data}/></>
      ):type === cardGamesType?.teenOneDay ? (
        <><Lucky7BResultComponent data={data}/></>
      ):type === cardGamesType?.dragonTigerOneDay ? (
        <><DragonTigerOneDayResultComponent data={data}/></>
      ): (
        <></>
      )}
    </Container>
  );
};

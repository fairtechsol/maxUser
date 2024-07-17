import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { RxCross2 } from "react-icons/rx";
import { cardGamesType } from "../../../utils/constants";
import { handleRoundId } from "../../../utils/formatMinMax";
import isMobile from "../../../utils/screenDimension";
import AbjResultComponent from "../../abj2/desktop/resultModalComponent";
import Card32ResultComponent from "../../cards32/desktop/resultModalComponent";
import Dragon20ResultComponent from "../../dragon20/desktop/resultModalComponent";
import Dragon202ResultComponent from "../../dragonSecond20/desktop/resultModalComponent";
import DragonTigerLionResultComponent from "../../dragonTigerLion/desktop/resultModalComponent";
import DragonTigerOneDayResultComponent from "../../dragonTigerOneDay/desktop/resultModalComponent";
import Lucky7ResultComponent from "../../lucky7/desktop/resultModalComponent";
import Lucky7BResultComponent from "../../lucky7B/desktop/resultModalComponent";
import Teen1DResultComponent from "../../teenPatti1D/desktop/resultModalComponent";
import Teen20ResultComponent from "../../teenPatti20/desktop/resultModalComponent";
import Poker1DayResultComponent from "../../poker1day/desktop/resultModalComponent";
import TeenOpenResultComponent from "../../teenPattiOpen/desktop/resultModalComponent";
import TeenTestResultComponent from "../../teenPattiTest/desktop/resultModalComponent";
import CasinoWarResultComponent from "../../casinoWar/desktop/resultModalComponent";
import Abj1ResultComponent from "../../abj1/desktop/resultModalComponent";
import AmarAkbarAnthonyResultComponent from "../../amarAkbarAnthony/desktop/resultModalComponent";
import SuperOverResultComponent from "../../superover/desktop/resultModalComponent";
import Race20ResultComponent from "../../race20/desktop/resultModalComponent";
import Cricket5ResultComponent from "../../cricket5/desktop/resultModalComponent";
import Poker6ResultComponent from "../../poker/desktop/resultModalComponent";
import Poker20ResultComponent from "../../poker20/desktop/resultModalComponent";
import Card32BResultComponent from "../../cards32B/desktop/resultModalComponent";
import BollywoodTableResultComponent from "../../bollywoodTable/desktop/resultModalComponent";
const title = {
  dt20: "20-20 Dragon Tiger",
  teen20: "20-20 Teenpatti",
  lucky7: "Lucky 7 - A",
  Lucky7B: "Lucky 7 - B",
  card32: "32 Cards A",
  abj: "Andar Bahar 2",
  teen: "1 Day Teen Patti",
  teen8: "Open Teen Patti",
  teen9: "Test Teen Patti",
  ab20: "Andar Bahar 1",
  poker1Day: "Poker 1 Day",
  aaa: "AMAR AKBAR ANTHONY",
  war: "Casino War",
  btable: "Bollywood Table",
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
  const [date, setDate] = useState<any>();

  useEffect(() => {
    if (!date) {
      setDate(Date.now());
    }
  }, []);

  return (
    <Container style={{ padding: 0 }}>
      <div className="resultModalHeader">
        <span style={{ fontSize: "20px", fontWeight: "bold" }}>
          {title[type]} Result
        </span>
        <RxCross2 size={25} onClick={() => setfalse(false)} />
      </div>
      <div
        className="resultModalSubHea"
        style={{ fontSize: isMobile ? "0.8rem" : "1.1rem" }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "end",
            paddingRight: "15px",
          }}
        >
          <span style={{ fontWeight: "bold" }}>Round Id:</span>
          <span>{handleRoundId(data?.result?.mid)}</span>
        </div>
        {/* <div>
        <span style={{fontWeight:"bold"}}>Match Time:</span>
        <span>{data?.createdAt ? moment(data?.createdAt).format('DD/MM/YYYY hh:mm:ss A'): moment(date).format('DD/MM/YYYY hh:mm:ss A')}</span>
        </div> */}
      </div>
      {type === cardGamesType?.dragonTiger20 ? (
        <Dragon20ResultComponent data={data} />
      ) : type === cardGamesType?.andarBahar2 ? (
        <AbjResultComponent data={data} />
      ) : type === cardGamesType?.teen20 ? (
        <Teen20ResultComponent data={data} />
      ) : type === cardGamesType?.card32 ? (
        <Card32ResultComponent data={data} />
      ) : type === cardGamesType?.lucky7 ? (
        <Lucky7ResultComponent data={data} />
      ) : type === cardGamesType?.lucky7B ? (
        <Lucky7BResultComponent data={data} />
      ) : type === cardGamesType?.dragonTiger202 ? (
        <Dragon202ResultComponent data={data} />
      ) : type === cardGamesType?.dragonTigerLion ? (
        <DragonTigerLionResultComponent data={data} />
      ) : type === cardGamesType?.teenOneDay ? (
        <Teen1DResultComponent data={data} />
      ) : type === cardGamesType?.dragonTigerOneDay ? (
        <DragonTigerOneDayResultComponent data={data} />
      ) : type === cardGamesType?.teenOpen ? (
        <TeenOpenResultComponent data={data} />
      ) : type === cardGamesType?.teenTest ? (
        <TeenTestResultComponent data={data} />
      ) : type === cardGamesType?.casinoWar ? (
        <CasinoWarResultComponent data={data} />
      ) : type === cardGamesType?.andarBahar1 ? (
        <Abj1ResultComponent data={data} />
      ) : type === cardGamesType?.poker1Day ? (
        <Poker1DayResultComponent data={data} />
      ) : type === cardGamesType?.amarAkbarAnthony ? (
        <AmarAkbarAnthonyResultComponent data={data} />
      ) : type === cardGamesType?.superover ? (
        <SuperOverResultComponent data={data} />
      ) : type === cardGamesType?.race20 ? (
        <Race20ResultComponent data={data} />
      ) : type === cardGamesType?.poker6 ? (
        <Poker6ResultComponent data={data} />
      ) : type === cardGamesType?.poker20 ? (
        <Poker20ResultComponent data={data} />
      ) : type === cardGamesType?.cricketv3 ? (
        <Cricket5ResultComponent data={data} />
      ) : type === cardGamesType?.card32B ? (
        <Card32BResultComponent data={data} />
      ) : type === cardGamesType?.btable ? (
        <BollywoodTableResultComponent data={data} />
      ) : (
        <></>
      )}
    </Container>
  );
};

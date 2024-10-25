import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { RxCross2 } from "react-icons/rx";
import { cardGamesType, title } from "../../../utils/constants";
import { handleRoundId } from "../../../utils/formatMinMax";
import { isMobile } from "../../../utils/screenDimension";
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
import WorliMatkaResultComponent from "../../worliMatka/desktop/resultModalComponent";
import WorliResultComponent from "../../worli/desktop/resultModalComponent";
import CardJResultComponent from "../../3CardJ/desktop/resultModalComponent";
import CricketMatch20ResultComponent from "../../cricketMatch_20/desktop/resultModalComponent";
import Bacarrate1ResultComponent from "../../baccarat1/desktop/resultModalComponent";
import Bacarrate2ResultComponent from "../../baccarat2/desktop/resultModalComponent";
import QueenResultComponent from "../../queen/desktop/resultModalComponent";
import BallByBallResultComponent from "../../ballbyball/desktop/resultModalComponent";
import CasinoMeterResultComponent from "../../casinoMeter/desktop/resultModalComponent";
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
      ) : type === cardGamesType?.worli ? (
        <WorliResultComponent data={data} />
      ) : type === cardGamesType?.cardj ? (
        <CardJResultComponent data={data} />
      ) : type === cardGamesType?.cmatch20 ? (
        <CricketMatch20ResultComponent data={data} />
      ) : type === cardGamesType?.baccarat ? (
        <Bacarrate1ResultComponent data={data} />
      ) : type === cardGamesType?.queen ? (
        <QueenResultComponent data={data} />
      ) : type === cardGamesType?.baccarat2 ? (
        <Bacarrate2ResultComponent data={data} />
      ) : type === cardGamesType?.ballbyball ? (
        <BallByBallResultComponent data={data} />
      ) : type === cardGamesType?.cmeter ? (
        <CasinoMeterResultComponent data={data} />
      ) :  type === cardGamesType?.worli1 ? (
        <WorliMatkaResultComponent data={data} />
      ) :(
        <></>
      )}
    </Container>
  );
};

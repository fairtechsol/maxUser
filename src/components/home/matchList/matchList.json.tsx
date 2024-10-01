import { BiCricketBall } from "react-icons/bi";
import { GiBasketballBall } from "react-icons/gi";
import { IoTennisball } from "react-icons/io5";
import { MdSportsKabaddi } from "react-icons/md";
import { RiFootballLine } from "react-icons/ri";
import { GAME_TYPE } from "../../../utils/enum";

import { FaTableTennis } from "react-icons/fa";
import { GiHorseHead, GiHound, GiPoolTriangle } from "react-icons/gi";
import { IoGameController } from "react-icons/io5";
import { TbPlayVolleyball } from "react-icons/tb";
import {
  Badmin,
  Esoc,
  FUTSAL,
  Grey,
  HANDBALL,
  Horse,
  Kabaddi,
  MOTORSPORT,
  POLITICS,
  Snooker,
  TableT,
  Volley,
  amfootball,
} from "../../../assets/images";
const MatchListJson = () => {
  return [
    {
      id: "politics",
      name: "Politics",
      type: GAME_TYPE.ONE_V_ONE,
      img: POLITICS,
    },
    {
      id: "cricket",
      name: "Cricket",
      type: GAME_TYPE.ONE_V_ONE,
      icon: <BiCricketBall />,
    },
    {
      id: "football",
      name: "Football",
      icon: <RiFootballLine />,
      type: GAME_TYPE.ONE_V_ONE,
    },
    {
      id: "esoccer",
      name: "Esoccer",
      type: GAME_TYPE.ONE_V_ONE,
      img: Esoc,
    },
    {
      id: "tennis",
      name: "Tennis",
      type: GAME_TYPE.ONE_V_ONE,
      icon: <IoTennisball />,
    },
    {
      id: "horseRacing",
      name: "Horse Racing",
      type: GAME_TYPE.ONE_V_ONE,
      icon: <GiHorseHead />,
      img: Horse,
    },
    {
      id: "greyHound",
      name: "Greyhound Racing",
      type: GAME_TYPE.ONE_V_ONE,
      icon: <GiHound />,
      img: Grey,
    },
    {
      id: "tabletennis",
      name: "Table Tennis",
      type: GAME_TYPE.ONE_V_ONE,
      icon: <FaTableTennis />,
      img: TableT,
    },
    {
      id: "basketball",
      name: "Basketball",
      type: GAME_TYPE.ONE_V_ONE,
      icon: <GiBasketballBall />,
    },
    {
      id: "boxing",
      name: "Boxing",
      type: GAME_TYPE.ONE_V_ONE,
      icon: <TbPlayVolleyball />,
      img: Volley,
    },
    {
      id: "mixedMartialArts",
      name: "Mixed Martial Arts",
      type: GAME_TYPE.ONE_V_ONE,
      icon: <MdSportsKabaddi />,
      img: Kabaddi,
    },
    {
      id: "americanfootball",
      name: "American Football",
      type: GAME_TYPE.ONE_V_ONE,
      img: amfootball,
    },
    {
      id: "volleyball",
      name: "Volleyball",
      type: GAME_TYPE.ONE_V_ONE,
      icon: <TbPlayVolleyball />,
      img: Volley,
    },
    {
      id: "badminton",
      name: "Badminton",
      type: GAME_TYPE.ONE_V_ONE,
      img: Badmin,
    },
    {
      icon: <GiPoolTriangle />,
      id: "snooker",
      name: "Snooker",
      type: GAME_TYPE.ONE_V_ONE,
      img: Snooker,
    },
    {
      id: "iceHockey",
      name: "Ice Hockey",
      type: GAME_TYPE.ONE_V_ONE,
      icon: <MdSportsKabaddi />,
      img: Kabaddi,
    },
    {
      icon: <IoGameController />,
      id: "egames",
      name: "E Games",
      type: GAME_TYPE.ONE_V_ONE,
    },
    {
      id: "futsal",
      name: "Futsal",
      type: GAME_TYPE.ONE_V_ONE,
      img: FUTSAL,
    },
    {
      id: "handball ",
      name: "Hand Ball",
      type: GAME_TYPE.ONE_V_ONE,
      img: HANDBALL,
    },
    {
      id: "motorSports",
      name: "Motor Sports",
      type: GAME_TYPE.ONE_V_ONE,
      img: MOTORSPORT,
    },
  ];
};

export default MatchListJson;

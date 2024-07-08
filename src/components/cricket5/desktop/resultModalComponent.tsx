import React from "react";
import { Container } from "react-bootstrap";
import { HandleCards } from "../../commonComponent/cardsComponent";
import { FaTrophy } from "react-icons/fa";
import isMobile from "../../../utils/screenDimension";
interface Props {
  data: {
    C1: string;
    C2: string;
  };
}

const Cricket5ResultComponent: React.FC<Props> = ({ data }: any) => {
  const resultCards = data?.result?.cards?.split(",");
  let result: string[][] = [[], [], [], []];
  if (resultCards) {
    resultCards?.forEach((item: any, index: any) => {
      const targetArray = index % 4;
      result[targetArray].push(item);
    });
  }
  console.log('sssss',result)
  const allKeys = Object.keys(data ? data : 0);
  const cArray = allKeys?.filter((key) => /^C\d+$/.test(key));
  const numbers = cArray.map((key) => Number(data[key]));
  // const max = Math.max(...numbers);
  return (
    <Container style={{ display: "flex", flexDirection: "column" }}>
hbdgf
    </Container>
  );
};

export default Cricket5ResultComponent;

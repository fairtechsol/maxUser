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

const Poker1DayResultComponent: React.FC<Props> = ({ data }: any) => {
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
              <div className="bg-yellow-400 text-right p-2">
            <span className="font-bold">Winner: <span className="text-yellow-800">IND</span> | AUS : 58 | IND : 59</span>
        </div>
        
        <div className="overflow-x-auto">
            <table className="min-w-full bg-white">
                <thead>
                    <tr className="bg-green-800 text-white">
                        <th colSpan={8} className="text-left p-2">First Inning</th>
                    </tr>
                    <tr className="bg-green-700 text-white">
                        <th className="p-2 text-left">Australia</th>
                        <th className="p-2">1</th>
                        <th className="p-2">2</th>
                        <th className="p-2">3</th>
                        <th className="p-2">4</th>
                        <th className="p-2">5</th>
                        <th className="p-2">6</th>
                        <th className="p-2">Run/Over</th>
                        <th className="p-2">Score</th>
                    </tr>
                </thead>
                <tbody>
                    <tr className="border-b">
                        <td className="p-2">Over 1</td>
                        <td className="p-2">0</td>
                        <td className="p-2">4</td>
                        <td className="p-2">1</td>
                        <td className="p-2">0</td>
                        <td className="p-2">0</td>
                        <td className="p-2 text-red-500">ww</td>
                        <td className="p-2">5</td>
                        <td className="p-2">5/1</td>
                    </tr>
                    <tr className="border-b">
                        <td className="p-2">Over 2</td>
                        <td className="p-2">2</td>
                        <td className="p-2">4</td>
                        <td className="p-2">6</td>
                        <td className="p-2">6</td>
                        <td className="p-2">1</td>
                        <td className="p-2">0</td>
                        <td className="p-2">19</td>
                        <td className="p-2">24/1</td>
                    </tr>
                    <tr className="border-b">
                        <td className="p-2">Over 3</td>
                        <td className="p-2">3</td>
                        <td className="p-2 text-red-500">ww</td>
                        <td className="p-2">2</td>
                        <td className="p-2">2</td>
                        <td className="p-2">3</td>
                        <td className="p-2">3</td>
                        <td className="p-2">13</td>
                        <td className="p-2">37/2</td>
                    </tr>
                    <tr className="border-b">
                        <td className="p-2">Over 4</td>
                        <td className="p-2">3</td>
                        <td className="p-2">1</td>
                        <td className="p-2">0</td>
                        <td className="p-2">6</td>
                        <td className="p-2">4</td>
                        <td className="p-2 text-red-500">ww</td>
                        <td className="p-2">14</td>
                        <td className="p-2">51/3</td>
                    </tr>
                    <tr className="border-b">
                        <td className="p-2">Over 5</td>
                        <td className="p-2 text-red-500">ww</td>
                        <td className="p-2">1</td>
                        <td className="p-2">3</td>
                        <td className="p-2">3</td>
                        <td className="p-2"></td>
                        <td className="p-2 text-red-500">ww</td>
                        <td className="p-2">7</td>
                        <td className="p-2">58/6</td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div className="overflow-x-auto mt-4">
            <table className="min-w-full bg-white">
              
                <thead>
                    <tr className="bg-green-800 text-white">
                        <th colSpan={8} className="text-left p-2">Second Inning</th>
                    </tr>
                    <tr className="bg-green-700 text-white">
                        <th className="p-2 text-left">India</th>
                        <th className="p-2">1</th>
                        <th className="p-2">2</th>
                        <th className="p-2">3</th>
                        <th className="p-2">4</th>
                        <th className="p-2">5</th>
                        <th className="p-2">6</th>
                        <th className="p-2">Run/Over</th>
                        <th className="p-2">Score</th>
                    </tr>
                </thead>
                <tbody>
                    <tr className="border-b">
                        <td className="p-2">Over 1</td>
                        <td className="p-2">3</td>
                        <td className="p-2 text-red-500">ww</td>
                        <td className="p-2">3</td>
                        <td className="p-2">6</td>
                        <td className="p-2">0</td>
                        <td className="p-2">4</td>
                        <td className="p-2">16</td>
                        <td className="p-2">16/1</td>
                    </tr>
                    <tr className="border-b">
                        <td className="p-2">Over 2</td>
                        <td className="p-2">1</td>
                        <td className="p-2 text-red-500">ww</td>
                        <td className="p-2">4</td>
                        <td className="p-2">2</td>
                        <td className="p-2">3</td>
                        <td className="p-2">6</td>
                        <td className="p-2">16</td>
                        <td className="p-2">32/2</td>
                    </tr>
                    <tr className="border-b">
                        <td className="p-2">Over 3</td>
                        <td className="p-2">0</td>
                        <td className="p-2">2</td>
                        <td className="p-2">6</td>
                        <td className="p-2 text-red-500">ww</td>
                        <td className="p-2">6</td>
                        <td className="p-2"></td>
                        <td className="p-2">16</td>
                        <td className="p-2">48/3</td>
                    </tr>
                    <tr className="border-b">
                        <td className="p-2">Over 4</td>
                        <td className="p-2">2</td>
                        <td className="p-2 text-red-500">ww</td>
                        <td className="p-2">4</td>
                        <td className="p-2"></td>
                        <td className="p-2"></td>
                        <td className="p-2"></td>
                        <td className="p-2">11</td>
                        <td className="p-2">59/5</td>
                    </tr>
                    <tr className="border-b">
                        <td className="p-2">Over 5</td>
                        <td className="p-2">3</td>
                        <td className="p-2">1</td>
                        <td className="p-2">2</td>
                        <td className="p-2">4</td>
                        <td className="p-2">0</td>
                        <td className="p-2">6</td>
                        <td className="p-2">16</td>
                        <td className="p-2">75/5</td>
                    </tr>
                    <tr className="border-b">
                        <td className="p-2">Over 6</td>
                        <td className="p-2">4</td>
                        <td className="p-2">1</td>
                        <td className="p-2">0</td>
                        <td className="p-2">2</td>
                        <td className="p-2">3</td>
                        <td className="p-2"></td>
                        </tr>
                        </tbody>
                        </table>
                        </div>
    </Container>
  );
};

export default Poker1DayResultComponent;

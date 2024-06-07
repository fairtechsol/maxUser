import { Container, Table } from "react-bootstrap";

import RulesHead from "../../commonComponent/mobileRulesHead";
import "./style.scss";
import CardResultBox from "../../commonComponent/cardResultBox";

const TeenPattiMobile = () => {
  const tableData = [
    { player: "Player A", odds: "1.98", pairPlus: "Pair plus A" },
    {
      player: "Player B",
      odds: "1.98",
      pairPlus: "Pair plus B",
      isSuspended: true,
    },
  ];
  const dummyData = [
    { label: 'Pair (Double)', value: '1 To 1' },
    { label: 'Flush (Color)', value: '1 To 4' },
    { label: 'Straight (Rown)', value: '1 To 6' },
    { label: 'Trio (Teen)', value: '1 To 35' },
    { label: 'Straight Flush (Pakki Rown)', value: '1 To 45' }
  ];
  return (
    <div >
  
        <RulesHead />
        {/* <CasinoVideo /> */}
     
      <div className="table-responsive mb-1 casino-container teenpatti-20 " style={{ left: 0, width: '100%',height: "30%", fontWeight: "200", padding: "0px !important"  }}>
        <Table bordered className="mb-0">
          <thead>
            <tr>
              <th className="box-5 min-max f400 title-12">Min:100 Max:300000</th>
              <th colSpan={2} className="box-5 text-center back f400">
                BACK
              </th>
            </tr>
          </thead>
          <tbody>
            {tableData.map((row, index) => (
              <tr key={index}>
                <td className="box-5">
                  <b>{row.player}</b>
                </td>
                <td className="box-2 back text-center">
                  <span className="odds d-block ">
                    <b>{row.odds}</b>
                  </span>
                  <span style={{ color: "black" }}>0</span>
                </td>
                <td
                  className={`box-3 back text-center postion-relative ${
                    row.isSuspended ? "" : ""
                  }`}
                >
                  <span className="odds d-block">
                    <b>{row.pairPlus}</b>
                  </span>
                  <span style={{ color: "black" }}>0</span>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
      <CardResultBox />
      <div className="casino-title" style={{ position: 'relative',}}><span >Rules</span></div>
      <div className="table-responsive rules-table">
      <Table bordered>
        <thead>
          <tr>
            <th colSpan={2} className="box-10 text-center">Pair Plus</th>
          </tr>
        </thead>
        <tbody>
          {dummyData.map((item, index) => (
            <tr key={index}>
              <td className="box-7">{item.label}</td>
              <td className="box-3">{item.value}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
   
    </div>
  );
};

export default TeenPattiMobile;

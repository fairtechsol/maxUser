import { useEffect } from "react";
import { Table } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { runAmountReset } from "../../../../store/actions/betPlace/betPlaceActions";
import { AppDispatch } from "../../../../store/store";

const RunBoxTable = ({ runAmount }: any) => {
  const dispatch: AppDispatch = useDispatch();
  useEffect(() => {
    return () => {
      dispatch(runAmountReset());
    };
  }, []);

  return (
    <Table striped bordered hover style={{ width: "100%" }}>
      <thead>
        <tr>
          <th style={{ backgroundColor: "#f2f2f2", textAlign: "start" }}>
            Run
          </th>
          <th className="text-end" style={{ backgroundColor: "#f2f2f2" }}>
            Amount
          </th>
        </tr>
      </thead>
      <tbody>
        {runAmount?.betPlaced?.map((item: any, index: number) => (
          <tr key={index}>
            <td style={{ textAlign: "start", backgroundColor: "#f2f2f2" }}>
              {item?.odds}
            </td>
            <td
              style={{
                textAlign: "end",
                backgroundColor: "#f2f2f2",
                color: item?.profitLoss < 0 ? "#bd1828" : "#086f3f",
              }}
            >
              {parseFloat(item?.profitLoss).toFixed(2)}
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default RunBoxTable;

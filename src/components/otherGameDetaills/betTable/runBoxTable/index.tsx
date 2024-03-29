import { Table } from "react-bootstrap";

const RunBoxTable = ({ runAmount }: any) => {
  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>Run </th>
          <th className="text-center">Amount</th>
        </tr>
      </thead>
      <tbody className="text-center">
        {runAmount?.betPlaced?.map((item: any, index: number) => {
          return (
            <tr key={index}>
              <td className={+item?.profitLoss >= 0 ? "bg-blue1" : "bg-red1"}>
                {item?.odds}
              </td>
              <td className={+item?.profitLoss >= 0 ? "bg-blue1" : "bg-red1"}>
                {item?.profitLoss}
              </td>
            </tr>
          );
        })}
      </tbody>
    </Table>
  );
};

export default RunBoxTable;

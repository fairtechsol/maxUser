import { Table } from "react-bootstrap";

const RunBoxTable = ({ runAmount }: any) => {
  return (
    <Table striped bordered hover style={{width:'90%', margin:'17px'}}>
      <thead>
        <tr >
          <th style={{backgroundColor: '#ffc742',textAlign:'center'}}>Run </th>
          <th className="text-end" style={{backgroundColor: '#ffc742'}}>Amount</th>
        </tr>
      </thead>
      <tbody>
        {runAmount?.betPlaced?.map((item: any, index: number) => {
          return (
            <tr key={index}>
              <td className={+item?.profitLoss >= 0 ? "bg-blue1" : "bg-red1"} style={{textAlign:'center'}}>
                {item?.odds}
              </td>
              <td className={+item?.profitLoss >= 0 ? "bg-blue1" : "bg-red1"} style={{textAlign:'end'}}>
                {parseFloat(item?.profitLoss).toFixed(2)}
              </td>
            </tr>
          );
        })}
        
      </tbody>
    </Table>
  );
};

export default RunBoxTable;

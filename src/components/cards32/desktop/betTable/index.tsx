import React from 'react';
import { Table } from 'react-bootstrap';
import "./style.scss"
const DynamicTable = () => {
  const runners = [
    {
      name: 'Player 8',
      profitLoss: 0,
      backPrice: '12.20',
      backSize: '1000000',
      layPrice: '13.70',
      laySize: '1000000',
      suspended: true
    },
    {
      name: 'Player 9',
      profitLoss: 0,
      backPrice: '5.95',
      backSize: '1000000',
      layPrice: '6.45',
      laySize: '1000000',
      suspended: true
    },
  ];


  return (
  //   <div className="bet-table">
  //   <div className="table-header">
  //     <div style={{width:"60%"}}><div className="header-cell">Player</div></div>
  //     <div style={{width:"40%", display:"flex", justifyContent: "space-around"}}> 
  //     <div className="header-cell-2">BACK</div>
  //     <div className="header-cell-2">LAY</div>
  //     </div>
     
  //   </div>
  //   {runners.map((runner, index) => (
  //     <div key={index} className="table-row">
  //       <div className="cell player-cell">
  //         {runner.name}
  //         <br />
  //         {runner.profitLoss}
  //       </div>
  //       <div className="cell back-cell">
  //         {runner.backPrice}
  //         <br />
  //         {runner.backSize}
  //       </div>
  //       <div className="cell lay-cell">
  //         {runner.layPrice}
  //         <br />
  //         {runner.laySize}
  //       </div>
  //     </div>
  //   ))}
  // </div>
  <>
  <Table bordered className='cards-container'>
  <thead>
    <tr>
      <th></th>
      <th className='back f400 text-center lh-1'>BACK</th>
      <th className='lay f400 text-center lh-1'>LAY</th>
    </tr>
  </thead>
  <tbody className='casino-32A '>
    {runners.map((runner, index) => (
      <tr key={index} className='suspended'>
        <td className="box-6 lh-1 title-14 ">
          {runner.name}
          <br />
          {runner.profitLoss}
        </td>
        <td className="box-2 back text-center title-12 lh-1  ">
          {runner.backPrice}
         
          <br />
          <span className="title-10">{runner.backSize}</span>
        </td>
        <td className="box-2 lay text-center title-12 lh-1 ">
          {runner.layPrice}
         
          <br />
          <span className="title-10">{runner.laySize}</span>
        </td>
        
      </tr>
    ))}
  </tbody>
</Table>
</>
  );
};

export default DynamicTable;

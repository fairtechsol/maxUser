
import { Chart } from "react-google-charts";

const PieChart=({data,options}:any)=>{
return (
    // <div style={{width:"250px",height:"160px",padding:0}}>
<Chart
    chartType="PieChart"
    data={data}
    options={options}
    width={"170px"}
    height={"120px"}
  />
    // </div>
)
}
export default PieChart;
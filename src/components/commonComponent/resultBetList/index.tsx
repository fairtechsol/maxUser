import { useState } from "react"
import DeleteBetOverlay from "../betComponents/deleteBetRow";
import moment from "moment";
import { Column } from "../../../models/tableInterface";
import CustomTable2 from "../table2";
const columns: Column[] = [
    { id: "nation", label: "Nation " },
    { id: "rate", label: "Rate " },
    { id: "amount", label: "Amount " },
    { id: "win", label: "Win" },
    { id: "matchDate", label: "MatchDate " },
    { id: "ip", label: "IP " },
    { id: "browserDetail", label: "BrowserDetail " },
    { id: "action", label: "Action " },
  ];
const ResultBetList=({bets,total}:any)=>{
    const [selected, setSelected] = useState("all")
    const [list, setList] = useState(bets)

    
    const handleRadioChange=(type:any)=>{
      setSelected(type);
      if(type==="back"){
        const filtered = bets.filter((item:any) => item?.betType === "BACK"||item?.betType === "back");
        setList(filtered);
      }else if(type==="lay"){
        const filtered = bets.filter((item:any) => item?.betType === "LAY"||item?.betType === "lay");
        setList(filtered);
      }else if(type==="delete"){
        const filtered = bets.filter((item:any) => item?.deleteReason != null);
        setList(filtered);
      }else{
        setList(bets);
      }
    };
    return(
        <div className="w-100 d-flex flex-column">
            <div className="w-100 d-flex flex-row justify-content-between">
             <div className="w-25 d-flex flex-row justify-content-around">
                <input type="radio" id={selected} name="betType" defaultChecked onChange={()=>handleRadioChange("all")}/>
                <label>All</label>
                <input type="radio" id={selected} name="betType" onChange={()=>handleRadioChange("back")}/>
                <label>Back</label>
                <input type="radio" id={selected} name="betType" onChange={()=>handleRadioChange("lay")}/>
                <label>Lay</label>
                <input type="radio" id={selected} name="betType" onChange={()=>handleRadioChange("delete")}/>
                <label>Deleted</label>
             </div>
             <div className="w-25 d-flex flex-row justify-content-around">
              <span>Total Bets: 1</span>
              <span>Total Amount: {total}</span>
             </div>
            </div>

          <div className="w-100">
          <CustomTable2
        // striped
        columns={columns}
        itemCount={10}
        setTableConfig={()=>{}}
        tHeadTheme=""
        customClass=""
        // CustomTableClass=""
        // currentPage={currentPage}
        // setCurrentPage={setCurrentPage}
      >
        {list?.length === 0 && (
          <tr className="text-center">
            <td colSpan={10}>No Record Found!</td>
          </tr>
        )}
        {list?.length > 0 &&
          list?.map((item: any, index: number) => {
            const {
              id,
              teamName,
              odds,
              amount,
              winAmount,
              createdAt,
              ip,
              ipAddress,
              browserDetail,
              deleteReason,
              betType,
              result,
              lossAmount
            } = item;
            return (
              <tr key={id} className="position-relative">
                {/* <td
                  className={
                    betType === "NO" || betType === "LAY"
                      ? "bg-red1"
                      : "bg-blue3"
                  }
                >
                  {index + 1}
                </td> */}
                <td
                  className={
                    betType === "NO" || betType === "LAY"
                      ? "bg-red1"
                      : "bg-blue3"
                  }
                  style={{borderRight:"1px solid #aaa"}}
                >
                  {teamName}
                </td>
                <td
                  className={
                    betType === "NO" || betType === "LAY"
                      ? "bg-red1"
                      : "bg-blue3"
                  }
                  style={{borderRight:"1px solid #aaa"}}
                >
                  {odds}
                </td>
                <td
                  className={
                    betType === "NO" || betType === "LAY"
                      ? "bg-red1"
                      : "bg-blue3"
                  }
                  style={{borderRight:"1px solid #aaa"}}
                >
                  {amount}
                </td>
                <td
                  className={
                    betType === "NO" || betType === "LAY"
                      ? "bg-red1"
                      : "bg-blue3"
                  }
                  style={{borderRight:"1px solid #aaa",color:result==="LOSS"?"red":"green"}}
                >
                  {result==="LOSS"?-lossAmount: winAmount}
                </td>
                <td
                  className={
                    betType === "NO" || betType === "LAY"
                      ? "bg-red1"
                      : "bg-blue3"
                  }
                  style={{borderRight:"1px solid #aaa"}}
                >
                  {moment(createdAt).format("YYYY-MM-DD hh:mm:ss")}
                </td>
                <td
                  className={
                    betType === "NO" || betType === "LAY"
                      ? "bg-red1"
                      : "bg-blue3"
                  }
                  style={{borderRight:"1px solid #aaa"}}
                >
                  {ipAddress}
                </td>
                <td
                  className={
                    betType === "NO" || betType === "LAY"
                      ? "bg-red1"
                      : "bg-blue3"
                  }
                  style={{borderRight:"1px solid #aaa"}}
                >
                  {/* <TooltipCustom title={browserDetail}> */}
                    <a href="#" title="">
                      Detail
                    </a>
                  {/* </TooltipCustom> */}
                </td>
                <td  className={
                    betType === "NO" || betType === "LAY"
                      ? "bg-red1"
                      : "bg-blue3"
                  }>
                    <input type="checkbox" />
                </td>
                <DeleteBetOverlay title={deleteReason} />
              </tr>
            );
          })}
      </CustomTable2>
          </div>
        </div>
    )
}
export default ResultBetList;
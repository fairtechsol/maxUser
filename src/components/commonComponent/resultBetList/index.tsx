import { useEffect, useState } from "react";
import DeleteBetOverlay from "../betComponents/deleteBetRow";
import moment from "moment";
import { Column } from "../../../models/tableInterface";
import CustomTable2 from "../table2";
import { isMobile } from "../../../utils/screenDimension";
const columns: Column[] = [
  { id: "nation", label: "Nation " },
  { id: "rate", label: "Rate " },
  { id: "amount", label: "Amount " },
  { id: "win", label: "Win" },
  { id: "matchDate", label: "MatchDate " },
  { id: "ip", label: "IP " },
  { id: "browserDetail", label: "BrowserDetail " },
  { id: "action", label: "Action" },
];
const ResultBetList = ({ bets, total }: any) => {
  const [selected, setSelected] = useState("all");
  const [list, setList] = useState(bets);
  const [selectedItems, setSelectedItems] = useState([]);
  const [filteredTotal, setFilteredTotal] = useState(total);
  const handleCheckBox = (item:any) => {
    setSelectedItems((prevSelectedItems) => {
      if (prevSelectedItems.includes(item)) {
        return prevSelectedItems.filter((i) => i?.id !== item?.id);
      } else {
        return [...prevSelectedItems, item];
      }
    });
  };

  const handleRadioChange = (type: any) => {
    setSelected(type);
    if (type === "back") {
      const filtered = bets.filter(
        (item: any) => item?.betType === "BACK" || item?.betType === "back"
      );
      setList(filtered);
    } else if (type === "lay") {
      const filtered = bets.filter(
        (item: any) => item?.betType === "LAY" || item?.betType === "lay"
      );
      setList(filtered);
    } else if (type === "delete") {
      const filtered = bets.filter((item: any) => item?.deleteReason != null);
      setList(filtered);
    } else {
      setList(bets);
    }
  };

  useEffect(() => {
    if (selectedItems.length === 0) {
      setFilteredTotal(total); // Show `total` if no items are selected
    } else {
      setFilteredTotal(selectedItems.length); // Otherwise, show selected items count
    }
  }, [selectedItems, total]);
  return (
    <div className="w-100 d-flex flex-column">
      <div
        className={
          isMobile
            ? "w-100 d-flex flex-row justify-content-between title-12 gap-2"
            : "w-100 d-flex flex-row justify-content-between"
        }
      >
        <div
          className={
            isMobile
              ? "w-75 lh-2 d-flex flex-row justify-content-between"
              : "w-25 lh-2 d-flex flex-row justify-content-between"
          }
        >
          <input
            type="radio"
            id={selected}
            name="betType"
            defaultChecked
            onChange={() => handleRadioChange("all")}
          />
          <label>All</label>
          <input
            type="radio"
            id={selected}
            name="betType"
            onChange={() => handleRadioChange("back")}
          />
          <label>Back</label>
          <input
            type="radio"
            id={selected}
            name="betType"
            onChange={() => handleRadioChange("lay")}
          />
          <label>Lay</label>
          <input
            type="radio"
            id={selected}
            name="betType"
            onChange={() => handleRadioChange("delete")}
          />
          <label>Deleted</label>
        </div>
      </div>
      <div
        className={
          isMobile
            ? "title-12 d-flex flex-row justify-content-end mt-2  float-end"
            : "title-16 d-flex flex-row justify-content-end  float-end"
        }
      >
        <span className="px-2">Total Bets: {filteredTotal}</span>
        <span className="pe-1">
          Total Amount:{""}
          <span
            className={
              (selectedItems?.length > 0 ? selectedItems : list)?.reduce((acc: number, bet: any) => {
                return acc + (bet?.result === "LOSS" ? -bet?.lossAmount : bet?.winAmount);
              }, 0) < 0
                ? "color-red"
                : "color-green"
            }
          >
            {" "}
            {(selectedItems?.length > 0 ? selectedItems : list)?.reduce((acc: number, bet: any) => {
              return acc + (bet?.result === "LOSS" ? -bet?.lossAmount : bet?.winAmount);
            }, 0)}
          </span>
        </span>
      </div>

      <div className="w-100">
        <CustomTable2
          // striped
          columns={columns}
          itemCount={10}
          setTableConfig={() => {}}
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
            list?.map((item: any) => {
              const {
                id,
                teamName,
                odds,
                amount,
                winAmount,
                createdAt,
                ipAddress,
                deleteReason,
                betType,
                result,
                lossAmount,
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
                    style={{ borderRight: "1px solid #aaa" }}
                  >
                    {teamName}
                  </td>
                  <td
                    className={
                      betType === "NO" || betType === "LAY"
                        ? "bg-red1"
                        : "bg-blue3"
                    }
                    style={{ borderRight: "1px solid #aaa" }}
                  >
                    {odds}
                  </td>
                  <td
                    className={
                      betType === "NO" || betType === "LAY"
                        ? "bg-red1"
                        : "bg-blue3"
                    }
                    style={{ borderRight: "1px solid #aaa" }}
                  >
                    {amount}
                  </td>
                  <td
                    className={
                      betType === "NO" || betType === "LAY"
                        ? "bg-red1"
                        : "bg-blue3"
                    }
                    style={{
                      borderRight: "1px solid #aaa",
                      color: result === "LOSS" ? "red" : "green",
                    }}
                  >
                    {result === "LOSS" ? -lossAmount : winAmount}
                  </td>
                  <td
                    className={
                      betType === "NO" || betType === "LAY"
                        ? "bg-red1"
                        : "bg-blue3"
                    }
                    style={{ borderRight: "1px solid #aaa" }}
                  >
                    {moment(createdAt).format("YYYY-MM-DD hh:mm:ss")}
                  </td>
                  <td
                    className={
                      betType === "NO" || betType === "LAY"
                        ? "bg-red1"
                        : "bg-blue3"
                    }
                    style={{ borderRight: "1px solid #aaa" }}
                  >
                    {ipAddress}
                  </td>
                  <td
                    className={
                      betType === "NO" || betType === "LAY"
                        ? "bg-red1"
                        : "bg-blue3"
                    }
                    style={{ borderRight: "1px solid #aaa" }}
                  >
                    {/* <TooltipCustom title={browserDetail}> */}
                    <a href="#" title="">
                      Detail
                    </a>
                    {/* </TooltipCustom> */}
                  </td>
                  <td
                    className={
                      betType === "NO" || betType === "LAY"
                        ? "bg-red1"
                        : "bg-blue3"
                    }
                  >
                    <input
                      type="checkbox"
                      onChange={() => handleCheckBox(item)}
                      checked={selectedItems.includes(item)}
                    />
                  </td>
                  <DeleteBetOverlay title={deleteReason} />
                </tr>
              );
            })}
        </CustomTable2>
      </div>
    </div>
  );
};
export default ResultBetList;

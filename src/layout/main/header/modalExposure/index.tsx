import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import CustomModal from "../../../../components/commonComponent/modal";
import { RootState } from "../../../../store/store";
import { navigateToGameDetail } from "../../../../utils/constants";
import { isMobile } from "../../../../utils/screenDimension";

interface ExposureModalInterface {
  show: boolean;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
}

const ExposureModal: React.FC<ExposureModalInterface> = ({ show, setShow }) => {
  const { myMarketList } = useSelector((state: RootState) => state.bets);

  return (
    <CustomModal show={show} setShow={setShow} title={"My Market"} size={"lg"}>
      <div className="w-100 p-1 d-flex justify-content-center align-items-center">
        <table style={{ width: "98%", backgroundColor: "#f2f2f2" }}>
          <thead className={`w-100 ${isMobile ? "title-12" : "title-14"}`}>
            <th>EventType</th>
            <th>Event Name</th>
            <th>Match Name</th>
            <th>Trade</th>
          </thead>
          <tbody className={`w-100 ${isMobile ? "title-12" : "title-14"}`}>
            {myMarketList?.map((item: any, index: number) => {
              return (
                <>
                  <tr
                    style={{
                      height: "32px",
                      backgroundColor: "#f2f2f2",
                      borderBottom: "0.5px solid #c7c8ca",
                    }}
                  >
                    <td className="d-flex justify-content-start align-items-center">
                      {item?.eventType}
                    </td>
                    <td style={{ color: "#007bff" }}>
                      <Link
                        to={
                          ["greyHound", "horseRacing"].includes(item.eventType)
                            ? `/race/${item.matchId}`
                            : [
                                "football",
                                "tennis",
                                "cricket",
                                "politics",
                              ].includes(item.eventType)
                            ? `/game-detail/${item.eventType}/${item.matchId}`
                            : `/${navigateToGameDetail[item.eventType]}`
                        }
                        style={{ color: "#0d6efd" }}
                        onClick={() => setShow(false)}
                      >
                        {item?.eventName}
                      </Link>
                    </td>
                    <td>{item?.groupedmarkettype || item?.marketType}</td>
                    <td>{item?.trade}</td>
                  </tr>
                </>
              );
            })}
          </tbody>
        </table>
      </div>
    </CustomModal>
  );
};

export default ExposureModal;

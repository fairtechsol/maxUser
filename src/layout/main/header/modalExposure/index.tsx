import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import CustomModal from "../../../../components/commonComponent/modal";
import CustomTable from "../../../../components/commonComponent/table";
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
    <CustomModal show={show} setShow={setShow} title={"My Market"}>
      <div className="market">
        <CustomTable
          bordered={isMobile}
          striped={!isMobile}
          columns={[
            {
              id: "eventType",
              label: "EventType",
            },
            {
              id: "eventName",
              label: "Event Name",
            },
            {
              id: "matchName",
              label: "Match Name",
            },
            {
              id: "trade",
              label: "Trade",
            },
          ]}
          itemCount={10}
          setTableConfig={() => {}}
        >
          {myMarketList?.map((item: any, index: number) => {
            return (
              <tr key={index}>
                <td>{item?.eventType}</td>
                <td style={{ color: "#007bff" }}>
                  <Link
                    to={
                      item.eventType === "cricket" ||
                      item.eventType === "politics"
                        ? `/game-detail/${item.eventType}/${item.matchId}`
                        : ["greyHound", "horseRacing"].includes(item.eventType)
                        ? `/race/${item.matchId}`
                        : ["football", "tennis"].includes(item.eventType)
                        ? `/other-game-detail/${item.eventType}/${item.matchId}`
                        : `/${navigateToGameDetail[item.eventType]}`
                    }
                    onClick={() => setShow(false)}
                  >
                    {item?.eventName}
                  </Link>
                </td>
                <td>{item?.groupedmarkettype || item?.marketType}</td>
                <td>{item?.trade}</td>
              </tr>
            );
          })}
        </CustomTable>
      </div>
    </CustomModal>
  );
};

export default ExposureModal;

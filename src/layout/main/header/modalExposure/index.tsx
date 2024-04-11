import React from "react";
import CustomModal from "../../../../components/commonComponent/modal";
import CustomTable from "../../../../components/commonComponent/table";
import isMobile from "../../../../utils/screenDimension";
import { useSelector } from "react-redux";
import { RootState } from "../../../../store/store";

interface ExposureModalInterface {
  show: boolean;
  setShow: React.Dispatch<React.SetStateAction<string>>;
}

const ExposureModal: React.FC<ExposureModalInterface> = ({ show, setShow }) => {
  const { myMarketList } = useSelector((state: RootState) => state.bets);

  return (
    <CustomModal show={show} setShow={setShow} title={"My Market"}>
           <div className="market"><CustomTable
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
              <td style={{color: "#007bff"}}>{item?.eventName}</td>
              <td>{item?.groupedmarkettype}</td>
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

import React from "react";
import CustomModal from "../../../../components/commonComponent/modal";
import CustomTable from "../../../../components/commonComponent/table";
import isMobile from "../../../../utils/screenDimension";

interface ExposureModalInterface {
  show: boolean;
  setShow: React.Dispatch<React.SetStateAction<string>>;
}

const ExposureModal: React.FC<ExposureModalInterface> = ({ show, setShow }) => {
  return (
    <CustomModal show={show} setShow={setShow} title={"My Market"}>
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
        <tr>
          <td>12345</td>
          <td>12345</td>
          <td>12345</td>
          <td>12345</td>
        </tr>
      </CustomTable>
    </CustomModal>
  );
};

export default ExposureModal;

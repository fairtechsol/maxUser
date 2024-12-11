import { Col, Modal } from "react-bootstrap";
import { isMobile } from "../../../utils/screenDimension";
import SelectSearch from "../../commonComponent/SelectSearch";
import CustomButton from "../../commonComponent/button";
import moment from "moment";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../store/store";
import { transactionProviderBets } from "../../../store/actions/cards/cardDetail";

const LiveCasinoModal = ({
  selected,
  liveCasinoModal,
  handleCloseLiveCasinoModal,
  liveCasinoProvider,
  updatedReport,
}: any) => {
  const dispatch: AppDispatch = useDispatch();
  const [type2, setType2] = useState<any>({
    label: "Select Casino Type",
    value: "",
  });

  const handleLiveCasinoSubmitClick = () => {
    if (type2?.value === "") {
      return false;
    }
    let payload: any = {
      id: selected?.user?.id,
      name: type2?.value,
      date: selected?.createdAt,
    };
    dispatch(transactionProviderBets(payload));
  };

  return (
    <Modal
      show={liveCasinoModal}
      onHide={handleCloseLiveCasinoModal}
      // size="xl"
      dialogClassName={`${
        isMobile ? "provider-modal-m m-0" : "provider-modal custom-modal"
      }`}
    >
      <Modal.Header
        closeButton
        closeVariant={"white"}
        style={{ color: "#fff", backgroundColor: "#004A25" }}
      >
        <Modal.Title className="w-100">Result</Modal.Title>
      </Modal.Header>
      <Modal.Body className={`${isMobile ? "p-0 title-12" : "title-14"}`}>
        <div className={`w-100 d-flex flex-column ${isMobile ? "mt-2" : ""}`}>
          <div className={`w-100 d-flex flex-row justify-content-start gap-2`}>
            <Col md={1} xs={3}>
              <SelectSearch
                options={liveCasinoProvider}
                onChange={setType2}
                value={type2}
                filedClass={{
                  width: "100px",
                }}
                defaultValue={{
                  label: "Select Casino Type",
                  value: "",
                }}
              />
            </Col>
            <CustomButton
              size={isMobile ? "sm" : "sm"}
              className={`${isMobile ? "" : " bg-primary"} border-0 `}
              onClick={handleLiveCasinoSubmitClick}
            >
              Submit
            </CustomButton>
          </div>
          <div
            className={`d-flex ${isMobile ? "mt-4" : "p-2"} overflow-auto`}
            style={isMobile ? { width: "100%" } : { width: "100%" }}
          >
            <div className="w-100 d-flex flex-column">
              <div
                className="w-100 d-flex flex-row fbold"
                style={{
                  border: "1px solid #c7c8ca",
                  height: "35px",
                  backgroundColor: "#f7f7f7",
                  minWidth: "900px",
                }}
              >
                <div
                  className="d-flex justify-content-start align-items-center ps-1"
                  style={{ width: "16%", borderRight: "1px solid #c7c8ca" }}
                >
                  Game Name
                </div>
                <div
                  className="d-flex justify-content-start align-items-center ps-1"
                  style={{ width: "12%", borderRight: "1px solid #c7c8ca" }}
                >
                  Type
                </div>
                <div
                  className="d-flex justify-content-end align-items-center pe-1"
                  style={{ width: "11%", borderRight: "1px solid #c7c8ca" }}
                >
                  Amount
                </div>
                <div
                  className="d-flex justify-content-end align-items-center pe-1"
                  style={{ width: "13%", borderRight: "1px solid #c7c8ca" }}
                >
                  Total
                </div>
                <div
                  className="d-flex justify-content-start align-items-center ps-1"
                  style={{ width: "12%", borderRight: "1px solid #c7c8ca" }}
                >
                  Date
                </div>
                <div
                  className="d-flex justify-content-start align-items-center ps-1"
                  style={{ width: "16%", borderRight: "1px solid #c7c8ca" }}
                >
                  Round Id
                </div>
                <div
                  className="d-flex justify-content-start align-items-center ps-1"
                  style={{ width: "20%" }}
                >
                  Transaction Id
                </div>
              </div>
              {updatedReport.length > 0 &&
                updatedReport?.map((item: any) => {
                  return (
                    <div
                      key={item?.transactionId} // Use a unique key
                      className="w-100 d-flex flex-row"
                      style={{
                        border: "1px solid #c7c8ca",
                        height: "35px",
                        backgroundColor: "#f2f2f2",
                        minWidth: "900px", // Set minimum width for horizontal scrolling
                      }}
                    >
                      <div
                        className="d-flex justify-content-start align-items-center ps-1"
                        style={{
                          width: "16%",
                          borderRight: "1px solid #c7c8ca",
                        }}
                      >
                        {item?.gameName}
                      </div>
                      <div
                        className="d-flex justify-content-start align-items-center ps-1"
                        style={{
                          width: "12%",
                          borderRight: "1px solid #c7c8ca",
                        }}
                      >
                        {parseFloat(item?.amount) > 0 ? "CREDIT" : "DEBIT"}
                      </div>
                      <div
                        className="d-flex justify-content-end align-items-center pe-1"
                        style={{
                          width: "11%",
                          borderRight: "1px solid #c7c8ca",
                        }}
                      >
                        {Math.abs(item?.amount).toFixed(2)}
                      </div>
                      <div
                        className="d-flex justify-content-end align-items-center pe-1 text-end lh-1"
                        style={{
                          width: "13%",
                          borderRight: "1px solid #c7c8ca",
                        }}
                      >
                        {parseFloat(item?.total).toFixed(2)}
                      </div>
                      <div
                        className="d-flex justify-content-start align-items-center ps-1 lh-1"
                        style={{
                          width: "12%",
                          borderRight: "1px solid #c7c8ca",
                        }}
                      >
                        {moment(new Date(item?.createdAt)).format(
                          "YYYY-MM-DD hh:mm"
                        )}
                      </div>
                      <div
                        className="d-flex justify-content-start align-items-center ps-1 lh-1"
                        style={{
                          width: "16%",
                          borderRight: "1px solid #c7c8ca",
                        }}
                      >
                        {item?.roundId}
                      </div>
                      <div
                        className="d-flex justify-content-start align-items-center ps-1 lh-1"
                        style={{ width: "20%" }}
                      >
                        {item?.transactionId}
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default LiveCasinoModal;

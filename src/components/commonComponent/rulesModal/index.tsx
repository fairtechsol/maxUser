import Modal from "react-bootstrap/Modal";
import { isMobile } from "../../../utils/screenDimension";
import Abj2Rules from "../../abj2/desktop/abj2Rules";
import AmarAkbarAnthonyRules from "../../amarAkbarAnthony/desktop/AmrAkbrAnthny";
import Baccarat1Rules from "../../baccarat1/desktop/baccarat1Rules";
import Baccarat2Rules from "../../baccarat2/desktop/baccarat2Rules";
import BTableRules from "../../bollywoodTable/desktop/btableRules";
import Card32Rules from "../../cards32/desktop/card32Rules";
import CmeterRules from "../../casinoMeter/desktop/cmeterRules";
import Teen1dRules from "../../teenPatti1D/desktop/teen1dRules";
import Teen20Rules from "../../teenPatti20/desktop/teen20Rules";
import "./style.scss";

const RulesModal = ({ show, setShow, rule, type, gameType }: any) => {
  const handleClose = () => setShow(false);
  if (type == "No Record Found.") {
    return (
      <Modal
        show={show}
        onHide={handleClose}
        dialogClassName="custom-modal-width"
      >
        <div
          className="go2072408551"
          style={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            animation:
              " 0.35s cubic-bezier(0.21, 1.02, 0.73, 1) 0s 1 normal forwards running go3223188581",
          }}
        >
          <div className="go685806154">
            <div className="go1858758034" />
            <div className="go1579819456">
              <div className="go2534082608" onClick={handleClose}>
                X
              </div>
            </div>
          </div>
          <div role="status" aria-live="polite" className="go3958317564">
            No Record Found.
          </div>
        </div>
      </Modal>
    );
  }
  return (
    <div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header
          className="p-1 rounded-0 px-2"
          style={{ backgroundColor: "#004a25", color: "#ffffff" }}
        >
          <Modal.Title>Rules</Modal.Title>
          <button
            type="button"
            className="btn-close btn-close-white"
            aria-label="Close"
            onClick={() => setShow(false)}
           />
        </Modal.Header>
        <Modal.Body style={{ padding: "0px", cursor: "pointer" }}>
          {type === "rules" ? (
            <></>
          ) : type === "imageWithContent" ? (
            <div>
              {gameType == "cmeter" ? (
                <CmeterRules />
              ) : gameType == "teen" ? (
                <Teen1dRules />
              ) : gameType == "teen20" ? (
                <Teen20Rules />
              ) : gameType == "baccarat2" ? (
                <Baccarat1Rules />
              ) : gameType == "card32" ? (
                <Card32Rules />
              ) : gameType == "card32eu" ? (
                <Card32Rules />
              ) : gameType == "btable" ? (
                <BTableRules />
              ) : gameType == "abj2" ? (
                <Abj2Rules />
              ) : gameType == "aaa" ? (
                <AmarAkbarAnthonyRules/>
              )  : gameType == "ballbyball" ? (
                  <Baccarat2Rules/>
              ) :gameType=="baccarat1"? <Baccarat1Rules/>:(
                <></>
              )}
            </div>
          ) : (
            <img
              src={rule}
              width={"100%"}
              height={isMobile ? "550px" : "650px"}
              alt="modal content"
            />
          )}
        </Modal.Body>
      </Modal>
    </div>
  );
};
export default RulesModal;

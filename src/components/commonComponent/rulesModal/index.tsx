import Modal from "react-bootstrap/Modal";
import {isMobile} from "../../../utils/screenDimension";
import RulesSection from "../../baccarat2/desktop/RulesSection";
import RulesBoth from "../../casinoMeter/desktop/RulesBoth";

const RulesModal = ({ show, setShow, rule,type }: any) => {

  const handleClose = () => setShow(false);
  return (
    <div>
      <Modal show={show} onHide={handleClose} >
        <Modal.Header className="p-1 rounded-0 px-2"  style={{backgroundColor:"#004a25",color:"#ffffff"}}>
          <Modal.Title>Rules</Modal.Title>
          <button 
              type="button" 
              className="btn-close btn-close-white" 
              aria-label="Close" 
              onClick={() => setShow(false)}
            ></button>
        </Modal.Header>
        <Modal.Body style={{padding:"0px", cursor: "pointer"}}>
        {type === "rules" ? (
            <RulesSection />
          )  : type === "imageWithContent" ? (
            <div>
              <RulesBoth /> 
            </div>
          ) : (
            <img src={rule} width={"100%"} height={isMobile ? "550px" : "650px"} alt="modal content" />
          )}
        </Modal.Body>
      </Modal>
    </div>
  );
};
export default RulesModal;

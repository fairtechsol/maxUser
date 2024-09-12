import Modal from "react-bootstrap/Modal";
import {isMobile} from "../../../utils/screenDimension";

const RulesModal = ({ show, setShow, rule }: any) => {
  // const [show, setShow] = useState(false);

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
          <img src={rule} width={"100%"} height={isMobile ? "550" : "650px"} />
        </Modal.Body>
      </Modal>
    </div>
  );
};
export default RulesModal;

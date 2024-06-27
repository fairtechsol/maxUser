import Modal from "react-bootstrap/Modal";
import isMobile from "../../../utils/screenDimension";

const RulesModal = ({ show, setShow, rule }: any) => {
  // const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  return (
    <div>
      <Modal show={show} onHide={handleClose} >
        <Modal.Header closeButton style={{backgroundColor:"#004a25",color:"#fff"}}>
          <Modal.Title>Rules</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{padding:"0px", cursor: "pointer"}}>
          <img src={rule} width={"100%"} height={isMobile ? "550" : "750px"} />
        </Modal.Body>
      </Modal>
    </div>
  );
};
export default RulesModal;

import Modal from "react-bootstrap/Modal";

const RulesModal = ({ show, setShow, rule }: any) => {
  // const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  return (
    <div>
      <Modal show={show} onHide={handleClose} >
        <Modal.Header closeButton style={{backgroundColor:"#004a25",color:"#fff"}}>
          <Modal.Title>Rules</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{padding:"0px"}}>
          <img src={rule} width={"100%"} height={"550px"} />
        </Modal.Body>
      </Modal>
    </div>
  );
};
export default RulesModal;

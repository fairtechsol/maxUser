import { Col, Container, Row } from "react-bootstrap";
import CustomButton from "../../../commonComponent/button";
import CustomModal from "../../../commonComponent/modal";
import "./style.scss";

const btnValue = [
  { name: "100", value: 100 },
  { name: "200", value: 200 },
  { name: "300", value: 300 },
  { name: "400", value: 400 },
  { name: "500", value: 500 },
  { name: "600", value: 600 },
  { name: "700", value: 700 },
  { name: "800", value: 800 },
  { name: "900", value: 900 },
  { name: "1000", value: 1000 },
  { name: "1100", value: 1100 },
  { name: "1200", value: 1200 },
];

interface PlaceBetProps {
  show: boolean;
  setShow: any;
}

const PlacedBet = ({ show, setShow }: PlaceBetProps) => {
  return (
    <CustomModal title={"Place Bet"} show={show} setShow={setShow}>
      <Container className="p-1" fluid>
        <Row className="row-cols-md-3 g-2 align-items-center">
          <Col xs={6} className="f800 title-12">
            India
          </Col>
          <Col xs={6} className="d-flex justify-content-end">
            <CustomButton className="bg-secondary py-0">
              <span className="f900 text-black">-</span>
            </CustomButton>
            <input type="text" className="w-50" />
            <CustomButton className="bg-secondary f900 text-black">
              <span className="f900 text-black">+</span>
            </CustomButton>
          </Col>
          <Col xs={4}>
            {" "}
            <input type="text" className="w-100" />
          </Col>

          <Col xs={4} className="f800 title-12">
            <CustomButton className="f900 w-100">Submit</CustomButton>
          </Col>
          <Col xs={4} className="title-12 text-center">
            0
          </Col>
          {btnValue?.map((item, index) => (
            <Col key={index} xs={4}>
              <CustomButton
                className="w-100 border-0 bg-secondary f900 text-black"
                size="sm"
              >
                {item?.name}
              </CustomButton>
            </Col>
          ))}
        </Row>
      </Container>
    </CustomModal>
  );
};

export default PlacedBet;

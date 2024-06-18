import React from "react";
import { Container, Row, Col, Image } from "react-bootstrap";
import { HandleCards } from "../../commonComponent/cardsComponent";
import "./style.scss"
interface Props {
  data: {
    C1: string;
    C2: string;
    C3: string;
    C4: string;
  };
}
const cardData = [
  {
    playerName: 'A',
    mainCard: 'https://versionobj.ecoassetsservice.com/v12/static/front/img/cards/4CC.jpg',
    additionalCards: [
      'https://versionobj.ecoassetsservice.com/v12/static/front/img/cards/8DD.jpg',
      'https://versionobj.ecoassetsservice.com/v12/static/front/img/cards/5HH.jpg',
      'https://versionobj.ecoassetsservice.com/v12/static/front/img/cards/ASS.jpg',
      'https://versionobj.ecoassetsservice.com/v12/static/front/img/cards/3DD.jpg',
      'https://versionobj.ecoassetsservice.com/v12/static/front/img/cards/2SS.jpg',
      'https://versionobj.ecoassetsservice.com/v12/static/front/img/cards/10DD.jpg',
    ],
  },
  {
    playerName: 'B',
    mainCard: 'https://versionobj.ecoassetsservice.com/v12/static/front/img/cards/6DD.jpg',
    additionalCards: [
      'https://versionobj.ecoassetsservice.com/v12/static/front/img/cards/6HH.jpg',
      'https://versionobj.ecoassetsservice.com/v12/static/front/img/cards/QDD.jpg',
      'https://versionobj.ecoassetsservice.com/v12/static/front/img/cards/JSS.jpg',
      'https://versionobj.ecoassetsservice.com/v12/static/front/img/cards/JDD.jpg',
      'https://versionobj.ecoassetsservice.com/v12/static/front/img/cards/6SS.jpg',
    ],
  },
];

const Abj2Result: React.FC<Props> = ({ data }:any) => {
    // console.log(data?.C1, "asd")
  return (  
  //   <div className="casino-video-cards">
  //   {cardData.map((player, index) => (
  //     <Row className="ab-cards-container" key={index}>
  //       <Col xs={12} className="row5 align-items-center">
  //         <Col xs={1}>
  //           <Row className="row5">
  //             <Col xs={12}><b>{player.playerName}</b></Col>
  //           </Row>
  //         </Col>
  //         <Col xs={2}>
  //           <div className="flip-card">
  //             <div className="flip-card-inner">
  //               <div className="flip-card-front">
  //                 <Image src={player.mainCard} fluid />
  //               </div>
  //               <div className="flip-card-back">
  //                 <Image src={player.mainCard} fluid />
  //               </div>
  //             </div>
  //           </div>
  //         </Col>
  //         <Col xs={9}>
  //           <Row className="row5 mb-1">
  //             <Col xs={3}>
  //               <div className="flip-card">
  //                 <div className="flip-card-inner">
  //                   <div className="flip-card-front">
  //                     <Image src={player.additionalCards[0]} fluid />
  //                   </div>
  //                   <div className="flip-card-back">
  //                     <Image src={player.additionalCards[0]} fluid />
  //                   </div>
  //                 </div>
  //               </div>
  //             </Col>
  //             <Col xs={9}>
  //               <div className="slick-slider" dir="ltr">
  //                 <button type="button" className="slick-arrow slick-prev"></button>
  //                 <div className="slick-list">
  //                   <div className="slick-track" style={{ width: player.additionalCards.length * 46, transform: 'translate3d(-46px, 0, 0)' }}>
  //                     {player.additionalCards.slice(1).map((card, cardIndex) => (
  //                       <div key={cardIndex} className="slick-slide" style={{ width: 46 }}>
  //                         <Image src={card} fluid />
  //                       </div>
  //                     ))}
  //                   </div>
  //                 </div>
  //                 <button type="button" className="slick-arrow slick-next">Next</button>
  //               </div>
  //             </Col>
  //           </Row>
  //         </Col>
  //       </Col>
  //     </Row>
  //   ))}
  // </div>
  <Container>
    <div>
        <Row>
          <Col xs={1} style={{color: "white", display: "flex", flexDirection: "row"}}>
            <div>A</div>
            <div>B</div>
          </Col>
          <Col xs={2}>
            <div>
              <div>
                <div><img/></div>
                {/* <div><img/></div> */}
              </div>
              </div>
          </Col>
          <Col xs={9}>
            <Row>
              <Col xs={3}>
                <div>
                  <div>
                    <div><img/></div>
                    <div><img/></div>
                  </div>
                </div>
              </Col>
              <Col xs={9}>
              <div>
                  <div>
                    <div><img/></div>
                    <div><img/></div>
                  </div>
                </div>
              </Col>
            </Row>
            <Row></Row>
          </Col>
        </Row>
      </div>
  </Container>
  );
};

export default Abj2Result;

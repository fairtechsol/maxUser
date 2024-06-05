import { dt20, dt2020, dt6, dtl20 } from "../../assets/images";
import { card3 } from "../../utils/constants";

const CardList3 = () => {
  return (
    <>
      <div className="col-md-12 featured-box">
        <div className="coupon-card">
          <div className="game-heading">
            <span className="card-header-title">Dragon Tiger</span>
          </div>
        </div>
        <div>
          <div className="m-b-30 div-figure">
            <a href="/casino/dt202" className="">
              <img
                src={dt2020}
                className="img-fluid"
              />
            </a>
          </div>
          <div className="m-b-30 div-figure">
            <a href="/casino/dtl20" className="">
              <img
                src={dtl20}
                className="img-fluid"
              />
            </a>
          </div>
          <div className="m-b-30 div-figure">
            <a href="/casino/dt20" className="">
              <img
                src={dt20}
                className="img-fluid"
              />
            </a>
          </div>
          <div className="m-b-30 div-figure">
            <a href="/casino/dt6" className="">
              <img
                src={dt6}
                className="img-fluid"
              />
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default CardList3;

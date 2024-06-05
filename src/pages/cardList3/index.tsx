import { card3 } from "../../utils/constants";
import { useParams } from "react-router-dom";

type Card3Keys = keyof typeof card3;
const CardList3 = () => {
  const { type } = useParams<{ type: string }>();

  if (!type || !(type in card3)) {
    return <div>Invalid game</div>;
  }

  const items = card3[type as Card3Keys];
  return (
    <>
      <div className="col-md-12 featured-box">
        <div className="coupon-card">
          <div className="game-heading">
            <span className="card-header-title">Dragon Tiger</span>
          </div>
        </div>
        <div>
          {items.map((item: any) => (
            <div className="m-b-30 div-figure">
              <a href={item.url} className="">
                <img src={item.imgSrc} className="img-fluid" alt={item.name} />
              </a>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
export default CardList3;
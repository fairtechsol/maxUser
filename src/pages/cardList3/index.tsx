import { NavLink, useParams } from "react-router-dom";
import { card3 } from "../../utils/constants";

type Card3Keys = keyof typeof card3;

const typeToTitle: { [key: string]: string } = {
  dragonTiger: "DRAGON TIGER",
  teenPatti: "TEENPATTI",
  lucky7: "LUCKY7",
  lucky7B: "LUCKY7B",
  cards32: "CARDS32",
  abj: "ANDAR BAHAR",
  poker: "LIVE POKER",
  sportCasino : "SPORT CASINO",
  baccarat: "BACCARAT",
  bollywoodCasino : "BOLLYWOOD CASINO",
  worli:"Worli",
  "3cardj":"3 Cards Judgement",
  cmatch20:"Cricket Match 20-20"
  // Add other mappings as needed
};

const CardList3 = () => {
  const { type } = useParams<{ type: string }>();

  if (!type || !(type in card3)) {
    return <div>Invalid game</div>;
  }

  const items = card3[type as Card3Keys];
  const title = typeToTitle[type] || "Unknown Game";

  return (
    <>
      <div className="col-md-12 featured-box">
        <div className="coupon-card">
          <div className="game-heading">
            <span className="card-header-title">{title}</span>
          </div>
        </div>
        <div>
          {items.map((item: any) => (
            <div key={item?.id} className="m-b-30 div-figure mt-3">
              <NavLink to={item.url} className="">
                <img
                  src={item.imgSrc}
                  className="img-fluid"
                  alt={item.name}
                  loading="lazy"
                  style={{ width: '500px', height: '200px' }}
                />
              </NavLink>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default CardList3;

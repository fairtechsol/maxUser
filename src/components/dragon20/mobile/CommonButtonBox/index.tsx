import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../../store/store";
import { ImClubs  } from "react-icons/im";
import { GiSpades } from "react-icons/gi";
import { BiSolidHeart } from "react-icons/bi";
import { ImDiamonds } from "react-icons/im";
const CommonButtonBox = ({ value1,value2,value3,width,handleBet,lock,data }: any) => {
  const dispatch: AppDispatch = useDispatch();

  return (
    <div className="commonButtonBoxContainer" style={{ width: width }}>
      <div>
        <span style={{ fontSize: "12px", fontWeight: "bolder" }}>
        {(parseFloat(isNaN(value1)?0:value1).toFixed(2))}
        </span>
      </div>
      <div className={`tiePairbtnMob-theme ${lock?'suspended':''}`} onClick={()=>!lock ? handleBet(data):null}>
        <span style={{ fontSize: "14px" }}>
          {value2 === "icon1" ? (
            <>
              <ImDiamonds color="#ff0000" />
              <BiSolidHeart color="#ff0000"/>
            </>
          ) : value2 === "icon2" ? (
            <>
              <ImClubs  color="#000000"/>
              <GiSpades  color="#000000"/>
            </>
          ) : (
            value2
          )}
        </span>
      </div>
      <div>
        <span style={{ fontSize: "12px" }}>{isNaN(value3)?0:value3}</span>
      </div>
    </div>
  );
};

export default CommonButtonBox;

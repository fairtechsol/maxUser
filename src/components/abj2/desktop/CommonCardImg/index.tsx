import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../../store/store";
import { dragonTigerCards } from "../../../../utils/constants";
import { useState } from "react";

const CommonCardImg = () => {
  const [cardData, setCardData] = useState(dragonTigerCards)
  const dispatch: AppDispatch = useDispatch();

  return (
    <div className="commonCardImgContainer">
      {cardData?.map((item:any,index:any)=>{
        return(<>
         <div style={{display:"flex",flexDirection:"column",justifyContent:"space-around",alignItems:"center"}}>
        <img src={item?.imgSrc} width={"45px"}/>
        <span style={{fontSize:"12px"}}>{item?.value}</span>
      </div></>)
      })}
    </div>
  );
};

export default CommonCardImg;

import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../../store/store";

const CommonButtonBox = ({ value1,value2,value3,width }: any) => {
  const dispatch: AppDispatch = useDispatch();

  return (
    <div className="commonButtonBoxContainer" style={{width:width}}>
      <div>
        <span style={{fontSize:"16px",fontWeight:"bolder"}}>{(parseFloat(value1).toFixed(2))}</span>
      </div>
      <div className="tiePairbtn-theme">
      <span>{value2}</span>
      </div>
      <div>
      <span style={{fontSize:"16px"}}>{value3}</span>
      </div>
    </div>
  );
};

export default CommonButtonBox;

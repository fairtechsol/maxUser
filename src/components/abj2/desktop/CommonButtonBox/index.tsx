
const CommonButtonBox = ({ name,value1,background,text }: any) => {

  return (
    <div className="commonButtonBoxContainerSbox" style={{width:"100%",backgroundColor:background}}>
      <div>
        <span style={{fontSize:"14px",fontWeight:"bolder",color:text}}>{name}</span>
      </div>
      <div>
      <span style={{fontSize:"14px",color:text}}>{value1}</span>
      </div>
    </div>
  );
};

export default CommonButtonBox;

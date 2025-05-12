import "../../commonStyle.scss";
const CommonButtonBox = ({ name, value1, background, text, lock, data, handleBet }: any) => {

  return (
    <div className={`commonButtonBoxContainerSbox-m ${lock ? 'suspended' : ""}`} style={{ width: "100%", backgroundColor: background }} onClick={() => !lock ? handleBet(data) : null}>
      <div className={``}>
        <span style={{ fontSize: "14px", fontWeight: "bolder", color: text }}>{name}</span>
      </div>
      <div>
        <span style={{ fontSize: "14px", color: text }}>{value1}</span>
      </div>
    </div>
  );
};

export default CommonButtonBox;

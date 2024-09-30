import "../style.scss";

const Abr = () => {
  return (
    <div className="worlibox abr">
      <div className="worli-box-title">
        <b>140</b>
      </div>
      <div className="worli-left">
        <div className="worli-box-row">
          <div className="worli-odd-box back">
            <span className="worli-odd">A</span>
          </div>
          <div className="worli-odd-box back">
            <span className="worli-odd">B</span>
          </div>
          <div className="worli-odd-box back">
            <span className="worli-odd">R</span>
          </div>
        </div>
        <div className="worli-box-row">
          <div className="worli-odd-box back">
            <span className="worli-odd">AB</span>
          </div>
          <div className="worli-odd-box back">
            <span className="worli-odd">AR</span>
          </div>
          <div className="worli-odd-box back">
            <span className="worli-odd">BR</span>
          </div>
        </div>
      </div>
      <div className="worli-right">
        <div className="worli-box-row">
          <div className="worli-odd-box back">
            <span className="worli-odd">ABR</span>
          </div>
        </div>
        <div className="worli-box-row">
          <div className="worli-odd-box back">
            <span className="worli-odd">ABR CUT</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Abr;

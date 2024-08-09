import { Dropdown } from "react-bootstrap";

const SmoothDropdownModal = ({ show, min, max }: any) => {
  return (
    <Dropdown align="end" show={show}>
      <div style={{ width: "10%" }}>
        <Dropdown.Menu style={{ minWidth: "auto" }}>
          <Dropdown.ItemText>
            <span style={{ display: "flex", flexDirection: "column" }}>
              <span className="f700 title-12">Min:</span>
              <span className="f400 title-12">{min}</span>
              <span className="f700 title-12">Max:</span>
              <span className="f400 title-12">{max}</span>
            </span>
          </Dropdown.ItemText>
        </Dropdown.Menu>
      </div>
    </Dropdown>
  );
};

export default SmoothDropdownModal;

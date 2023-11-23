import { Accordion } from "react-bootstrap";
import { MenuItem } from "./menuItem";
import menuItemJson from "./menuItem.json";
import "./style.scss";
const Sidebar = () => {
  return (
    <>
      <div className="sidebarBox bg-light">
        {menuItemJson?.map((item, index) => (
          <Accordion
            className={item?.backgroundColor ? "bg-light-sidebar" : ""}
            key={index}
            defaultActiveKey={[]}
          >
            <MenuItem item={item} />
          </Accordion>
        ))}
      </div>
    </>
  );
};
export default Sidebar;

import { useEffect, useState } from "react";
import { Accordion } from "react-bootstrap";
import { MenuItem } from "./menuItem";
import menuItemJson from "./menuItem.json";
import "./style.scss";
const Sidebar = () => {
  const [menuItemList, setMenuItemList] = useState<any>([]);
  useEffect(() => {
    setMenuItemList(menuItemJson);
  }, [menuItemJson]);

  return (
    <>
      <div className="sidebarBox side-W bg-light">
        {menuItemList?.map((item: any, index: number) => (
          <Accordion
            className={item?.backgroundColor ? "bg-light-sidebar" : ""}
            key={index}
            defaultActiveKey={["0"]}
          >
            <MenuItem
              item={item}
              menuItemList={menuItemList}
              setMenuItemList={setMenuItemList}
            />
          </Accordion>
        ))}
      </div>
    </>
  );
};
export default Sidebar;

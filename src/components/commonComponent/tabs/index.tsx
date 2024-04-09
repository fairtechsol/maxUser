import { useEffect, useState } from "react";
import { Tabs } from "react-bootstrap";
import "./style.scss";
import {useNavigate} from 'react-router-dom';
import SportsFilterJson from "../../home/sportsFilters/sportsFilters.json";
const CommonTabs = ({
  children,
  defaultActive,
  customClass,
  callback,
  selectedTab,
  ...props
}: any) => {
  const [key, setKey] = useState(defaultActive ?? "cricket");
  const navigate = useNavigate();
  useEffect(() => {
    if (props?.id) {
      if (callback) {
        callback(props?.id);
      }
      setKey(props?.id);
    }
  }, [props?.id]);

  return (
    <Tabs
      activeKey={key}
      onSelect={(k: any) => {
        if (callback) {
            callback(k);
          }
          setKey(k);
          const sportsFilterArray = SportsFilterJson();
          const sportsFilterIds = sportsFilterArray.map((item: any) => item.id);
          if (sportsFilterIds.includes(k)) {
          navigate(`/${k}`);
        }
        // if (k) {
        //   navigate(`/${k}`);
        // }
        
      }}
      id="uncontrolled-tab-example"
      className={`w-100 ${customClass}`}
      {...props}
    >
      {children}
    </Tabs>
  );
};

export default CommonTabs;

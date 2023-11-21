import React from "react";
import { Breadcrumb } from "react-bootstrap";
import "./style.scss";
interface ItemObj {
  name: string;
}

interface Props {
  items: Array<ItemObj>;
  style?: React.CSSProperties;
}

function CustomBreadcrumb({ items, style }: Props) {
  const inlineStyle: React.CSSProperties = {
    ...style,
  };
  return (
    <div className="customBreadcrumb bg-secondary" style={{ ...inlineStyle }}>
      <Breadcrumb bsPrefix="breadcrumb m-0">
        {items?.map((item, index) => (
          <Breadcrumb.Item
            key={index}
            linkAs="span"
            className="title-16 f600 p-0"
          >
            {item?.name}
          </Breadcrumb.Item>
        ))}
      </Breadcrumb>
    </div>
  );
}

export default CustomBreadcrumb;

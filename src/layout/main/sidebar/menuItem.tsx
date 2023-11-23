import React from "react";
import { Accordion } from "react-bootstrap";
import { Link } from "react-router-dom";

interface Props {
  item: any;
}
export const MenuItem: React.FC<Props> = ({ item }) => {
  const MenuItemChild = (props: any) => {
    const { data } = props;
    return (
      <div>
        {data?.type === "liveItem" ? (
          <div className="sidebar-menu-items px-3">
            <Link
              className={`title-14 text-decoration-none text-black ${
                data?.blink ? "blinking-text" : ""
              }`}
              to={`${data.path}`}
            >
              {data?.name}
            </Link>
          </div>
        ) : (
          <div className="nested-menu-item">
            <Link
              className="title-14 text-decoration-none text-black"
              to={`${data.path}`}
            >
              {data?.name}
            </Link>
          </div>
        )}
      </div>
    );
  };

  const MenuCollapse = (props: any) => {
    const { data } = props;
    return (
      <>
        {data?.type === "item" || data?.type === "liveItem" ? (
          <MenuItemChild data={data} />
        ) : (
          <Accordion.Item className="accordion-item-collapse" eventKey="0">
            <Accordion.Header className="accordion-header-collapse">
              {data?.name}
            </Accordion.Header>
            <Accordion.Body className="py-0">
              {data?.children?.map((sideBarChild: any, index: number) => {
                return (
                  <Accordion key={index} defaultActiveKey={[]}>
                    <MenuCollapse data={sideBarChild} />
                  </Accordion>
                );
              })}
            </Accordion.Body>
          </Accordion.Item>
        )}
      </>
    );
  };
  const MenuGroup = (props: any) => {
    const { data } = props;
    return (
      <>
        {data?.type === "item" || data?.type === "liveItem" ? (
          <MenuItemChild data={data} />
        ) : (
          <Accordion.Item className={"accordion-item-group"} eventKey="0">
            <Accordion.Header className={"accordion-header-group"}>
              {data?.name}
            </Accordion.Header>
            <Accordion.Body className="p-0">
              {data?.children?.map((sideBarChild: any, index: number) => {
                return (
                  <Accordion key={index} defaultActiveKey={[]}>
                    {sideBarChild?.type === "group" ? (
                      <MenuGroup data={sideBarChild} />
                    ) : (
                      <MenuCollapse data={sideBarChild} />
                    )}
                  </Accordion>
                );
              })}
            </Accordion.Body>
          </Accordion.Item>
        )}
      </>
    );
  };

  return (
    <>
      {item?.type === "item" ? (
        <MenuItemChild data={item} />
      ) : item?.type === "group" ? (
        <MenuGroup data={item} />
      ) : (
        <MenuCollapse data={item} />
      )}
    </>
  );
};

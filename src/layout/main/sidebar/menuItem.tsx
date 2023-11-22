import React from "react";
import { Accordion } from "react-bootstrap";
import { Link } from "react-router-dom";

interface Props {
  item: any;
}
export const MenuItem: React.FC<Props> = ({ item }) => {
  const MenuItemChild = (props: any) => {
    const { data } = props;
    return <Link to={`${data.path}`}>{data?.name}</Link>;
  };

  const MenuCollapse = (props: any) => {
    const { data } = props;
    return (
      <>
        {data?.type === "item" ? (
          <MenuItemChild data={data} />
        ) : (
          <Accordion.Item eventKey="0">
            <Accordion.Header>{data?.name}</Accordion.Header>
            <Accordion.Body>
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
        {data?.type === "item" ? (
          <MenuItemChild data={data} />
        ) : (
          <Accordion.Item
            className={
              data?.type === "group"
                ? "accordion-item-group"
                : "accordion-item-collapse"
            }
            eventKey="0"
          >
            <Accordion.Header
              className={
                data?.type === "group"
                  ? "accordion-header-group"
                  : "accordion-header-collapse"
              }
            >
              {data?.name}
            </Accordion.Header>
            <Accordion.Body>
              {data?.children?.map((sideBarChild: any, index: number) => {
                return (
                  <Accordion key={index} defaultActiveKey={[]}>
                    {item?.type === "group" ? (
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

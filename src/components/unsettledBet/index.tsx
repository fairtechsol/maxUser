import { Col, Form, Row, Stack } from "react-bootstrap";
import isMobile from "../../utils/screenDimension";
import CustomTable from "../commonComponent/table";
import ReportContainer from "../containers/reportContainer";

const UnsettledBetComponent = () => {
  return (
    <ReportContainer title="Un-Setteled Bet">
      <div>
        <Stack gap={2}>
          <Row className="g-2 mt-1">
            <Col md={1} xs={4}>
              <Form.Check
                label="Matched"
                name="matched"
                type="radio"
                id={"matched"}
              />
            </Col>
            <Col md={1} xs={4}>
              <Form.Check
                label="Un-Matched"
                name="matched"
                type="radio"
                id={"unMatched"}
              />
            </Col>
            <Col md={1} xs={4}>
              <Form.Check
                label="Deleted"
                name="matched"
                type="radio"
                id={"deleted"}
              />
            </Col>
          </Row>
          <CustomTable
            bordered={true}
            striped={!isMobile}
            isPagination={true}
            isSearch={true}
            columns={[
              {
                id: "no",
                label: "No",
              },
              {
                id: "event_name",
                label: "Event Name",
              },
              {
                id: "nation",
                label: "Nation",
              },
              {
                id: "event_type",
                label: "Event Type",
              },
              {
                id: "market_name",
                label: "Market Name",
              },
              {
                id: "side",
                label: "Side",
              },
              {
                id: "rate",
                label: "Rate",
              },
              {
                id: "amount",
                label: "Amount",
              },
              {
                id: "place_date",
                label: "Place Date",
              },
              {
                id: "match_date",
                label: "Match Date",
              },
            ]}
            itemCount={10}
            setTableConfig={() => {}}
          >
            <tr className={`${isMobile && "title-12"}`}>
              <td>123456</td>
              <td>123456</td>
              <td>123456</td>
              <td>123456</td>
              <td>123456</td>
              <td>123456</td>
              <td>123456</td>
              <td>123456</td>
              <td>123456</td>
              <td>123459999999996</td>
            </tr>
          </CustomTable>
        </Stack>
      </div>
    </ReportContainer>
  );
};

export default UnsettledBetComponent;

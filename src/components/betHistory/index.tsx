import { Col, Row, Stack } from "react-bootstrap";
import isMobile from "../../utils/screenDimension";
import SelectSearch from "../commonComponent/SelectSearch";
import CustomButton from "../commonComponent/button";
import CustomInput from "../commonComponent/input";
import CustomTable from "../commonComponent/table";
import ReportContainer from "../containers/reportContainer";

const BetHistoryComponent = () => {
  return (
    <ReportContainer title="Bet History">
      <div>
        <Stack gap={2}>
          <Row className="g-2 mt-1">
            <Col md={2} xs={6}>
              <SelectSearch
                options={[
                  {
                    value: "football",
                    label: "Football",
                  },
                  {
                    value: "tennis",
                    label: "Tennis",
                  },
                  {
                    value: "cricket",
                    label: "Cricket",
                  },
                ]}
                placeholder="Support Type"
                defaultValue="football"
              />
            </Col>
            <Col md={2} xs={6}>
              <SelectSearch
                options={[
                  {
                    value: "matched",
                    label: "Matched",
                  },
                  {
                    value: "deleted",
                    label: "Deleted",
                  },
                ]}
                placeholder="Bet Status"
                defaultValue="matched"
              />
            </Col>
            <Col md={2} xs={6}>
              <CustomInput type="date" />
            </Col>
            <Col md={2} xs={6}>
              <CustomInput type="date" />
            </Col>

            <Col md={2} xs={12}>
              <CustomButton
                size={isMobile ? "sm" : "lg"}
                className={`${
                  isMobile ? "w-100" : " bg-primaryBlue"
                } border-0 `}
              >
                Submit
              </CustomButton>
            </Col>
          </Row>
          <CustomTable
            bordered={true}
            striped={!isMobile}
            isPagination={true}
            isSearch={true}
            columns={[
              {
                id: "event_name",
                label: "Event Name",
              },
              {
                id: "nation",
                label: "Nation",
              },
              {
                id: "bet_type",
                label: "Bet Type",
              },
              {
                id: "user_rate",
                label: "User Rate",
              },
              {
                id: "amount",
                label: "Amount",
              },
              {
                id: "profit_loss",
                label: "Profit/Loss",
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
              <td>123459999999996</td>
            </tr>
          </CustomTable>
        </Stack>
      </div>
    </ReportContainer>
  );
};

export default BetHistoryComponent;

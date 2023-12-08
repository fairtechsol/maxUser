import { Col, Row, Stack } from "react-bootstrap";
import isMobile from "../../utils/screenDimension";
import CustomButton from "../commonComponent/button";
import CustomInput from "../commonComponent/input";
import CustomTable from "../commonComponent/table";
import ReportContainer from "../containers/reportContainer";

const ProfitLossComponent = () => {
  return (
    <ReportContainer title="Profit Loss">
      <div>
        <Stack gap={2}>
          <Row className="g-2 mt-1">
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
                id: "eventType",
                label: "Event Type",
              },
              {
                id: "eventName",
                label: "Event Name",
              },
              {
                id: "amount",
                label: "Amount",
              },
            ]}
            itemCount={10}
            setTableConfig={() => {}}
          >
            <tr className={`${isMobile && "title-12"}`}>
              <td>123456</td>
              <td>123456</td>
              <td>123456</td>
            </tr>
          </CustomTable>
        </Stack>
      </div>
    </ReportContainer>
  );
};

export default ProfitLossComponent;

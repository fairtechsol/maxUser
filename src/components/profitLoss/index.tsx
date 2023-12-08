import { useState } from "react";
import { Col, Row, Stack } from "react-bootstrap";
import "react-calendar/dist/Calendar.css";
import DatePicker from "react-date-picker";
import "react-date-picker/dist/DatePicker.css";
import isMobile from "../../utils/screenDimension";
import CustomButton from "../commonComponent/button";
import CustomTable from "../commonComponent/table";
import ReportContainer from "../containers/reportContainer";

const ProfitLossComponent = () => {
  const [value, onChange] = useState<any>(new Date());
  return (
    <ReportContainer title="Profit Loss">
      <div>
        <Stack gap={2}>
          <Row className="g-2 mt-1">
            <Col md={2} xs={6}>
              <DatePicker
                onChange={onChange}
                value={value}
                closeCalendar={false}
                clearIcon={false}
                className="w-100"
              />
              {/* <CustomInput type="date" /> */}
            </Col>
            <Col md={2} xs={6}>
              <DatePicker
                onChange={onChange}
                value={value}
                closeCalendar={false}
                clearIcon={false}
                className="w-100"
              />
              {/* <CustomInput type="date" /> */}
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
            // isPagination={true}
            // isSearch={true}
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

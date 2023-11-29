import { Col, Row, Stack } from "react-bootstrap";
import isMobile from "../../utils/screenDimension";
import SelectSearch from "../commonComponent/SelectSearch";
import CustomButton from "../commonComponent/button";
import CustomInput from "../commonComponent/input";
import CustomTable from "../commonComponent/table";
import ReportContainer from "../containers/reportContainer";

const AccountStatementComponent = () => {
  return (
    <ReportContainer title="Account Statement">
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
              <SelectSearch
                options={[
                  {
                    value: "all",
                    label: "All",
                  },
                  {
                    value: "deposit/withdrawReport",
                    label: "Deposit/Withdraw Report",
                  },
                  {
                    value: "gameReport",
                    label: "Game Report",
                  },
                ]}
                placeholder=""
                defaultValue="all"
              />
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
                id: "date",
                label: "Date",
              },
              {
                id: "srNo",
                label: "Sr No",
              },
              {
                id: "credit",
                label: "Credit",
              },
              {
                id: "debit",
                label: "Debit",
              },
              {
                id: "balance",
                label: "Balance",
              },
              {
                id: "remark",
                label: "Remark",
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
              <td>123459999999996</td>
            </tr>
          </CustomTable>
        </Stack>
      </div>
    </ReportContainer>
  );
};

export default AccountStatementComponent;

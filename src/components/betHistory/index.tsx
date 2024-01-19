import { useEffect, useState } from "react";
import { Col, Row, Stack } from "react-bootstrap";
import "react-calendar/dist/Calendar.css";
import DatePicker from "react-date-picker";
import "react-date-picker/dist/DatePicker.css";
import isMobile from "../../utils/screenDimension";
import SelectSearch from "../commonComponent/SelectSearch";
import CustomButton from "../commonComponent/button";
import CustomTable from "../commonComponent/table";
import ReportContainer from "../containers/reportContainer";
import { useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import { TableConfig } from "../../models/tableInterface";
import { useSelector } from "react-redux";
import { betReportList } from "../../store/actions/match/matchListAction";
import moment from "moment";

const BetHistoryComponent = () => {
  const [fromDate, setFromDate] = useState<any>();
  const [toDate, setToDate] = useState<any>();

  const optionsMatch = [
    { value: "MATCHED", label: "Cricket" },
    { value: "UNMATCHED", label: "Football" },
    { value: "DELETED", label: "Deleted" },
  ];
  const optionsType = [
    { value: "MATCHED", label: "Matched" },
    { value: "UNMATCHED", label: "UnMatched" },
    { value: "DELETED", label: "Deleted" },
  ];
  const dispatch: AppDispatch = useDispatch();
  const [tableConfig, setTableConfig] = useState<TableConfig | null>(null);
  const [selectType, setSelectType] = useState({
    value: "MATCHED",
    label: "Matched",
  });
  const [selectMatch, setSelectMatch] = useState({
    value: "MATCHED",
    label: "Matched",
  });

  useEffect(() => {
    dispatch(
      betReportList({
        status: selectType?.value,
        // matchType: selectType?.value
      })
    );
  }, [tableConfig]);

  const handleMatch = (type: any) => {
    setSelectMatch(type);
  };
  const handleType = (type: any) => {
    setSelectType(type);
  };

  const handleLoad = (e: any) => {
    e.preventDefault();
    let filter = "";
    if (fromDate && toDate) {
      filter += `&createdAt=between${moment(new Date(fromDate))?.format(
        "DD/MM/YYYY"
      )}|${moment(new Date(toDate).setDate(toDate.getDate() + 1))?.format(
        "DD/MM/YYYY"
      )}`;
    } else if (fromDate) {
      filter += `&createdAt=gte${moment(fromDate)?.format("MM/DD/YYYY")}`;
    } else if (toDate) {
      filter += `&createdAt=lte${moment(toDate)?.format("MM/DD/YYYY")}`;
    }
    dispatch(
      betReportList({
        status: selectType?.value,
        // matchType: selectMatch?.value,
        filter: filter,
      })
    );
  };

  const { ReportBetList } = useSelector(
    (state: RootState) => state.currentBetList.ReportBetList
  );
  return (
    <ReportContainer title="Bet History">
      <div>
        <Stack gap={2} className="vh-100">
          <Row className="g-2 mt-1">
            <Col md={2} xs={6}>
              <SelectSearch
                options={optionsMatch}
                placeholder="Sport Type"
                defaultValue={[selectMatch]}
                onChange={handleMatch}
              />
            </Col>
            <Col md={2} xs={6}>
              <SelectSearch
                options={optionsType}
                placeholder="Bet Status"
                defaultValue={[selectType]}
                onChange={handleType}
              />
            </Col>
            <Col md={2} xs={6}>
              <DatePicker
                onChange={setFromDate}
                value={fromDate}
                closeCalendar={false}
                clearIcon={false}
                className="w-100"
              />
              {/* <CustomInput type="date" /> */}
            </Col>
            <Col md={2} xs={6}>
              <DatePicker
                onChange={setToDate}
                value={toDate}
                closeCalendar={false}
                clearIcon={false}
                className="w-100"
              />
              {/* <CustomInput type="date" /> */}
            </Col>

            <Col md={2} xs={12}>
              <CustomButton
                onClick={(e: any) => handleLoad(e)}
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
            setTableConfig={setTableConfig}
            itemCount={
              ReportBetList && ReportBetList?.count > 0
                ? ReportBetList?.count
                : 0
            }
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
            // itemCount={10}
            // setTableConfig={() => {}}
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

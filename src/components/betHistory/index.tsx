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
import {
  betReportList,
  resetDataUnsettledMatch,
} from "../../store/actions/match/matchListAction";
import moment from "moment";

const BetHistoryComponent = () => {
  const minDate = new Date();
  minDate.setMonth(minDate.getMonth() - 1);
  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
  const [fromDate, setFromDate] = useState<any>(sevenDaysAgo);
  const [toDate, setToDate] = useState<any>(new Date());
  const { ReportBetList } = useSelector(
    (state: RootState) => state.currentBetList
  );
  const [minDate2, setminDate2] = useState<any>(minDate);

  const optionsMatch = [
    { value: "cricket", label: "Cricket" },
    { value: "football", label: "Football" },
    { value: "tennis", label: "Tennis" },
  ];
  const optionsType = [
    { value: "MATCHED", label: "Matched" },
    // { value: "UNMATCHED", label: "UnMatched" },
    { value: "DELETED", label: "Deleted" },
  ];
  const dispatch: AppDispatch = useDispatch();
  const [tableConfig, setTableConfig] = useState<TableConfig | any>(null);
  const [selectType, setSelectType] = useState({
    value: "MATCHED",
    label: "Matched",
  });
  const [selectMatch, setSelectMatch] = useState({
    value: "cricket",
    label: "Cricket",
  });

  useEffect(() => {
    dispatch(
      betReportList({
        status: selectType?.value,
        matchType: selectMatch?.value,
        page: tableConfig?.page,
        limit: tableConfig?.rowPerPage,
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
        "YYYY-MM-DD"
      )}|${moment(new Date(toDate).setDate(toDate.getDate() + 1))?.format(
        "YYYY-MM-DD"
      )}`;
    } else if (fromDate) {
      filter += `&createdAt=gte${moment(fromDate)?.format("YYYY-MM-DD")}`;
    } else if (toDate) {
      filter += `&createdAt=lte${moment(toDate)?.format("YYYY-MM-DD")}`;
    }
    if (selectType?.value === "UNMATCHED") {
      dispatch(resetDataUnsettledMatch());
    } else {
      dispatch(
        betReportList({
          status: selectType?.value,
          matchType: selectMatch?.value,
          filter: filter,
          page: 1,
          limit: tableConfig.rowPerPage,
        })
      );
    }
  };
  useEffect(() => {
    const date = Math.floor(new Date().getTime() / 1000);
    const timestamp = Math.floor(new Date(fromDate).getTime() / 1000);
    if (timestamp !== date) {
      setminDate2(fromDate);
    }
  }, [fromDate]);
  return (
    <ReportContainer title="Bet History">
      <div>
        <Stack gap={2} className="h-100">
          <Row className="g-2 mt-1 align-items-center">
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
                closeCalendar={true}
                clearIcon={false}
                className="w-100"
                format="yyyy-MM-dd"
                minDate={minDate}
                maxDate={new Date()}
              />
              {/* <CustomInput type="date" /> */}
            </Col>
            <Col md={2} xs={6}>
              <DatePicker
                onChange={setToDate}
                value={toDate}
                closeCalendar={true}
                clearIcon={false}
                className="w-100"
                format="yyyy-MM-dd"
                minDate={minDate2}
                maxDate={new Date()}
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
                style={{ height: "35px" }}
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
            {ReportBetList &&
              ReportBetList?.count > 0 &&
              ReportBetList?.rows?.map((item: any) => {
                return (
                  <tr key={item?.id} className={`${isMobile && "title-12"}`}>
                    <td
                      className={` ${
                        item?.betType === "NO" || item?.betType === "LAY"
                          ? "bg-red1"
                          : "bg-blue3"
                      }`}
                    >
                      {item?.eventType}
                    </td>
                    <td
                      className={` ${
                        item?.betType === "NO" || item?.betType === "LAY"
                          ? "bg-red1"
                          : "bg-blue3"
                      }`}
                    >
                      {item?.teamName}
                    </td>
                    <td
                      className={` ${
                        item?.betType === "NO" || item?.betType === "LAY"
                          ? "bg-red1"
                          : "bg-blue3"
                      }`}
                    >
                      {item?.betType}
                    </td>
                    <td
                      className={` ${
                        item?.betType === "NO" || item?.betType === "LAY"
                          ? "bg-red1"
                          : "bg-blue3"
                      }`}
                    >
                      {item?.odds}
                    </td>
                    <td
                      className={` ${
                        item?.betType === "NO" || item?.betType === "LAY"
                          ? "bg-red1"
                          : "bg-blue3"
                      }`}
                    >
                      {item?.amount}
                    </td>
                    <td
                      className={` ${
                        item?.betType === "NO" || item?.betType === "LAY"
                          ? "bg-red1"
                          : "bg-blue3"
                      }`}
                    >
                      {/* {item?.winAmount} */}
                      {item.result === "LOSS" ? (
                        <span className="color-green">-{item.lossAmount}</span>
                      ) : (
                        <span className="color-red">{item.winAmount}</span>
                      )}
                    </td>
                    <td
                      className={` ${
                        item?.betType === "NO" || item?.betType === "LAY"
                          ? "bg-red1"
                          : "bg-blue3"
                      }`}
                    >
                      {moment(item?.createdAt).format("DD-MM-YYYY h:mm:ss A")}
                    </td>
                    <td
                      className={` ${
                        item?.betType === "NO" || item?.betType === "LAY"
                          ? "bg-red1"
                          : "bg-blue3"
                      }`}
                    >
                      {moment(item?.match?.startAt).format(
                        "DD-MM-YYYY h:mm:ss A"
                      )}
                    </td>
                  </tr>
                );
              })}
          </CustomTable>
        </Stack>
      </div>
    </ReportContainer>
  );
};

export default BetHistoryComponent;

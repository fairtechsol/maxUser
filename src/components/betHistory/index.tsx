import moment from "moment";
import { useEffect, useState } from "react";
import { Col, Row, Stack } from "react-bootstrap";
import "react-calendar/dist/Calendar.css";
import DatePicker from "react-date-picker";
import "react-date-picker/dist/DatePicker.css";
import { useDispatch, useSelector } from "react-redux";
import { TableConfig } from "../../models/tableInterface";
import {
  betReportList,
  resetDataUnsettledMatch,
} from "../../store/actions/match/matchListAction";
import { AppDispatch, RootState } from "../../store/store";
import { isMobile } from "../../utils/screenDimension";
import SelectSearch from "../commonComponent/SelectSearch";
import CustomButton from "../commonComponent/button";
import CustomTable from "../commonComponent/table";
import ReportContainer from "../containers/reportContainer";

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
                clearIcon={null}
                className="w-100"
                format="yyyy-MM-dd"
                minDate={minDate}
                maxDate={new Date()}
              />
            </Col>
            <Col md={2} xs={6}>
              <DatePicker
                onChange={setToDate}
                value={toDate}
                closeCalendar={true}
                clearIcon={null}
                className="w-100"
                format="yyyy-MM-dd"
                minDate={minDate2}
                maxDate={new Date()}
              />
            </Col>

            <Col md={2} xs={12}>
              <CustomButton
                onClick={(e: any) => handleLoad(e)}
                size={isMobile ? "sm" : "lg"}
                className={`${
                  isMobile ? "w-100" : " bg-primary"
                } border-0 `}
                style={{ height: "35px" }}
              >
                Submit
              </CustomButton>
            </Col>
          </Row>
          {!isMobile && <CustomTable
            paginationCount={true}
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
                id: "sports",
                label: "Sports",
              },
              {
                id: "event_name",
                label: "Event Name",
              },
              {
                id: "market_name",
                label: "Market Name",
              },
              {
                id: "nation",
                label: "Nation",
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
                id: "place_date",
                label: "Place Date",
              },
            ]}
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
                      {item?.match?.title}
                    </td>
                    <td
                      className={` ${
                        item?.betType === "NO" || item?.betType === "LAY"
                          ? "bg-red1"
                          : "bg-blue3"
                      }`}
                    >
                      {item?.marketType}
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
                      {moment(item?.createdAt).format("DD-MM-YYYY h:mm:ss A")}
                    </td>
                  </tr>
                );
              })}
          </CustomTable>}
        </Stack>
      </div>
      {isMobile && <CustomTable
        bordered={true}
        striped={!isMobile}
        isPagination={true}
        paginationCount={false}
        isSearch={false}
        setTableConfig={setTableConfig}
        itemCount={
          ReportBetList && ReportBetList?.count > 0
            ? ReportBetList?.count
            : 0
        }
        columns={[]}
      >
        <Row className="row row5 mt-2">
          <Col className="col-12" colspan={12}>
            {ReportBetList?.count > 0 &&
              ReportBetList?.rows?.map((item: any, index: number) => {
                return (
                  <div className={`unsetteled-bet ${item.betType === "NO" || item.betType === "LAY"
                    ? "bg-red1"
                    : "bg-blue4"}`} key={index}>
                    <div className="row row5">
                      <div className="col-6 coloumn-6">
                        <div>
                          <a>
                            <span  className="f500" style={{color:'#2881bb'}}>{item.eventName}</span>
                          </a>
                        </div>
                        <div>
                          <span className="f600">Nation: </span> {item?.teamName}
                        </div>
                        <div>
                          <span className="f600">Place Date: </span> {moment(item?.createdAt).format(
                            "MM/DD/YYYY hh:mm:ss A")}
                        </div>
                        <div>
                          <span className="f600">Matched Date: </span> {moment(item?.match?.startAt)
                            .format(
                              "MM/DD/YYYY hh:mm:ss A")}
                        </div>
                      </div>
                      <Col className="col-2 reportBody" colspan={6}>
                        <div>
                          <span className="f600">User Rate</span>
                        </div>
                        <div>{item.odds}</div>
                      </Col>
                      <div className="col-2 text-right reportBody">
                        <div>
                          <span className="f600">Amount</span>
                        </div>
                        <div>{item.amount}</div>
                      </div>
                      <div className="col-2 text-right reportBody">
                        <div>
                          <span className="f600">P&L</span>
                        </div>
                        <div> {item.result === "LOSS" ? (
                          <span className="color-red">-{item.lossAmount}</span>
                        ) : (
                          <span className="color-green">{item.winAmount}</span>
                        )}</div>
                      </div>
                    </div>
                  </div>
                )
              })}
          </Col>
        </Row>
      </CustomTable>}
    </ReportContainer>
  );
};

export default BetHistoryComponent;

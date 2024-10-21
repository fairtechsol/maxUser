import { useState, useEffect } from "react";
import { Col, Row, Stack } from "react-bootstrap";
import "react-calendar/dist/Calendar.css";
import DatePicker from "react-date-picker";
import "react-date-picker/dist/DatePicker.css";
import {isMobile} from "../../utils/screenDimension";
import CustomButton from "../commonComponent/button";
import CustomTable from "../commonComponent/table";
import ReportContainer from "../containers/reportContainer";
import { useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import { getProfitLossReport } from "../../store/actions/match/matchListAction";
import { useSelector } from "react-redux";
import moment from "moment";

const typeToTitle: { [key: string]: string } = {
  dt20: "20-20 DRAGON TIGER",
  teen20: "20-20 TEENPATTI",
  card32: "32 CARDS - A",
  lucky7: "LUCKY 7 - A",
  abj: "ANDAR BAHAR 2",
  dt202: "20-20 DRAGON TIGER 2",
  dtl20: "20-20 D T L",
  dt6: "1 DAY DRAGON TIGER",
  lucky7eu: "LUCKY 7 - B",
  teen: "TEENPATTI 1-DAY",
  teen9: "TEENPATTI TEST",
  teen8: "TEENPATTI OPEN",
  poker: "POKER 1-DAY",
  poker20: "20-20 POKER",
  poker6: "POKER 6 PLAYERS",
  baccarat: "BACCARAT",
  baccarat2: "BACCARAT 2",
  card32eu: "32 CARDS - B",
  ab20: "ANDAR BAHAR 1",
  "3cardj": "3 CARDS JUDGEMENT",
  war: "CASINO WAR",
  worli2: "INSTANT WORLI",
  superover: "SUPER OVER",
  cmatch20: "CRICKET MATCH 20-20",
  aaa: "AMAR AKBAR ANTHONY",
  btable: "BOLLYWOOD CASINO",
  race20: "RACE 20",
  cricketv3: "FIVE FIVE CRICKET",
  cricket: "Cricket",
  football: "Football",
  tennis: "Tennis",
  horseRacing: "Horse Racing",
  greyHound: "Grey Hound",
  // Add other mappings as needed
};
const ProfitLossComponent = () => {
  const minDate = new Date();
  minDate.setMonth(minDate.getMonth() - 1);
  const [tableConfig, setTableConfig] = useState<any>(null);
  const dispatch: AppDispatch = useDispatch();
  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
  const [fromDate, setFromDate] = useState<any>(sevenDaysAgo);
  const [toDate, setToDate] = useState<any>(new Date());
  const [minDate2, setminDate2] = useState<any>(minDate);
  const { getProfile } = useSelector((state: RootState) => state.user.profile);
  const { profitLossReport } = useSelector(
    (state: RootState) => state.currentBetList
  );

  // const formattedToDate = toDate.toLocaleDateString('en-GB');
  const handleSubmit = () => {
    try {
      if (getProfile?.id) {
        dispatch(
          getProfitLossReport({
            startDate: moment(fromDate).format("YYYY-MM-DD"),
            endDate: moment(toDate).add(1, "days").format("YYYY-MM-DD"),
            userId: getProfile?.id,
          })
        );
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    if (getProfile?.id && tableConfig) {
      let filter = "";
  
      if (fromDate && toDate) {
        filter += `&startDate=${moment(new Date(fromDate))?.format("YYYY-MM-DD")}`;
        filter += `&endDate=${moment(new Date(toDate).setDate(toDate.getDate() + 1))?.format("YYYY-MM-DD")}`;
      } else if (fromDate) {
        filter += `&startDate=${moment(fromDate)?.format("YYYY-MM-DD")}`;
      } else if (toDate) {
        filter += `&endDate=${moment(toDate)?.format("YYYY-MM-DD")}`;
      }
  
      dispatch(
        getProfitLossReport({
          userId: getProfile?.id,
          page: tableConfig?.page,
          limit: tableConfig?.rowPerPage,
          filter,
        })
      );
    }
  }, [getProfile?.id, tableConfig, fromDate, toDate]);
  

  
  useEffect(() => {
    const date = Math.floor(new Date().getTime() / 1000);
    const timestamp = Math.floor(new Date(fromDate).getTime() / 1000);
    if (timestamp !== date) {
      setminDate2(fromDate);
    }
  }, [fromDate]);

    return (
    <>
      {isMobile && (
        <div className="h-100">
          <ReportContainer title="Profit Loss">
            <Stack gap={2}>
              <Row className="g-2 mt-1">
                <Col md={2} xs={6}>
                  <DatePicker
                    format="yyyy-MM-dd"
                    onChange={setFromDate}
                    value={fromDate}
                    closeCalendar={true}
                    clearIcon={null}
                    className="w-100"
                    minDate={minDate}
                    maxDate={new Date()}
                  />
                  {/* <CustomInput type="date" /> */}
                </Col>
                <Col md={2} xs={6}>
                  <DatePicker
                    format="yyyy-MM-dd"
                    onChange={setToDate}
                    value={toDate}
                    closeCalendar={true}
                    clearIcon={null}
                    className="w-100"
                    minDate={minDate2}
                    maxDate={new Date()}
                  />
                  {/* <CustomInput type="date" /> */}
                </Col>

                <Col md={2} xs={12}>
                  <CustomButton
                    onClick={handleSubmit}
                    size={isMobile ? "sm" : "lg"}
                    className={`${
                      isMobile ? "w-100" : " bg-primary"
                    } border-0 `}
                  >
                    Submit
                  </CustomButton>
                </Col>
              </Row>
              <CustomTable
                bordered={true}
                striped={!isMobile}
                paginationCount={true}
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
                itemCount={profitLossReport?.count || 0}
                setTableConfig={(data: any) => {
                  setTableConfig(data);
                }}
              >
                {profitLossReport &&
                  profitLossReport?.result?.map((item: any, index: number) => {
                    return (
                      <tr className={`${isMobile && "title-12"}`} key={index}>
                        <td> {typeToTitle[item?.eventType] || item?.eventType}</td>
                        <td>{item?.marketType}</td>
                        <td>{item?.aggregateAmount}</td>
                      </tr>
                    );
                  })}
              </CustomTable>
            </Stack>
          </ReportContainer>
        </div>
      )}
      {!isMobile && (
        <div>
          <ReportContainer title="Profit Loss">
            <Stack gap={2}>
              <Row className="g-2 mt-1">
                <Col md={2} xs={6}>
                  <DatePicker
                    onChange={setFromDate}
                    value={fromDate}
                    closeCalendar={true}
                    clearIcon={null}
                    className="w-100"
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
                    clearIcon={null}
                    className="w-100"
                    minDate={minDate2}
                    maxDate={new Date()}
                  />
                  {/* <CustomInput type="date" /> */}
                </Col>

                <Col md={2} xs={12}>
                  <CustomButton
                    onClick={handleSubmit}
                    size={isMobile ? "sm" : "lg"}
                    className={`${
                      isMobile ? "w-100" : " bg-primary"
                    } border-0 `}
                  >
                    Submit
                  </CustomButton>
                </Col>
              </Row>
              <CustomTable
                bordered={true}
                striped={!isMobile}
                paginationCount={true}
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
                {profitLossReport &&
                  profitLossReport?.result?.map((item: any, index: number) => {
                    return (
                      <tr className={`${isMobile && "title-12"}`} key={index}>
                        <td>
                          {typeToTitle[item?.eventType] || item?.eventType}
                        </td>
                        <td>{item?.marketType}</td>
                        <td>{item?.aggregateAmount}</td>
                      </tr>
                    );
                  })}
              </CustomTable>
            </Stack>
          </ReportContainer>
        </div>
      )}
    </>
  );
};

export default ProfitLossComponent;

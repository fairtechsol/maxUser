import { useState, useEffect } from "react";
import { Col, Row, Stack } from "react-bootstrap";
import "react-calendar/dist/Calendar.css";
import DatePicker from "react-date-picker";
import "react-date-picker/dist/DatePicker.css";
import isMobile from "../../utils/screenDimension";
import CustomButton from "../commonComponent/button";
import CustomTable from "../commonComponent/table";
import ReportContainer from "../containers/reportContainer";
import { useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import { getProfitLossReport } from "../../store/actions/match/matchListAction";
import { useSelector } from "react-redux";
import moment from "moment";


const typeToTitle: { [key: string]: string } = {
  dt20: "DRAGON TIGER 20-20",
  teen20: "TEENPATTI 20-20",
  lucky7: "LUCKY7A",
  lucky7eu: "LUCKY7B",
  card32: "CARDS32-A",
  abj: "ANDAR BAHAR 2",
  dt202: "20-20DRAGON TIGER 2",
  dtl20: "DRAGON TIGER LION",
  dt6: "DRAGON TIGER TEENPATTI",
  teen: "TEENPATTI TEENPATTI",
  // Add other mappings as needed
};
const ProfitLossComponent = () => {
  const minDate = new Date();
  minDate.setMonth(minDate.getMonth() - 1);
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

  // useEffect(() => {
  //   if (getProfile.id) {
  //     dispatch(
  //       getProfitLossReport({
  //         startDate: moment(fromDate).format("YYYY-MM-DD"),
  //         endDate: moment(toDate).format("YYYY-MM-DD"),
  //         userId: getProfile?.id,
  //       })
  //     );
  //   }
  // }, [getProfile]);
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
        <div className="whitespace">
          <ReportContainer title="Profit Loss">
            <Stack gap={2}>
              <Row className="g-2 mt-1">
                <Col md={2} xs={6}>
                  <DatePicker
                    format="yyyy-MM-dd"
                    onChange={setFromDate}
                    value={fromDate}
                    closeCalendar={true}
                    clearIcon={false}
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
                    clearIcon={false}
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
                        <td>{item?.eventType}</td>
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
                    clearIcon={false}
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
                    clearIcon={false}
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
                    const title = typeToTitle[item?.eventType] || "Unknown Game";
                    return (
                      <tr className={`${isMobile && "title-12"}`} key={index}>
                        <td>{title}</td>
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

import moment from "moment";
import { useEffect, useState } from "react";
import { Col, Form, Row, Stack } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import CustomButton from "../../../components/commonComponent/button";
import CustomTable from "../../../components/commonComponent/table";
import ReportContainer from "../../../components/containers/reportContainer";
import {
  getCasinoReportGameList,
  getLiveCasinoBets,
} from "../../../store/actions/user/userAction";
import { AppDispatch, RootState } from "../../../store/store";
import { isMobile } from "../../../utils/screenDimension";

const casinoTypeOptions = [
  { value: "settledBets", label: "Settled" },
  { value: "unsettledBets", label: "Un-Settled" },
];

const columns = [
  { id: "gameName", label: "Game Name" },
  { id: "type", label: "Type" },
  { id: "amount", label: "Amount" },
  { id: "total", label: "Total" },
  { id: "date", label: "Date" },
  { id: "transactionId", label: "Transaction Id" },
];

const LiveCasinoBets = () => {
  const [date, setDate] = useState<any>(moment().format("YYYY-MM-DD"));
  const [reportTypeValues, setReportTypeValues] = useState<any>(null);
  const [casinoTypeValues, setCasinoTypeValues] = useState<any>(null);
  const [tableConfig, setTableConfig] = useState<any>(null);
  const [updatedReports, setUpdateReports] = useState([]);

  const dispatch: AppDispatch = useDispatch();

  const { casinoReportGameList, liveCasinoBets } = useSelector(
    (state: RootState) => state.user.report
  );

  const { getProfile } = useSelector((state: RootState) => state.user.profile);

  const handleReportTypeChange = (option: any) => {
    setReportTypeValues(option);
  };
  const handleCasinoTypeChange = (option: any) => {
    setCasinoTypeValues(option);
  };

  const handleSubmit = (e: any) => {
    try {
      e.preventDefault();
      let filter: string = "";
      if (casinoTypeValues && casinoTypeValues !== "All") {
        filter += `&providerName=eq${casinoTypeValues}`;
      }
      if (reportTypeValues === "settledBets") {
        if (date) {
          filter += `&DATE(virtualCasinoBetPlaced.createdAt)=${moment(
            date
          )?.format("YYYY-MM-DD")}`;
        }
        filter += `&settled=eqtrue`;
      }
      if (reportTypeValues === "unsettledBets") {
        filter += `&settled=eqfalse`;
      }
      dispatch(
        getLiveCasinoBets({
          id: sessionStorage.getItem("key")
            ? sessionStorage.getItem("key")
            : getProfile?.id,
          page: 1,
          limit: tableConfig?.rowPerPage,
          searchBy:
            "virtualCasinoBetPlaced.gameName,virtualCasinoBetPlaced.providerName,virtualCasinoBetPlaced.gameId",
          keyword: tableConfig?.keyword ?? "",
          sort: "virtualCasinoBetPlaced.createdAt:ASC",
          filter: filter,
        })
      );
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setReportTypeValues("settledBets");
    setCasinoTypeValues("All");
    dispatch(getCasinoReportGameList());
  }, []);

  useEffect(() => {
    try {
      let filter: string = "";
      if (casinoTypeValues && casinoTypeValues !== "All") {
        filter += `&providerName=eq${casinoTypeValues}`;
      }
      if (reportTypeValues === "settledBets") {
        if (date) {
          filter += `&DATE(virtualCasinoBetPlaced.createdAt)=${moment(
            date
          )?.format("YYYY-MM-DD")}`;
        }
        filter += `&settled=eqtrue`;
      }
      if (reportTypeValues === "unsettledBets") {
        filter += `&settled=eqfalse`;
      }
      dispatch(
        getLiveCasinoBets({
          id: sessionStorage.getItem("key")
            ? sessionStorage.getItem("key")
            : getProfile?.id,
          page: tableConfig?.page,
          limit: tableConfig?.rowPerPage,
          searchBy:
            "virtualCasinoBetPlaced.gameName,virtualCasinoBetPlaced.providerName,virtualCasinoBetPlaced.gameId",
          keyword: tableConfig?.keyword ?? "",
          sort: "virtualCasinoBetPlaced.createdAt:ASC",
          filter: filter,
        })
      );
    } catch (error) {
      console.log(error);
    }
  }, [tableConfig]);

  useEffect(() => {
    if (liveCasinoBets?.bets) {
      let runningTotal = 0;
      const dataWithTotal = liveCasinoBets.bets.map((item: any) => {
        runningTotal += parseFloat(item?.amount || 0);
        return { ...item, total: runningTotal };
      });
      setUpdateReports(dataWithTotal);
    }
  }, [liveCasinoBets]);

  return (
    <div className="vh-50">
      <ReportContainer title="Live Casino Bets">
        <Stack gap={2}>
          <form onSubmit={handleSubmit}>
            <Row className="g-2 mt-1">
              <Col md={2} xs={6}>
                <Form.Group controlId="accountTypeSelect">
                  <Form.Select
                    value={reportTypeValues}
                    onChange={(event) =>
                      handleReportTypeChange(event.target.value)
                    }
                    aria-label="Account Type Select"
                  >
                    <option value="All" disabled>
                      Select Report Type
                    </option>
                    {casinoTypeOptions.map((option, index) => (
                      <option key={index} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </Col>
              {reportTypeValues !== "unsettledBets" && (
                <Col lg={2} md={3} xs={6}>
                  <Form.Group controlId="accountTypeSelect">
                    <Form.Control
                      title="From"
                      placeholder=""
                      onChange={(e: any) => {
                        setDate(e.target.value);
                      }}
                      type="date"
                      value={date}
                    />
                  </Form.Group>
                </Col>
              )}
              <Col lg={2} xs={12} md={2}>
                <Form.Group controlId="accountTypeSelect">
                  <Form.Select
                    value={casinoTypeValues}
                    onChange={(event) =>
                      handleCasinoTypeChange(event.target.value)
                    }
                    aria-label="Casino Type Select"
                  >
                    <option value="All" disabled>
                      Select Casino Type
                    </option>
                    {casinoReportGameList.map((option: any, index: number) => (
                      <option key={index} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </Col>

              <Col lg={2} md={2} xs={12}>
                <CustomButton
                  style={{ paddingLeft: "6rem", paddingRight: "6rem" }}
                  size={isMobile ? "sm" : "lg"}
                  className={`${
                    isMobile ? "w-100" : "w-100 bg-primary"
                  } border-0 fs-6`}
                  type="submit"
                >
                  Submit
                </CustomButton>
              </Col>
            </Row>
          </form>

          <CustomTable
            placeHolder={
              liveCasinoBets?.count > 0
                ? `${liveCasinoBets?.count} records`
                : "0 records..."
            }
            paginationCount={true}
            bordered={true}
            striped={!isMobile}
            isPagination={true}
            isSearch={true}
            columns={columns}
            itemCount={liveCasinoBets?.count || 0}
            setTableConfig={(data: any) => {
              setTableConfig(data);
            }}
          >
            {(updatedReports ?? [])?.map((item: any, index: number) => {
              return (
                <tr className={`${isMobile && "title-12"}`} key={index}>
                  <td>{item?.gameName}</td>
                  <td
                    className={`${
                      item?.amount >= 0 ? "color-green" : "color-red"
                    }`}
                  >
                    {item?.amount > 0 ? "CREDIT" : "DEBIT"}
                  </td>
                  <td
                    className={`${
                      item?.amount >= 0 ? "color-green" : "color-red"
                    }`}
                  >
                    {Math.abs(item?.amount).toFixed(2)}
                  </td>
                  <td>{parseFloat(item?.total).toFixed(2)}</td>
                  <td>
                    {moment(item?.createdAt).format("DD/MM/YYYY hh:mm:ss")}
                  </td>
                  <td>{item?.transactionId}</td>
                </tr>
              );
            })}
          </CustomTable>
        </Stack>
      </ReportContainer>
    </div>
  );
};

export default LiveCasinoBets;

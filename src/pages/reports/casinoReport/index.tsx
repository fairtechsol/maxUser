import { Col, Row, Stack } from "react-bootstrap";
import { useEffect, useState } from "react";
import "react-calendar/dist/Calendar.css";
import DatePicker from "react-date-picker";
import "react-date-picker/dist/DatePicker.css";
import { useDispatch, useSelector } from "react-redux";
import { isMobile } from "../../../utils/screenDimension";
import { AppDispatch, RootState } from "../../../store/store";
import {
  getCardReport,
  resetCardReport,
} from "../../../store/actions/user/userAction";
import ReportContainer from "../../../components/containers/reportContainer";
import SelectSearch from "../../../components/commonComponent/SelectSearch";
import CustomButton from "../../../components/commonComponent/button";
import CustomTable from "../../../components/commonComponent/table";
import NotSet from "../../../components/commonComponent/notSet";
import moment from "moment";
import { useLocation } from "react-router-dom";
import Modal from "react-bootstrap/Modal";
import { ResultComponent } from "../../../components/commonComponent/resultComponent";
import { resultDragonTiger } from "../../../store/actions/cards/cardDetail";
import { cardGames } from "../../../utils/constants";
import CustomTable2 from "../../../components/commonComponent/table2";

const CasinoReports = () => {
  const dispatch: AppDispatch = useDispatch();
  const { state } = useLocation();

  const [lgShow, setLgShow] = useState(false);
  const [date, setDate] = useState<any>(new Date());
  const [type, setType] = useState<any>(null);

  const [typeFromState, setTypeFromState] = useState<any>(null);

  const [tableConfig, setTableConfig] = useState<any>(null);

  const { cardReport } = useSelector((state: RootState) => state.user.report);
  const { resultData } = useSelector((state: RootState) => state.card);

  const handleResult = (id: any) => {
    setLgShow(true);
    dispatch(resultDragonTiger(id));
  };

  useEffect(() => {
    if (state?.cardType) {
      let newType = cardGames.filter((item: any) => {
        if (item?.value === state?.cardType) {
          return {
            value: item?.value,
            label: item?.label,
          };
        }
      });
      setTypeFromState(newType[0]);
    }
  }, [state]);

  useEffect(() => {
    if (tableConfig && (type || typeFromState || "teen20")) {
      let filter = "";

      if (date) {
        filter += `&DATE(cardResult.createdAt)=${moment(date).format(
          "YYYY-MM-DD"
        )}`;
      }
      if (type || typeFromState) {
        dispatch(
          getCardReport({
            type: type ? type.value : typeFromState ? typeFromState.value : "",
            page: tableConfig?.page,
            limit: tableConfig?.rowPerPage,
            searchBy: "cardResult.result ->> 'mid'",
            keyword: tableConfig?.keyword || "",
            filter,
          })
        );
      }
    }
  }, [tableConfig, typeFromState]);

  useEffect(() => {
    dispatch(resetCardReport());
  }, []);

  const cMeterResult = (resut: any) => {
    let lowCardSum = 0;
    let highCardSum = 0;

    const cards = resut?.split(",");

    cards?.forEach((card: any) => {
      if (card?.length < 3) return;

      const firstChar = card[0];

      if (
        firstChar === "1" ||
        firstChar === "J" ||
        firstChar === "Q" ||
        firstChar === "K"
      ) {
        highCardSum =
          highCardSum +
          (firstChar == "1"
            ? 10
            : firstChar == "J"
            ? 11
            : firstChar == "Q"
            ? 12
            : firstChar == "K"
            ? 13
            : 0);
      } else {
        lowCardSum = lowCardSum + (firstChar == "A" ? 1 : Number(firstChar));
      }
    });

    return lowCardSum > highCardSum ? "Low" : "High";
  };
  return (
    <div className="vh-50">
      <ReportContainer title="Casino Result">
        <div>
          <Stack gap={2}>
            <Row className="g-2 mt-1">
              <Col lg={2} md={3} xs={6}>
                <DatePicker
                  onChange={setDate}
                  format="dd/MM/yyyy"
                  value={date}
                  closeCalendar={true}
                  clearIcon={null}
                  className="w-100"
                />
              </Col>
              <Col md={2} xs={6}>
                <SelectSearch
                  options={cardGames}
                  placeholder=""
                  onChange={setType}
                  value={
                    type
                      ? type
                      : typeFromState
                      ? typeFromState
                      : {
                          value: "",
                          label: "Select Casino Type",
                        }
                  }
                  isOptionDisabled={(option: any) => option.disabled}
                />
              </Col>

              <Col
                md={2}
                xs={12}
                style={{
                  width: isMobile ? "100%" : "17%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <CustomButton
                  style={{ paddingLeft: "6rem", paddingRight: "6rem" }}
                  size={isMobile ? "sm" : "lg"}
                  className={`${
                    isMobile ? "w-100" : "w-100 bg-primary"
                  } border-0 fs-6`}
                  onClick={() => {
                    let filter = "";

                    if (date) {
                      filter += `&DATE(cardResult.createdAt)=${moment(
                        date
                      ).format("YYYY-MM-DD")}`;
                    }

                    if (type || typeFromState) {
                      dispatch(
                        getCardReport({
                          type: type
                            ? type.value
                            : typeFromState
                            ? typeFromState.value
                            : "",
                          page: tableConfig?.page,
                          limit: tableConfig?.rowPerPage,
                          searchBy: "cardResult.result ->> 'mid'",
                          keyword: tableConfig?.keyword || "",
                          filter,
                        })
                      );
                    }
                  }}
                >
                  Submit
                </CustomButton>
              </Col>
            </Row>
            <CustomTable2
              // width={isMobile ? "1200px" : ""}
              placeHolder={cardReport?.count>0?`${cardReport?.count} records`:"0 records..."}
              paginationCount={true}
              bordered={true}
              striped={!isMobile}
              isPagination={true}
              isSearch={true}
              columns={[
                {
                  id: "roundId",
                  label: "Round Id",
                },
                {
                  id: "winner",
                  label: "Winner",
                },
              ]}
              itemCount={cardReport?.count || 0}
              setTableConfig={(data: any) => {
                setTableConfig(data);
              }}
            >
              {cardReport?.results?.map((item: any, index: number) => {
                return (
                  <tr
                    className={`${isMobile && "title-12"}`}
                    key={index}
                    onClick={() => handleResult(item?.mid)}
                  >
                    <td
                      style={{
                        color: "#000",
                        cursor: "pointer",
                        textAlign: "left",
                        width: "20%",
                      }}
                      // onClick={() => handleResult(item?.mid)}
                    >
                      <NotSet item={item?.mid} />
                    </td>
                    <td style={{ textAlign: "left" }}>
                      {item?.gameType == "cmeter" ? (
                        cMeterResult(item?.result)
                      ) : (
                        <NotSet item={item?.result} />
                      )}
                    </td>
                  </tr>
                );
              })}
            </CustomTable2>
          </Stack>
        </div>
      </ReportContainer>
      <Modal
        size="lg"
        show={lgShow}
        onHide={() => setLgShow(false)}
        aria-labelledby="example-modal-sizes-title-lg"
      >
        <Modal.Body style={{ padding: 0 }}>
          <ResultComponent
            data={resultData}
            setfalse={setLgShow}
            type={resultData?.gameType}
          />
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default CasinoReports;

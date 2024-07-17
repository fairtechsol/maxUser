import { Col, Row, Stack } from "react-bootstrap";
import { useEffect, useState } from "react";
import "react-calendar/dist/Calendar.css";
import DatePicker from "react-date-picker";
import "react-date-picker/dist/DatePicker.css";
import { useDispatch, useSelector } from "react-redux";
import isMobile from "../../../utils/screenDimension";
import { AppDispatch, RootState } from "../../../store/store";
import { getCardReport } from "../../../store/actions/user/userAction";
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

const cardGames = [
  { value: "", label: "Select Casino Type", disabled: true },
  {
    value: "dt20",
    label: "20-20 Dragon Tiger",
  },
  {
    value: "ab20",
    label: "Andar Bahar 1",
  },
  {
    value: "abj",
    label: "Andar Bahar 2",
  },
  {
    value: "teen20",
    label: "20-20 Teen Patti",
  },
  {
    value: "teen",
    label: "Teen Patti One Day",
  },
  {
    value: "teen8",
    label: "Open Teen Patti",
  },
  {
    value: "teen9",
    label: "Test Teen Patti",
  },
  {
    value: "card32",
    label: "32 Cards - A",
  },
  {
    value: "card32eu",
    label: "32 Cards - B",
  },
  {
    value: "lucky7",
    label: "Lucky 7 - A",
  },
  {
    value: "lucky7eu",
    label: "Lucky 7 - B",
  },
  {
    value: "dt202",
    label: "20-20 Dragon Tiger 2",
  },
  {
    value: "dtl20",
    label: "Dragon Tiger Lion",
  },
  {
    value: "dt6",
    label: "Dragon Tiger 1 Day",
  },
  {
    value: "war",
    label: "CASINO WAR",
  },
  {
    value: "aaa",
    label: "Amar Akbar Anthony",
  },
  {
    value: "cricketv3",
    label: "Fve-Five Cricket",
  },
  {
    value: "superover",
    label: "Superover",
  },
  {
    value: "race20",
    label: "Race 20",
  },
  {
    value: "poker",
    label: "Poker 1-day",
  },
  {
    value: "poker20",
    label: "Poker 20",
  },
  {
    value: "poker6",
    label: "Poker 6",
  },
  {
    value: "btable",
    label: "Bollywood Table",
  },
];

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

  return (
    <>
      <ReportContainer title="Casino Result">
        <div>
          <Stack gap={2}>
            <Row className="g-2 mt-1">
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
              <Col lg={2} md={3} xs={6}>
                <DatePicker
                  onChange={setDate}
                  format="yyyy-MM-dd"
                  value={date}
                  closeCalendar={true}
                  clearIcon={null}
                  className="w-100"
                />
              </Col>

              <Col md={2} xs={12}>
                <CustomButton
                  size={isMobile ? "sm" : "lg"}
                  className={`${
                    isMobile ? "w-100" : " bg-primaryBlue"
                  } border-0 `}
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
            <CustomTable
              // width={isMobile ? "1200px" : ""}
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
                  <tr className={`${isMobile && "title-12"}`} key={index}>
                    <td
                      style={{ color: "#0d6efd", cursor: "pointer" }}
                      onClick={() => handleResult(item?.mid)}
                    >
                      <NotSet item={item?.mid} />
                    </td>
                    <td>
                      <NotSet item={item?.result} />
                    </td>
                  </tr>
                );
              })}
            </CustomTable>
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
    </>
  );
};

export default CasinoReports;

import moment from "moment";
import { useEffect, useState } from "react";
import { Button, Col, Form, Modal, Row, Stack, Table } from "react-bootstrap";
import "react-calendar/dist/Calendar.css";
import DatePicker from "react-date-picker";
import "react-date-picker/dist/DatePicker.css";
import { useDispatch, useSelector } from "react-redux";
import { getPlacedBetsForAccountStatement } from "../../store/actions/betPlace/betPlaceActions";
import { getAccountStatement } from "../../store/actions/user/userAction";
import { AppDispatch, RootState } from "../../store/store";
import { casinoKeywords, transType } from "../../utils/constants";
import { isMobile } from "../../utils/screenDimension";
import SelectSearch from "../commonComponent/SelectSearch";
import CustomButton from "../commonComponent/button";
import NotSet from "../commonComponent/notSet";
import CustomTable from "../commonComponent/table";
import ReportContainer from "../containers/reportContainer";
import "./style.scss";
import { ResultComponent } from "../commonComponent/resultComponent";
import { resultDragonTiger } from "../../store/actions/cards/cardDetail";

const AccountStatementComponent = () => {
  const minDate = new Date();
  minDate.setMonth(minDate.getMonth() - 1);
  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
  const [from, setFrom] = useState<any>(sevenDaysAgo);
  const [to, setTo] = useState<any>(new Date());
  const [type, setType] = useState<any>({
    label: "Deposit/Withdraw Reports",
    value: "addWithdraw",
  });
  const [minDate2, setminDate2] = useState<any>(minDate);
  const [show, setShow] = useState({
    status: false,
    betId: [],
    runnerId: "",
    casinoType: "",
  });
  const [selectedOption, setSelectedOption] = useState("matched");

  const [tableConfig, setTableConfig] = useState<any>(null);
  const dispatch: AppDispatch = useDispatch();

  const { transactions, getProfile } = useSelector(
    (state: RootState) => state.user.profile
  );
  let { resultData } = useSelector((state: RootState) => state.card);

  const { placedBetsAccountStatement } = useSelector(
    (state: RootState) => state.bets
  );

  const handleClose = () => {
    setSelectedOption("matched");
    setShow({ status: false, betId: [], runnerId: "", casinoType: "a" });
  };

  const handleSubmitClick = () => {
    if (getProfile?.id && tableConfig) {
      let filter = "";

      if (from && to) {
        filter += `&createdAt=between${moment(new Date(from))?.format(
          "YYYY-MM-DD"
        )}|${moment(new Date(to).setDate(to.getDate() + 1))?.format(
          "YYYY-MM-DD"
        )}`;
      } else if (from) {
        filter += `&createdAt=gte${moment(from)?.format("YYYY-MM-DD")}`;
      } else if (to) {
        filter += `&createdAt=lte${moment(to)?.format("YYYY-MM-DD")}`;
      }
      if (type) {
        if (type?.value === "casino") {
          filter += `&statementType=game&betId=isNull`;
        } else if (type?.value === "game") {
          filter += `&statementType=${type?.value}&betId=notNull`;
        } else {
          filter += `&statementType=${type?.value}`;
        }
      }

      dispatch(
        getAccountStatement({
          userId: getProfile?.id,
          page: tableConfig?.page,
          limit: tableConfig?.rowPerPage,
          searchBy: "description",
          keyword: tableConfig?.keyword || "",
          filter,
        })
      );
    }
  };

  useEffect(() => {
    if (getProfile?.id && tableConfig) {
      let filter = "";

      if (from && to) {
        filter += `&createdAt=between${moment(new Date(from))?.format(
          "YYYY-MM-DD"
        )}|${moment(new Date(to).setDate(to.getDate() + 1))?.format(
          "YYYY-MM-DD"
        )}`;
      } else if (from) {
        filter += `&createdAt=gte${moment(from)?.format("YYYY-MM-DD")}`;
      } else if (to) {
        filter += `&createdAt=lte${moment(to)?.format("YYYY-MM-DD")}`;
      }
      // if (type) {
      //   filter += `&statementType=${type?.value}`;
      // }
      if (type) {
        if (type?.value === "casino") {
          filter += `&statementType=game&betId=isNull`;
        } else if (type?.value === "game") {
          filter += `&statementType=${type?.value}&betId=notNull`;
        } else {
          filter += `&statementType=${type?.value}`;
        }
      }
      dispatch(
        getAccountStatement({
          userId: getProfile?.id,
          page: tableConfig?.page,
          limit: tableConfig?.rowPerPage,
          searchBy: "description",
          keyword: tableConfig?.keyword || "",
          filter,
        })
      );
    }
  }, [getProfile?.id, tableConfig]);

  useEffect(() => {
    const date = Math.floor(new Date().getTime() / 1000);
    const timestamp = Math.floor(new Date(from).getTime() / 1000);
    if (timestamp !== date) {
      setminDate2(from);
    }
  }, [from]);
  return (
    <>
      <ReportContainer title="Account Statement">
        <div>
          <Stack gap={2}>
            <Row className="g-2 mt-1">
              <Col lg={2} md={3} xs={6}>
                <DatePicker
                  onChange={setFrom}
                  format="dd/MM/yyyy"
                  value={from}
                  closeCalendar={true}
                  clearIcon={null}
                  className="w-100"
                  minDate={minDate}
                  maxDate={new Date()}
                />
                {/* <CustomInput type="date" style={{ appearance: "textfield" }} /> */}
              </Col>
              <Col lg={2} md={3} xs={6}>
                <DatePicker
                  onChange={setTo}
                  value={to}
                  format="dd/MM/yyyy"
                  closeCalendar={true}
                  clearIcon={null}
                  className="w-100"
                  minDate={minDate2}
                  maxDate={new Date()}
                />
                {/* <CustomInput type="date" /> */}
              </Col>
              <Col md={2} xs={12}>
                <SelectSearch
                  options={[
                    // {
                    //   value: "",
                    //   label: "All",
                    // },
                    {
                      value: "addWithdraw",
                      label: "Deposit/Withdraw Reports",
                    },
                    {
                      value: "game",
                      label: "Sport Report",
                    },
                    {
                      value: "casino",
                      label: "Casino Reports",
                    },
                  ]}
                  // placeholder="Deposit/Withdraw Reports"
                  onChange={setType}
                  value={type}
                  defaultValue={{
                    label: "Deposit/Withdraw Reports",
                    value: "addWithdraw",
                  }}
                />
              </Col>
              <Col md={2} xs={12}>
                <CustomButton
                  size={isMobile ? "sm" : "lg"}
                  className={`${isMobile ? "w-100" : " bg-primary"} border-0 `}
                  onClick={handleSubmitClick}
                >
                  Submit
                </CustomButton>
              </Col>
            </Row>

            {/* http://localhost:5000/card/result/detail/9.241909153253 */}
            <CustomTable
               placeHolder={`${transactions?.count} records...`  || "0 records..."}
              width={isMobile ? "1200px" : ""}
              paginationCount={true}
              bordered={true}
              striped={!isMobile}
              isPagination={true}
              isSearch={true}
              columns={[
                {
                  id: "createdAt",
                  label: "Date",
                },
                {
                  id: "srNo",
                  label: "Sr No",
                },
                {
                  id: "amount",
                  label: "Credit",
                },
                {
                  id: "amount",
                  label: "Debit",
                },
                {
                  id: "closingBalance",
                  label: "Pts",
                },
                {
                  id: "description",
                  label: "Remark",
                },
              ]}
              itemCount={transactions?.count || 0}
              setTableConfig={(data: any) => {
                setTableConfig(data);
              }}
            >
              {transactions?.transactions?.map((item: any, index: number) => {
                const keywords = ["ballbyball", "cricketv3", "superover"];

                const firstPart = item?.description?.split("/")?.[0];
                const containsKeywords =
                  firstPart &&
                  keywords.some((keyword) => firstPart.includes(keyword));

                const isCasinoGame =
                  firstPart && casinoKeywords.includes(firstPart);
                return (
                  <tr className={`${isMobile && "title-12 lh-1"}`} key={index}>
                    <td className={isMobile ? "date-as bg-grey" : ""} >
                      {moment(new Date(item?.createdAt)).format(
                        "YYYY-MM-DD hh:mm"
                      )}
                    </td>
                    <td className={isMobile ? "sr-as bg-grey" : ""}>
                      {index +
                        (tableConfig?.rowPerPage || 15) *
                          (tableConfig?.page - 1 || 0) +
                        1}
                    </td>
                    <td className={isMobile ? "color-green credit-as bg-grey" : "color-green" }>
                      <NotSet
                        item={
                          item?.transType == transType.add ||
                          item?.transType == transType.creditRefer ||
                          item?.transType == transType.win
                            ? item?.amount
                            : null
                        }
                      />
                    </td>
                    <td className={isMobile ? "color-red debit-as bg-grey" : "color-red" }>
                      <NotSet
                        item={
                          item?.transType == transType.loss ||
                          item?.transType == transType.withDraw
                            ? item?.amount
                            : null
                        }
                      />
                    </td>
                    <td
                      className={
                      ` ${ parseInt(item?.closingBalance) < 0
                          ? "color-red"
                          : parseInt(item?.closingBalance) > 0
                          ? "color-green"
                          : ""} ${isMobile ? " pts-as bg-grey" : ""} `
                      } 
                    >
                      {" "}
                      <NotSet item={item?.closingBalance} />
                    </td>
                    <td className={isMobile ? "text-start bg-grey" : ""}
                      onClick={() => {
                        const match = containsKeywords
                          ? item?.description.match(/Rno\. (\d+)/)
                          : item?.description.match(/Rno\. (\d+\.\d+)/);
                        if (isCasinoGame && match && match[1]) {
                          setShow({
                            status: true,
                            betId: [],
                            runnerId: "",
                            casinoType: firstPart,
                          });
                          dispatch(resultDragonTiger(match[1]));
                        } else {
                          if (item?.betId?.length > 0) {
                            setShow({
                              status: true,
                              betId: item?.betId,
                              runnerId: "",
                              casinoType: "",
                            });
                            dispatch(
                              getPlacedBetsForAccountStatement({
                                betId: item?.betId,
                                status: "MATCHED",
                                userId: getProfile?.id,
                              })
                            );
                          } else if (match && match[1]) {
                            setShow({
                              status: true,
                              betId: [],
                              runnerId: match[1],
                              casinoType: "",
                            });
                            dispatch(
                              getPlacedBetsForAccountStatement({
                                runnerId: match[1],
                                isCard: true,
                                result: `inArr${JSON.stringify([
                                  "WIN",
                                  "LOSS",
                                  "TIE",
                                ])}`,
                                userId: getProfile?.id,
                              })
                            );
                          }
                        }
                      }}
                      style={{ cursor: "pointer" }}
                    >
                      <NotSet item={item?.description} />
                    </td>
                  </tr>
                );
              })}
            </CustomTable>
          </Stack>
        </div>
      </ReportContainer>
      <Modal
        show={show.status}
        onHide={handleClose}
        size="xl"
        dialogClassName="custom-modal"
      >
        {show?.casinoType ? (
          <Modal.Body style={{ padding: 0, width: "100%" }}>
            <ResultComponent
              data={resultData}
              setfalse={handleClose}
              type={show?.casinoType}
            />
          </Modal.Body>
        ) : (
          <>
            <Modal.Body>
              <Form className="d-flex align-self-center justify-content-center">
                <div key="inline-radio" className="mb-3">
                  <Form.Check
                    inline
                    label="Matched"
                    name="group1"
                    type="radio"
                    id="inline-radio-1"
                    checked={selectedOption === "matched"}
                    onChange={() => {
                      setSelectedOption("matched");
                      if (show?.betId?.length > 0) {
                        dispatch(
                          getPlacedBetsForAccountStatement({
                            betId: show?.betId,
                            status: "MATCHED",
                            userId: getProfile?.id,
                          })
                        );
                      } else if (show?.runnerId) {
                        dispatch(
                          getPlacedBetsForAccountStatement({
                            runnerId: show?.runnerId,
                            isCard: true,
                            result: `inArr${JSON.stringify([
                              "WIN",
                              "LOSS",
                              "TIE",
                            ])}`,
                            userId: getProfile?.id,
                          })
                        );
                      }
                    }}
                  />
                  <Form.Check
                    inline
                    label="Deleted"
                    name="group1"
                    type="radio"
                    id="inline-radio-2"
                    checked={selectedOption === "deleted"}
                    onChange={() => {
                      setSelectedOption("deleted");
                      if (show?.betId?.length > 0) {
                        dispatch(
                          getPlacedBetsForAccountStatement({
                            betId: show?.betId,
                            status: "DELETED",
                            userId: getProfile?.id,
                          })
                        );
                      } else if (show?.runnerId) {
                        dispatch(
                          getPlacedBetsForAccountStatement({
                            runnerId: show?.runnerId,
                            status: "DELETED",
                            userId: getProfile?.id,
                          })
                        );
                      }
                    }}
                  />
                </div>
              </Form>
              {!isMobile ? (
                <Table bordered hover>
                  <thead>
                    <tr>
                      <th>No</th>
                      <th>Nation</th>
                      <th>Side</th>
                      <th>Rate</th>
                      <th>Amount</th>
                      <th>Win/Loss</th>
                      <th>Place Date</th>
                      <th>Match Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {placedBetsAccountStatement?.length === 0 && (
                      <tr>
                        <td colSpan={12}>No Record Found</td>
                      </tr>
                    )}
                    {placedBetsAccountStatement?.length >= 0 &&
                      placedBetsAccountStatement?.map(
                        (item: any, index: number) => (
                          <tr key={item?.id}>
                            <td
                              className={`${
                                item?.betType === "BACK"
                                  ? "bg-blue3"
                                  : "bg-red1"
                              }`}
                            >
                              {index + 1}
                            </td>
                            <td
                              className={`${
                                item?.betType === "BACK"
                                  ? "bg-blue3"
                                  : "bg-red1"
                              }`}
                            >
                              {item?.teamName}
                            </td>
                            <td
                              className={`${
                                item?.betType === "BACK"
                                  ? "bg-blue3"
                                  : "bg-red1"
                              }`}
                            >
                              {item?.betType}
                            </td>
                            <td
                              className={`${
                                item?.betType === "BACK"
                                  ? "bg-blue3"
                                  : "bg-red1"
                              }`}
                            >
                              {item?.odds}
                            </td>
                            <td
                              className={`${
                                item?.betType === "BACK"
                                  ? "bg-blue3"
                                  : "bg-red1"
                              }`}
                            >
                              {item?.amount}
                            </td>
                            <td
                              className={`${
                                item?.betType === "BACK"
                                  ? "bg-blue3"
                                  : "bg-red1"
                              }`}
                              style={{
                                color:
                                  item?.result === "LOSS"
                                    ? "#dc3545"
                                    : item?.result === "TIE"
                                    ? "#000"
                                    : "#28a745",
                              }}
                            >
                              {item?.result === "LOSS"
                                ? `-${parseFloat(item?.lossAmount).toFixed(2)}`
                                : item?.result === "WIN"
                                ? parseFloat(item?.winAmount).toFixed(2)
                                : 0}
                            </td>
                            <td
                              className={`${
                                item?.betType === "BACK"
                                  ? "bg-blue3"
                                  : "bg-red1"
                              }`}
                            >
                              {moment(item?.createdAt).format(
                                "MM/DD/YYYY hh:mm:ss A"
                              )}
                            </td>
                            <td
                              className={`${
                                item?.betType === "BACK"
                                  ? "bg-blue3"
                                  : "bg-red1"
                              }`}
                            >
                              {item?.racingMatch
                                ? moment(item?.racingMatch?.startAt).format(
                                    "MM/DD/YYYY hh:mm:ss A"
                                  )
                                : moment(item?.match?.startAt).format(
                                    "MM/DD/YYYY hh:mm:ss A"
                                  )}
                            </td>
                          </tr>
                        )
                      )}
                  </tbody>
                </Table>
              ) : (
                <Row className="row">
                  <Col className="col-12" colspan={12}>
                    {placedBetsAccountStatement?.map(
                      (item: any, index: number) => {
                        return (
                          <div
                            className={`unsetteled-bet ${
                              item.betType === "NO" || item.betType === "LAY"
                                ? "bg-red1"
                                : "bg-blue3"
                            }`}
                            key={index}
                          >
                            <div className="row">
                              <div className="col-6 coloumn-6">
                                <div>
                                  <span className="f600">Nation: </span>{" "}
                                  {item?.teamName}
                                </div>
                                <div>
                                  <span className="f600">Placed Bet: </span>{" "}
                                  {moment(item?.createdAt).format(
                                    "MM/DD/YYYY hh:mm:ss A"
                                  )}
                                </div>
                                <div>
                                  <span className="f600">Matched Date: </span>{" "}
                                  {item?.racingMatch
                                    ? moment(item?.racingMatch?.startAt).format(
                                        "MM/DD/YYYY hh:mm:ss A"
                                      )
                                    : moment(item?.match?.startAt).format(
                                        "MM/DD/YYYY hh:mm:ss A"
                                      )}
                                </div>
                              </div>
                              <Col className="col-2 reportBody-a" colspan={6}>
                                <div>
                                  <span className="f600">Rate</span>
                                </div>
                                <div>{item.odds}</div>
                              </Col>
                              <div className="col-2 text-right reportBody-a">
                                <div>
                                  <span className="f600">Amount</span>
                                </div>
                                <div>{item.amount}</div>
                              </div>
                              <div className="col-2 text-right reportBody-a">
                                <div>
                                  <span className="f600">W&L</span>
                                </div>
                                <div
                                  style={{
                                    color:
                                      item?.result === "LOSS"
                                        ? "#dc3545"
                                        : item?.result === "WIN"
                                        ? "#28a745"
                                        : "#000",
                                    overflowWrap: "anywhere",
                                  }}
                                >
                                  {item?.result === "LOSS"
                                    ? `-${parseFloat(item?.lossAmount).toFixed(
                                        2
                                      )}`
                                    : item?.result === "WIN"
                                    ? parseFloat(item?.winAmount).toFixed(2)
                                    : 0}
                                </div>
                              </div>
                            </div>
                          </div>
                        );
                      }
                    )}
                  </Col>
                </Row>
              )}
            </Modal.Body>
            <Modal.Footer>
              <Button
                variant="secondary"
                className="btn btn-danger"
                onClick={handleClose}
              >
                {isMobile ? "Cancel" : "Close"}
              </Button>
            </Modal.Footer>
          </>
        )}
      </Modal>
    </>
  );
};

export default AccountStatementComponent;

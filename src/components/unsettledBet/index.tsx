import _ from "lodash";
import moment from "moment";
import { useEffect, useState } from "react";
import { Col, Form, Row, Stack } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  resetReportBetListData,
  settleUnsettleMatch,
} from "../../store/actions/match/matchListAction";
import { AppDispatch, RootState } from "../../store/store";
import { isMobile } from "../../utils/screenDimension";
import SelectSearch from "../commonComponent/SelectSearch";
import CustomButton from "../commonComponent/button";
import ReportContainer from "../containers/reportContainer";

interface Column {
  id: string;
  label: string;
  type?: string;
}

const columns: Column[] = [
  {
    id: "no",
    label: "No",
    type: "index",
  },
  {
    id: "eventName",
    label: "Event Name",
  },
  {
    id: "teamName",
    label: "Nation",
  },
  {
    id: "eventType",
    label: "Event Type",
  },
  {
    id: "marketType",
    label: "Market Name",
  },
  {
    id: "betType",
    label: "Side",
  },
  {
    id: "odds",
    label: "Rate",
  },
  {
    id: "amount",
    label: "Amount",
  },
  {
    id: "createdAt",
    label: "Place Date",
    type: "date",
  },
  {
    id: "match.startAt",
    label: "Match Date",
    type: "date",
  },
];
const cardGames = [
  { value: "", label: "Select Report Type", disabled: true },
  {
    value: "sports",
    label: "Sports", //
  },
  {
    value: "casino",
    label: "Casino",
  },
];
const UnsettledBetComponent = () => {
  const dispatch: AppDispatch = useDispatch();
  const [selectedCheckedBet, setSelectedCheckedBet] = useState<any>([]);
  const [selectedOption, setSelectedOption] = useState("");
  const [type, setType] = useState<any>(null);
  const [gameType, setGameType] = useState<any>(null);
  const [limit, setLimit] = useState(10);
  const [keyword, setKeyword] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const { ReportBetList } = useSelector(
    (state: RootState) => state.currentBetList
  );
  const handleCheckboxChange = (e: any) => {
    setSelectedOption(e.target.id);
    if (!type) {
      return false;
    }
    const params = new URLSearchParams();
    if (e.target.id != "") {
      const betType = `inArr${e.target.id === "back"
        ? JSON.stringify(["BACK", "YES"])
        : JSON.stringify(["LAY", "NO"])
        }`;
      params.append("betType", betType);
    }

    params.append("page", "1");
    if (limit) params.append("limit", limit.toString());
    if (keyword) params.append("keyword", keyword);
    const marketBetType = type?.value === "sports" ? "neCARD" : "eqCARD";
    if (type) {
      params.append("marketBetType", marketBetType);
      params.append("result", "eqPENDING");
    }
    dispatch(settleUnsettleMatch(params.toString()));
  };


  const handleGame = () => {
    if (!type) {
      return false;
    }
    setGameType(type?.value === "sports" ? "sports" : "casino");
    const params: any = new URLSearchParams();
    if (selectedOption != "") {
      const betType = `inArr${selectedOption === "back"
        ? JSON.stringify(["BACK", "YES"])
        : JSON.stringify(["LAY", "NO"])
        }`;
      params.append("betType", betType);
    }
    // if (selectedOption) params.append("betType", selectedOption);
    if (currentPage) params.append("page", currentPage);
    if (limit) params.append("limit", limit);
    if (keyword) params.append("keyword", keyword);
    const marketBetType = type?.value === "sports" ? "neCARD" : "eqCARD";
    params.append("marketBetType", marketBetType);
    params.append("result", "eqPENDING");
    dispatch(settleUnsettleMatch(params.toString()));
  };
  const handleSearchChange = (e: any) => {
    setKeyword(e.target.value);
    if (!type) {
      return false;
    }
    // if (e.target.value?.length > 2) {
    const params: any = new URLSearchParams();
    if (selectedOption != "") {
      const betType = `inArr${selectedOption === "back"
        ? JSON.stringify(["BACK", "YES"])
        : JSON.stringify(["LAY", "NO"])
        }`;
      params.append("betType", betType);
    }
    // if (selectedOption) params.append("betType", selectedOption);
    if (currentPage) params.append("page", currentPage);
    params.append("searchBy", "betPlaced.eventName");
    if (limit) params.append("limit", limit);
    if (keyword) params.append("keyword", e.target.value);
    const marketBetType = type?.value === "sports" ? "neCARD" : "eqCARD";
    params.append("marketBetType", marketBetType);
    params.append("result", "eqPENDING");
    dispatch(settleUnsettleMatch(params.toString()));
    // }
  };
  const handlePageChange = (value: any) => {
    const pageValue = parseInt(value, 10);
    const validatedPageValue =
      isNaN(pageValue) || pageValue < 1 ? 1 : pageValue;

    setCurrentPage(validatedPageValue);

    if (!type && !validatedPageValue) {
      return false;
    }

    const params = new URLSearchParams();

    if (selectedOption) {
      const betType = `inArr${selectedOption === "back"
        ? JSON.stringify(["BACK", "YES"])
        : JSON.stringify(["LAY", "NO"])
        }`;
      params.append("betType", betType);
    }

    params.append("page", validatedPageValue.toString());
    params.append("searchBy", "betPlaced.eventName");

    if (limit) params.append("limit", limit.toString());
    if (keyword) params.append("keyword", keyword);

    const marketBetType = type?.value === "sports" ? "neCARD" : "eqCARD";
    params.append("marketBetType", marketBetType);
    params.append("result", "eqPENDING");
    dispatch(settleUnsettleMatch(params.toString()));
  };

  const handleLimit = (e: any) => {
    setLimit(e.target.value);
    setCurrentPage(1);
    if (!type) {
      return false;
    }
    const params: any = new URLSearchParams();
    if (selectedOption != "") {
      const betType = `inArr${selectedOption === "back"
        ? JSON.stringify(["BACK", "YES"])
        : JSON.stringify(["LAY", "NO"])
        }`;
      params.append("betType", betType);
    }
    if (currentPage) params.append("page", 1);
    params.append("searchBy", "betPlaced.eventName");
    params.append("limit", e.target.value);
    if (keyword) params.append("keyword", e.target.value);
    const marketBetType = type?.value === "sports" ? "neCARD" : "eqCARD";
    params.append("marketBetType", marketBetType);
    params.append("result", "eqPENDING");
    dispatch(settleUnsettleMatch(params.toString()));
  };

  const handleCheckboxToggle = (item: any) => {
    setSelectedCheckedBet((prevSelected: any) =>
      prevSelected.includes(item)
        ? prevSelected.filter(
          (selectedItem: any) => selectedItem?.id !== item?.id
        )
        : [...prevSelected, item]
    );
  };

  useEffect(() => {
    dispatch(resetReportBetListData());
  }, []);

  return (
    <ReportContainer title="Current Bets">
      <div>
        <Stack gap={2}>
          {!isMobile ? (
            <>
              <Row className="g-2 mt-1">
                <Col md={2} xs={6}>
                  <SelectSearch
                    options={cardGames}
                    placeholder=""
                    onChange={setType}
                    value={type ? type : cardGames?.[0]}
                    isOptionDisabled={(option: any) => option.disabled}
                  />
                </Col>

                <Col
                  md={2}
                  xs={12}
                  style={{
                    // width:  "17%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <CustomButton
                    style={{ paddingLeft: "6rem", paddingRight: "6rem" }}
                    size={isMobile ? "sm" : "lg"}
                    className={`${isMobile ? "w-100" : "w-100 bg-primary"
                      } border-0 fs-6`}
                    onClick={() => handleGame()}
                  >
                    Submit
                  </CustomButton>
                </Col>
              </Row>
              <div className="g-2 mt-1 d-flex flex-row justify-content-between">

                <div className="w-25">
                  <div className="w-100 d-flex flex-row justify-content-start align-items-center">
                    <span className="me-1">Show</span>
                    <select
                      style={{ width: "35%", height: "30px" }}
                      onChange={(e) => handleLimit(e)}
                    >
                      <option value={10}>10</option>
                      <option value={20}>20</option>
                      <option value={30}>30</option>
                      <option value={40}>40</option>
                      <option value={50}>50</option>
                    </select>
                    <span className="ms-1">Entries</span>
                  </div>
                </div>
                <div className="w-25 d-flex flex-row justify-content-center">
                  <Form.Check
                    label="All"
                    name="matched"
                    type="radio"
                    id={""}
                    onChange={(e) => handleCheckboxChange(e)}
                    defaultChecked={true}
                  />
                  <Form.Check
                    label="Back"
                    name="matched"
                    type="radio"
                    id={"back"}
                    onChange={(e) => handleCheckboxChange(e)}
                    // defaultChecked={selectedOption === "PENDING"}
                    className="ms-2"
                  />
                  <Form.Check
                    label="Lay"
                    name="matched"
                    type="radio"
                    id={"lay"}
                    onChange={(e) => handleCheckboxChange(e)}
                    // defaultChecked={selectedOption === "PENDING"}
                    className="ms-2"
                  />
                </div>
                <div className="w-25 d-flex flex-row ">
                  <span>
                    Total Bets:{" "}
                    {selectedCheckedBet?.length > 0
                      ? selectedCheckedBet.length ?? 0
                      : ReportBetList?.rows?.length ?? 0}
                  </span>
                  <span className="ms-2">
                    Total Amount:{" "}
                    {parseFloat(
                      (selectedCheckedBet?.length > 0
                        ? selectedCheckedBet ?? []
                        : ReportBetList?.rows ?? []
                      )?.reduce((acc: any, match: any) => {
                        return acc + +match?.amount;
                      }, 0)
                    ).toFixed(2) || "0.00"}
                  </span>
                </div>
                <div className="w-25 d-flex flex-row justify-content-end">
                  <span>Search:</span>
                  <input
                    type="text"
                    className="ms-1"
                    style={{ border: "1px solid #ddd" }}
                    placeholder={`${ReportBetList?.count ?? 0} records...`}
                    onChange={(e) => handleSearchChange(e)}
                  />
                </div>
              </div>
            </>
          ) : (
            <div
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
              }}
            >
              <Col md={2} xs={12} className="mt-2">
                <SelectSearch
                  options={cardGames}
                  placeholder=""
                  onChange={setType}
                  value={type ? type : cardGames?.[0]}
                  isOptionDisabled={(option: any) => option.disabled}
                />
              </Col>
              <Col md={2} xs={12} className="mt-2">
                <CustomButton
                  style={{ paddingLeft: "6rem", paddingRight: "6rem" }}
                  size={isMobile ? "sm" : "lg"}
                  className={`${isMobile ? "w-100" : "w-100 bg-primary"
                    } border-0 fs-6`}
                  onClick={() => handleGame()}
                >
                  Submit
                </CustomButton>
              </Col>
              <div className="w-100 d-flex flex-row mt-2">
                <div className="w-50">
                  <div className="w-100 d-flex flex-row justify-content-start align-items-center">
                    <span className="me-1">Show</span>
                    <select
                      style={{ width: "35%", height: "30px" }}
                      onChange={(e) => handleLimit(e)}
                    >
                      <option value={10}>10</option>
                      <option value={20}>20</option>
                      <option value={30}>30</option>
                      <option value={40}>40</option>
                      <option value={50}>50</option>
                    </select>
                    <span className="ms-1">Entries</span>
                  </div>
                </div>
                <div className="w-50 d-flex flex-row justify-content-end">
                  <Form.Check
                    label="All"
                    name="matched"
                    type="radio"
                    id={""}
                    onChange={(e) => handleCheckboxChange(e)}
                    defaultChecked={true}
                    className="custom-checkbox"
                  />
                  <Form.Check
                    label="Back"
                    name="matched"
                    type="radio"
                    id={"back"}
                    onChange={(e) => handleCheckboxChange(e)}
                    // defaultChecked={selectedOption === "PENDING"}
                    className="ms-2 custom-checkbox"
                  />
                  <Form.Check
                    label="Lay"
                    name="matched"
                    type="radio"
                    id={"lay"}
                    onChange={(e) => handleCheckboxChange(e)}
                    // defaultChecked={selectedOption === "PENDING"}
                    className="ms-2 custom-checkbox"
                  />
                </div>
              </div>
              <div className="w-100 d-flex flex-row mt-2">
                <div className="w-50 d-flex flex-row align-items-center">
                  <span className="title-14">
                    Total Bets:{" "}
                    {selectedCheckedBet?.length > 0
                      ? selectedCheckedBet.length ?? 0
                      : ReportBetList?.rows?.length ?? 0}
                  </span>
                  <span className="ms-2 title-14">
                    {" "}
                    Total Amount:{" "}
                    {parseFloat(
                      (selectedCheckedBet?.length > 0
                        ? selectedCheckedBet ?? []
                        : ReportBetList?.rows ?? []
                      )?.reduce((acc: any, match: any) => {
                        return acc + +match?.amount;
                      }, 0)
                    ).toFixed(2) || "0.00"}
                  </span>
                </div>
                <div className="w-50 d-flex flex-row justify-content-end align-items-center">
                  <span className="title-14">Search:</span>
                  <input
                    type="text"
                    className="ms-1 w-50"
                    style={{ border: "1px solid #ddd" }}
                    placeholder={`${ReportBetList?.count ?? 0} records...`}
                    onChange={(e) => handleSearchChange(e)}
                  />
                </div>
              </div>
            </div>
          )}
          {/* {!isMobile && (
            <CustomTable
              bordered={true}
              striped={!isMobile}
              isPagination={true}
              // paginationCount={true}
              // isSearch={true}
              setTableConfig={setTableConfig}
              itemCount={
                ReportBetList && ReportBetList?.count > 0
                  ? ReportBetList?.count
                  : 0
              }
              columns={columns}
            >
              {ReportBetList && ReportBetList?.count === 0 && (
                <tr>No data available in table </tr>
              )}
              {ReportBetList?.count > 0 &&
                ReportBetList?.rows?.map((item: any, index: number) => (
                  <tr key={index}>
                    {columns.map((column) => (
                      <td
                        key={column.id}
                        className={
                          item.betType === "NO" || item.betType === "LAY"
                            ? "bg-red1 lh-1 f200"
                            : "bg-blue3 lh-1 f200"
                        }
                      >
                        {column.type === "date"
                          ? moment(_.get(item, column?.id)).format(
                              "MM/DD/YYYY hh:mm:ss A"
                            )
                          : column.type === "index"
                          ? `${
                              index +
                              1 +
                              tableConfig?.rowPerPage *
                                ((tableConfig?.page || 1) - 1)
                            }`
                          : _.get(item, column.id)}
                      </td>
                      // <td key={index}>{item.userName}</td>
                    ))}
                  </tr>
                ))}
            </CustomTable>
          )} */}
          <div
            className="table-responsive"
            style={{ border: "1px solid #f7f7f7" }}
          >
            <table
              style={{
                width: isMobile
                  ? gameType === "sports"
                    ? "800px"
                    : "100%"
                  : "100%",
                overflowX: "scroll",
              }}
            >
              {gameType === "sports" ? (
                <thead
                  className="w-100 d-flex align-items-center fbold"
                  style={{
                    height: "46px",
                    backgroundColor: isMobile ? "#FFC742" : "#f7f7f7",
                    fontSize: isMobile ? "12px" : "14px",
                    borderBottom: "1px solid #c7c8ca",
                    border: "1px solid #c7c8ca",
                    color: isMobile ? "#fff" : "#000",
                  }}
                >
                  <th
                    className="ps-2 justify-content-start h-100 d-flex align-items-center"
                    style={{ width: "12%" }}
                  >
                    Sports
                  </th>
                  <th
                    className="ps-2 justify-content-start h-100 d-flex align-items-center"
                    style={{ width: "20%", borderLeft: "1px solid #c7c8ca" }}
                  >
                    Event Name
                  </th>
                  <th
                    className="ps-2 justify-content-start h-100 d-flex align-items-center"
                    style={{ width: "20%", borderLeft: "1px solid #c7c8ca" }}
                  >
                    Market Name
                  </th>
                  <th
                    className="ps-2 justify-content-start h-100 d-flex align-items-center"
                    style={{ width: "18%", borderLeft: "1px solid #c7c8ca" }}
                  >
                    Nation
                  </th>
                  <th
                    className="pe-1 justify-content-end h-100 d-flex align-items-center"
                    style={{ width: "7%", borderLeft: "1px solid #c7c8ca" }}
                  >
                    User Rate
                  </th>
                  <th
                    className="pe-1 justify-content-end h-100 d-flex align-items-center"
                    style={{ width: "7%", borderLeft: "1px solid #c7c8ca" }}
                  >
                    Amount
                  </th>
                  <th
                    className="ps-1 justify-content-start h-100 d-flex align-items-center"
                    style={{ width: "12%", borderLeft: "1px solid #c7c8ca" }}
                  >
                    Place Date
                  </th>
                  <th
                    className="justify-content-center h-100 d-flex align-items-center"
                    style={{ width: "4%", borderLeft: "1px solid #c7c8ca" }}
                  >
                    <input
                      type="checkbox"
                      checked={
                        selectedCheckedBet?.length ===
                        ReportBetList?.rows?.length
                      }
                      onClick={() => {
                        if (
                          selectedCheckedBet?.length !==
                          ReportBetList?.rows?.length
                        ) {
                          setSelectedCheckedBet(ReportBetList.rows);
                        } else setSelectedCheckedBet([]);
                      }}
                    />
                  </th>
                </thead>
              ) : (
                <thead
                  className="w-100 d-flex align-items-center fbold"
                  style={{
                    height: "46px",
                    backgroundColor: isMobile ? "#FFC742" : "#f7f7f7",
                    fontSize: isMobile ? "12px" : "14px",
                    borderBottom: "1px solid #c7c8ca",
                    border: "1px solid #c7c8ca",
                    color: isMobile ? "#fff" : "#000",
                  }}
                >
                  <td
                    className="ps-2 justify-content-start h-100 d-flex align-items-center"
                    style={{ width: isMobile ? "19%" : "30%" }}
                  >
                    Event Name
                  </td>
                  <th
                    className="ps-2 justify-content-start h-100 d-flex align-items-center"
                    style={{
                      width: isMobile ? "18%" : "25%",
                      borderLeft: "1px solid #c7c8ca",
                    }}
                  >
                    Nation
                  </th>
                  <th
                    className={`pe-1 ${
                      isMobile
                        ? "justify-content-center"
                        : "justify-content-end"
                    } h-100 d-flex align-items-center`}
                    style={{
                      width: isMobile ? "18%" : "15%",
                      borderLeft: "1px solid #c7c8ca",
                    }}
                  >
                    User Rate
                  </th>
                  <th
                    className={`pe-1 ${
                      isMobile
                        ? "justify-content-center"
                        : "justify-content-end"
                    } h-100 d-flex align-items-center`}
                    style={{
                      width: isMobile ? "15%" : "10%",
                      borderLeft: "1px solid #c7c8ca",
                    }}
                  >
                    Amount
                  </th>
                  <th
                    className="ps-1 justify-content-start h-100 d-flex align-items-center"
                    style={{
                      width: isMobile ? "25%" : "16%",
                      borderLeft: "1px solid #c7c8ca",
                    }}
                  >
                    Place Date
                  </th>
                  <th
                    className="justify-content-center h-100 d-flex align-items-center"
                    style={{
                      width: isMobile ? "5%" : "4%",
                      borderLeft: "1px solid #c7c8ca",
                    }}
                  >
                    <input
                      type="checkbox"
                      checked={
                        selectedCheckedBet?.length ===
                        ReportBetList?.rows?.length
                      }
                      onClick={() => {
                        if (
                          selectedCheckedBet?.length !==
                          ReportBetList?.rows?.length
                        ) {
                          setSelectedCheckedBet(ReportBetList.rows);
                        } else setSelectedCheckedBet([]);
                      }}
                    />
                  </th>
                </thead>
              )}
              <tbody>
                {ReportBetList?.count > 0 &&
                  ReportBetList?.rows?.map((item: any, index: number) => {
                    return (
                      <>
                        {gameType === "sports" ? (
                          <tr
                            className={`w-100 d-flex align-items-center ${isMobile ? "title-12" : "title-14"
                              } ${item.betType === "NO" || item.betType === "LAY"
                                ? "bg-red4"
                                : "bg-blue5"
                              }`}
                            style={{
                              height: "46px",
                              borderBottom: "1px solid #c7c8ca",
                            }}
                            key={index}
                          >
                            <td
                              className="ps-2 justify-content-start h-100 d-flex align-items-center"
                              style={{ width: "12%" }}
                            >
                              {item.eventType}
                            </td>
                            <td
                              className="ps-2 justify-content-start h-100 d-flex align-items-center"
                              style={{
                                width: "20%",
                                borderLeft: "1px solid #c7c8ca",
                              }}
                            >
                              {item?.eventName}
                            </td>
                            <td
                              className="ps-2 justify-content-start h-100 d-flex align-items-center"
                              style={{
                                width: "20%",
                                borderLeft: "1px solid #c7c8ca",
                              }}
                            >
                              {item?.bettingName}
                            </td>
                            <td
                              className="ps-2 justify-content-start h-100 d-flex align-items-center"
                              style={{
                                width: "18%",
                                borderLeft: "1px solid #c7c8ca",
                              }}
                            >
                              {item?.teamName}
                            </td>
                            <td
                              className="pe-1 justify-content-end h-100 d-flex align-items-center"
                              style={{
                                width: "7%",
                                borderLeft: "1px solid #c7c8ca",
                              }}
                            >
                              {item?.odds}
                            </td>
                            <td
                              className="pe-1 justify-content-end h-100 d-flex align-items-center"
                              style={{
                                width: "7%",
                                borderLeft: "1px solid #c7c8ca",
                              }}
                            >
                              {item?.amount}
                            </td>
                            <td
                              className="ps-1 justify-content-start h-100 d-flex align-items-center"
                              style={{
                                width: "12%",
                                borderLeft: "1px solid #c7c8ca",
                              }}
                            >
                              {moment(item?.createdAt).format(
                                "DD/MM/YYYY hh:mm:ss A"
                              )}
                            </td>
                            <td
                              className="justify-content-center h-100 d-flex align-items-center"
                              style={{
                                width: "4%",
                                borderLeft: "1px solid #c7c8ca",
                              }}
                            >
                              <input
                                type="checkbox"
                                checked={selectedCheckedBet?.includes(item)}
                                onClick={() => {
                                  handleCheckboxToggle(item);
                                }}
                              />
                            </td>
                          </tr>
                        ) : (
                          <tr
                            className={`w-100 d-flex align-items-center ${isMobile ? "title-12" : "title-14"
                              } ${item.betType === "NO" || item.betType === "LAY"
                                ? "bg-red4"
                                : "bg-blue5"
                              }`}
                            style={{
                              height: "46px",
                              backgroundColor: "red",
                              borderBottom: "1px solid #c7c8ca",
                            }}
                            key={index}
                          >
                            <td
                              className="ps-2 justify-content-start h-100 d-flex align-items-center"
                              style={{ width: isMobile ? "19%" : "30%" }}
                            >
                              {item?.eventName}
                            </td>
                            <td
                              className="ps-2 justify-content-start h-100 d-flex align-items-center"
                              style={{
                                width: isMobile ? "18%" : "25%",
                                borderLeft: "1px solid #c7c8ca",
                              }}
                            >
                              {item?.teamName}
                            </td>
                            <td
                              className={`pe-1 ${
                                isMobile
                                  ? "justify-content-center"
                                  : "justify-content-end"
                              } h-100 d-flex align-items-center`}
                              style={{
                                width: isMobile ? "18%" : "15%",
                                borderLeft: "1px solid #c7c8ca",
                              }}
                            >
                              {item?.odds}
                            </td>
                            <td
                              className={`pe-1 ${
                                isMobile
                                  ? "justify-content-center"
                                  : "justify-content-end"
                              } h-100 d-flex align-items-center`}
                              style={{
                                width: isMobile ? "15%" : "10%",
                                borderLeft: "1px solid #c7c8ca",
                              }}
                            >
                              {item?.amount}
                            </td>
                            <td
                              className="ps-1 justify-content-start h-100 d-flex align-items-center"
                              style={{
                                width: isMobile ? "25%" : "16%",
                                borderLeft: "1px solid #c7c8ca",
                              }}
                            >
                              {moment(item?.createdAt).format(
                                "DD/MM/YYYY hh:mm:ss A"
                              )}
                            </td>
                            <td
                              className="justify-content-center h-100 d-flex align-items-center"
                              style={{
                                width: isMobile ? "5%" : "4%",
                                borderLeft: "1px solid #c7c8ca",
                              }}
                            >
                              <input
                                type="checkbox"
                                checked={selectedCheckedBet?.includes(item)}
                                onClick={() => {
                                  handleCheckboxToggle(item);
                                }}
                              />
                            </td>
                          </tr>
                        )}
                      </>
                    );
                  })}
              </tbody>
            </table>
            {ReportBetList?.count > 0 && (
              <div
                className={`w-100 d-flex justify-content-center align-items-center mt-4 ${
                  isMobile ? "flex-column" : "flex-row"
                }`}
              >
                <div
                  className="d-flex flex-row"
                  style={{ border: "1px solid #ddd" }}
                >
                  <div
                    className="d-flex flex-row justify-content-center align-items-center p-2 ps-3 pe-3"
                    style={{ fontSize: isMobile ? "12px" : "14px" }}
                    onClick={() => {
                      handlePageChange(1);
                      setSelectedCheckedBet([]);
                    }}
                  >
                    First
                  </div>
                  <div
                    className="d-flex flex-row justify-content-center align-items-center p-2 ps-3 pe-3"
                    style={{
                      borderLeft: "1px solid #ddd",
                      fontSize: isMobile ? "12px" : "14px",
                    }}
                    onClick={() => {
                      currentPage > 1
                        ? handlePageChange(currentPage - 1)
                        : null;
                      setSelectedCheckedBet([]);
                    }}
                  >
                    Previous
                  </div>
                  <div
                    className="d-flex flex-row justify-content-center align-items-center p-2 ps-3 pe-3"
                    style={{
                      borderLeft: "1px solid #ddd",
                      fontSize: isMobile ? "12px" : "14px",
                    }}
                    onClick={() => {
                      currentPage <
                        Math.floor((ReportBetList?.count || 0) / limit)
                        ? handlePageChange(currentPage + 1)
                        : null;
                      setSelectedCheckedBet([]);
                    }}
                  >
                    Next
                  </div>
                  <div
                    className="d-flex flex-row justify-content-center align-items-center p-2 ps-3 pe-3"
                    style={{
                      borderLeft: "1px solid #ddd",
                      fontSize: isMobile ? "12px" : "14px",
                    }}
                    onClick={() => {
                      handlePageChange(
                        Math.floor((ReportBetList?.count || 0) / limit)
                      );
                      setSelectedCheckedBet([]);
                    }}
                  >
                    Last
                  </div>
                </div>
                <div className={`d-flex flex-row ${isMobile ? "mt-1" : ""}`}>
                  <div className="ms-2">
                    <span className={`${isMobile ? "title-12" : "title-14"}`}>
                      Page
                    </span>
                    <span
                      className={`fbold ${isMobile ? "title-12" : "title-14"}`}
                    >
                      {currentPage} of{" "}
                      {Math.floor((ReportBetList?.count || 0) / limit)}
                    </span>
                    <span className={`${isMobile ? "title-12" : "title-14"}`}>
                      {" "}
                      | Go to Page
                    </span>
                  </div>
                  <input
                    type="number"
                    className="ms-1"
                    style={{ width: "80px", border: "1px solid #ddd" }}
                    value={currentPage}
                    min={1}
                    onChange={(e) => {
                      handlePageChange(e.target.value);
                      setSelectedCheckedBet([]);
                    }}
                  />
                </div>
              </div>
            )}
          </div>
        </Stack>
      </div>
      {/* {isMobile && (
        <CustomTable
          bordered={true}
          striped={!isMobile}
          isPagination={true}
          paginationCount={false}
          isSearch={false}
          setTableConfig={setTableConfig}
          itemCount={
            ReportBetList && ReportBetList?.count > 0 ? ReportBetList?.count : 0
          }
          columns={[]}
        >
          <Row className="row row5 mt-2">
            <Col className="col-12" colspan={12}>
              {ReportBetList?.count > 0 &&
                ReportBetList?.rows?.map((item: any, index: number) => {
                  return (
                    <div
                      className={`unsetteled-bet ${
                        item.betType === "NO" || item.betType === "LAY"
                          ? "bg-red1"
                          : "bg-blue3"
                      }`}
                      key={index}
                    >
                      <div className="row row5">
                        <div className="col-6 coloumn-6">
                          <div>
                            <a>
                              <span>{item.eventName}</span>
                            </a>
                          </div>
                          <div>
                            <span className="f600">
                              Event Type: {item.eventType}
                            </span>
                          </div>
                          <div>
                            <span className="f600">Market Name: </span>{" "}
                            {item?.marketType}
                          </div>
                          <div>
                            <span className="f600">Place Date: </span>{" "}
                            {moment(item?.createdAt).format(
                              "MM/DD/YYYY hh:mm:ss A"
                            )}
                          </div>
                          <div>
                            <span className="f600">Matched Date: </span>{" "}
                            {moment(item?.match?.startAt).format(
                              "MM/DD/YYYY hh:mm:ss A"
                            )}
                          </div>
                        </div>
                        <Col className="col-2 reportBody" colspan={6}>
                          <div>
                            <span className="f600">Nation</span>
                          </div>
                          <div>{item.teamName}</div>
                        </Col>
                        <div className="col-2 text-right reportBody">
                          <div>
                            <span className="f600">Rate</span>
                          </div>
                          <div>{item.odds}</div>
                        </div>
                        <div className="col-2 text-right reportBody">
                          <div>
                            <span className="f600">Amount</span>
                          </div>
                          <div>{item.amount}</div>
                        </div>
                      </div>
                    </div>
                  );
                })}
            </Col>
          </Row>
        </CustomTable>
      )} */}
    </ReportContainer>
  );
};

export default UnsettledBetComponent;

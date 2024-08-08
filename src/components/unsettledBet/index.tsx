import { Col, Form, Row, Stack } from "react-bootstrap";
import isMobile from "../../utils/screenDimension";
import CustomTable from "../commonComponent/table";
import ReportContainer from "../containers/reportContainer";
import { useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import {
  resetDataUnsettledMatch,
  settleUnsettleMatch,
} from "../../store/actions/match/matchListAction";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import moment from "moment";
import _ from "lodash";

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

const UnsettledBetComponent = () => {
  const dispatch: AppDispatch = useDispatch();
  const [tableConfig, setTableConfig] = useState<any>(null);
  const [selectedOption, setSelectedOption] = useState("PENDING");
  const { ReportBetList } = useSelector(
    (state: RootState) => state.currentBetList
  );

  const handleCheckboxChange = (e: any) => {
    setSelectedOption(e.target.id);
    if (e.target.id !== "UNMATCHED") {
      dispatch(
        settleUnsettleMatch({
          status: e.target.id,
          page: 1,
          limit: tableConfig?.rowPerPage,
          keyword: tableConfig?.keyword,
        })
      );
    } else {
      dispatch(resetDataUnsettledMatch());
    }
  };

  useEffect(() => {
    dispatch(
      settleUnsettleMatch({
        status: selectedOption,
        page: tableConfig?.page,
        limit: tableConfig?.rowPerPage,
        keyword: tableConfig?.keyword,
      })
    );
  }, [tableConfig]);
  return (
    <ReportContainer title="Un-Setteled Bet">
      <div>
        <Stack gap={2}>
          {!isMobile ? (
            <Row className="g-2 mt-1">
              <Col md={2} xs={4}>
                <Form.Check
                  label="Matched"
                  name="matched"
                  type="radio"
                  id={"PENDING"}
                  onChange={(e) => handleCheckboxChange(e)}
                  defaultChecked={selectedOption === "PENDING"}
                />
              </Col>
              <Col md={2} xs={4}>
                <Form.Check
                  label="Un-Matched"
                  name="matched"
                  type="radio"
                  id={"UNMATCHED"}
                  onChange={(e) => handleCheckboxChange(e)}
                  defaultChecked={selectedOption === "UNMATCHED"}
                />
              </Col>
              <Col md={2} xs={4}>
                <Form.Check
                  label="Deleted"
                  name="matched"
                  type="radio"
                  id={"DELETED"}
                  onChange={(e) => handleCheckboxChange(e)}
                  defaultChecked={selectedOption === "DELETED"}
                />
              </Col>
            </Row>
          ) : (
            <div
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <div
                style={{
                  width: "70%",
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-around",
                  alignItems: "center",
                  paddingTop: "10px",
                }}
              >
                <Form.Check
                  label="Matched"
                  name="matched"
                  type="radio"
                  id={"PENDING"}
                  onChange={(e) => handleCheckboxChange(e)}
                  defaultChecked={selectedOption === "PENDING"}
                />
                <Form.Check
                  label="Un-Matched"
                  name="matched"
                  type="radio"
                  id={"UNMATCHED"}
                  onChange={(e) => handleCheckboxChange(e)}
                  defaultChecked={selectedOption === "UNMATCHED"}
                />
                <Form.Check
                  label="Deleted"
                  name="matched"
                  type="radio"
                  id={"DELETED"}
                  onChange={(e) => handleCheckboxChange(e)}
                  defaultChecked={selectedOption === "DELETED"}
                />
              </div>
            </div>
          )}
          {!isMobile && (
            <CustomTable
              bordered={true}
              striped={!isMobile}
              isPagination={true}
              paginationCount={true}
              isSearch={true}
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
                          ? `${index + 1}`
                          : _.get(item, column.id)}
                      </td>
                      // <td key={index}>{item.userName}</td>
                    ))}
                  </tr>
                ))}
            </CustomTable>
          )}
        </Stack>
      </div>
      {isMobile && (
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
      )}
    </ReportContainer>
  );
};

export default UnsettledBetComponent;

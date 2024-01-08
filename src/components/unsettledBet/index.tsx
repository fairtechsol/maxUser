import { Col, Form, Row, Stack } from "react-bootstrap";
import isMobile from "../../utils/screenDimension";
import CustomTable from "../commonComponent/table";
import ReportContainer from "../containers/reportContainer";
import { useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import { settleUnsettleMatch } from "../../store/actions/match/matchListAction";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

interface Column {
  id: string;
  label: string;
}

const columns: Column[] = [
  {
    id: "no",
    label: "No",
  },
  {
    id: "event_name",
    label: "Event Name",
  },
  {
    id: "nation",
    label: "Nation",
  },
  {
    id: "event_type",
    label: "Event Type",
  },
  {
    id: "market_name",
    label: "Market Name",
  },
  {
    id: "side",
    label: "Side",
  },
  {
    id: "rate",
    label: "Rate",
  },
  {
    id: "amount",
    label: "Amount",
  },
  {
    id: "place_date",
    label: "Place Date",
  },
  {
    id: "match_date",
    label: "Match Date",
  },
];


const UnsettledBetComponent = () => {
  const dispatch: AppDispatch = useDispatch();
  const [tableConfig, setTableConfig] = useState<any>(null);
  const [selectedOption, setSelectedOption] = useState('MATCHED');
  const { ReportBetList } = useSelector((state: RootState) => state.currentBetList.ReportBetList);

  const handleCheckboxChange = (e: any) => {
    setSelectedOption(e.target.id);
    dispatch(settleUnsettleMatch({
      status: e.target.id,  
      page: 1,
      limit: tableConfig?.rowPerPage,
    }));
  };


  useEffect(() => {
    dispatch(settleUnsettleMatch({
      status: selectedOption,  
      page: 1,
      limit: tableConfig?.rowPerPage,
    }));
  }, [tableConfig]);
  return (
    <ReportContainer title="Un-Setteled Bet">
      <div>
        <Stack gap={2}>
          <Row className="g-2 mt-1">
            <Col md={2} xs={4}>
              <Form.Check
                label="Matched"
                name="matched"
                type="radio"
                id={"MATCHED"}
                onChange={(e)=>handleCheckboxChange(e)}
                defaultChecked={selectedOption === 'MATCHED'}
              />
            </Col>
            <Col md={2} xs={4}>
              <Form.Check
                label="Un-Matched"
                name="matched"
                type="radio"
                id={"UNMATCHED"}
                onChange={(e)=>handleCheckboxChange(e)}
                defaultChecked={selectedOption === 'UNMATCHED'}
              />
            </Col>
            <Col md={2} xs={4}>
              <Form.Check
                label="Deleted"
                name="matched"
                type="radio"
                id={"DELETED"}
                onChange={(e)=>handleCheckboxChange(e)}
                defaultChecked={selectedOption === 'DELETED'}
              />
            </Col>
          </Row>
          <CustomTable
            bordered={true}
            striped={!isMobile}
            isPagination={true}
            isSearch={true}
            setTableConfig={setTableConfig}
            itemCount={ReportBetList && ReportBetList?.count > 0 ? ReportBetList?.count : 0}
            columns={columns}
          >
            {ReportBetList && ReportBetList?.count === 0 && <tr>No data available in table </tr>}
            {ReportBetList?.count > 0 &&
              ReportBetList?.list?.map((item: any, index: number) => (
                <tr key={index}>
                  {columns.map((column) => (
                    <td key={column.id}>{item[column.id]}</td>
                    // <td key={index}>{item.userName}</td>
                  ))}
                </tr>
              ))}
            {/* <tr className={`${isMobile && "title-12"}`}>
              <td>123456</td>
              <td>123456</td>
              <td>123456</td>
              <td>123456</td>
              <td>123456</td>
              <td>123456</td>
              <td>123456</td>
              <td>123456</td>
              <td>123456</td>
              <td>123459999999996</td>
            </tr> */}
          </CustomTable>
        </Stack>
      </div>
    </ReportContainer>
  );
};

export default UnsettledBetComponent;

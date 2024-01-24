import { Col, Row, Stack } from "react-bootstrap";

import moment from "moment";
import { useEffect, useState } from "react";
import "react-calendar/dist/Calendar.css";
import DatePicker from "react-date-picker";
import "react-date-picker/dist/DatePicker.css";
import { useDispatch, useSelector } from "react-redux";
import { getAccountStatement } from "../../store/actions/user/userAction";
import { AppDispatch, RootState } from "../../store/store";
import { transType } from "../../utils/constants";
import isMobile from "../../utils/screenDimension";
import SelectSearch from "../commonComponent/SelectSearch";
import CustomButton from "../commonComponent/button";
import NotSet from "../commonComponent/notSet";
import CustomTable from "../commonComponent/table";
import ReportContainer from "../containers/reportContainer";

const AccountStatementComponent = () => {
  const [from, setFrom] = useState<any>(new Date());
  const [to, setTo] = useState<any>(new Date());
  const [type, setType] = useState<any>("");
  const [firstTime, setFirstTime] = useState<any>(false);

  const [tableConfig, setTableConfig] = useState<any>(null);
  const dispatch: AppDispatch = useDispatch();

  const { transactions, getProfile } = useSelector(
    (state: RootState) => state.user.profile
  );
  useEffect(() => {
    if (getProfile?.id && tableConfig && firstTime) {
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
        filter += `&statementType=${type?.value}`;
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

  return (
    <ReportContainer title="Account Statement">
      <div>
        <Stack gap={2}>
          <Row className="g-2 mt-1">
            <Col md={2} xs={6}>
              <DatePicker
                onChange={setFrom}
                format="y-MM-dd"
                value={from}
                closeCalendar={false}
                clearIcon={false}
                className="w-100"
              />
              {/* <CustomInput type="date" style={{ appearance: "textfield" }} /> */}
            </Col>
            <Col md={2} xs={6}>
              <DatePicker
                onChange={setTo}
                value={to}
                format="y-MM-dd"
                closeCalendar={false}
                clearIcon={false}
                className="w-100"
              />
              {/* <CustomInput type="date" /> */}
            </Col>
            <Col md={2} xs={12}>
              <SelectSearch
                options={[
                  {
                    value: "",
                    label: "All",
                  },
                  {
                    value: "addWithdraw",
                    label: "Deposit/Withdraw Report",
                  },
                  {
                    value: "game",
                    label: "Game Report",
                  },
                ]}
                placeholder="All"
                onChange={setType}
                value={type}
                defaultValue={""}
              />
            </Col>
            <Col md={2} xs={12}>
              <CustomButton
                size={isMobile ? "sm" : "lg"}
                className={`${
                  isMobile ? "w-100" : " bg-primaryBlue"
                } border-0 `}
                onClick={() => {
                  if (getProfile?.id && tableConfig) {
                    let filter = "";

                    if (from && to) {
                      filter += `&createdAt=between${moment(
                        new Date(from)
                      )?.format("YYYY-MM-DD")}|${moment(
                        new Date(to).setDate(to.getDate() + 1)
                      )?.format("YYYY-MM-DD")}`;
                    } else if (from) {
                      filter += `&createdAt=gte${moment(from)?.format(
                        "YYYY-MM-DD"
                      )}`;
                    } else if (to) {
                      filter += `&createdAt=lte${moment(to)?.format(
                        "YYYY-MM-DD"
                      )}`;
                    }
                    if (type) {
                      filter += `&statementType=${type?.value}`;
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
                  setFirstTime(true);
                }}
              >
                Submit
              </CustomButton>
            </Col>
          </Row>
          <CustomTable
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
                label: "Balance",
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
              return (
                <tr className={`${isMobile && "title-12"}`} key={index}>
                  <td>
                    {moment(new Date(item?.createdAt)).format(
                      "YYYY-MM-DD hh:mm"
                    )}
                  </td>
                  <td>
                    {index +
                      (tableConfig?.rowPerPage || 15) *
                        (tableConfig?.page - 1 || 0) +
                      1}
                  </td>
                  <td className="color-green">
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
                  <td className="color-red">
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
                      parseInt(item?.closingBalance) < 0
                        ? "color-red"
                        : parseInt(item?.closingBalance) > 0
                        ? "color-green"
                        : ""
                    }
                  >
                    {" "}
                    <NotSet item={item?.closingBalance} />
                  </td>
                  <td>
                    <NotSet item={item?.description} />
                  </td>
                </tr>
              );
            })}
          </CustomTable>
        </Stack>
      </div>
    </ReportContainer>
  );
};

export default AccountStatementComponent;

import { Table } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { RootState } from "../../../../../../store/store";
import BackLayComponent from "./backlayComponent";
import "./style.scss";

const tableHeading = [
  {
    id: "game",
    name: "Game",
  },
  {
    id: "1",
    name: "1",
    colspan: 2,
    textAlign: "center",
  },
  {
    id: "x",
    name: "X",
    colspan: 2,
    textAlign: "center",
  },
  {
    id: "2",
    name: "2",
    colspan: 2,
    textAlign: "center",
  },
];

const DesktopOneVOneGameTable = ({ data }: any) => {
  const { getMatchList } = useSelector(
    (state: RootState) => state.match.matchList
  );

  console.log(getMatchList);

  return (
    <Table>
      <thead>
        <tr>
          {tableHeading?.map((item) => (
            <th
              className={`title-14 ${
                item?.textAlign === "center" ? "text-center" : ""
              }`}
              colSpan={item?.colspan}
              key={item?.id}
            >
              {item?.name}
              {/* {getMatchList } */}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {getMatchList &&
          getMatchList?.map((item: any, index: number) => {
            return (
              <tr className="one-v-one-row overflow-hidden" key={index}>
                <td className="px-2 w-50">
                  <div className="d-flex justify-content-between">
                    <Link
                      className="text-decoration-none"
                      to={`/game-detail/${item?.id}`}
                    >
                      <div className="one-v-one-title title-14">
                        {item?.competitionName}
                      </div>
                    </Link>
                    <div className="d-flex gap-2"></div>
                  </div>
                </td>

                <BackLayComponent backRate={1.26} layRate={2.38} />
                <BackLayComponent backRate={"-"} layRate={"-"} />
                <BackLayComponent backRate={1} layRate={2.38} />
              </tr>
            );
          })}
      </tbody>
    </Table>
  );
};

export default DesktopOneVOneGameTable;

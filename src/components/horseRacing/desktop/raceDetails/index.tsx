import moment from "moment";
import { NavLink } from "react-router-dom";

const RaceDetails = ({ matchName, item }: any) => {
  return (
    <>
      <div className="coupon-card coupon-card-first p-0">
        <div className="card-content">
          <table className="table coupon-table table-bordered ">
            <tbody>
              <tr>
                <td style={{ width: "30%" }}>
                  <a className="text-dark">{matchName}</a>
                </td>
                <td>
                  <div className="horse-time-detail">
                    {item?.map((race: any) => (
                      <NavLink to={`/race/${race?.id}`} key={race?.id}>
                        <span>{moment(race.startAt).format("HH:mm")}</span>
                      </NavLink>
                    ))}
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default RaceDetails;

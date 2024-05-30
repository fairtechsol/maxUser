import moment from "moment";
import { NavLink } from "react-router-dom";

const RaceListItems = ({ matchName, item }: any) => {
  const remainingTime = (item: any) => {
    const endTime = moment(item.startAt);
    const currentTime = moment();
    const duration = moment.duration(endTime.diff(currentTime));

    const minutes = duration.minutes();

    if (minutes <= item?.betPlaceStartBefore) {
      return true;
    } else return false;
  };

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
                        <span
                          className={
                            new Date().getTime() >=
                            new Date(
                              new Date(race?.startAt).setMinutes(
                                new Date(race?.startAt).getMinutes() -
                                  parseInt(race?.betPlaceStartBefore)
                              )
                            ).getTime()
                              ? `active`
                              : ""
                          }
                        >
                          {moment(race.startAt).format("HH:mm")}
                        </span>
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

export default RaceListItems;

import moment from "moment";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

const RaceListItems = ({ matchName, item }: any) => {
  const [labelsVisible, setLabelsVisible] = useState<{
    [key: string]: boolean;
  }>({});

  useEffect(() => {
    const checkTimeRemaining = () => {
      const currentTime = new Date().getTime();
      const updatedLabelsVisible: { [key: string]: boolean } = {};

      item?.forEach((race: any) => {
        const matchStartTime = new Date(race.startAt).getTime();
        const betPlaceStartBefore =
          parseInt(race.betPlaceStartBefore) * 60 * 1000;
        const timeDifference = matchStartTime - currentTime;
        updatedLabelsVisible[race.id] = timeDifference < betPlaceStartBefore;
      });

      setLabelsVisible(updatedLabelsVisible);
    };

    checkTimeRemaining();

    const intervalId = setInterval(checkTimeRemaining, 60 * 1000);

    return () => clearInterval(intervalId);
  }, [item]);

  return (
    <div className="coupon-card coupon-card-first p-0">
      <div className="card-content p-0">
        <table className="table coupon-table table-bordered p-0">
          <tbody className="p-0">
            <tr>
              <td style={{ width: "30%" }}>
                <a className="text-dark">{matchName}</a>
              </td>
              <td>
                <div className="horse-time-detail">
                  {item?.map((race: any) => (
                    <NavLink to={`/race/${race?.id}`} key={race?.id}>
                      <span className={labelsVisible[race.id] ? `active` : ""}>
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
  );
};

export default RaceListItems;

import service from "../service";
import { tvApi } from "./constants";

export const getTvData = async (
  eventId: string,
  setTvData: any,
  sportType = "cricket",
  isTv = false,
  isScore = false
) => {
  try {
    const response: any = await service.get(
      `${tvApi}/getIframeUrl/${eventId}?sportType=${sportType}&isTv=${isTv}&isScore=${isScore}`
    );
    if (response) {
      setTvData((prev: any) => {
        if (isTv && isScore) {
          return {
            ...prev,
            scoreData: response?.scoreData,
            tvData: response?.tvData,
          };
        } else if (isTv) {
          return {
            ...prev,
            tvData: response?.tvData,
          };
        } else if (isScore) {
          return {
            ...prev,
            scoreData: response?.scoreData,
          };
        }
      });
    }
  } catch (e) {
    console.log("Error:", e?.message);
    setTvData(null);
  }
};

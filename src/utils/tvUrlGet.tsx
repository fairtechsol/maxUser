import service from "../service";
import { tvApi } from "./constants";

export const getTvData = async (eventId: string, setTvData: any,sportType="cricket") => {
  try {
    const response: any = await service.get(
      `${tvApi}/getIframeUrl/${eventId}?sportType=${sportType}`
    );
    if (response) {
      setTvData(response);
    }
  } catch (e) {
    console.log("Error:", e?.message);
    setTvData(null);
  }
};

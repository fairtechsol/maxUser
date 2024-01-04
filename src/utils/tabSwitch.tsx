import { expertSocketService } from "../socketManaget";

export const onTabSwitch = (getMatchList: any) => {
  if (document.visibilityState === "hidden") {
    expertSocketService.match.leaveAllRooms();
  } else {
    // Tab is active, join the room
    if (getMatchList) {
      getMatchList?.forEach((element: any) => {
        expertSocketService.match.joinMatchRoom(element?.id);
      });
    }
  }
};

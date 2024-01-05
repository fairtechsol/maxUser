import { expertSocketService } from "../socketManaget";

export const onTabSwitch = (getMatchList: any, roleName: any) => {
  if (document.visibilityState === "hidden") {
    expertSocketService.match.leaveAllRooms();
    getMatchList?.forEach((element: any) => {
      expertSocketService.match.leaveMatchRoom(element?.id);
    });
  } else {
    // Tab is active, join the room
    if (getMatchList) {
      getMatchList?.forEach((element: any) => {
        expertSocketService.match.joinMatchRoom(element?.id, roleName);
      });
    }
  }
};

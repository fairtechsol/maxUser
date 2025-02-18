import { expertSocketService } from "../socketManager";

export const onTabSwitch = (matchList: any) => {
  if (document.visibilityState === "hidden") {
    expertSocketService.match.leaveAllRooms();
    matchList?.forEach((element: any) => {
      // expertSocketService.match.leaveMatchRoom(element?.id);
    });
  } else {
    // Tab is active, join the room
    if (matchList) {
      matchList?.forEach((element: any) => {
        expertSocketService.match.joinMatchRoom(element?.id);
      });
    }
  }
};

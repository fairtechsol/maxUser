import { expertSocket, matchSocket } from ".";

export const matchSocketService = {
  joinMatchRoom: (matchId: any) => {
    expertSocket?.emit("matchRoom", {
      id: matchId,
    });

    // matchSocket?.emit("initCricketData", {
    //   matchId: matchId,
    //   roleName: roleName,
    // });
  },
  leaveAllRooms: () => {
    matchSocket?.emit("leaveAll");
  },
  leaveMatchRoom: (matchId: any) => {
    matchSocket?.emit("disconnectCricketData", {
      matchId: matchId,
    });
  },
  matchAdded: (callback: any) => {
    expertSocket?.on("addMatch", callback);
  },
  getMatchRates: (matchId: any, callback: any) => {
    matchSocket?.on(`liveData${matchId}`, callback);
  },
  matchAddedOff: () => {
    expertSocket?.off("addMatch");
  },
  getMatchRatesOff: (matchId: any) => {
    matchSocket?.off(`liveData${matchId}`);
  },
};

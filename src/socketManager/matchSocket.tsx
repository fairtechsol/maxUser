import { expertSocket, matchSocket, socket } from ".";

export const matchSocketService = {
  joinMatchRoom: (matchId: any, roleName: any) => {
    expertSocket?.emit("matchRoom", {
      id: matchId,
    });

    matchSocket?.emit("initCricketData", {
      matchId: matchId,
      roleName: roleName,
    });
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
    socket?.on("addMatch", callback);
  },
  getMatchRates: (matchId: any, callback: any) => {
    matchSocket?.on(`liveData${matchId}`, callback);
  },
  matchAddedOff: () => {
    socket?.off("addMatch");
  },
  getMatchRatesOff: (matchId: any) => {
    matchSocket?.off(`liveData${matchId}`);
  },
};

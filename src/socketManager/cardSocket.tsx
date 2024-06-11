import { cardSocket, socket } from ".";

export const cardSocketService = {
  joinMatchRoom: (matchType: any) => {
    cardSocket?.emit("initLiveData", {
      liveGameTypeId: matchType,
    });
  },
  getCardRates: (gameTypeId: any, callback: any) => {
    cardSocket?.on(`liveGameData${gameTypeId}`, callback);
  },
  leaveMatchRoom: (gameTypeId: any) => {
    cardSocket?.emit("disconnectLiveGame", {
      liveGameTypeId: gameTypeId,
    });
  },
  leaveAllRooms: () => {
    cardSocket?.emit("leaveAll");
  },
  getCardRatesOff: (gameTypeId: any) => {
    cardSocket?.off(`liveGameData${gameTypeId}`);
  },
  userCardBetPlaced: (callback: any) => {
    socket?.on("userCardBetPlaced", callback);
  },
  userCardBetPlacedOff: () => {
    socket?.off("userCardBetPlaced");
  },
};

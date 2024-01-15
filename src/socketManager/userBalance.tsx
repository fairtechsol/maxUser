import { socket } from ".";

export const userBalanceSocketService = {
  updateUserBalance: (callback: any) => {
    socket.on("updateUserBalance", callback);
  },
  userSessionBetPlaced: (callback: any) => {
    socket.on("userSessionBetPlaced", callback);
  },
  userMatchBetPlaced: (callback: any) => {
    socket.on("userMatchBetPlaced", callback);
  },
};

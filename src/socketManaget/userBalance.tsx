import { socket } from ".";

export const userBalanceSocketService = {
  updateUserBalance: (callback: any) => {
    socket.on("updateUserBalance", callback);
  },
};

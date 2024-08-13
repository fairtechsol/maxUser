import { socket } from ".";

export const userBalanceSocketService = {
  updateUserBalance: (callback: any) => {
    socket?.on("updateUserBalance", callback);
  },
  userSessionBetPlaced: (callback: any) => {
    socket?.on("userSessionBetPlaced", callback);
  },
  userMatchBetPlaced: (callback: any) => {
    socket?.on("userMatchBetPlaced", callback);
  },
  matchResultDeclared: (callback: any) => {
    socket?.on("matchResult", callback);
  },
  matchResultUnDeclared: (callback: any) => {
    socket?.on("matchResultUnDeclare", callback);
  },
  declaredMatchResultAllUser: (callback: any) => {
    socket?.on("matchResultDeclareAllUser", callback);
  },
  unDeclaredMatchResultAllUser: (callback: any) => {
    socket?.on("matchResultUnDeclareAllUser", callback);
  },
  matchDeleteBet: (callback: any) => {
    socket?.on("matchDeleteBet", callback);
  },
  sessionDeleteBet: (callback: any) => {
    socket?.on("sessionDeleteBet", callback);
  },
  sessionResult: (callback: any) => {
    socket?.on("sessionResult", callback);
  },
  sessionNoResult: (callback: any) => {
    socket?.on("sessionNoResult", callback);
  },
  sessionResultUnDeclare: (callback: any) => {
    socket?.on("sessionResultUnDeclare", callback);
  },
  updateDeleteReason: (callback: any) => {
    socket?.on("updateDeleteReason", callback);
  },
  updateUserBalanceOff: () => {
    socket?.off("updateUserBalance");
  },
  userSessionBetPlacedOff: () => {
    socket?.off("userSessionBetPlaced");
  },
  userMatchBetPlacedOff: () => {
    socket?.off("userMatchBetPlaced");
  },
  matchResultDeclaredOff: () => {
    socket?.off("matchResult");
  },
  matchResultUnDeclaredOff: () => {
    socket?.off("matchResultUnDeclare");
  },
  declaredMatchResultAllUserOff: () => {
    socket?.off("matchResultDeclareAllUser");
  },
  unDeclaredMatchResultAllUserOff: () => {
    socket?.off("matchResultUnDeclareAllUser");
  },
  matchDeleteBetOff: () => {
    socket?.off("matchDeleteBet");
  },
  sessionDeleteBetOff: () => {
    socket?.off("sessionDeleteBet");
  },
  sessionResultOff: () => {
    socket?.off("sessionResult");
  },
  sessionNoResultOff: () => {
    socket?.off("sessionNoResult");
  },
  sessionResultUnDeclareOff: () => {
    socket?.off("sessionResultUnDeclare");
  },
  updateDeleteReasonOff: () => {
    socket?.off("updateDeleteReason");
  },
};

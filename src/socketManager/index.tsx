import io from "socket.io-client";
import { Constants, baseUrls } from "../utils/constants";
import { authSocketService } from "./authSocket";
import { cardSocketService } from "./cardSocket";
import { matchSocketService } from "./matchSocket";
import { userBalanceSocketService } from "./userBalance";

export let socket: any = null;
export let expertSocket: any = null;
export let matchSocket: any = null;
export let cardSocket: any = null;

export const initialiseSocket = () => {
  socket = io(baseUrls.socket, {
    transports: [`${Constants.WEBSOCKET}`, `${Constants.POLLING}`],
    auth: {
      token: `${sessionStorage.getItem("jwtMaxUser")}`,
    },
  });
  expertSocket = io(baseUrls.expertSocket, {
    transports: [`${Constants.WEBSOCKET}`, `${Constants.POLLING}`],
    auth: {
      token: `${sessionStorage.getItem("jwtMaxUser")}`,
    },
  });
  // matchSocket = io(baseUrls.matchSocket, {
  //   transports: [
  //     process.env.NODE_ENV === "production"
  //       ? `${Constants.POLLING}`
  //       : `${Constants.WEBSOCKET}`,
  //   ],
  // });
  cardSocket = io(baseUrls.cardSocket, {
    transports: [`${Constants.POLLING}`, `${Constants.WEBSOCKET}`],
  });
};

export const initialiseMatchSocket = (matchId: string[]) => {
  matchSocket = io(baseUrls.matchSocket, {
    transports: [
      process.env.NODE_ENV === "production"
        ? `${Constants.POLLING}`
        : `${Constants.WEBSOCKET}`,
    ],
    query: {
      matchIdArray: matchId,
      roleName: "user"
    },
  });
};

export const socketService = {
  connect: () => {
    initialiseSocket();
    // Connect to the socket server
    socket?.connect();
    expertSocket?.connect();
    // matchSocket?.connect();
    cardSocket?.connect();
  },
  disconnect: () => {
    // Disconnect from the socket server
    socket?.disconnect();
    expertSocket?.disconnect();
    // matchSocket?.disconnect();
    cardSocket?.disconnect();
  },
  auth: { ...authSocketService },
  userBalance: { ...userBalanceSocketService },
  card: { ...cardSocketService },
  // Add other socket-related methods as needed
};

export const matchService = {
  connect: (matchId: string[]) => {
    initialiseMatchSocket(matchId);
    matchSocket?.connect();

    matchSocket?.on("reconnect", () => {
      console.log("match reconnet");
    });
    matchSocket?.on("disconnect", () => {
      console.log("match disconnect");
    });
    matchSocket?.on("connect", () => {
      console.log("match connect");
    });
  },
  disconnect: () => {
    matchSocket?.disconnect();
  },
};

export const expertSocketService = {
  match: { ...matchSocketService },
};

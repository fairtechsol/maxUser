import io from "socket.io-client";
import { baseUrls } from "../utils/constants";
import { authSocketService } from "./authSocket";
import { matchSocketService } from "./matchSocket";
import { userBalanceSocketService } from "./userBalance";

export const socket = io(baseUrls.socket, {
  transports: ["websocket"],
  auth: {
    token: `${sessionStorage.getItem("userToken")}`,
  },
});

export const expertSocket = io(baseUrls.expertSocket, {
  transports: ["websocket"],
  auth: {
    token: `${sessionStorage.getItem("userToken")}`,
  },
});

export const matchSocket = io(baseUrls.matchSocket, {
  transports: ["websocket"],
});

export const socketService = {
  connect: () => {
    // Connect to the socket server
    socket.connect();
    expertSocket.connect();
    matchSocket.connect();
  },
  disconnect: () => {
    // Disconnect from the socket server
    socket.disconnect();
    expertSocket.disconnect();
    matchSocket.disconnect();
  },
  auth: { ...authSocketService },
  userBalance: { ...userBalanceSocketService },
  // Add other socket-related methods as needed
};

export const expertSocketService = {
  match: { ...matchSocketService },
};

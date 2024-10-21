"use client";

import { io } from "socket.io-client";

const routeBackend = process.env.BACKEND_URI || "http://localhost:3001";
if (!routeBackend) {
  throw new Error("BACKEND_URI is not defined");
}

export const socket = io(routeBackend);

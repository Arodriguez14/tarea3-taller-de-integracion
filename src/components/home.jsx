//import React, { useState, useEffect } from 'react';
import { io } from "socket.io-client";
const ENDPOINT = "wss://tarea-3-websocket.2021-1.tallerdeintegracion.cl";

const socket = io(ENDPOINT, {
    path: '/flights'
});


export default socket;
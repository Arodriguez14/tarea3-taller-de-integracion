import React, { useState, useEffect, useRef } from "react";
import socket from "./home";
import "../App.css";
import "../map.css";
import { io } from "socket.io-client";
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'


const ENDPOINT = "wss://tarea-3-websocket.2021-1.tallerdeintegracion.cl";
const position = [0,0]

const styles = {
    map: {
      height: '100%',
      borderRadius: 10,
    },
  };

const Map = () => {

  return (
    <div>
        <div id="mapa">
        <MapContainer center={position} zoom={0} minZoom={1} scrollWheelZoom={false} style={styles.map}>
          <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          </MapContainer>

        </div>
    </div>
  );
};

export default Map;
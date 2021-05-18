import React, { useState, useEffect } from "react";
import socket from "./home";
import "../App.css";
import "../map.css";
import { Container, Modal, Icon as IconRsuite, Loader } from 'rsuite';
import { io } from "socket.io-client";
import { MapContainer, TileLayer, Marker, Popup, Polyline, CircleMarker } from 'react-leaflet';
import plane from "./img/plane-icon.png";
import {Icon} from 'leaflet';

const position = [0,0];
var seteado = false;



const PlaneIcon = new Icon({
    iconUrl: plane,
    iconSize: [20, 20]
})
const Map = () => {
    const [flightInfo, setFlightInfo] = useState({"code": "",
        "airline": "",
        "origin": [],
        "destination": [],
        "plane": "",
        "seats": 0,
        "passengers": [] });
    const [showPlane, setShowPlane] = useState(false)
    const [allPositions, setAllPositions] = useState([]); // Posiciones actuales de todos los aviones
    const [allFlights, setAllFlights] = useState([]); // Lista de vuelos (dicts)
    const [trajectory, setTrajectory] = useState([]) /// Lista de todas las posiciones de un avion
    const [allLines, setAllLines] = useState([])
    const disconnectSocket = () => {
        socket.disconnect();
    };
    
    const styles = {
        map: {
          height: '100%',
          borderRadius: 10,
        },
        info: {
            display: showPlane ? '' : 'none',
          },
      };

    useEffect(() => {
        socket.on("POSITION", obj => {
            setTrajectory(prev => ([...prev, obj]));
            for (var i = 0; i < allPositions.length;  i ++){
                if (allPositions[i].code === obj.code){
                    allPositions[i].origin = obj.position
                    setAllPositions(allPositions)
                    
                }
            };
        })
        return () => disconnectSocket();
    }, []);
    socket.emit("FLIGHTS");
    useEffect(() => {
        socket.on("FLIGHTS",(flights) => {
            if (seteado === false){
                flights.forEach(element => {
                    allFlights.push(element);
                    setAllFlights([allFlights])
                    allLines.push([element.origin, element.destination])
                    var dict = {"origin": element.origin, "code": element.code}
                    allPositions.push(dict);
                    setAllPositions(allPositions)
                    seteado = true
                });    
            };  
        });
        return () => disconnectSocket();
    }, []);
    
    const setPlaneInfo = (planecode) => {
        allFlights[0].forEach(element => {
            if (element.code == planecode){
                setFlightInfo({"code": element.code,
                "airline": element.airline,
                "origin": element.origin,
                "destination": element.destination,
                "plane": element.plane,
                "seats": element.seats,
                "passengers": element.passengers})
            }
        });
        setShowPlane(true)
      }
    
    return (
        <div>
            <div id="mapa">
                <MapContainer center={position} zoom={0} minZoom={1} scrollWheelZoom={false} style={styles.map}>
                    <TileLayer
                        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    {allPositions.map(element => {
                    return (
                        <Marker position={element.origin} icon={PlaneIcon}>
                            <Popup code={element.code}>
                                <code positionCode={element.code}>{element.code}</code>
                                <a onClick={() => setPlaneInfo(element.code)}>Ver más</a>
                            </Popup>
                        </Marker> )
                    
                    })};
                    {allLines.map(element=> {
                        return (
                        <Polyline
                        positions={element}
                        />
                        )
                    })};
                    {allLines.map(element=> {
                        return (
                        <CircleMarker
                            center={element[0]}
                            >
                        </CircleMarker>
                        )
                    })};
                    {allLines.map(element=> {
                        return (
                        <CircleMarker
                            center={element[1]}
                            >
                        </CircleMarker>
                        )
                    })};
                    {
                    trajectory.map(function(trajecto) {
             
                    return (
                    <CircleMarker
                        center={{lat:trajecto.position[0], lng: trajecto.position[1]}}
                        color={'red'}
                        radius={1}>
                    </CircleMarker>
                    )})
                    }
                </MapContainer>
            </div>
            <div>
                <Modal show={showPlane} overflow backdrop onHide={() => setShowPlane(false)}>
                    <button className="boton"
                    onClick={() => setShowPlane(false)}>Close Info</button>
                </Modal>
                <Container style={styles.info}>
                    <div className="info">
                        <h2>Info Vuelo</h2>
                            <p>Code: {flightInfo.code}</p>
                            <p>Airline: {flightInfo.airline}</p>
                            <p>Origin: {flightInfo.origin[0]},{flightInfo.origin[1]}</p>
                            <p>Destination: {flightInfo.destination[0]},{flightInfo.destination[1]}</p>
                            <p>Plane: {flightInfo.plane}</p>
                            <p>Seats: {flightInfo.seats}</p>
                            <p>Passangers: </p>
                            {flightInfo.passengers.map((passenger, index) => (
                                <p key={index.toString()}>- {passenger.name}: {passenger.age} años.</p>
                            ))}
                    </div>
                </Container>
            </div>
        </div>
    );
  }
  

export default Map;
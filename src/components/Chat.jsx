import React, { useState, useEffect, useRef } from "react";
import socket from "./home";
import "../App.css";
import { io } from "socket.io-client";


const ENDPOINT = "wss://tarea-3-websocket.2021-1.tallerdeintegracion.cl";


const Chat = ({ nombre }) => {
  const [mensaje, setMensaje] = useState("");
  const [mensajes, setMensajes] = useState([]);
  const setUpSocket = () => {
    const socket = io(ENDPOINT, {
      path: '/flights'
    });
    console.log("set UP")
    socket.on('CHAT', (mensaje) => {
      mensajes.push(mensaje);
      setMensaje(mensaje); 
      setMensajes(mensajes) 
    });
    };
  const disconnectSocket = () => {
    socket.disconnect();
  };
    
  useEffect(() => {
    setUpSocket();

    return () => disconnectSocket();
    }, []);

  const divRef = useRef(null);
  useEffect(() => {
    divRef.current.scrollIntoView({ behavior: "smooth" });
  });

  const submit = (e) => {
    e.preventDefault();
    socket.emit('CHAT', {
        name: nombre,
        message: mensaje,
        date: '09/05/2021'
        });
    setMensaje("");
    setMensajes([...mensajes, mensaje]);
  };

  return (
    <div>
      <div className="chat">
        {mensajes.map((e, i) => (
          <div key={i}>
            <div>{Date(e.date)}-{e.name}:</div>
            <div>{e.message}</div>
          </div>
        ))}
        <div ref={divRef}></div>
      </div>
      <div className="text">
      <form onSubmit={submit}>
        <textarea
          name=""
          id=""
          cols="30"
          rows="10"
          value={mensaje}
          onChange={(e) => setMensaje(e.target.value)}
        >
        
        </textarea>
        <button>Enviar</button>
      </form>
      </div>

    </div>
  );
};

export default Chat;
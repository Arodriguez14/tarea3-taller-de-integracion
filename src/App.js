import React, { useState } from "react";
import Chat from "./components/Chat";
import Map from "./components/Map";
import "./App.css";

function App() {
  const [nombre, setNombre] = useState("");
  const [registrado, setRegistrado] = useState(false);

  const registrar = (e) => {
    e.preventDefault();
    if (nombre !== "") {
      setRegistrado(true);
    }
  };

  return (
    <div>
      <div className="wrapper">
        <div>
          <Map></Map>
        </div>
        <div className="derecha">
          {!registrado && (
            <form onSubmit={registrar}>
              <label htmlFor="">Introduzca su nombre</label>
              <input value={nombre} onChange={(e) => setNombre(e.target.value)} />
              <br></br>
              <button>Ir al chat</button>
            </form>
          )}

          {registrado && <Chat nombre={nombre} />}
        </div>
      </div>
    </div>
  );
}

export default App;
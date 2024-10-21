import React from 'react';
import './App.css';
import Card from './card/Card';
import logo from './images/manolingua_logo_w.png'; // Asegúrate de que la ruta es correcta

function App() {

  // Define el nombre de las imágenes en 'src/images/abc/'
  const cardData = [
    { imageName: 'A.png' },
    { imageName: 'B.png' },
    { imageName: 'C.png' },
    { imageName: 'D.png' },
    { imageName: 'E.png' },
    { imageName: 'F.png' },
    { imageName: 'G.png' },
    { imageName: 'H.png' },
    { imageName: 'I.png' },
    { imageName: 'J.png' },
    { imageName: 'K.png' },
    { imageName: 'L.png' },
    { imageName: 'M.png' },
    { imageName: 'N.png' },
    { imageName: 'Ñ.png' },
    { imageName: 'O.png' },
    { imageName: 'P.png' },
    { imageName: 'Q.png' },
    { imageName: 'R.png' },
    { imageName: 'S.png' },
    { imageName: 'T.png' },
    { imageName: 'U.png' },
    { imageName: 'V.png' },
    { imageName: 'W.png' },
    { imageName: 'X.png' },
    { imageName: 'Y.png' },
    { imageName: 'Z.png' },
  ];

  return (
    <>
      {/* Primer contenedor con el fondo dividido */}
      <div className="container">
        <header className="header">
          <div className="menu-icon">&#9776;</div>
          <img src={logo} alt="ManoLingua Logo" className="logo" />
        </header>
        <main className="content">
          <p className="quote">
            "Descubre la <span className="highlight">comunicación</span> sin barreras."
          </p>
          <p>Con nuestra tecnología de <span className="highlight">IA</span>,</p>
          <p>
            traducimos el lenguaje de señas en tiempo real para conectar a las personas
            de una manera más <span className="highlight">inclusiva</span> y
            <span className="highlight">futurista</span>.
          </p>
          <button className="translate-button">TRADUCIR</button>
        </main>
      </div>

      {/* Nueva sección con fondo blanco */}
      <div className="content-section">
        <h2>ABC del Lenguaje de Señas Mexicano (LSM)</h2>

        {/* Grid de tarjetas */}
        <div className="grid-container">
          {cardData.map((data, index) => (
            <Card key={index} imageName={data.imageName}/>
          ))}
        </div>
      </div>
    </>
  );
}

export default App;

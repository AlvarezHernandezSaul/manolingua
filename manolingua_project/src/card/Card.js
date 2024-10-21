import React from 'react';
import './Card.css';

// Función para importar todas las imágenes de la carpeta 'abc' dentro de 'images'
const importAllImages = (r) => {
  let images = {};
  r.keys().forEach((item) => { 
    images[item.replace('./', '')] = r(item); 
  });
  return images;
};

// Importar todas las imágenes de 'src/images/abc/'
const images = importAllImages(require.context('../images/abc', false, /\.(png|jpe?g|svg)$/));

const Card = ({ imageName }) => {
  return (
    <div className="card">
      <div className="card-image">
        <img src={images[imageName]} alt={imageName} /> {/* Añadir alt para accesibilidad */}
      </div>
      <div className="card-content">
        {/* Aquí puedes agregar contenido adicional si es necesario */}
      </div>
    </div>
  );
};

export default Card;

import React, { useRef, useEffect, useState, forwardRef, useImperativeHandle } from 'react';
import * as cam from '@mediapipe/camera_utils';
import * as hands from '@mediapipe/hands';
import * as draw from '@mediapipe/drawing_utils';
import axios from 'axios';

const HandTracking = forwardRef((props, ref) => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [sign, setSign] = useState(null);
  let camera;

  useEffect(() => {
    const handModel = new hands.Hands({
      locateFile: (file) => `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`,
    });

    handModel.setOptions({
      maxNumHands: 2,
      modelComplexity: 1,
      minDetectionConfidence: 0.7,
      minTrackingConfidence: 0.7,
    });

    handModel.onResults(onResults);

    if (typeof videoRef.current !== 'undefined' && videoRef.current !== null) {
      camera = new cam.Camera(videoRef.current, {
        onFrame: async () => {
          await handModel.send({ image: videoRef.current });
        },
        width: 640,
        height: 480,
      });
      camera.start();
    }

    return () => stopCamera();
  }, []);

  // Función para detener la cámara
  const stopCamera = () => {
    if (camera) {
      camera.stop();
      console.log("Cámara detenida");
    }
  };

  // Exponer la función stopCamera a través de ref
  useImperativeHandle(ref, () => ({
    stopCamera,
  }));

  async function onResults(results) {
    if (!canvasRef.current) {
      return;
    }
  
    const canvasCtx = canvasRef.current.getContext('2d');
    if (!canvasCtx) {
      return;
    }
  
    canvasCtx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    canvasCtx.drawImage(
      results.image,
      0,
      0,
      canvasRef.current.width,
      canvasRef.current.height
    );
  
    if (results.multiHandLandmarks) {
      for (const landmarks of results.multiHandLandmarks) {
        draw.drawConnectors(canvasCtx, landmarks, hands.HAND_CONNECTIONS, { color: '#00FF00', lineWidth: 5 });
        draw.drawLandmarks(canvasCtx, landmarks, { color: '#FF0000', lineWidth: 2 });
      }
      const imageSrc = canvasRef.current.toDataURL("image/jpeg");
      await sendImageToBackend(imageSrc);
    }
  }
  

  async function sendImageToBackend(imageSrc) {
    try {
      const response = await axios.post('http://127.0.0.1:5000/predict', {
        image: imageSrc,
      });
      setSign(response.data.sign);
      console.log("Predicción recibida:", response.data.sign);
    } catch (error) {
      console.error("Error al enviar la imagen:", error);
    }
  }

  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <div>
        <video ref={videoRef} style={{ display: 'none' }} />
        <canvas ref={canvasRef} width={640} height={480} />
      </div>
      <div style={{ marginLeft: '20px', fontSize: '24px', color: 'red' }}>
        {sign ? `Signo Detectado: ${sign}` : "Esperando predicción..."}
      </div>
    </div>
  );
});

export default HandTracking;

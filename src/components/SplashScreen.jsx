import { useEffect } from 'react';
// Importe a imagem da pasta assets
import logo from '../assets/logo.png'; 
import './SplashScreen.css';

export default function SplashScreen({ onFinish }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onFinish();
    }, 3000); // Mantivemos 3 segundos

    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <div className="splash-container">
      <div className="splash-content">
        {/* Adiciona a imagem acima do texto */}
        <img src={logo} alt="Garagem de Bolso Logo" className="splash-image" />
        <h1 className="logo-text">Garagem de Bolso</h1>
        <p className="subtitle">Sua coleção em qualquer lugar</p>
        <div className="loader"></div>
      </div>
    </div>
  );
} 
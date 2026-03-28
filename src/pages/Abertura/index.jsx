import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Abertura.css';

export default function Abertura() {
  const navigate = useNavigate();

  useEffect(() => {
    // Esse timer faz a tela de abertura sumir após 4 segundos e ir para o Login
    const timer = setTimeout(() => {
      navigate('/login');
    }, 4000); 

    return () => clearTimeout(timer); // Limpa o timer se o usuário sair
  }, [navigate]);

  return (
    <div className="apertura-container">
      <div className="apertura-content">
        {/* Usaremos um ícone de carro simples se você não tiver uma logo pronta */}
        <div className="apertura-logo-icon">🚗</div>
        <h1 className="logo-text big">Garagem de Bolso</h1>
        <p className="apertura-subtitle">Seu patrimônio em metal, organizado.</p>
        <div className="apertura-loader"></div>
      </div>
    </div>
  );
}
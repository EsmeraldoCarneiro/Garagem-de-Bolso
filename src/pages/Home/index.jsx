import logo from '../../assets/logo.png'; 
import './Home.css';

export default function Home() {
  return (
    <div className="splash-container">
      <div className="splash-content">
        <img src={logo} alt="Logo Garagem de Bolso" className="splash-image" />
        <h1 className="logo-text">Garagem de Bolso</h1>
        <p className="subtitle">Sua coleção em qualquer lugar</p>
        <div className="loader"></div>
      </div>
    </div>
  );
}
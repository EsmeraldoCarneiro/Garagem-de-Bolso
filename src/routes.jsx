import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home'; // Sua abertura com foto
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Financas from './pages/Financas';
import Private from './Private';

function RoutesApp() {
  return (
    <Routes>
      <Route path="/" element={<Login />} /> {/* Se o splash acabar na raiz, cai no Login */}
      <Route path="/login" element={<Login />} />
      <Route path="/dashboard" element={<Private> <Dashboard /> </Private>} />
      <Route path="/financas" element={<Private> <Financas /> </Private>} />
    </Routes>
  );
}

export default RoutesApp;
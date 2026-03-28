import { useState, useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import RoutesApp from './routes';
import Home from './pages/Home'; // Sua tela de abertura com a logo.png

function App() {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    // Sempre que o app carregar (F5), ele inicia o cronômetro
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 4000); // 4 segundos de abertura

    return () => clearTimeout(timer);
  }, []);

  return (
    <BrowserRouter>
      {showSplash ? (
        <Home /> /* Mostra a abertura independente da URL */
      ) : (
        <RoutesApp /> /* Só libera as rotas após os 3 segundos */
      )}
    </BrowserRouter>
  );
}

export default App;
import { useState } from 'react';
import { auth } from '../../config/firebase';
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword 
} from 'firebase/auth';
import { useNavigate } from 'react-router-dom'; // 1. Importação necessária
import './Login.css';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);
  const [error, setError] = useState('');
  
  const navigate = useNavigate(); // 2. Inicialização do navegador

  const handleAuth = async (e) => {
    e.preventDefault();
    setError('');
    
    try {
      if (isRegistering) {
        // Criar conta nova
        await createUserWithEmailAndPassword(auth, email, password);
        alert('Conta criada com sucesso! Bem-vindo à Garagem!');
        navigate('/dashboard'); // 3. Direciona após criar conta
      } else {
        // Fazer login
        await signInWithEmailAndPassword(auth, email, password);
        navigate('/dashboard'); // 4. Direciona após fazer login
      }
    } catch (err) {
      setError('Erro: Verifique suas credenciais ou conexão.');
      console.error(err.code);
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleAuth}>
        <h2>{isRegistering ? 'Criar Garagem' : 'Acessar Minha Garagem'}</h2>
        
        {error && <p className="error-message">{error}</p>}

        <input 
          type="email" 
          placeholder="Seu e-mail" 
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required 
        />
        
        <input 
          type="password" 
          placeholder="Sua senha (mín. 6 caracteres)" 
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required 
        />

        <button type="submit" className="btn-main">
          {isRegistering ? 'Cadastrar' : 'Entrar'}
        </button>

        <p className="toggle-auth" onClick={() => setIsRegistering(!isRegistering)}>
          {isRegistering 
            ? 'Já tem conta? Clique aqui para entrar' 
            : 'Novo por aqui? Crie sua conta agora'}
        </p>
      </form>
    </div>
  );
}
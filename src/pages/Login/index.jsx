import { useState } from 'react';
import { auth } from '../../config/firebase';
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword,
  sendPasswordResetEmail // Importado para recuperação de senha
} from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import './Login.css';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);
  const [error, setError] = useState('');
  
  const navigate = useNavigate();

  const handleAuth = async (e) => {
    e.preventDefault();
    setError('');
    
    try {
      if (isRegistering) {
        await createUserWithEmailAndPassword(auth, email, password);
        alert('Conta criada com sucesso! Bem-vindo à Garagem!');
        navigate('/dashboard');
      } else {
        await signInWithEmailAndPassword(auth, email, password);
        navigate('/dashboard');
      }
    } catch (err) {
      setError('Erro: Verifique suas credenciais ou conexão.');
      console.error(err.code);
    }
  };

  // Nova função para esqueci minha senha
  const handleForgotPassword = async () => {
    if (!email) {
      setError('Digite seu e-mail no campo acima para recuperar a senha.');
      return;
    }

    try {
      await sendPasswordResetEmail(auth, email);
      alert('E-mail de redefinição enviado! Verifique sua caixa de entrada.');
      setError(''); // Limpa erros anteriores
    } catch (err) {
      setError('Erro ao enviar e-mail de recuperação.');
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
          required={!isRegistering || isRegistering} 
        />

        {/* Link de recuperação (só aparece no modo Login) */}
        {!isRegistering && (
          <p className="forgot-password-link" onClick={handleForgotPassword}>
            Esqueceu sua senha?
          </p>
        )}

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
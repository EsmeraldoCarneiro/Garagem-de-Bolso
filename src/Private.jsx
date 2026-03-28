import { useState, useEffect } from 'react';
import { auth } from './config/firebase'; // Verifique se o caminho do seu firebase está correto
import { onAuthStateChanged } from 'firebase/auth';
import { Navigate } from 'react-router-dom';

export default function Private({ children }){
    const [loading, setLoading] = useState(true);
    const [signed, setSigned] = useState(false);

    useEffect(() => {
        async function checkLogin(){
            onAuthStateChanged(auth, (user) => {
                if(user){
                    // Se tem usuário logado
                    setSigned(true);
                    setLoading(false);
                } else {
                    // Se não tem usuário logado
                    setSigned(false);
                    setLoading(false);
                }
            })
        }
        checkLogin();
    }, [])

    // Enquanto o Firebase checa o login, mostra uma tela vazia
    if(loading){
        return(
            <div style={{background: '#121212', height: '100vh'}}></div>
        )
    }

    // Se não estiver logado, redireciona para a página inicial (Login)
    if(!signed){
        return <Navigate to="/"/>
    }

    // Se estiver logado, renderiza a página que o usuário quer ver
    return children;
}
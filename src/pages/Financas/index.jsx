import { useState, useEffect } from 'react';
import { auth, db } from '../../config/firebase'; 
import { collection, query, where, onSnapshot } from 'firebase/firestore';
import { Link } from 'react-router-dom';
import './Financas.css';

export default function Financas() {
  const [carrinhos, setCarrinhos] = useState([]);

  useEffect(() => {
    if (!auth.currentUser) return;
    const q = query(collection(db, "carrinhos"), where("userId", "==", auth.currentUser.uid));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const docs = [];
      querySnapshot.forEach((doc) => { docs.push({ id: doc.id, ...doc.data() }); });
      setCarrinhos(docs);
    });
    return () => unsubscribe();
  }, []);

  const investimentoTotal = carrinhos.reduce((acc, car) => acc + (Number(car.precoPago) || 0), 0);
  const valorMercadoTotal = carrinhos.reduce((acc, car) => acc + (Number(car.valorAtual) || 0), 0);
  const lucro = valorMercadoTotal - investimentoTotal;
  const roi = investimentoTotal > 0 ? ((lucro / investimentoTotal) * 100).toFixed(1) : 0;

  const marcasCount = carrinhos.reduce((acc, car) => {
    acc[car.marca] = (acc[car.marca] || 0) + 1;
    return acc;
  }, {});
  const topMarcas = Object.entries(marcasCount).sort(([, a], [, b]) => b - a).slice(0, 3);

  return (
    <div className="financas-container">
      <header className="financas-header">
        <h2 className="logo-text">Painel de Ativos</h2>
        <Link to="/dashboard" className="btn-back">← Voltar para Garagem</Link>
      </header>

      <section className="finance-summary">
        <div className="f-card"><span className="f-label">Custo</span><span className="f-value">R$ {investimentoTotal.toLocaleString()}</span></div>
        <div className="f-card highlight"><span className="f-label">Patrimônio</span><span className="f-value">R$ {valorMercadoTotal.toLocaleString()}</span></div>
        <div className="f-card profit"><span className="f-label">Lucro</span><span className="f-value">R$ {lucro.toLocaleString()}</span></div>
        <div className="f-card positive"><span className="f-label">ROI</span><span className="f-value">+{roi}%</span></div>
        <div className="f-card brands">
          <span className="f-label">Top Marcas</span>
          <div className="top-brands-list">
            {topMarcas.map(([name, count]) => (<span key={name}>{name}: <strong>{count}</strong></span>))}
          </div>
        </div>
      </section>

      <main className="table-section">
        <table className="finance-table">
          <thead>
            <tr><th>Mini</th><th>Pago</th><th>Vale</th><th>Lucro</th></tr>
          </thead>
          <tbody>
            {carrinhos.map(car => (
              <tr key={car.id}>
                <td><strong>{car.modelo}</strong><br/><small>{car.marca}</small></td>
                <td className="txt-grey">R$ {car.precoPago}</td>
                <td className="txt-green">R$ {car.valorAtual}</td>
                <td className="txt-cyan">R$ {car.valorAtual - car.precoPago}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </main>
    </div>
  );
}
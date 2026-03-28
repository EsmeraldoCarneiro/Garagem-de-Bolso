import { useState, useEffect } from 'react';
import { auth, db } from '../../config/firebase'; 
import { collection, query, where, onSnapshot, addDoc, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { Link } from 'react-router-dom';
import './Dashboard.css';

export default function Dashboard() {
  const initialFormState = {
    modelo: '', marca: '', fabricante: '', idCartela: '', escala: '1:64', cor: '', 
    anoModelo: '', anoFabricacao: '', imageUrl: '', serie: 'Mainline', isLoose: false,
    precoPago: '', valorAtual: '' 
  };

  const [formData, setFormData] = useState(initialFormState);
  const [carrinhos, setCarrinhos] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);
  const [selectedImageUrl, setSelectedImageUrl] = useState(null);

  const seriesRaras = ["TH (Treasure Hunt)", "STH (Super Treasure Hunt)", "Chase", "Red Line Club", "Convention"];
  const fabricantesMini = ["Hot Wheels", "Matchbox", "Majorette", "Maisto", "Bburago", "Greenlight", "Johnny Lightning", "Jada Toys", "Welly", "Kinsmart", "M2 Machines", "Auto World", "Mini GT", "Tarmac Works", "Inno64", "Kaido House", "Ixo Models", "BR Classics", "DCP / First Gear", "Racing Champions", "Miniaturas do Brasil"].sort();
  const escalas = ["1:18", "1:24", "1:32", "1:36", "1:43", "1:50", "1:55", "1:60", "1:64", "1:72", "1:76", "1:87 (HO)", "1:100", "1:128", "1:144", "1:200", "1:220 (Z)", "1:250", "1:300", "1:400"];
  const series = ["Mainline", ...seriesRaras, "Premium", "Exclusive"];

  useEffect(() => {
    const unsubscribeAuth = auth.onAuthStateChanged((user) => {
      if (user) {
        const q = query(
          collection(db, "carrinhos"), 
          where("userId", "==", user.uid)
        );

        const unsubscribeSnapshot = onSnapshot(q, (querySnapshot) => {
          const docs = [];
          querySnapshot.forEach((doc) => {
            docs.push({ id: doc.id, ...doc.data() });
          });
          setCarrinhos(docs.sort((a, b) => (b.createdAt?.seconds || 0) - (a.createdAt?.seconds || 0)));
        });

        return () => unsubscribeSnapshot();
      } else {
        setCarrinhos([]);
      }
    });

    return () => unsubscribeAuth();
  }, []);

  const handleSaveCar = async (e) => {
    e.preventDefault();
    try {
      const dataToSave = { 
        ...formData, 
        precoPago: Number(formData.precoPago) || 0, 
        valorAtual: Number(formData.valorAtual) || 0 
      };
      if (isEditing) {
        await updateDoc(doc(db, "carrinhos", editId), dataToSave);
        setIsEditing(false);
        setEditId(null);
      } else {
        await addDoc(collection(db, "carrinhos"), { 
          ...dataToSave, 
          userId: auth.currentUser.uid, 
          createdAt: new Date() 
        });
      }
      setFormData(initialFormState);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (error) { console.error(error); }
  };

  const startEdit = (car) => {
    setFormData({ ...car });
    setEditId(car.id);
    setIsEditing(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id) => {
    if (window.confirm("Remover da garagem?")) {
      await deleteDoc(doc(db, "carrinhos", id));
    }
  };

  const carrinhosFiltrados = carrinhos.filter(car => {
    const term = searchTerm.toLowerCase();
    const matches = (car.modelo?.toLowerCase() || "").includes(term) || 
                    (car.marca?.toLowerCase() || "").includes(term) || 
                    (car.fabricante?.toLowerCase() || "").includes(term);
    
    if (activeFilter === 'loose') return matches && car.isLoose;
    if (activeFilter === 'blister') return matches && !car.isLoose;
    if (activeFilter === 'rare') return matches && seriesRaras.includes(car.serie);
    return matches;
  });

  return (
    <div className="dashboard-container">
      <header className="dash-header">
        <h2 className="logo-text">Garagem de Bolso</h2>        
        <div className="header-nav">
          <Link to="/financas" className="nav-link">💰 Meus Ativos</Link>
          <button className="btn-logout" onClick={() => auth.signOut()}>Sair</button>
        </div>
      </header>

      <section className="stats-container">
        <div className="stat-card">
          <span className="stat-label">Minis</span>
          <span className="stat-value">{carrinhos.length}</span>
        </div>
        <div className="stat-card highlight">
          <span className="stat-label">Raridades</span>
          <span className="stat-value">{carrinhos.filter(c => seriesRaras.includes(c.serie)).length}</span>
        </div>
      </section>

      <section className="form-container">
        <form className={`car-form ${isEditing ? 'editing-mode' : ''}`} onSubmit={handleSaveCar}>
          <h3>{isEditing ? 'Atualizar Mini' : 'Novo Cadastro'}</h3>
          <div className="form-grid">
            <div className="input-row">
              <input name="modelo" placeholder="Modelo" value={formData.modelo} onChange={(e) => setFormData({...formData, modelo: e.target.value})} required />
              <input name="marca" placeholder="Marca" value={formData.marca} onChange={(e) => setFormData({...formData, marca: e.target.value})} required />
            </div>
            <div className="input-row">
              <select name="fabricante" value={formData.fabricante} onChange={(e) => setFormData({...formData, fabricante: e.target.value})} required>
                <option value="">Fabricante Mini</option>
                {fabricantesMini.map(f => <option key={f} value={f}>{f}</option>)}
              </select>
              <select name="serie" value={formData.serie} onChange={(e) => setFormData({...formData, serie: e.target.value})}>
                {series.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
            <div className="input-row">
              <input name="idCartela" placeholder="ID Cartela" value={formData.idCartela} onChange={(e) => setFormData({...formData, idCartela: e.target.value})} />
              <select name="escala" value={formData.escala} onChange={(e) => setFormData({...formData, escala: e.target.value})}>
                {escalas.map(e => <option key={e} value={e}>{e}</option>)}
              </select>
            </div>
            <div className="input-row">
              <input name="anoModelo" type="number" placeholder="Ano Carro" value={formData.anoModelo} onChange={(e) => setFormData({...formData, anoModelo: e.target.value})} />
              <input name="anoFabricacao" type="number" placeholder="Ano Mini" value={formData.anoFabricacao} onChange={(e) => setFormData({...formData, anoFabricacao: e.target.value})} />
            </div>
            <div className="input-row">
               <input name="cor" placeholder="Cor" value={formData.cor} onChange={(e) => setFormData({...formData, cor: e.target.value})} />
               <input name="precoPago" type="number" placeholder="R$ Pago" value={formData.precoPago} onChange={(e) => setFormData({...formData, precoPago: e.target.value})} />
               <input name="valorAtual" type="number" placeholder="R$ Vale" value={formData.valorAtual} onChange={(e) => setFormData({...formData, valorAtual: e.target.value})} />
            </div>
            <div className="input-row aligned">
              <div className="toggle-group">
                <span className="toggle-label">Loose?</span>
                <label className="switch">
                  <input type="checkbox" checked={formData.isLoose} onChange={(e) => setFormData({...formData, isLoose: e.target.checked})} />
                  <span className="slider round"></span>
                </label>
              </div>
              <input name="imageUrl" placeholder="URL da Foto" value={formData.imageUrl} onChange={(e) => setFormData({...formData, imageUrl: e.target.value})} className="url-input" />
            </div>
          </div>
          <div className="form-actions">
            <button type="submit" className="btn-save">{isEditing ? 'Confirmar' : 'Salvar'}</button>
            {isEditing && <button type="button" className="btn-cancel" onClick={() => {setIsEditing(false); setFormData(initialFormState);}}>Cancelar</button>}
          </div>
        </form>
      </section>

      <main className="collection-section">
        <div className="collection-header">
           <div className="header-top-row">
            {/* AJUSTE AQUI: O título só mostra números se houver busca ou filtro ativo */}
            <h3 className="section-title">
              {searchTerm || activeFilter !== 'all' 
                ? `Resultados (${carrinhosFiltrados.length})` 
                : "Minha Coleção"}
            </h3>
            <input type="text" placeholder="Buscar..." className="search-input" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
          </div>
          <div className="filter-tags">
            <button className={activeFilter === 'all' ? 'tag active' : 'tag'} onClick={() => setActiveFilter('all')}>Todos</button>
            <button className={activeFilter === 'rare' ? 'tag active' : 'tag'} onClick={() => setActiveFilter('rare')}>⭐ Raros</button>
          </div>
        </div>

        <div className="car-grid">
          {carrinhosFiltrados.map(car => (
            <div key={car.id} className={`car-card ${seriesRaras.includes(car.serie) ? 'rare-card' : ''}`}>
              <button className="card-image-btn" onClick={() => car.imageUrl && setSelectedImageUrl(car.imageUrl)}>
                {car.imageUrl ? <img src={car.imageUrl} alt={car.modelo} className="card-img-contain" /> : <div className="no-photo">Sem Foto</div>}
              </button>
              <div className="card-content">
                <div className="card-header">
                  <span className="serie-badge">{car.serie}</span>
                  <div className="card-actions">
                    <button onClick={() => startEdit(car)} className="edit-btn">✎</button>
                    <button onClick={() => handleDelete(car.id)} className="del-btn">×</button>
                  </div>
                </div>
                <h4 className="car-title">{car.modelo} <small>({car.anoModelo})</small></h4>
                <p className="car-subtitle">{car.marca} | {car.fabricante}</p>
                <div className="card-footer">
                  <span>{car.escala} | {car.cor}</span>
                  <span>{car.idCartela || 'S/N'}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      {selectedImageUrl && (
        <div className="gallery-modal" onClick={() => setSelectedImageUrl(null)}>
          <div className="modal-content">
             <div className="modal-image-wrapper">
              <img src={selectedImageUrl} alt="Zoom" className="modal-image" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
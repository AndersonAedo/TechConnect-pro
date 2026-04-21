import React, { useState, useEffect } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import Login from './pages/Login';
// Importamos más iconos para darle vida al diseño
import { LogOut, Plus, Search, Package, ShoppingCart, UserCircle, Droplets, Scissors } from 'lucide-react';
import Swal from 'sweetalert2';
import './App.css';

function TechConnectDashboard() {
  const { user, logout } = useAuth();
  const [loading, setLoading] = useState(true);
  const [busqueda, setBusqueda] = useState("");
  const [categoriaFiltro, setCategoriaFiltro] = useState("Todos");
  const [showModal, setShowModal] = useState(false);
  
  // DATOS DE PRUEBA PROFESIONALES (Rústico/Barbería)
  // Reemplazamos los servicios vacíos por estos para que veas cómo queda
  const [servicios, setServicios] = useState([
    { id: 1, nombre: 'Corte de Cabello Rústico', categoria: 'Corte', precio: 35.00, imagen: 'https://images.pexels.com/photos/1813272/pexels-photo-1813272.jpeg?auto=compress&cs=tinysrgb&w=400' },
    { id: 2, nombre: 'Arreglo de Barba Royale', categoria: 'Barba', precio: 25.00, imagen: 'https://images.pexels.com/photos/2065133/pexels-photo-2065133.jpeg?auto=compress&cs=tinysrgb&w=400' },
    { id: 3, nombre: 'Limpieza Facial Profunda', categoria: 'Estilo', precio: 50.00, imagen: 'https://images.pexels.com/photos/3998421/pexels-photo-3998421.jpeg?auto=compress&cs=tinysrgb&w=400' },
    { id: 4, nombre: 'Kit de Productos Orgánicos', categoria: 'Productos', precio: 120.00, imagen: 'https://images.pexels.com/photos/3737563/pexels-photo-3737563.jpeg?auto=compress&cs=tinysrgb&w=400' },
  ]);

  const [nuevoServicio, setNuevoServicio] = useState({ 
    nombre: '', 
    categoria: 'Corte', 
    precio: '', 
    imagen: '' 
  });

  // Simulamos carga para el feedback visual
  useEffect(() => {
    setTimeout(() => {
        setLoading(false);
    }, 1200);
  }, []);

  const guardarServicio = (e) => {
    e.preventDefault();
    // Lógica simulada (mismo comportamiento de antes)
    const creado = { ...nuevoServicio, id: Date.now() };
    setServicios([...servicios, creado]);
    setShowModal(false);
    setNuevoServicio({ nombre: '', categoria: 'Corte', precio: '', imagen: '' });
    Swal.fire('¡Creado!', 'El servicio se añadió con éxito', 'success');
  };

  // Función para elegir el icono según la categoría
  const getIcon = (categoria) => {
    switch (categoria) {
        case 'Corte': return <Scissors size={18} />;
        case 'Barba': return <Droplets size={18} />;
        case 'Productos': return <Package size={18} />;
        default: return <ShoppingCart size={18} />;
    }
  }

  const filtrados = servicios.filter(s => 
    s.nombre.toLowerCase().includes(busqueda.toLowerCase()) &&
    (categoriaFiltro === "Todos" || s.categoria === categoriaFiltro)
  );

  return (
    <div className="app-container">
      <header className="dashboard-header">
        <div className="header-top">
          <h1>TechConnect Pro <small>Marketplace</small></h1>
          <div className="user-nav">
            <UserCircle size={32} className="user-icon" />
            <div className="user-details">
                <span className="user-name">Hola, <strong>{user.email.split('@')[0]}</strong></span>
                <span className="user-role">Administrador</span>
            </div>
            <button className="btn-logout" onClick={logout}><LogOut size={16} /> Salir</button>
          </div>
        </div>
      </header>

      <section className="controls-section">
        <div className="filters-container">
          <div className="search-box">
            <Search size={18} className="search-icon" />
            <input 
              type="text" 
              placeholder="Buscar servicio de barbería..." 
              className="search-bar" 
              onChange={(e) => setBusqueda(e.target.value)} 
            />
          </div>
          <select className="filter-select" onChange={(e) => setCategoriaFiltro(e.target.value)}>
            <option value="Todos">Todas las categorías</option>
            <option value="Corte">Corte</option>
            <option value="Barba">Barba</option>
            <option value="Estilo">Estilo</option>
            <option value="Productos">Productos</option>
          </select>
        </div>
        <button className="btn-add" onClick={() => setShowModal(true)}>
          <Plus size={18} /> Nuevo Servicio
        </button>
      </section>

      <div className="grid">
        {loading ? (
          [1, 2, 3, 4].map(n => <div key={n} className="loading-skeleton"></div>)
        ) : (
          filtrados.map(s => (
            <div key={s.id} className="card">
              <div className="card-img-container">
                <img src={s.imagen || 'https://via.placeholder.com/400x200?text=Barbería+Rústica'} alt={s.nombre} className="card-image" />
                <span className={`badge badge-${s.categoria.toLowerCase()}`}>{s.categoria}</span>
              </div>
              <div className="card-body">
                <h3>{s.nombre}</h3>
                <p className="price">S/ {s.precio.toFixed(2)}</p>
                <button className="btn-action">{getIcon(s.categoria)} Solicitar</button>
              </div>
            </div>
          ))
        )}
      </div>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2><Package size={24} /> Nuevo Servicio</h2>
            <form onSubmit={guardarServicio}>
              <div className="form-group">
                <label>Nombre del Servicio / Producto</label>
                <input type="text" required value={nuevoServicio.nombre} onChange={e => setNuevoServicio({...nuevoServicio, nombre: e.target.value})} />
              </div>
              <div className="form-group">
                <label>Precio (S/)</label>
                <input type="number" step="0.10" required value={nuevoServicio.precio} onChange={e => setNuevoServicio({...nuevoServicio, precio: e.target.value})} />
              </div>
              <div className="form-group">
                <label>URL de Imagen Profesional</label>
                <input type="text" value={nuevoServicio.imagen} onChange={e => setNuevoServicio({...nuevoServicio, imagen: e.target.value})} placeholder="https://..." />
              </div>
              <div className="form-group">
                <label>Categoría</label>
                <select value={nuevoServicio.categoria} onChange={e => setNuevoServicio({...nuevoServicio, categoria: e.target.value})}>
                  <option value="Corte">Corte</option>
                  <option value="Barba">Barba</option>
                  <option value="Estilo">Estilo</option>
                  <option value="Productos">Productos</option>
                </select>
              </div>
              <div className="modal-actions">
                <button type="button" className="btn-cancel" onClick={() => setShowModal(false)}>Cancelar</button>
                <button type="submit" className="btn-save">Guardar</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

function App() {
  const { user } = useAuth();
  return user ? <TechConnectDashboard /> : <Login />;
}

export default function Root() {
  return (
    <AuthProvider>
      <App />
    </AuthProvider>
  );
}
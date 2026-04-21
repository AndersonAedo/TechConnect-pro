import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [servicios, setServicios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [busqueda, setBusqueda] = useState("");
  const [categoriaFiltro, setCategoriaFiltro] = useState("Todos");
  const [showModal, setShowModal] = useState(false);
  
  const [nuevoServicio, setNuevoServicio] = useState({ 
    nombre: '', 
    categoria: 'Software', 
    precio: '', 
    imagen: '' 
  });

  const API_URL = 'http://localhost:3000/servicios';

  useEffect(() => {
    fetch(API_URL)
      .then(res => res.json())
      .then(data => {
        setServicios(data);
        setLoading(false);
      })
      .catch(err => console.error("Error:", err));
  }, []);

  const guardarServicio = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(nuevoServicio)
      });
      if (response.ok) {
        const creado = await response.json();
        setServicios([...servicios, creado]);
        setShowModal(false);
        setNuevoServicio({ nombre: '', categoria: 'Software', precio: '', imagen: '' });
      }
    } catch (error) {
      alert("Error al conectar con el backend");
    }
  };

  const filtrados = servicios.filter(s => 
    s.nombre.toLowerCase().includes(busqueda.toLowerCase()) &&
    (categoriaFiltro === "Todos" || s.categoria === categoriaFiltro)
  );

  return (
    <div className="app-container">
      <header className="dashboard-header">
        <h1>TechConnect Pro <small>Panel de Control</small></h1>
      </header>

      <section className="controls-section">
        <div className="filters-container">
          <input 
            type="text" 
            placeholder="Buscar servicio..." 
            className="search-bar" 
            onChange={(e) => setBusqueda(e.target.value)} 
          />
          <select className="filter-select" onChange={(e) => setCategoriaFiltro(e.target.value)}>
            <option value="Todos">Todas las categorías</option>
            <option value="Software">Software</option>
            <option value="Infraestructura">Infraestructura</option>
            <option value="Soporte">Soporte</option>
          </select>
        </div>
        <button className="btn-add" onClick={() => setShowModal(true)}>+ Nuevo Servicio</button>
      </section>

      <div className="grid">
        {loading ? (
          [1, 2, 3].map(n => <div key={n} className="loading-skeleton"></div>)
        ) : (
          filtrados.map(s => (
            <div key={s.id} className="card">
              <img src={s.imagen || 'https://via.placeholder.com/400x200?text=Sin+Imagen'} alt={s.nombre} className="card-image" />
              <div className="card-body">
                <span className="badge">{s.categoria}</span>
                <h3>{s.nombre}</h3>
                <p className="price">${s.precio}</p>
                <button className="btn-action">Solicitar Servicio</button>
              </div>
            </div>
          ))
        )}
      </div>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Agregar Nuevo Servicio</h2>
            <form onSubmit={guardarServicio}>
              <div className="form-group">
                <label>Nombre del Servicio</label>
                <input type="text" required value={nuevoServicio.nombre} onChange={e => setNuevoServicio({...nuevoServicio, nombre: e.target.value})} />
              </div>
              <div className="form-group">
                <label>Precio ($)</label>
                <input type="number" required value={nuevoServicio.precio} onChange={e => setNuevoServicio({...nuevoServicio, precio: e.target.value})} />
              </div>
              <div className="form-group">
                <label>URL de Imagen</label>
                <input type="text" value={nuevoServicio.imagen} onChange={e => setNuevoServicio({...nuevoServicio, imagen: e.target.value})} placeholder="https://..." />
              </div>
              <div className="form-group">
                <label>Categoría</label>
                <select value={nuevoServicio.categoria} onChange={e => setNuevoServicio({...nuevoServicio, categoria: e.target.value})}>
                  <option value="Software">Software</option>
                  <option value="Infraestructura">Infraestructura</option>
                  <option value="Soporte">Soporte</option>
                </select>
              </div>
              <div className="modal-actions">
                <button type="button" className="btn-cancel" onClick={() => setShowModal(false)}>Cancelar</button>
                <button type="submit" className="btn-save">Guardar Servicio</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
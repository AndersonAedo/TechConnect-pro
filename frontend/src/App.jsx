import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [servicios, setServicios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [busqueda, setBusqueda] = useState("");
  const [categoriaFiltro, setCategoriaFiltro] = useState("Todos");

  // Estado para el Modal y Nuevo Servicio
  const [showModal, setShowModal] = useState(false);
  const [nuevoServicio, setNuevoServicio] = useState({ 
    nombre: '', 
    categoria: 'Software', 
    precio: '', 
    img: null 
  });

  // Simulación de carga inicial
  useEffect(() => {
    setTimeout(() => {
      setServicios([
        { id: 1, nombre: 'Mantenimiento Preventivo', categoria: 'Soporte', precio: 25000, img: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=400' },
        { id: 2, nombre: 'Instalación de Redes', categoria: 'Infraestructura', precio: 45000, img: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc48?w=400' },
        { id: 3, nombre: 'Desarrollo Web Pro', categoria: 'Software', precio: 80000, img: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400' },
      ]);
      setLoading(false);
    }, 1500);
  }, []);

  // Lógica de filtrado
  const serviciosFiltrados = servicios.filter(s => 
    s.nombre.toLowerCase().includes(busqueda.toLowerCase()) &&
    (categoriaFiltro === "Todos" || s.categoria === categoriaFiltro)
  );

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setNuevoServicio({ ...nuevoServicio, img: URL.createObjectURL(file) });
    }
  };

  const guardarServicio = (e) => {
    e.preventDefault(); // Evita que la página se recargue
    if (!nuevoServicio.nombre || !nuevoServicio.precio) return alert("Completa los campos");
    
    setServicios([...servicios, { ...nuevoServicio, id: Date.now() }]);
    setShowModal(false); 
    setNuevoServicio({ nombre: '', categoria: 'Software', precio: '', img: null }); // Reset
  };

  return (
    <div className="app-container">
      <header className="dashboard-header">
        <h1>TechConnect Pro <small>Panel de Control</small></h1>
      </header>

      <section className="controls-section">
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
        {/* BOTÓN CONECTADO AL MODAL */}
        <button className="btn-add" onClick={() => setShowModal(true)}>+ Nuevo Servicio</button>
      </section>

      <div className="grid">
        {loading ? (
          [1, 2, 3].map(n => <div key={n} className="loading-skeleton"></div>)
        ) : (
          serviciosFiltrados.map(servicio => (
            <div key={servicio.id} className="card">
              <img src={servicio.img || 'https://via.placeholder.com/400x200?text=Sin+Imagen'} alt={servicio.nombre} className="card-image" />
              <div className="card-body">
                <span className="badge">{servicio.categoria}</span>
                <h3>{servicio.nombre}</h3>
                <p className="price">${servicio.precio}</p>
                <button className="btn-action">Solicitar Servicio</button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* VENTANA EMERGENTE (MODAL) */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Agregar Nuevo Servicio</h2>
            <form onSubmit={guardarServicio}>
              <div className="form-group">
                <label>Nombre del Servicio</label>
                <input type="text" value={nuevoServicio.nombre} onChange={(e) => setNuevoServicio({...nuevoServicio, nombre: e.target.value})} placeholder="Ej: Soporte Técnico" />
              </div>
              <div className="form-group">
                <label>Precio ($)</label>
                <input type="number" value={nuevoServicio.precio} onChange={(e) => setNuevoServicio({...nuevoServicio, precio: e.target.value})} placeholder="0.00" />
              </div>
              <div className="form-group">
                <label>Categoría</label>
                <select value={nuevoServicio.categoria} onChange={(e) => setNuevoServicio({...nuevoServicio, categoria: e.target.value})}>
                  <option value="Software">Software</option>
                  <option value="Infraestructura">Infraestructura</option>
                  <option value="Soporte">Soporte</option>
                </select>
              </div>
              <div className="form-group">
                <label>Imagen</label>
                <input type="file" accept="image/*" onChange={handleImageChange} />
                {nuevoServicio.img && <img src={nuevoServicio.img} className="img-preview" alt="Preview" />}
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

export default App;
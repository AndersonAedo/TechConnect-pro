import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [servicios, setServicios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [busqueda, setBusqueda] = useState("");
  const [categoriaFiltro, setCategoriaFiltro] = useState("Todos");

  // Simulación de carga de datos (Efecto interesante)
  useEffect(() => {
    setTimeout(() => {
      setServicios([
        { id: 1, nombre: 'Mantenimiento Preventivo', categoria: 'Soporte', precio: 25000, img: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=400' },
        { id: 2, nombre: 'Instalación de Redes', categoria: 'Infraestructura', precio: 45000, img: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc48?w=400' },
        { id: 3, nombre: 'Desarrollo Web Pro', categoria: 'Software', precio: 80000, img: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400' },
      ]);
      setLoading(false);
    }, 2000);
  }, []);

  // Lógica de filtrado
  const serviciosFiltrados = servicios.filter(s => 
    s.nombre.toLowerCase().includes(busqueda.toLowerCase()) &&
    (categoriaFiltro === "Todos" || s.categoria === categoriaFiltro)
  );

  return (
    <div className="app-container">
      <header className="dashboard-header">
        <h1>TechConnect Pro <small>Panel de Control</small></h1>
      </header>

      {/* Sección de Controles Interesantes */}
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
        <button className="btn-add">+ Nuevo Servicio</button>
      </section>

      {/* Grid de Servicios con Estado de Carga */}
      <div className="grid">
        {loading ? (
          // Skeletons de carga
          [1, 2, 3].map(n => <div key={n} className="loading-skeleton"></div>)
        ) : (
          serviciosFiltrados.map(servicio => (
            <div key={servicio.id} className="card">
              <img src={servicio.img} alt={servicio.nombre} className="card-image" />
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
    </div>
  );
}

export default App;
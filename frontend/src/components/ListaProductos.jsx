// src/components/ListaProductos.jsx
const ListaProductos = ({ productos, onEditar, onEliminar }) => {
  return (
    <div>
      <h2>Lista de Productos</h2>
      {productos.length === 0 ? (
        <p>No hay productos registrados.</p>
      ) : (
        <ul>
          {productos.map((p) => (
            <li key={p._id}>
              <strong>{p.nombre}</strong> - ${p.precio}
              <button onClick={() => onEditar(p)}>Editar</button>
              <button onClick={() => onEliminar(p._id)}>Eliminar</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ListaProductos;

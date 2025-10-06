const ListaProductos = ({ productos, onEditar, onEliminar }) => {
  if (!productos.length) {
    return <p>No hay productos registrados.</p>;
  }

  return (
    <div>
      <h2>Lista de Productos</h2>
      <ul>
        {productos.map((producto) => (
          <li key={producto._id}>
            <strong>{producto.nombre}</strong> - ${producto.precio}
            <br />
            {producto.descripcion && <em>{producto.descripcion}</em>}
            <br />
            <button onClick={() => onEditar(producto)}>✏️ Editar</button>
            <button onClick={() => onEliminar(producto._id)}>🗑 Eliminar</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ListaProductos;

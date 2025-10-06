const ListaProductos = ({ productos, onEditar, onEliminar }) => {
  return (
    <div>
      <h2>📋 Lista de Productos</h2>
      {productos.length === 0 ? (
        <p>No hay productos registrados.</p>
      ) : (
        productos.map((p) => (
          <div
            key={p._id}
            style={{
              border: "1px solid #ccc",
              margin: "10px",
              padding: "10px",
              borderRadius: "10px",
            }}
          >
            {p.foto && (
              <img
                src={p.foto}
                alt={p.nombre}
                width="100"
                style={{ borderRadius: "8px" }}
              />
            )}
            <h3>{p.nombre}</h3>
            <p>💲 {p.precio}</p>
            <p>{p.descripcion}</p>
            <p>Stock: {p.stock}</p>
            <p>SKU: {p.sku}</p>

            <button onClick={() => onEditar(p)}>✏️ Editar</button>
            <button onClick={() => onEliminar(p._id)}>🗑 Eliminar</button>
          </div>
        ))
      )}
    </div>
  );
};

export default ListaProductos;

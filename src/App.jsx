import './App.css'

// FUNCION actualizarInventario
const inventario = [
  { id: 1, nombre: 'Producto 1', cantidad: 10, precio: 1500 },
  { id: 2, nombre: 'Producto 2', cantidad: 0, precio: 50 },
  { id: 3, nombre: 'Prodcuto 3', cantidad: 25, precio: 30 }
];
const productosAgotados = [2];

// FUNCIÓN procesarEstudiantes
const nombresEliminados = ['Ana', 'Carlos'];
const estudiantes = [
  { nombre: 'José', edad: 20, calificaciones: [90, 85, 88] },
  { nombre: 'Ana', edad: 22, calificaciones: [75, 70, 65] },
  { nombre: 'Carlos', edad: 21, calificaciones: [95, 93, 92] },
  { nombre: 'Esteban', edad: 23, calificaciones: [50, 45, 40] }
];

function App() {

  const actualizarInventario = (inventario, productosAgotados) => {
    // VALIDACIONES
    if (!inventario || !inventario.length) {
      console.log('El inventario no fue proporcionado o está vacío.');
      return {
        inventarioActualizado: [],
        productoPremium: null
      };
    }

    if (!productosAgotados || !productosAgotados.length) {
      console.log('El array de productos agotados no fue proporcionado o está vacío.');
    }

    for (const producto of inventario) {
      if (typeof producto.id !== 'number' || typeof producto.nombre !== 'string' || typeof producto.cantidad !== 'number' || typeof producto.precio !== 'number') {
        console.log('La estructura de uno o más productos es incorrecta:', producto);
        return {
          inventarioActualizado: [],
          productoPremium: null
        };
      }
    }

    // FUNCIONES
    const inventarioFiltrado = inventario.filter(producto => !productosAgotados.includes(producto.id));

    const inventarioActualizado = inventarioFiltrado.map(producto => ({
      ...producto,
      disponible: producto.cantidad > 0 ? true : false
    }));

    const productoPremium = inventarioActualizado.find(producto => producto.precio > 1000) || null;

    for (let i = 0; i < inventarioActualizado.length; i++) {
      console.log(`Producto: ${inventarioActualizado[i].nombre} - Cantidad: ${inventarioActualizado[i].cantidad}`);
    }

    inventarioActualizado.forEach(producto => {
      console.log(`Producto: ${producto.nombre} - Precio Total: ${producto.cantidad * producto.precio}`);
    });

    return {
      inventarioActualizado,
      productoPremium
    };
  }

  const procesarEstudiantes = (nombresEliminados, estudiantes) => {
    // VALIDACIONES
    if (!nombresEliminados || !nombresEliminados.length) {
      console.log('El array de nombres eliminados no fue proporcionado o está vacio.');
    }

    if (!estudiantes || !estudiantes.length) {
      console.log('El array de estudiantes no fue proporcionado o está vacio.');
      return {
        estudiantesConPromedio: [],
        mejorEstudiante: null
      };
    }

    for (const estudiante of estudiantes) {
      if (typeof estudiante.nombre !== 'string' || typeof estudiante.edad !== 'number' || !estudiante.calificaciones || !estudiante.calificaciones.length) {
        console.log('La estructura de uno o más estudiantes es incorrecta:', estudiante);
        return {
          estudiantesConPromedio: [],
          mejorEstudiante: null
        };
      }
    }

    // FUNCIONES
    const estudiantesFiltrados = estudiantes.filter(estudiante => !nombresEliminados.includes(estudiante.nombre));

    const estudiantesConPromedio = estudiantesFiltrados.map(estudiante => {
      const sumaCalificaciones = estudiante.calificaciones.reduce((acc, calificacion) => acc + calificacion, 0);
      const promedio = sumaCalificaciones / estudiante.calificaciones.length;
      return {
        ...estudiante,
        promedio: promedio,
        estado: promedio >= 60 ? 'aprobado' : 'reprobado'
      };
    });

    const mejorEstudiante = estudiantesConPromedio.reduce((mejor, estudiante) =>
      (mejor.promedio > estudiante.promedio) ? mejor : estudiante,
      estudiantesConPromedio[0]
    );

    for (let i = 0; i < estudiantesConPromedio.length; i++) {
      console.log(`Estudiante: ${estudiantesConPromedio[i].nombre} - Promedio: ${estudiantesConPromedio[i].promedio}`);
    }

    estudiantesConPromedio.forEach(estudiante => {
      console.log(`El estudiante: ${estudiante.nombre} esta ${estudiante.estado}`);
    });

    return {
      estudiantesConPromedio,
      mejorEstudiante
    };
  }

  return (
    <>
      <h1>Hello app</h1>
      <button onClick={() => actualizarInventario(inventario, productosAgotados)}>Actualizar Inventario</button>
      <button onClick={() => procesarEstudiantes(nombresEliminados, estudiantes)}>Actualizar Inventario</button>
    </>
  )
}

export default App

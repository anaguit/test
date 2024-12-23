import { useState, useEffect } from "react";
import { useTasks } from "../hooks/useTasks";
import { useNavigate } from "react-router-dom";

export const TaskList = () => {
    const { getTasks, updateTasks, deleteTasks } = useTasks();
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState("all");
    const navegate = useNavigate();

    useEffect(() => {
        const fetchTasks = async () => {
          try {
            const token = localStorage.getItem("authorization");
            if (!token) {
              console.error("Token no encontrado. El usuario no está autenticado.");
              return;
            }
            const respuesta = await getTasks(token);
            
            setTasks(respuesta?.allTasks || []);
          } catch (error) {
            console.error("Error al obtener las tareas:", error);
          } finally {
            setLoading(false);
          }
        };
        fetchTasks();
      }, [getTasks]);

      const handleDelete = async (id) => {
        try {
          const token = localStorage.getItem("authorization");
          if (!token) {
            console.error("Token no encontrado. El usuario no está autenticado.");
            return;
          }
          await deleteTasks(id, token);          
          setTasks(tasks.filter((task) => task.Id !== id));
        } catch (error) {
          console.error("Error al eliminar la tarea:", error);
        }
      };
    
      const handleEdit = async (id, newStatus) => {
        try {
          const token = localStorage.getItem("authorization");
          if (!token) {
            console.error("Token no encontrado. El usuario no está autenticado.");
            return;
          }
            await updateTasks(id, newStatus, token);
            setTasks(
                tasks.map((task) =>
                  task.Id === id ? { ...task, Completed: newStatus } : task
                )
            );
        } catch (error) {
            console.error("Error al actualizar la tarea:", error);
        };
      };

      const filteredTasks = tasks.filter((task) => {
        if (filter === "completed") return task.Completed;
        if (filter === "pending") return !task.Completed;
        return true;
      });
    
      if (loading) {
        return <p>Cargando tareas...</p>;
      }
    return (
      <div>
        <h1>Lista de tareas</h1>
        <div>
            <button onClick={() => setFilter("all")}>Todas</button>
            <button onClick={() => setFilter("completed")}>Completadas</button>
            <button onClick={() => setFilter("pending")}>Pendientes</button>
        </div>
        <button onClick={() => navegate("/createTasks")}>Crear nueva tarea</button>
        {filteredTasks.length > 0 ? (
          <ul>
            {filteredTasks.map((task) => (
              <li key={task.Id}>
                <strong>{task.Title}</strong>: {task.Completed ? "Completada" : "Pendiente"}
                <button onClick={() => handleEdit(task.Id, !task.Completed)}>
                    Cambiar a completada
                </button>
                <button onClick={() => handleDelete(task.Id)}>Eliminar</button>
              </li>
            ))}
          </ul>
        ) : (
          <p>No se encontraron tareas</p>
        )}
      </div>
    );
};
import { useState } from "react";
import { useTasks } from "../hooks/useTasks";
import { useNavigate } from "react-router-dom";


export function TasksForm() {
    const { createTasks } = useTasks();
    const [formData, setFormData] = useState({ Title: "" });
    const [error, setError] = useState(null);
    const navegate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault(); 
        const token = localStorage.getItem("authorization");

        if (!token) {
            setError("No autorizado. Inicie sesión.");
            return;
        }        
        const respuesta = await createTasks(formData, token);       
        if (respuesta?.error) {            
            setError(respuesta.error);
        } else {
            navegate(`/tasksList`)
            console.log( respuesta.data);
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <div>
            <h1>Create Tasks</h1>
            {error && <p style={{ color: "red" }}>{error}</p>}
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="title">Title:</label>
                    <input
                        type="text"
                        id="title"
                        name="Title"
                        onChange={handleChange}
                        value={formData.Title}
                    />
                </div>
                <button type="submit">Create</button>
            </form>
        </div>
    );
};
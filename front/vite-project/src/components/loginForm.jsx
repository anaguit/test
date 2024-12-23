import { useState } from "react";
import { useLogin } from "../hooks/useLogin";
import { useNavigate } from "react-router-dom";


export function LoginForm() {
    const { login } = useLogin();
    const [formData, setFormData] = useState({ UserName: "", Password: "" });
    const [error, setError] = useState(null);
    const navegate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();         
        const respuesta = await login(formData);       
        if (respuesta?.error) {            
            setError(respuesta.error);
        } else {
            const token = respuesta.data.token;
            localStorage.setItem("authorization", token);            
            navegate(`/tasksList`);
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <div>
            <h1>Login</h1>
            {error && <p style={{ color: "red" }}>{error}</p>}
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="username">Username:</label>
                    <input
                        type="text"
                        id="username"
                        name="UserName"
                        onChange={handleChange}
                        value={formData.UserName}
                    />
                </div>
                <div>
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        name="Password"
                        onChange={handleChange}
                        value={formData.Password}
                    />
                </div>
                <button type="submit">Login</button>
            </form>
        </div>
    );
};
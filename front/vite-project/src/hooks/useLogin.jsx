import axios from "axios";
const { VITE_HOST } = import.meta.env;

export function useLogin(){
    //conexión login
    const login = async(formData) => {
        try {
            const respuesta = await axios.post(`${VITE_HOST}api/auth/login`, formData);            
            if(respuesta.status === 200){                
                return respuesta;
            };
        } catch (error) {
            const status = error.response.status            
            if(status === 400){                               
                return error.response;
            };
            console.log(error);
            return {error: error.message};            
        };
    };
    return {login};
};
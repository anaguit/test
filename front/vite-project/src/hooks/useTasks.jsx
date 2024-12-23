import axios from "axios";
const { VITE_HOST } = import.meta.env;

export function useTasks(){
    //conexión crear tarea
    const createTasks = async(formData, token) => {
        try {
            const respuesta = await axios.post(`${VITE_HOST}api/tasks`, formData,
                {
                    headers: {
                        authorization: token
                    },
                }
            );            
            if(respuesta.status === 201){                
                return respuesta
            };
        } catch (error) {
            /*const status = error.response.status            
            if(status === 400){                               
                return error.response
            }*/
            console.log(error);
            return {error: error.message};            
        };
    };

    //conexión editar tarea
    const updateTasks = async( id, newStatus, token ) => {
        try {
            const respuesta = await axios.patch(`${VITE_HOST}api/tasks/${id}`, { Completed: newStatus },
                {
                    headers: {
                        authorization: token
                    },
                }
            );
            if ( respuesta.status === 200 ) {
              return respuesta//{ success: true, data: respuesta.data };
            }
        } catch (error) {
            console.log(error);
            return {error: error.message};
        };
    };

    //conexión borrar tarea
    const deleteTasks = async( id, token ) => {
        try {
            const respuesta = await axios.delete(`${VITE_HOST}api/tasks/${id}`,
                {
                    headers: {
                        authorization: token
                    },
                }
            );
            if ( respuesta.status === 200 ) {
              return respuesta//{ success: true, data: respuesta.data };
            }
        } catch (error) {
            console.log(error);
            return {error: error.message};
        };
    };

    //conexión obtener tareas
    const getTasks = async(token) => {
        try {
            const respuesta = await axios.get(`${VITE_HOST}api/tasks`,
                {
                    headers: {
                        authorization: token
                    },
                }
            );            
            if(respuesta.status === 200){
                return respuesta.data
            };
        } catch (error) {
            /*const status = error.response.status            
            if(status === 400){                               
                return error.response
            }*/
            console.log(error);
            return {error: error.message};            
        };
    }

    return { createTasks, updateTasks, deleteTasks, getTasks };
};
import axios from "./axios"


export const searchRequest = (user) => {
    console.log('Usuario:', user); // Imprime el contenido del usuario
    return axios.post(`/searchOne`, user);
};

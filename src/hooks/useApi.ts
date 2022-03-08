import axios from "axios";

const api = axios.create({
    baseURL: process.env.REACT_APP_API
});

export const userApi = () => ({

    validateToken: async (token: string) => {
        const response = await api.post('/Login/validateToken', { token });
        return response.data;
    },
    singnin: async (user: string, pass: string) => {
        
        const response = await api.post(`/Login/LoginAuth?user=${user}&pass=${pass}`);
        // return {
        //     user: {id: 2, name: 'Jalles', email: 'jalles@gmail.com',password: '123'},
        //     token: '123456789'
        // };
        console.log(response.data);
        return response.data;
    },
    logout: async () => {
        const response = await api.post('/logout');
        return response.data;
    }
    
});
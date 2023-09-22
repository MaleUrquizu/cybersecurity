import axios from 'axios';

const SECRET = 'cybersecurity';

export function setToken(token) {
    localStorage.setItem(SECRET, token);
}

export const getToken = () => {
    const token = localStorage.getItem('token'); // Aquí proporciona la clave 'token'
    return token;
  };

export function deleteToken() {
    localStorage.removeItem(SECRET);
}


export function initAxiosInterceptors() {
    axios.interceptors.request.use(function(config) {
        const token = getToken();

        if (token) {
            config.headers.Authorization = `Bearer ${token}`; // Cambié "bearer" a "Bearer"
        }

        return config;
    });

    axios.interceptors.response.use(
        function(response) {
            return response;
        },
        function (error) {
            if (error.response.status === 401) {
                // Aquí puedes manejar la lógica para el caso de error 401 (Unauthorized)
            }
            return Promise.reject(error);
        }
    );
}

import axios from "axios";

export const api = axios.create({
    baseURL: "http://localhost:3000/api/v1/sudoku",
    headers: {
        "Content-Type": "application/json",
    },
    withCredentials: true
});

export default api;
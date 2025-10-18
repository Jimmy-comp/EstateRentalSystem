import apiClient from "./apiClient";

export interface User {
    id: number;
    username: string;
    role: "admin" | "landlord" | "tenant";
}

export const handleUserLogin = async (username: string, password: string) => {
    const response = await apiClient.post("/user/login", {username, password});
    return response.data;
}
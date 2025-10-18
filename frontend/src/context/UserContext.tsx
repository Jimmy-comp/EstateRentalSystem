import { createContext, useContext, useEffect, useState, type FC, type ReactNode } from "react";
import type { User } from "../services/userService";

interface UserContextType {
    user: User | null;
    login: (userData: User) => void;
    logout: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: FC<{ children: ReactNode }> = ({children}) => {
    const [user, setUser] = useState<User | null>(null);

    // Load saved user from localStorage when app starts
    useEffect(() => {
        const savedUser = localStorage.getItem("user");
        if (savedUser) {
        setUser(JSON.parse(savedUser));
        }
    }, []);

    // Save user data to localStorage after login
    const login = (userData: User) => {
        setUser(userData);
        localStorage.setItem("user", JSON.stringify(userData));
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem("user");
    };

    return(
        <UserContext.Provider value={{user, login, logout}}>
            {children}
        </UserContext.Provider>
    );
};

export const useUserContext = () => {
    const context = useContext(UserContext);
    if(!context) throw new Error("useUserContext must be used within userProvider");
    return context;
}
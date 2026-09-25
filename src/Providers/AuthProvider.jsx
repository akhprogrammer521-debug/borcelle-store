import { useState } from "react";
import { AuthContext } from "../Contexts/AuthContext";

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
        const userInStorage = localStorage.getItem("userInfo");
        return userInStorage
            ? JSON.parse(userInStorage)
            : null;
    });

    return (
        <AuthContext.Provider value={{ user, setUser }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
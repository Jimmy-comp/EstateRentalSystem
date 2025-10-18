import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { handleUserLogin } from "../services/userService";
import { useUserContext } from "../context/UserContext";


const Login: React.FC = () => {
    const {login} = useUserContext();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    const handleBtnClick = async (e?: React.FormEvent) => {
        e?.preventDefault();

        if(!username || !password) return setError("⚠️ Please enter both username and password.");

        try{
            const data = await handleUserLogin(username, password);

            login(data.user);
            alert(data.message);
            navigate("/");
        } catch (err) {
            console.error("(Login) Login Failed:", err);
            setError("🚨 Server error, please try again later.");
            alert("Login Failed");
        }
    }

    return(
        <div className="flex w-screen min-h-screen items-start justify-center mt-20">
            <form className="border rounded-lg shadow-lg p-6 w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl">
                <h2 className="text-3xl font-bold mb-5 text-center">Login</h2>
                <div className="flex items-center mb-4">
                    <label className="w-24 mx-2 mb-1 text-lg">Username:</label>
                    <input 
                        type="text" 
                        value={username} 
                        onChange={(e) => setUsername(e.target.value)} 
                        className="flex-1 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500" 
                        placeholder="Enter your username" />
                </div>

                <div className="flex items-center mb-4">
                    <label className="w-24 mx-2 mb-1 text-lg">Password:</label>
                    <input 
                        type="text"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="flex-1 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter your password"/>
                </div>

                <div className="flex justify-center">
                    <button type="submit" onClick={handleBtnClick}>
                        Login
                    </button>
                </div>
            </form>

            {/* Show Popup if error */}
        </div>
    );
};

export default Login;
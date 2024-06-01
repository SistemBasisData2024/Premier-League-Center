import React, { useState } from "react";
import styles from "../style";
import ToastContainer from './ToastContainer'; // Import the ToastContainer component

const Login = () => {
    const [username, setUsername] = useState("");
    const [pass, setPass] = useState("");
    const [toasts, setToasts] = useState([]);

    const addToast = (type, message) => {
        const id = new Date().getTime();
        setToasts([...toasts, { id, type, message }]);
        setTimeout(() => removeToast(id), 3000);
    };

    const removeToast = (id) => {
        setToasts(toasts.filter((toast) => toast.id !== id));
    };

    const handleLogin = async (event) => {
        event.preventDefault();
        try {
            const response = await fetch("http://localhost:3001/LoginAdmin", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ username, pass }),
            });
            const data = await response.json();
            console.log(data);
            if (response.ok) {
                sessionStorage.setItem("isLogin", true);
                addToast('success', 'Logged in successfully');
                setTimeout(() => window.location.href = "/", 3000);
            } else {
                addToast('error', 'Username or password is incorrect');
            }
        } catch (error) {
            console.error("Error logging in:", error);
            addToast('error', 'An error occurred while logging in');
        }
    };

    return (
        <div className="flex justify-center items-center h-screen pb-24">
            <section id="login" className={`flex md:flex-row flex-col ${styles.paddingX}`}>
                <div className={`flex-1 ${styles.flexStart} flex-col xl:px-0 sm:px-16 px-6 flex justify-center items-center`}>
                    <h1 className="font-poppins font-semibold text-[55px] text-white leading-[100.8px] mb-8">
                        <span className="text-gradient">Login</span>
                    </h1>
                    <form onSubmit={handleLogin} className="flex flex-col justify-center items-center border-white border-2 rounded-md p-6">
                        <div className="font-poppins font-semibold text-white text-[15px] leading-[23.4px] mb-4">
                            <label htmlFor="username" className="block mb-2">Username</label>
                            <input type="text" id="username" name="username" className="w-full px-3 py-2 border rounded-md" value={username} onChange={(event) => setUsername(event.target.value)} required />
                        </div>
                        <div className="font-poppins font-semibold text-white text-[15px] leading-[23.4px] mb-4">
                            <label htmlFor="password" className="block mb-2">Password</label>
                            <input type="password" id="password" name="password" className="w-full px-3 py-2 border rounded-md" value={pass} onChange={(event) => setPass(event.target.value)} required />
                        </div>
                        <button type="submit" className="button mt-8">Sign in</button>
                    </form>
                    <p className="mt-4 text-white">
                        Don't have an account? <a href="/Register" className="text-purple-500 hover:text-purple-700">Sign Up</a>
                    </p>
                </div>
            </section>
            <ToastContainer toasts={toasts} removeToast={removeToast} />
        </div>
    );
};

export default Login;

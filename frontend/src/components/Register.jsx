import React, { useState } from "react";
import styles from "../style";
import ToastContainer from './ToastContainer'; // Import the ToastContainer component

const Register = () => {
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

    const handleRegister = async (event) => {
        event.preventDefault();
        try {
            const response = await fetch("http://localhost:3001/RegisterAdmin", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ username, pass }),
            });

            if (response.ok) {
                addToast('success', 'Admin registered successfully');
                setTimeout(() => window.location.href = "/", 3000);
            } else {
                addToast('error', 'Failed to register admin');
            }
        } catch (error) {
            console.error("Error registering admin:", error);
            addToast('error', 'An error occurred while registering');
        }
    };

    return (
        <div className="flex justify-center items-center h-screen pb-24">
            <section id="register" className={`flex md:flex-row flex-col ${styles.paddingX}`}>
                <div className={`flex-1 ${styles.flexStart} flex-col xl:px-0 sm:px-16 px-6 flex justify-center items-center`}>
                    <h1 className="font-poppins font-semibold text-[55px] text-white leading-[100.8px] mb-8">
                        <span className="text-gradient">Register</span>
                    </h1>
                    <form onSubmit={handleRegister} className="flex flex-col justify-center items-center border-white border-2 rounded-md p-6">
                        <div className="font-poppins font-semibold text-white text-[15px] leading-[23.4px] mb-4">
                            <label htmlFor="username" className="block mb-2">Username</label>
                            <input type="text" id="username" name="username" className="w-full px-3 py-2 border rounded-md" value={username} onChange={(event) => setUsername(event.target.value)} required />
                        </div>
                        <div className="font-poppins font-semibold text-white text-[15px] leading-[23.4px] mb-4">
                            <label htmlFor="password" className="block mb-2">Password</label>
                            <input type="password" id="password" name="password" className="w-full px-3 py-2 border rounded-md" value={pass} onChange={(event) => setPass(event.target.value)} required />
                        </div>
                        <button type="submit" className="button mt-8">Sign up</button>
                    </form>
                    <p className="mt-4 text-white">
                        Already have an account? <a href="/Login" className="text-purple-500 hover:text-purple-700">Sign In</a>
                    </p>
                </div>
            </section>
            <ToastContainer toasts={toasts} removeToast={removeToast} />
        </div>
    );
};

export default Register;

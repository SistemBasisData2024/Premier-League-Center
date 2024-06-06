import React, { useState } from "react";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import ToastContainer from './ToastContainer';
import styles from "../style";

const Register = () => {
    const [username, setUsername] = useState("");
    const [pass, setPass] = useState("");
    const [confirmPass, setConfirmPass] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
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
        if (!username || !pass || !confirmPass) {
            addToast('error', 'All fields are required');
            return;
        }
        if (pass !== confirmPass) {
            addToast('error', 'Passwords do not match');
            return;
        }
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

    const handleClickShowPassword = () => setShowPassword(!showPassword);
    const handleClickShowConfirmPassword = () => setShowConfirmPassword(!showConfirmPassword);

    return (
        <div className="flex justify-center items-center h-screen pb-24">
            <section id="register" className={`flex md:flex-row flex-col ${styles.paddingX}`}>
                <div className={`flex-1 ${styles.flexStart} flex-col xl:px-0 sm:px-16 px-6 flex justify-center items-center`}>
                    <h1 className="font-poppins font-semibold text-[55px] text-white leading-[100.8px] mb-8">
                        <span className="text-gradient">Register</span>
                    </h1>
                    <Box
                        component="form"
                        onSubmit={handleRegister}
                        sx={{
                            '& .MuiTextField-root': { m: 1, width: '40ch' },
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            border: '2px solid white',
                            borderRadius: '8px',
                            padding: '24px',
                            backgroundColor: '#050505'
                        }}
                        noValidate
                        autoComplete="off"
                    >
                        <TextField
                            id="username"
                            label="Username"
                            variant="outlined"
                            value={username}
                            onChange={(event) => setUsername(event.target.value)}
                            InputLabelProps={{ style: { color: 'white' } }}
                            InputProps={{
                                style: { color: 'white' },
                                classes: {
                                    notchedOutline: 'border-white'
                                }
                            }}
                            sx={{ paddingBottom: '8px'}}
                        />
                        <TextField
                            id="password"
                            label="Password"
                            variant="outlined"
                            type={showPassword ? 'text' : 'password'}
                            value={pass}
                            onChange={(event) => setPass(event.target.value)}
                            InputLabelProps={{ style: { color: 'white' } }}
                            InputProps={{
                                style: { color: 'white' },
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPassword}
                                            edge="end"
                                        >
                                            {showPassword ? <VisibilityOff style={{ color: 'white' }} /> : <Visibility style={{ color: 'white' }} />}
                                        </IconButton>
                                    </InputAdornment>
                                ),
                                classes: {
                                    notchedOutline: 'border-white'
                                }
                            }}
                            sx={{ paddingBottom: '8px'}}
                        />
                        <TextField
                            id="confirm-password"
                            label="Confirm Password"
                            variant="outlined"
                            type={showConfirmPassword ? 'text' : 'password'}
                            value={confirmPass}
                            onChange={(event) => setConfirmPass(event.target.value)}
                            InputLabelProps={{ style: { color: 'white' } }}
                            InputProps={{
                                style: { color: 'white' },
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle confirm password visibility"
                                            onClick={handleClickShowConfirmPassword}
                                            edge="end"
                                        >
                                            {showConfirmPassword ? <VisibilityOff style={{ color: 'white' }} /> : <Visibility style={{ color: 'white' }} />}
                                        </IconButton>
                                    </InputAdornment>
                                ),
                                classes: {
                                    notchedOutline: 'border-white'
                                }
                            }}
                            sx={{ paddingBottom: '8px'}}
                        />
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            sx={{ 
                                mt: 2, 
                                backgroundColor: '#4b0082', 
                                '&:hover': { backgroundColor: '#38003c' },
                                padding: '12px 24px',
                            }}
                        >
                            Sign up
                        </Button>
                    </Box>
                    <p className="mt-4 text-white mb-4">
                        Already have an account? <a href="/Login" className="text-purple-500 hover:text-purple-700">Sign In</a>
                    </p>
                </div>
            </section>
            <ToastContainer toasts={toasts} removeToast={removeToast} />
        </div>
    );
};

export default Register;

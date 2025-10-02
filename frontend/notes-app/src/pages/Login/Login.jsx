import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axiosInstance from '../../utils/axiosInstance'; // Make sure this path is correct
import AuthNavbar from '../../components/AuthNavbar/AuthNavbar';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        if (!email) {
            setError('Please enter your email.');
            return;
        }
        if (!password) {
            setError('Please enter your password.');
            return;
        }
        setError(null);

        try {
            const response = await axiosInstance.post('/login', {
                email: email,
                password: password,
            });

            if (response.data && response.data.accessToken) {
                localStorage.setItem('token', response.data.accessToken);
                navigate('/dashboard');
            }
        } catch (err) {
            if (err.response && err.response.data && err.response.data.message) {
                setError(err.response.data.message);
            } else {
                setError('An unexpected error occurred. Please try again.');
            }
        }
    };

    return (
        <div className="bg-slate-50 min-h-screen flex flex-col">
            <AuthNavbar />
            <div className="flex flex-1 items-center justify-center pt-20">
                <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-xl shadow-lg animate-fade-in-up">
                    <div className="text-center">
                        <h2 className="mt-6 text-3xl font-extrabold text-slate-900">
                            Login to NoteStack
                        </h2>
                        <p className="mt-2 text-sm text-slate-600">
                            Welcome back! Please enter your details.
                        </p>
                    </div>

                    <form className="mt-8 space-y-6" onSubmit={handleLogin}>
                        <div className="rounded-md -space-y-px">
                            <div>
                                <input
                                    type="email"
                                    autoComplete="email"
                                    placeholder="Email Address"
                                    className="appearance-none rounded-none relative block w-full px-3 py-3 border border-slate-300 placeholder-slate-500 text-slate-900 rounded-t-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                            <div>
                                <input
                                    type="password"
                                    autoComplete="current-password"
                                    placeholder="Password"
                                    className="appearance-none rounded-none relative block w-full px-3 py-3 border border-slate-300 placeholder-slate-500 text-slate-900 rounded-b-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                        </div>

                        {error && <p className="text-red-500 text-xs text-center pt-2">{error}</p>}

                        <div>
                            <button
                                type="submit"
                                className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
                            >
                                Login
                            </button>
                        </div>
                    </form>

                    <p className="mt-4 text-center text-sm text-slate-600">
                        Don't have an account?{' '}
                        <Link to="/signup" className="font-medium text-blue-600 hover:text-blue-500">
                            Create an Account
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;



import { useState } from 'react';
import { BASE_URL } from '../lib/utils';
import { useNavigate } from 'react-router-dom';

export default function Auth({ onLogin }) {
    const [isLogin, setIsLogin] = useState(true);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const navigate = useNavigate();

    async function handleSubmit(event) {
        event.preventDefault();
        setMessage('');
        setLoading(true);

        try {
            const response = await fetch(
                `${BASE_URL}/${isLogin ? 'login' : 'register'}`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        name,
                        email,
                        password
                    })
                }
            );

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message);
            }

            if (isLogin) {
                onLogin(data);
                navigate('/routines');
            } else {
                setIsLogin(true);
                setPassword('');
                setMessage('Account created. Please log in.');
            }
        } catch (error) {
            setMessage(error.message);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="bg-lavender rounded-2xl p-6 md:p-12">
            <form
                onSubmit={handleSubmit}
                className="max-w-md mx-auto bg-cream rounded-2xl p-8 flex flex-col gap-5 text-deep-purple"
            >
                <h1 className="font-serif text-4xl text-center">
                    {isLogin ? 'Welcome Back' : 'Create Account'}
                </h1>

                <p className="text-center text-purple text-sm">
                    Your personal skincare journey.
                </p>

                {!isLogin && (
                    <input
                        value={name}
                        onChange={event => setName(event.target.value)}
                        placeholder="Full Name"
                        aria-label="Full name"
                        required
                        className="bg-lavender rounded-lg p-3"
                    />
                )}

                <input
                    type="email"
                    value={email}
                    onChange={event => setEmail(event.target.value)}
                    placeholder="Email"
                    aria-label="Email"
                    required
                    className="bg-lavender rounded-lg p-3"
                />

                <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={event => setPassword(event.target.value)}
                    placeholder="Password"
                    aria-label="Password"
                    minLength={8}
                    required
                    className="bg-lavender rounded-lg p-3"
                />

                <label className="flex items-center gap-2 text-sm">
                    <input
                        type="checkbox"
                        checked={showPassword}
                        onChange={event => setShowPassword(event.target.checked)}
                    />
                    Show password
                </label>

                <button
                    type="submit"
                    disabled={loading}
                    className="bg-deep-purple text-cream rounded-lg p-3 cursor-pointer hover:bg-purple disabled:opacity-50"
                >
                    {loading
                        ? 'Please wait...'
                        : isLogin ? 'Login' : 'Sign Up'}
                </button>

                {message && (
                    <p role="status" className="text-center text-purple text-sm">
                        {message}
                    </p>
                )}

                <button
                    type="button"
                    disabled={loading}
                    onClick={() => {
                        setIsLogin(!isLogin);
                        setMessage('');
                    }}
                    className="text-purple text-sm cursor-pointer"
                >
                    {isLogin
                        ? "Don't have an account? Sign Up"
                        : 'Already have an account? Login'}
                </button>
            </form>
        </div>
    );
}

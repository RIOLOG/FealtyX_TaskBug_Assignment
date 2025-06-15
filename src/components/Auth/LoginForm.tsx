'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/redux/store';
import { login } from '@/redux/authSlice';

export default function LoginForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    try {
      dispatch(login({ username, password }));
      router.push('/dashboard');
    } catch (err: any) {
      setError('Invalid username or password');
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-8 rounded shadow-md w-full max-w-sm"
    >
      <h2 className="text-2xl font-bold mb-4">Login</h2>
      {error && <p className="text-red-500">{error}</p>}
      <input
        className="w-full border px-3 py-2 mb-4"
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
      />
      <input
        className="w-full border px-3 py-2 mb-4"
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 w-full rounded"
      >
        Login
      </button>
    </form>
  );
}















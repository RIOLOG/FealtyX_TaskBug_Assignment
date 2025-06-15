'use client';

import LoginForm from '../../components/Auth/LoginForm';
import Link from 'next/link'; 

export default function LoginPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-indigo-500 to-purple-600 p-4 sm:p-6 lg:p-8">
      <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-xl w-full max-w-md transform transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white tracking-tight mb-2">
            Welcome Back!
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-lg">
            Sign in to your account.
          </p>
        </div>

        <LoginForm />

       
      </div>
    </div>
  );
}




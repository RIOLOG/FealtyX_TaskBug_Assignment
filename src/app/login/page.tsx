'use client';

import LoginForm from '../../components/Auth/LoginForm';
import Link from 'next/link'; // For any potential navigation (e.g., "Forgot Password?")

export default function LoginPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-indigo-500 to-purple-600 p-4 sm:p-6 lg:p-8">
      <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-xl w-full max-w-md transform transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]">
        {/* Branding/Header */}
        <div className="text-center mb-8">
          {/* You can replace this with your actual logo */}
          <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white tracking-tight mb-2">
            Welcome Back!
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-lg">
            Sign in to your account.
          </p>
        </div>

        {/* The LoginForm component will be rendered here */}
        <LoginForm />

       
      </div>
    </div>
  );
}





///////////////////////////////////////////////////////////////////////////////////

// 'use client';

// import LoginForm from '@/components/Auth/LoginForm';

// export default function LoginPage() {
//   return (
//     <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 px-4">
//       <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-md border border-gray-200">
//         <div className="mb-6 text-center">
//           <h1 className="text-3xl font-bold text-gray-800">Welcome Back</h1>
//           <p className="text-sm text-gray-500 mt-1">Please login to your account</p>
//         </div>
//         <LoginForm />
//       </div>
//     </main>
//   );
// }

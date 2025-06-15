'use client';

import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { logout } from '@/redux/authSlice';
import DeveloperView from '@/components/Dashboard/DeveloperView';
import ManagerView from '@/components/Dashboard/ManagerView';
import toast from 'react-hot-toast'; // Import toast

export default function DashboardPage() {
  const { isAuthenticated, role } = useSelector((state: RootState) => state.auth);
  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
    }
  }, [isAuthenticated, router]);

  const handleLogout = () => {
    dispatch(logout());
    toast.success('Logged out successfully!', {
      duration: 2000, // Show for 2 seconds
      position: 'top-center', // You can customize toast position
    });
    router.push('/');
  };

  if (!isAuthenticated && typeof window !== 'undefined') {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
        <div className="text-xl font-semibold text-gray-700 dark:text-gray-300">
          Loading dashboard...
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col">
      <header className="bg-white dark:bg-gray-800 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex-shrink-0">
            <h1 className="text-2xl font-extrabold text-gray-900 dark:text-white">Dashboard</h1>
          </div>
          <nav className="flex items-center space-x-4">
            {/* You could add more navigation links here */}
            <button
              onClick={handleLogout}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200"
            >
              Logout
            </button>
          </nav>
        </div>
      </header>

      <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          {/* Dashboard Welcome */}
          <div className="mb-6 pb-4 border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
              Welcome, {role ? role.charAt(0).toUpperCase() + role.slice(1) : 'User'}!
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              This is your personalized dashboard.
            </p>
          </div>

          {role === 'developer' ? (
            <DeveloperView />
          ) : role === 'manager' ? (
            <ManagerView />
          ) : (
            <div className="text-gray-500 dark:text-gray-400 text-center py-10">
              <p>No specific view available for your role.</p>
              <p className="mt-2 text-sm">Please contact support if you believe this is an error.</p>
            </div>
          )}
        </div>
      </main>


      <footer className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 mt-8 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-gray-500 dark:text-gray-400 text-sm">
          &copy; {new Date().getFullYear()} Ankit Singh. All rights reserved.
        </div>
      </footer>
    </div>
  );
}





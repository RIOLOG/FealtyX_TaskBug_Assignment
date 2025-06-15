




'use client';

import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip, 
  Legend, 
} from 'chart.js';
import TaskList from '../Tasks/taskList'; 

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend);

export default function ManagerView() {
  const tasks = useSelector((state: RootState) => state.tasks.tasks);
  const timeLogs = useSelector((state: RootState) => state.time.logs);

  const openTasks = tasks.filter((task) => task.status !== 'closed');
  const closedTasks = tasks.filter((task) => task.status === 'closed');


  const createdTrend = tasks.reduce((acc, task) => {
    // Ensure task.createdAt is a string before splitting
    const date = (task.createdAt || '').split('T')[0];
    if (date) { 
      acc[date] = (acc[date] || 0) + 1;
    }
    return acc;
  }, {} as Record<string, number>);


  const updatedTrend = tasks.reduce((acc, task) => {

    const date = ((task.lastUpdatedAt || task.createdAt) || '').split('T')[0];
    if (date) { 
      acc[date] = (acc[date] || 0) + 1;
    }
    return acc;
  }, {} as Record<string, number>);

  const allDates = Array.from(
    new Set([...Object.keys(createdTrend), ...Object.keys(updatedTrend)])
  ).sort();

  const createdData = {
    labels: allDates,
    datasets: [
      {
        label: 'Tasks Created Per Day',
        data: allDates.map((d) => createdTrend[d] || 0),
        borderColor: 'rgb(37, 99, 235)',
        backgroundColor: 'rgba(37, 99, 235, 0.3)',
        tension: 0.3,
        fill: true,
      },
    ],
  };

  const updatedData = {
    labels: allDates,
    datasets: [
      {
        label: 'Tasks Worked On Per Day',
        data: allDates.map((d) => updatedTrend[d] || 0),
        borderColor: 'rgb(34,197,94)', 
        backgroundColor: 'rgba(34,197,94,0.3)',
        tension: 0.3,
        fill: true, 
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false, 
    plugins: {
      legend: {
        position: 'top' as const,
        labels: {
          color: 'rgb(55, 65, 81)', 
        },
      },
      tooltip: {
        mode: 'index' as const,
        intersect: false,
      },
    },
    scales: {
      x: {
        grid: {
          display: false, 
        },
        ticks: {
          color: 'rgb(75, 85, 99)', 
        },
      },
      y: {
        grid: {
          color: 'rgba(209, 213, 219, 0.3)', 
        },
        ticks: {
          color: 'rgb(75, 85, 99)',
        },
      },
    },
  };
  
  const darkChartOptions = {
    ...chartOptions,
    plugins: {
      ...chartOptions.plugins,
      legend: {
        ...chartOptions.plugins.legend,
        labels: {
          color: 'rgb(209, 213, 219)', 
      },
    },
    scales: {
      x: {
        ...chartOptions.scales.x,
        ticks: {
          color: 'rgb(156, 163, 175)', 
        },
      },
      y: {
        ...chartOptions.scales.y,
        grid: {
          color: 'rgba(107, 114, 128, 0.3)', 
        },
        ticks: {
          color: 'rgb(156, 163, 175)', 
        },
      },
    },
  };


  const timeSummary = tasks.map((task) => {
    const total = timeLogs
      .filter((log) => log.taskId === task.id)
      .reduce((sum, log) => sum + log.timeSpent, 0);
    return { title: task.title, total };
  });

  return (
    <section className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 space-y-8">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white pb-3 border-b border-gray-200 dark:border-gray-700">
        Manager Dashboard: Overview
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

        <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg shadow-sm border border-gray-100 dark:border-gray-600">
          <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-4">Task Status Summary</h3>
          <div className="flex justify-around items-center text-center">
            <div>
              <p className="text-4xl font-extrabold text-blue-600 dark:text-blue-400">{openTasks.length}</p>
              <p className="text-gray-600 dark:text-gray-300">Open Tasks</p>
            </div>
            <div>
              <p className="text-4xl font-extrabold text-green-600 dark:text-green-400">{closedTasks.length}</p>
              <p className="text-gray-600 dark:text-gray-300">Closed Tasks</p>
            </div>
          </div>
        </div>

        <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg shadow-sm border border-gray-100 dark:border-gray-600">
          <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-4">Time Logs per Task</h3>
          {timeSummary.length > 0 ? (
            <ul className="space-y-2 text-gray-700 dark:text-gray-300">
              {timeSummary.map((t, index) => (
                <li key={t.title || `time-log-${index}`} className="flex justify-between items-center bg-white dark:bg-gray-800 p-3 rounded-md shadow-sm border border-gray-200 dark:border-gray-600">
                  <span className="font-medium text-gray-800 dark:text-gray-200 truncate">{t.title}</span>
                  <span className="text-indigo-600 dark:text-indigo-400 font-bold ml-4 whitespace-nowrap">{t.total} mins</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500 dark:text-gray-400 text-center py-4">No time logs recorded yet.</p>
          )}
        </div>


      </div>

      <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg shadow-sm border border-gray-100 dark:border-gray-600">
        <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-4 pb-3 border-b border-gray-200 dark:border-gray-600">All Tasks</h3>
        <TaskList role="manager" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg shadow-sm border border-gray-100 dark:border-gray-600 h-96"> {/* Fixed height for charts */}
          <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-4 pb-3 border-b border-gray-200 dark:border-gray-600">Tasks Created Trend</h3>
          <Line data={createdData} options={chartOptions} /> {/* Added options */}
        </div>

        <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg shadow-sm border border-gray-100 dark:border-gray-600 h-96"> {/* Fixed height for charts */}
          <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-4 pb-3 border-b border-gray-200 dark:border-gray-600">Tasks Worked On Trend</h3>
          <Line data={updatedData} options={chartOptions} /> {/* Added options */}
        </div>
      </div>

    </section>
  );
}

















// // 'use client';

// // import { useSelector } from 'react-redux';
// // import { RootState } from '@/redux/store';
// // import { Line } from 'react-chartjs-2';
// // import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, PointElement } from 'chart.js';

// // ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement);

// // export default function ManagerView() {
// //   const tasks = useSelector((state: RootState) => state.tasks.tasks);

// //   const openTasks = tasks.filter((task) => task.status !== 'closed');
// //   const closedTasks = tasks.filter((task) => task.status === 'closed');

// //   const trendData = tasks.reduce((acc, task) => {
// //     acc[task.createdAt] = (acc[task.createdAt] || 0) + 1;
// //     return acc;
// //   }, {} as Record<string, number>);

// //   const labels = Object.keys(trendData);
// //   const data = {
// //     labels,
// //     datasets: [
// //       {
// //         label: 'Tasks Created Per Day',
// //         data: labels.map((date) => trendData[date]),
// //         borderColor: 'rgb(37, 99, 235)',
// //         backgroundColor: 'rgba(37, 99, 235, 0.5)',
// //         tension: 0.3,
// //       },
// //     ],
// //   };

// //   return (
// //     <div>
// //       <h2 className="text-xl font-bold mb-2">All Tasks</h2>
// //       <p>Open: {openTasks.length}, Closed: {closedTasks.length}</p>

// //       <ul className="mt-4 space-y-2">
// //         {tasks.map((task) => (
// //           <li key={task.id} className="border p-3 rounded shadow bg-white">
// //             <h3 className="font-semibold">{task.title}</h3>
// //             <p>{task.description}</p>
// //             <p className="text-sm text-gray-500">
// //               Status: {task.status}, Assignee: {task.assignee}
// //             </p>
// //           </li>
// //         ))}
// //       </ul>

// //       <div className="mt-8 bg-white p-4 rounded shadow">
// //         <h3 className="font-semibold mb-2">Task Creation Trend</h3>
// //         <Line data={data} />
// //       </div>
// //     </div>
// //   );
// // }






// 'use client';

// import { useSelector } from 'react-redux';
// import { RootState } from '@/redux/store';
// import { Line } from 'react-chartjs-2';
// import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, PointElement } from 'chart.js';
// import TaskList from '../Tasks/taskList';


// ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement);

// export default function ManagerView() {
//   const tasks = useSelector((state: RootState) => state.tasks.tasks);
//   const timeLogs = useSelector((state: RootState) => state.time.logs);

//   const openTasks = tasks.filter((task) => task.status !== 'closed');
//   const closedTasks = tasks.filter((task) => task.status === 'closed');

//   const trendData = tasks.reduce((acc, task) => {
//     acc[task.createdAt] = (acc[task.createdAt] || 0) + 1;
//     return acc;
//   }, {} as Record<string, number>);

//   const labels = Object.keys(trendData);
//   const data = {
//     labels,
//     datasets: [
//       {
//         label: 'Tasks Created Per Day',
//         data: labels.map((date) => trendData[date]),
//         borderColor: 'rgb(37, 99, 235)',
//         backgroundColor: 'rgba(37, 99, 235, 0.5)',
//         tension: 0.3,
//       },
//     ],
//   };

//   // 👇 Calculate total time per task
//   const timeSummary = tasks.map((task) => {
//     const total = timeLogs
//       .filter((log) => log.taskId === task.id)
//       .reduce((sum, log) => sum + log.timeSpent, 0);
//     return { title: task.title, total };
//   });

//   return (
//     <div>
//       <h2 className="text-xl font-bold mb-2">Manager Dashboard</h2>
//       <p>
//         Open: {openTasks.length}, Closed: {closedTasks.length}
//       </p>

//       <div className="mt-6">
//         <TaskList role="manager" />
//       </div>

//       {/* Time Summary */}
//       <div className="mt-8 bg-white p-4 rounded shadow">
//         <h3 className="font-semibold mb-2">Time Logs Summary</h3>
//         <ul className="list-disc pl-4 text-sm">
//           {timeSummary.map((t) => (
//             <li key={t.title}>
//               {t.title}: {t.total} mins
//             </li>
//           ))}
//         </ul>
//       </div>

//       {/* Trend Chart */}
//       <div className="mt-8 bg-white p-4 rounded shadow">
//         <h3 className="font-semibold mb-2">Task Creation Trend</h3>
//         <Line data={data} />
//       </div>
//     </div>
//   );
// }










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
  Tooltip, // Added for chart tooltips
  Legend, // Added for chart legends
} from 'chart.js';
import TaskList from '../Tasks/taskList'; // Correct path from your original code

// Register necessary Chart.js components
ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend);

export default function ManagerView() {
  const tasks = useSelector((state: RootState) => state.tasks.tasks);
  const timeLogs = useSelector((state: RootState) => state.time.logs);

  const openTasks = tasks.filter((task) => task.status !== 'closed');
  const closedTasks = tasks.filter((task) => task.status === 'closed');

  // ✅ Trend: Tasks created per day
  const createdTrend = tasks.reduce((acc, task) => {
    // Ensure task.createdAt is a string before splitting
    const date = (task.createdAt || '').split('T')[0];
    if (date) { // Only count if date is valid
      acc[date] = (acc[date] || 0) + 1;
    }
    return acc;
  }, {} as Record<string, number>);

  // ✅ New Trend: Tasks worked on per day
  const updatedTrend = tasks.reduce((acc, task) => {
    // Use lastUpdatedAt if available, otherwise createdAt
    const date = ((task.lastUpdatedAt || task.createdAt) || '').split('T')[0];
    if (date) { // Only count if date is valid
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
        borderColor: 'rgb(37, 99, 235)', // Indigo-600 equivalent
        backgroundColor: 'rgba(37, 99, 235, 0.3)',
        tension: 0.3,
        fill: true, // Fill area under the line
      },
    ],
  };

  const updatedData = {
    labels: allDates,
    datasets: [
      {
        label: 'Tasks Worked On Per Day',
        data: allDates.map((d) => updatedTrend[d] || 0),
        borderColor: 'rgb(34,197,94)', // Green-500 equivalent
        backgroundColor: 'rgba(34,197,94,0.3)',
        tension: 0.3,
        fill: true, // Fill area under the line
      },
    ],
  };

  // Chart options for better appearance
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false, // Allows chart to fill container
    plugins: {
      legend: {
        position: 'top' as const,
        labels: {
          color: 'rgb(55, 65, 81)', // Tailwind gray-700
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
          display: false, // Remove vertical grid lines
        },
        ticks: {
          color: 'rgb(75, 85, 99)', // Tailwind gray-600
        },
      },
      y: {
        grid: {
          color: 'rgba(209, 213, 219, 0.3)', // Lighter grid lines
        },
        ticks: {
          color: 'rgb(75, 85, 99)', // Tailwind gray-600
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
          color: 'rgb(209, 213, 219)', // Tailwind gray-300
        },
      },
    },
    scales: {
      x: {
        ...chartOptions.scales.x,
        ticks: {
          color: 'rgb(156, 163, 175)', // Tailwind gray-400
        },
      },
      y: {
        ...chartOptions.scales.y,
        grid: {
          color: 'rgba(107, 114, 128, 0.3)', // Darker grid lines
        },
        ticks: {
          color: 'rgb(156, 163, 175)', // Tailwind gray-400
        },
      },
    },
  };


  // ⏱️ Time log summary
  const timeSummary = tasks.map((task) => {
    const total = timeLogs
      .filter((log) => log.taskId === task.id)
      .reduce((sum, log) => sum + log.timeSpent, 0);
    return { title: task.title, total };
  });

  return (
    <section className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 space-y-8">
      {/* Page Title */}
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white pb-3 border-b border-gray-200 dark:border-gray-700">
        Manager Dashboard: Overview
      </h2>

      {/* Grid for Dashboard Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

        {/* Task Summary Card */}
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

        {/* Time Logs Summary Card */}
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

      {/* Task List Section */}
      <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg shadow-sm border border-gray-100 dark:border-gray-600">
        <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-4 pb-3 border-b border-gray-200 dark:border-gray-600">All Tasks</h3>
        <TaskList role="manager" />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Tasks Created Trend Chart */}
        <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg shadow-sm border border-gray-100 dark:border-gray-600 h-96"> {/* Fixed height for charts */}
          <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-4 pb-3 border-b border-gray-200 dark:border-gray-600">Tasks Created Trend</h3>
          <Line data={createdData} options={chartOptions} /> {/* Added options */}
        </div>

        {/* Tasks Worked On Trend Chart */}
        <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg shadow-sm border border-gray-100 dark:border-gray-600 h-96"> {/* Fixed height for charts */}
          <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-4 pb-3 border-b border-gray-200 dark:border-gray-600">Tasks Worked On Trend</h3>
          <Line data={updatedData} options={chartOptions} /> {/* Added options */}
        </div>
      </div>

    </section>
  );
}
















////////////////////////////////////////////////////////////

// 'use client';

// import { useSelector } from 'react-redux';
// import { RootState } from '@/redux/store';
// import { Line } from 'react-chartjs-2';
// import {
//   Chart as ChartJS,
//   LineElement,
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   Tooltip,
//   Legend,
// } from 'chart.js';
// import TaskList from '@/components/Tasks/taskList';

// ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend);

// export default function ManagerView() {
//   const tasks = useSelector((state: RootState) => state.tasks.tasks);
//   const timeLogs = useSelector((state: RootState) => state.time.logs);

//   const openTasks = tasks.filter((task) => task.status !== 'closed');
//   const closedTasks = tasks.filter((task) => task.status === 'closed');

//   const createdTrend = tasks.reduce((acc, task) => {
//     const date = task.createdAt.split('T')[0];
//     acc[date] = (acc[date] || 0) + 1;
//     return acc;
//   }, {} as Record<string, number>);

//   const updatedTrend = tasks.reduce((acc, task) => {
//     const date = (task.lastUpdatedAt || task.createdAt).split('T')[0];
//     acc[date] = (acc[date] || 0) + 1;
//     return acc;
//   }, {} as Record<string, number>);

//   const allDates = Array.from(new Set([...Object.keys(createdTrend), ...Object.keys(updatedTrend)])).sort();

//   const createdData = {
//     labels: allDates,
//     datasets: [
//       {
//         label: 'Tasks Created',
//         data: allDates.map((d) => createdTrend[d] || 0),
//         borderColor: 'rgb(59,130,246)',
//         backgroundColor: 'rgba(59,130,246,0.2)',
//         tension: 0.3,
//         fill: true,
//       },
//     ],
//   };

//   const updatedData = {
//     labels: allDates,
//     datasets: [
//       {
//         label: 'Tasks Worked On',
//         data: allDates.map((d) => updatedTrend[d] || 0),
//         borderColor: 'rgb(34,197,94)',
//         backgroundColor: 'rgba(34,197,94,0.2)',
//         tension: 0.3,
//         fill: true,
//       },
//     ],
//   };

//   const timeSummary = tasks.map((task) => {
//     const total = timeLogs
//       .filter((log) => log.taskId === task.id)
//       .reduce((sum, log) => sum + log.timeSpent, 0);
//     return { title: task.title, total };
//   });

//   return (
//     <section className="space-y-10">
//       <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
//         <h2 className="text-2xl font-semibold text-gray-800 mb-2">Manager Dashboard</h2>
//         <p className="text-gray-600">
//           <span className="font-medium text-blue-600">Open:</span> {openTasks.length} &nbsp;|&nbsp;
//           <span className="font-medium text-green-600">Closed:</span> {closedTasks.length}
//         </p>
//       </div>

//       <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
//         <h3 className="text-lg font-semibold text-gray-800 mb-4">All Tasks</h3>
//         <TaskList role="manager" />
//       </div>

//       <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
//         <h3 className="text-lg font-semibold text-gray-800 mb-4">Time Logs Summary</h3>
//         <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
//           {timeSummary.map((t) => (
//             <li key={t.title}>
//               <span className="font-medium">{t.title}</span>: {t.total} mins
//             </li>
//           ))}
//         </ul>
//       </div>

//       <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
//         <h3 className="text-lg font-semibold text-gray-800 mb-4">Tasks Created Trend</h3>
//         <div className="overflow-x-auto">
//           <Line data={createdData} />
//         </div>
//       </div>

//       <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
//         <h3 className="text-lg font-semibold text-gray-800 mb-4">Tasks Worked On Trend</h3>
//         <div className="overflow-x-auto">
//           <Line data={updatedData} />
//         </div>
//       </div>
//     </section>
//   );
// }

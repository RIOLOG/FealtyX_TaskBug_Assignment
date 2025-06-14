// 'use client';

import TaskList from "../Tasks/taskList";

// import { useSelector } from 'react-redux';
// import { RootState } from '@/redux/store';

// export default function DeveloperView() {
//   const { username } = useSelector((state: RootState) => state.auth);
//   const tasks = useSelector((state: RootState) => state.tasks.tasks);
//   const myTasks = tasks.filter((task) => task.assignee === username);

//   return (
//     <div>
//       <h2 className="text-xl font-bold mb-2">My Tasks</h2>
//       {myTasks.length === 0 ? (
//         <p>No tasks assigned to you.</p>
//       ) : (
//         <ul className="space-y-2">
//           {myTasks.map((task) => (
//             <li
//               key={task.id}
//               className="border p-3 rounded shadow bg-white"
//             >
//               <h3 className="font-semibold">{task.title}</h3>
//               <p>{task.description}</p>
//               <p className="text-sm text-gray-500">
//                 Status: {task.status}, Priority: {task.priority}
//               </p>
//             </li>
//           ))}
//         </ul>
//       )}
//     </div>
//   );
// }













export default function DeveloperView() {
  return (
    <section className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md border border-gray-200 dark:border-gray-700">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 border-b pb-3 border-gray-200 dark:border-gray-700">
        Developer Dashboard: Your Assigned Tasks
      </h2>
      {/* The TaskList component will be rendered here */}
      <TaskList role="developer" />
    </section>
  );
}





/////////////////////////////////////////////////////

// 'use client';

// import TaskList from '@/components/TaskList/TaskList';

// export default function DeveloperView() {
//   return (
//     <section className="bg-white shadow-sm rounded-xl p-6 border border-gray-200">
//       <h2 className="text-2xl font-semibold text-gray-800 mb-4">My Tasks</h2>
//       <TaskList role="developer" />
//     </section>
//   );
// }

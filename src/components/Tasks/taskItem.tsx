'use client';
import { RootState } from '@/redux/store';
import { Task, deleteTask, editTask } from '@/redux/taskSlice';
import { useDispatch, useSelector } from 'react-redux';
import TaskTimeLogger from './TaskTimeLogger';
import { toast } from 'react-toastify'; // Using react-toastify as per your code

export default function TaskItem({
  task,
  onEdit,
  role = 'developer',
}: {
  task: Task;
  onEdit: () => void;
  role?: 'developer' | 'manager';
}) {
  const dispatch = useDispatch();

  const handleApprove = () => {
    dispatch(editTask({ ...task, status: 'closed' }));
    toast.success('Task approved and closed!', { position: 'top-center' });
  };

  const handleReject = () => {
    dispatch(editTask({ ...task, status: 'open' }));
    toast.info('Task rejected and set back to Open.', { position: 'top-center' });
  };

  const handleMarkPendingApproval = () => {
    dispatch(editTask({ ...task, status: 'pending approval' }));
    toast.info('Task marked as "Pending Approval".', { position: 'top-center' });
  };

  const handleDelete = () => {
    dispatch(deleteTask(task.id));
    toast.error('Task deleted successfully!', { position: 'top-center' });
  };

  // 👇 Get total time spent for this task
  const timeLogs = useSelector((state: RootState) => state.time.logs);
  const totalTime = timeLogs
    .filter((log) => log.taskId === task.id)
    .reduce((sum, log) => sum + log.timeSpent, 0);

  // Helper for priority color
  const getPriorityColor = (priority: Task['priority']) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
      case 'low':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
    }
  };

  // Helper for status color
  const getStatusColor = (status: Task['status']) => {
    switch (status) {
      case 'open':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
      case 'in progress':
        return 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-300';
      case 'pending approval':
        return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300';
      case 'closed':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
    }
  };

  const actionButtonClass = "px-3 py-1 text-sm font-medium rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2";


  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-6">
      {/* Task Details Section */}
      <div className="flex-1 space-y-2">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white leading-snug">
          {task.title}
        </h3>
        <p className="text-gray-700 dark:text-gray-300 text-sm line-clamp-2">
          {task.description}
        </p>
        <div className="flex flex-wrap items-center gap-2 text-xs">
          <span className={`${getPriorityColor(task.priority)} px-2.5 py-0.5 rounded-full font-medium`}>
            {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)} Priority
          </span>
          <span className={`${getStatusColor(task.status)} px-2.5 py-0.5 rounded-full font-medium`}>
            {task.status.charAt(0).toUpperCase() + task.status.slice(1)}
          </span>
          <span className="text-gray-600 dark:text-gray-400">
            Assigned to: <span className="font-medium text-gray-800 dark:text-gray-200">{task.assignee || 'Unassigned'}</span>
          </span>
          <span className="text-gray-600 dark:text-gray-400">
            Due: <span className="font-medium text-gray-800 dark:text-gray-200">{task.dueDate || 'N/A'}</span>
          </span>
        </div>
        <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
          Total Time Spent: <span className="font-semibold text-indigo-600 dark:text-indigo-400">{totalTime} mins</span>
        </p>

        {/* Only show logger to developers for open/in-progress/pending tasks */}
        {role === 'developer' && task.status !== 'closed' && (
          <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
            <TaskTimeLogger taskId={task.id} />
          </div>
        )}
      </div>

      {/* Actions Section */}
      <div className="flex flex-wrap sm:flex-col items-start sm:items-end gap-3 min-w-[120px]">
        {role === 'developer' && task.status !== 'closed' && (
          <>
            <button
              onClick={onEdit}
              className={`${actionButtonClass} bg-blue-50 text-blue-700 hover:bg-blue-100 dark:bg-blue-900 dark:text-blue-300 dark:hover:bg-blue-800 focus:ring-blue-500`}
            >
              Edit
            </button>
            <button
              onClick={handleDelete}
              className={`${actionButtonClass} bg-red-50 text-red-700 hover:bg-red-100 dark:bg-red-900 dark:text-red-300 dark:hover:bg-red-800 focus:ring-red-500`}
            >
              Delete
            </button>
            {task.status === 'open' || task.status === 'in progress' ? (
              <button
                onClick={handleMarkPendingApproval}
                className={`${actionButtonClass} bg-yellow-50 text-yellow-700 hover:bg-yellow-100 dark:bg-yellow-900 dark:text-yellow-300 dark:hover:bg-yellow-800 focus:ring-yellow-500`}
              >
                Mark Pending
              </button>
            ) : null }
          </>
        )}

        {role === 'manager' && task.status === 'pending approval' && (
          <>
            <button
              onClick={handleApprove}
              className={`${actionButtonClass} bg-green-500 text-white hover:bg-green-600 dark:bg-green-600 dark:hover:bg-green-700 focus:ring-green-500`}
            >
              Approve
            </button>
            <button
              onClick={handleReject}
              className={`${actionButtonClass} bg-red-500 text-white hover:bg-red-600 dark:bg-red-600 dark:hover:bg-red-700 focus:ring-red-500`}
            >
              Reject
            </button>
          </>
        )}

        {/* Display 'Closed' badge if task is closed, for both roles (no actions) */}
        {task.status === 'closed' && (
          <span className="px-3 py-1 text-sm font-medium rounded-md bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300">
            Task Closed
          </span>
        )}
      </div>
    </div>
  );
}













  ///////////////////////////////////////////


//   'use client';


//  import { RootState } from '@/redux/store';
// import { Task, deleteTask, editTask } from '@/redux/taskSlice';
// import { useDispatch, useSelector } from 'react-redux';
// import TaskTimeLogger from './TaskTimeLogger';
// import { toast } from 'react-toastify'; // Using react-toastify as per your code

// interface Props {
//   task: Task;
//   onEdit: () => void;
//   role?: 'developer' | 'manager';
// }

// export default function TaskItem({ task, onEdit, role = 'developer' }: Props) {
//   const dispatch = useDispatch();
//   const timeLogs = useSelector((state: RootState) => state.time.logs);

//   const totalTime = timeLogs
//     .filter((log) => log.taskId === task.id)
//     .reduce((sum, log) => sum + log.timeSpent, 0);

//   const handleApprove = () => {
//     dispatch(editTask({ ...task, status: 'closed' }));
//     toast.success('✅ Task approved!');
//   };

//   const handleReject = () => {
//     dispatch(editTask({ ...task, status: 'open' }));
//     toast.info('❌ Task rejected and set back to Open.');
//   };

//   const handleDelete = () => {
//     if (confirm('Are you sure you want to delete this task?')) {
//       dispatch(deleteTask(task.id));
//       toast.success('🗑️ Task deleted.');
//     }
//   };

//   const handleMarkPending = () => {
//     dispatch(editTask({ ...task, status: 'pending approval' }));
//     toast.info('🔁 Task marked as Pending Approval.');
//   };

//   return (
//     <div className="border p-4 rounded-xl shadow bg-white flex justify-between items-start space-x-4">
//       <div className="flex-1">
//         <h3 className="text-lg font-semibold text-gray-800">{task.title}</h3>
//         <p className="text-sm text-gray-700">{task.description}</p>

//         <div className="text-xs text-gray-500 mt-1 space-y-1">
//           <p>
//             <strong>Priority:</strong> {task.priority}
//           </p>
//           <p>
//             <strong>Status:</strong> {task.status}
//           </p>
//           <p>
//             <strong>Total Time Spent:</strong> {totalTime} mins
//           </p>
//         </div>

//         {/* Developer-only time logger */}
//         {role === 'developer' && task.status !== 'closed' && (
//           <div className="mt-2">
//             <TaskTimeLogger taskId={task.id} />
//           </div>
//         )}
//       </div>

//       <div className="flex flex-col gap-2 items-end">
//         {role === 'developer' && task.status !== 'closed' && (
//           <>
//             <button
//               onClick={onEdit}
//               className="text-sm text-blue-600 hover:underline"
//               aria-label="Edit Task"
//             >
//               ✏️ Edit
//             </button>
//             <button
//               onClick={handleDelete}
//               className="text-sm text-red-600 hover:underline"
//               aria-label="Delete Task"
//             >
//               🗑️ Delete
//             </button>
//             {task.status === 'open' && (
//               <button
//                 onClick={handleMarkPending}
//                 className="text-sm text-yellow-600 hover:underline"
//                 aria-label="Mark as Pending Approval"
//               >
//                 ⏳ Mark Pending
//               </button>
//             )}
//           </>
//         )}

//         {role === 'manager' && task.status === 'pending approval' && (
//           <>
//             <button
//               onClick={handleApprove}
//               className="text-sm text-green-600 hover:underline"
//               aria-label="Approve Task"
//             >
//               ✅ Approve
//             </button>
//             <button
//               onClick={handleReject}
//               className="text-sm text-red-600 hover:underline"
//               aria-label="Reject Task"
//             >
//               ❌ Reject
//             </button>
//           </>
//         )}
//       </div>
//     </div>
//   );
// }

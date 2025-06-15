'use client';

import TaskList from "../Tasks/taskList";



export default function DeveloperView() {
  return (
    <section className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md border border-gray-200 dark:border-gray-700">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 border-b pb-3 border-gray-200 dark:border-gray-700">
        Developer Dashboard: Your Assigned Tasks
      </h2>
      <TaskList role="developer" />
    </section>
  );
}






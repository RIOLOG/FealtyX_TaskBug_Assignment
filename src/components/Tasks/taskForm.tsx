



'use client';

import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/redux/store';
import { addTask, editTask, Task } from '@/redux/taskSlice';
import { toast } from 'react-toastify'; 
interface Props {
  onClose: () => void;
  initialData?: Task;
  role?: 'developer' | 'manager';
}

export default function TaskForm({ onClose, initialData, role = 'developer' }: Props) {
  const dispatch = useDispatch<AppDispatch>();

  const [form, setForm] = useState<Omit<Task, 'id'>>({
    title: '',
    description: '',
    priority: 'medium',
    status: 'open',
    assignee: '',
    createdAt: new Date().toISOString().split('T')[0],
    dueDate: '',
  });

  const [year, setYear] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false); // Added for loading state

  useEffect(() => {
    if (initialData) {
      setForm(initialData);
    }
  }, [initialData]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });

    if (name === 'title' && value === 'Annual Forecast Revenue') {
      setYear('');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true); 
    try {
     
      await new Promise((res) => setTimeout(res, 700)); 

      if (initialData) {
        dispatch(editTask({ ...form, id: initialData.id }));
        toast.success('Task updated successfully!', { position: 'top-center' });
      } else {
        dispatch(addTask(form));
        toast.success('Task created successfully!', { position: 'top-center' });
      }
      onClose();
    } catch (err) {
      toast.error('An error occurred. Please try again.', { position: 'top-center' });
    } finally {
      setIsSubmitting(false); 
    }
  };

  
  const inputClass = "w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 dark:placeholder-gray-500 text-gray-900 dark:text-white bg-white dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors duration-200";
  const labelClass = "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1";
  const buttonClass = `w-full flex justify-center items-center py-2 px-4 rounded-lg text-white font-semibold transition-all duration-200 shadow-md ${
    isSubmitting
      ? 'bg-indigo-400 cursor-not-allowed'
      : 'bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
  }`;
  const closeButtonClass = "absolute top-4 right-4 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 text-2xl font-bold p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500";


  return (

    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 dark:bg-opacity-75 p-4">

      <div className="relative bg-white dark:bg-gray-800 p-6 rounded-lg shadow-xl w-full max-w-lg max-h-[90vh] overflow-y-auto">

        <button
          onClick={onClose}
          className={closeButtonClass}
          aria-label="Close task form"
        >
          &times;
        </button>

        
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center"> {/* Increased bottom margin for title */}
          {initialData ? 'Edit Task' : 'Create New Task'}
        </h2>

     
        <form onSubmit={handleSubmit} className="space-y-6"> {/* Preserving inner form styles */}

          <div>
            <label htmlFor="title" className={labelClass}>
              Task Title
            </label>
            <input
              id="title"
              name="title"
              placeholder="e.g., Implement User Authentication"
              value={form.title}
              onChange={handleChange}
              className={inputClass}
              required
            />
          </div>

          
          {form.title === 'Annual Forecast Revenue' && (
            <div>
              <label htmlFor="year" className={labelClass}>
                Forecast Year
              </label>
              <input
                id="year"
                type="number"
                name="year"
                placeholder="e.g., 2025"
                value={year}
                onChange={(e) => setYear(e.target.value)}
                className={inputClass}
              />
            </div>
          )}


          <div>
            <label htmlFor="description" className={labelClass}>
              Description
            </label>
            <textarea
              id="description"
              name="description"
              placeholder="Provide a detailed description of the task..."
              value={form.description}
              onChange={handleChange}
              rows={4} 
              className={`${inputClass} resize-y`} 
              required
            />
          </div>


          <div>
            <label htmlFor="priority" className={labelClass}>
              Priority
            </label>
            <select
              id="priority"
              name="priority"
              value={form.priority}
              onChange={handleChange}
              className={inputClass}
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>

          
          <div>
            <label htmlFor="status" className={labelClass}>
              Status
            </label>
            <select
              id="status"
              name="status"
              value={form.status}
              onChange={handleChange}
              className={inputClass}
            >
              <option value="open">Open</option>
              <option value="in progress">In Progress</option>
              <option value="pending approval">Pending Approval</option>
              <option value="closed">Closed</option> {/* Added 'closed' option */}
            </select>
          </div>

  
          <div>
            <label htmlFor="assignee" className={labelClass}>
              Assignee
            </label>
            <input
              id="assignee"
              name="assignee"
              placeholder="e.g., John Doe"
              value={form.assignee}
              onChange={handleChange}
              className={inputClass}
            />
          </div>

 
          <div>
            <label htmlFor="dueDate" className={labelClass}>
              Due Date
            </label>
            <input
              id="dueDate"
              type="date"
              name="dueDate"
              value={form.dueDate}
              onChange={handleChange}
              className={inputClass}
              required
            />
          </div>


          <button
            type="submit"
            disabled={isSubmitting}
            className={buttonClass}
          >
            {isSubmitting ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                {initialData ? 'Updating...' : 'Creating...'}
              </>
            ) : (
              initialData ? 'Update Task' : 'Create Task'
            )}
          </button>
        </form>
      </div>
    </div>
  );
}













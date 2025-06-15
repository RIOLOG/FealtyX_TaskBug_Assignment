import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';

import { ToastContainer, toast } from 'react-toastify';

type TaskStatus = 'open' | 'in progress' | 'closed' | 'pending approval';

export interface Task {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  assignee: string; 
  priority: 'low' | 'medium' | 'high';
  createdAt: string;
  dueDate: string;
  lastUpdatedAt?: string; 
}

interface TaskState {
  tasks: Task[];
}

const initialState: TaskState = {
  tasks: [
    {
      id: '1',
      title: 'Fix login issue',
      description: 'Login fails on first try',
      status: 'open',
      assignee: 'dev1',
      priority: 'high',
      createdAt: '2025-06-12',
      dueDate: '2025-06-16'
    },
    {
      id: '2',
      title: 'Add logout feature',
      description: 'Add logout to header',
      status: 'in progress',
      assignee: 'dev1',
      priority: 'medium',
      createdAt: '2025-06-13',
      dueDate: '2025-06-20'
    },
  ],
};

const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    addTask: (state, action: PayloadAction<Omit<Task, "id">>) => {
      const newTask = { ...action.payload, id: uuidv4() };
      state.tasks.push(newTask);
    },

  
    editTask: (state, action: PayloadAction<Task>) => {
      const index = state.tasks.findIndex((t) => t.id === action.payload.id);
      if (index !== -1) {
        state.tasks[index] = {
          ...action.payload,
          lastUpdatedAt: new Date().toISOString(), // ⬅️ Add this
        };
      }
    },


    deleteTask: (state, action: PayloadAction<string>) => {
      state.tasks = state.tasks.filter((task) => task.id !== action.payload);
    },
  },
});
  
  export const { addTask, editTask, deleteTask } = taskSlice.actions;
  export default taskSlice.reducer;

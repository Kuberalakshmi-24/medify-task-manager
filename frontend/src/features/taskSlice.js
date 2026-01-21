import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import API from '../api';

export const fetchTasks = createAsyncThunk('tasks/fetch', async () => {
  const res = await API.get('/tasks');
  return res.data;
});

export const addTask = createAsyncThunk('tasks/add', async (data) => {
  const res = await API.post('/tasks', data);
  return res.data;
});

export const updateTaskStatus = createAsyncThunk('tasks/update', async ({ id, status }) => {
  await API.put(`/tasks/${id}`, { status });
  return { id, status };
});

const taskSlice = createSlice({
  name: 'tasks',
  initialState: { items: [], status: 'idle' },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.fulfilled, (state, action) => { state.items = action.payload; })
      .addCase(addTask.fulfilled, (state, action) => { state.items.push(action.payload); })
      .addCase(updateTaskStatus.fulfilled, (state, action) => {
        const index = state.items.findIndex(t => t.id === action.payload.id);
        if (index !== -1) state.items[index].status = action.payload.status;
      });
  }
});
export default taskSlice.reducer;

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import apiRequest from "../api/apiRequest";

// Fetch Tasks
export const fetchTasks = createAsyncThunk("tasks/fetchTasks", async () => {
  const response = await apiRequest.get("/tasks");
  return response;
});

// Add Task
export const addTask = createAsyncThunk("tasks/addTask", async (task) => {
  const response = await apiRequest.post("/tasks", task);
  return response;
});

// Update Task
export const updateTask = createAsyncThunk(
  "tasks/updateTask",
  async ({ id, data }) => {
    const response = await apiRequest.put(`/tasks/${id}`, data);
    return response;
  }
);

// Delete Task
export const deleteTask = createAsyncThunk("tasks/deleteTask", async (id) => {
  await apiRequest.delete(`/tasks/${id}`);
  return id;
});

// Toggle Task Status
export const toggleTaskStatus = createAsyncThunk(
  "tasks/toggleTaskStatus",
  async (id) => {
    const response = await apiRequest.put(`/tasks/toggle-status/${id}`); // Update to use new endpoint
    return response;
  }
);

const taskSlice = createSlice({
  name: "tasks",
  initialState: {
    tasks: [],
    loading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.tasks = action.payload;
        state.loading = false;
      })
      .addCase(addTask.fulfilled, (state, action) => {
        state.tasks.push(action.payload);
      })
      .addCase(updateTask.fulfilled, (state, action) => {
        const index = state.tasks.findIndex(
          (task) => task._id === action.payload._id
        );
        if (index !== -1) {
          state.tasks[index] = action.payload;
        }
      })
      .addCase(toggleTaskStatus.fulfilled, (state, action) => {
        const index = state.tasks.findIndex(
          (task) => task._id === action.payload._id
        );
        if (index !== -1) {
          state.tasks[index].completed = action.payload.completed;
        }
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.tasks = state.tasks.filter((task) => task._id !== action.payload);
      });
  },
});

export default taskSlice.reducer;

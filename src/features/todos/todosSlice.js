// src/features/todos/todosSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  todos: JSON.parse(localStorage.getItem('todos')) || [],
  status: 'idle',
  error: null,
};

// Fetch todos from API
export const fetchTodos = createAsyncThunk('todos/fetchTodos', async () => {
  const response = await axios.get('https://dummyjson.com/todos');
  console.log("this is response", response)
  return response.data.todos;
});

const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    addTodo: (state, action) => {
      state.todos.push(action.payload);
      localStorage.setItem('todos', JSON.stringify(state.todos));
    },
    deleteTodo: (state, action) => {
      state.todos = state.todos.filter(todo => todo.id !== action.payload);
      localStorage.setItem('todos', JSON.stringify(state.todos));
    },
    updateTodo: (state, action) => {
      const { id, todo } = action.payload;
      const existingTodo = state.todos.find(todo => todo.id === id);
      if (existingTodo) {
        existingTodo.todo = todo;
      }
      localStorage.setItem('todos', JSON.stringify(state.todos));
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodos.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchTodos.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.todos = action.payload;
        localStorage.setItem('todos', JSON.stringify(state.todos));
      })
      .addCase(fetchTodos.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const { addTodo, deleteTodo, updateTodo } = todosSlice.actions;

export default todosSlice.reducer;

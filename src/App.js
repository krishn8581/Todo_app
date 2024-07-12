// src/App.js
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTodos } from './features/todos/todosSlice';
import TodoList from './features/todos/TodoList';
import TodoForm from './features/todos/TodoForm';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

function App() {
  const dispatch = useDispatch();
  const todos = useSelector((state) => state.todos.todos);

  useEffect(() => {
    if (todos.length === 0) {
      dispatch(fetchTodos());
    }
  }, [dispatch, todos.length]);

  return (
    <Container maxWidth="sm">
      <Box my={4}>
        <Typography variant="h4" component="h1" gutterBottom>
          Todo App
        </Typography>
        <TodoForm />
        <Box my={4}>
          <TodoList />
        </Box>
      </Box>
    </Container>
  );
}

export default App;

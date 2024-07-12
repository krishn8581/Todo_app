// src/features/todos/TodoForm.js
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addTodo } from './todosSlice';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import AddIcon from '@mui/icons-material/Add';

const TodoForm = () => {
  const [title1, setTitle1] = useState('');
  const [title2, setTitle2] = useState('');
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title1.trim() && title2.trim()) {
      dispatch(addTodo({
        id: Math.random().toString(36).substr(2, 9),
        todo: title1,
        completed: false,
      }));
      dispatch(addTodo({
        id: Math.random().toString(36).substr(2, 9),
        todo: title2,
        completed: false,
      }));
      setTitle1('');
      setTitle2('');
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
      <TextField
        label="Todo 1"
        value={title1}
        onChange={(e) => setTitle1(e.target.value)}
        variant="outlined"
      />
      <TextField
        label="Todo 2"
        value={title2}
        onChange={(e) => setTitle2(e.target.value)}
        variant="outlined"
      />
      <Button type="submit" variant="contained" color="primary" startIcon={<AddIcon />}>
        Add
      </Button>
    </Box>
  );
};

export default TodoForm;

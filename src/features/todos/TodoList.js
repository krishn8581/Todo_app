// src/features/todos/TodoList.js
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { deleteTodo, updateTodo } from './todosSlice';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import CheckIcon from '@mui/icons-material/Check';

const TodoList = () => {
  const todos = useSelector((state) => state.todos.todos);
  const status = useSelector((state) => state.todos.status);
  const dispatch = useDispatch();
  const [editId, setEditId] = useState(null);
  const [editTitle, setEditTitle] = useState('');

  const handleEdit = (id, todo) => {
    setEditId(id);
    setEditTitle(todo);
  };

  const handleUpdate = (id) => {
    dispatch(updateTodo({
      id,
      todo: editTitle,
    }));
    setEditId(null);
    setEditTitle('');
  };

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (status === 'failed') {
    return <div>Failed to fetch todos.</div>;
  }

  return (
    <List>
      {todos.map((todo) => (
        <ListItem key={todo.id} secondaryAction={
          <>
            <IconButton edge="end" aria-label="edit" onClick={() => handleEdit(todo.id, todo.todo)}>
              <EditIcon />
            </IconButton>
            <IconButton edge="end" aria-label="delete" onClick={() => dispatch(deleteTodo(todo.id))}>
              <DeleteIcon />
            </IconButton>
          </>
        }>
          {editId === todo.id ? (
            <>
              <TextField
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
                variant="outlined"
                size="small"
              />
              <Button
                onClick={() => handleUpdate(todo.id)}
                startIcon={<CheckIcon />}
                variant="contained"
                color="primary"
                size="small"
              >
                Update
              </Button>
            </>
          ) : (
            <ListItemText primary={todo.todo} />
          )}
        </ListItem>
      ))}
    </List>
  );
};

export default TodoList;

const express = require('express');
const { addTodo, getTodo, updateTodo, deleteTodo } = require('../controllers/todo');
const router=express.Router();

router.post('/tasks',addTodo);

router.get('/tasks',getTodo);

router.put('/tasks/:id',updateTodo);

router.delete('/tasks/:id',deleteTodo);

module.exports=router;
